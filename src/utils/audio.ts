/**
 * Web Audio API synthesizer for game-like sound effects and ambient sounds.
 * Generates all sounds synthetically to ensure 100% reliability with zero external asset dependencies.
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private beeBuzzOsc: OscillatorNode | null = null;
  private beeBuzzGain: GainNode | null = null;
  private vehicleOsc: OscillatorNode | null = null;
  private vehicleGain: GainNode | null = null;
  private ambientNoiseSource: AudioNode | null = null;
  private ambientGain: GainNode | null = null;

  constructor() {
    // Check saved mute preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('honeychain_sound_enabled');
      if (saved !== null) {
        this.isMuted = saved === 'false';
      }
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('honeychain_sound_enabled', (!this.isMuted).toString());
    }
    if (this.isMuted) {
      this.stopAllContinuous();
    }
    return !this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopAllContinuous();
    }
  }

  /**
   * Play a gentle UI tap/pop sound
   */
  public playPop() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.08);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  /**
   * Play Bee Buzzing (short burst or continuous)
   */
  public startBeeBuzz(durationSeconds?: number) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      this.stopBeeBuzz();

      const osc = this.ctx.createOscillator();
      const modOsc = this.ctx.createOscillator();
      const modGain = this.ctx.createGain();
      const masterGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Bee buzz harmonics ~ 190Hz with 18Hz flutter
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(185, this.ctx.currentTime);

      modOsc.type = 'sine';
      modOsc.frequency.setValueAtTime(16, this.ctx.currentTime);
      modGain.gain.setValueAtTime(25, this.ctx.currentTime);

      modOsc.connect(modGain);
      modGain.connect(osc.frequency);

      // Warm low-pass filter to sound cute and natural
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(480, this.ctx.currentTime);

      masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.1);

      osc.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(this.ctx.destination);

      osc.start();
      modOsc.start();

      this.beeBuzzOsc = osc;
      this.beeBuzzGain = masterGain;

      if (durationSeconds) {
        setTimeout(() => {
          this.stopBeeBuzz();
        }, durationSeconds * 1000);
      }
    } catch {
      // Ignore
    }
  }

  public stopBeeBuzz() {
    if (this.beeBuzzGain && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.beeBuzzGain.gain.linearRampToValueAtTime(0.001, now + 0.2);
        setTimeout(() => {
          if (this.beeBuzzOsc) {
            try { this.beeBuzzOsc.stop(); } catch {}
            this.beeBuzzOsc = null;
          }
          this.beeBuzzGain = null;
        }, 220);
      } catch {
        this.beeBuzzOsc = null;
        this.beeBuzzGain = null;
      }
    }
  }

  /**
   * Play Flower Field Ambience (gentle bird chirp & breeze)
   */
  public playFlowerBirds() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // 3 sweet melodic bird chirps
      [0, 0.22, 0.5].forEach((delay, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';

        const baseFreq = 2200 + i * 400;
        osc.frequency.setValueAtTime(baseFreq, now + delay);
        osc.frequency.exponentialRampToValueAtTime(baseFreq + 700, now + delay + 0.08);
        osc.frequency.exponentialRampToValueAtTime(baseFreq + 300, now + delay + 0.16);

        gain.gain.setValueAtTime(0.001, now + delay);
        gain.gain.linearRampToValueAtTime(0.06, now + delay + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + 0.2);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * Honey harvest drip / liquid pouring sound
   */
  public playHoneyPour() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Series of soft bubbling drops
      const pitches = [520, 640, 480, 580, 720, 600];
      pitches.forEach((freq, idx) => {
        if (!this.ctx) return;
        const delay = idx * 0.12;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq * 1.3, now + delay);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.8, now + delay + 0.1);

        gain.gain.setValueAtTime(0.08, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + 0.15);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * Delivery truck motor sound
   */
  public playTruckSound(durationSeconds = 2) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(65, now);
      osc.frequency.linearRampToValueAtTime(95, now + durationSeconds * 0.6);
      osc.frequency.linearRampToValueAtTime(70, now + durationSeconds);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, now);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.09, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + durationSeconds);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + durationSeconds);
    } catch {
      // Ignore
    }
  }

  /**
   * Satisfying completion chime (Level 7 / Verification)
   */
  public playCompletionChime() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Arpeggio: C5, E5, G5, B5, C6 (523, 659, 783, 987, 1046)
      const notes = [523.25, 659.25, 783.99, 987.77, 1046.5];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const delay = idx * 0.1;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + delay);

        gain.gain.setValueAtTime(0.12, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + 0.9);
      });
    } catch {
      // Ignore
    }
  }

  public stopAllContinuous() {
    this.stopBeeBuzz();
    if (this.vehicleOsc) {
      try { this.vehicleOsc.stop(); } catch {}
      this.vehicleOsc = null;
    }
  }
}

export const soundManager = new SoundManager();
