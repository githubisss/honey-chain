import React from 'react';
import { CuteBee } from '../game/CuteBee';
import { Sparkles, QrCode, Play, ShieldCheck, Compass, Heart, ArrowRight } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface HomeViewProps {
  onPlayJourney: () => void;
  onScanQr: () => void;
  onOpenPassport: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onPlayJourney,
  onScanQr,
  onOpenPassport
}) => {
  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden flex flex-col justify-between py-6 px-4">
      {/* Background Honeycomb & Meadow Elements */}
      <div className="absolute inset-0 bg-honeycomb opacity-70 pointer-events-none" />

      {/* Floating Decorative Sun & Clouds */}
      <div className="absolute top-6 left-8 sm:left-20 w-24 h-24 rounded-full bg-yellow-300/60 blur-md pointer-events-none" />
      <div className="absolute top-12 right-12 sm:right-32 text-6xl opacity-30 animate-pulse pointer-events-none">
        ☁️
      </div>
      <div className="absolute top-36 left-10 text-5xl opacity-25 pointer-events-none">
        ☁️
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-4xl mx-auto w-full my-auto text-center space-y-6 pt-4 sm:pt-8">
        {/* Cute Flying Bee with interactive buzz on click */}
        <div 
          className="cursor-pointer inline-block group"
          onClick={() => {
            soundManager.playPop();
            soundManager.startBeeBuzz(1.5);
          }}
          title="Click the bee to hear buzz!"
        >
          <div className="relative transform group-hover:scale-110 transition-transform">
            <CuteBee size={110} hasHoneyBucket={true} facing="right" />
            <div className="absolute -top-4 -right-6 bg-yellow-300 border-2 border-amber-800 text-amber-950 font-black text-xs px-2.5 py-1 rounded-full shadow-md animate-bounce">
              Buzzz! 🐝
            </div>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-amber-100 border-2 border-amber-600 px-4 py-1 rounded-full text-xs font-black text-amber-900 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>VIDEO GAME HONEY TRACEABILITY PLATFORM</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-amber-950 tracking-tight font-display drop-shadow-sm">
            🍯 HONEYCHAIN
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-800 font-display">
            “Follow the Bee. Discover the Honey.”
          </p>
        </div>

        {/* Two Large Game Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-2 max-w-md mx-auto">
          {/* PLAY HONEY JOURNEY BUTTON */}
          <button
            onClick={() => {
              soundManager.playPop();
              onPlayJourney();
            }}
            className="w-full sm:w-auto flex-1 btn-game-honey px-6 py-4 rounded-2xl font-black text-amber-950 text-base sm:text-lg flex items-center justify-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-full bg-amber-950 text-yellow-300 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
            <span>PLAY HONEY JOURNEY</span>
          </button>

          {/* SCAN HONEY QR BUTTON */}
          <button
            onClick={() => {
              soundManager.playPop();
              onScanQr();
            }}
            className="w-full sm:w-auto flex-1 btn-game-wood px-6 py-4 rounded-2xl font-black text-amber-100 text-base sm:text-lg flex items-center justify-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-full bg-yellow-400 text-amber-950 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <QrCode className="w-4 h-4" />
            </div>
            <span>SCAN HONEY QR</span>
          </button>
        </div>

        {/* Small prompt text */}
        <p className="text-xs sm:text-sm font-semibold text-amber-900/80 italic max-w-md mx-auto">
          “Every bottle has a story. Follow it from hive to home.”
        </p>

        {/* 7 Levels Teaser Preview Badges */}
        <div className="bg-white/80 backdrop-blur-xs rounded-2xl border-3 border-amber-400 p-4 shadow-xl max-w-2xl mx-auto">
          <div className="text-xs font-black text-amber-900 uppercase tracking-wider mb-2">
            Explore The 7 Adventure Levels
          </div>
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs font-bold text-amber-950">
            <div className="p-1.5 bg-amber-50 rounded-xl border border-amber-300">
              <span className="text-lg">🐝</span>
              <div className="text-[10px]">Hive</div>
            </div>
            <div className="p-1.5 bg-amber-50 rounded-xl border border-amber-300">
              <span className="text-lg">🌸</span>
              <div className="text-[10px]">Flowers</div>
            </div>
            <div className="p-1.5 bg-amber-50 rounded-xl border border-amber-300">
              <span className="text-lg">👨🌾</span>
              <div className="text-[10px]">Beekeeper</div>
            </div>
            <div className="p-1.5 bg-amber-50 rounded-xl border border-amber-300">
              <span className="text-lg">🍯</span>
              <div className="text-[10px]">Harvest</div>
            </div>
            <div className="p-1.5 bg-amber-50 rounded-xl border border-amber-300">
              <span className="text-lg">🏭</span>
              <div className="text-[10px]">Process</div>
            </div>
            <div className="p-1.5 bg-amber-50 rounded-xl border border-amber-300">
              <span className="text-lg">🚚</span>
              <div className="text-[10px]">Transit</div>
            </div>
            <div className="p-1.5 bg-amber-50 rounded-xl border border-amber-300">
              <span className="text-lg">🏠</span>
              <div className="text-[10px]">Home</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Features Banner */}
      <div className="relative z-10 max-w-4xl mx-auto w-full pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-amber-100/90 rounded-xl border-2 border-amber-400 p-3 flex items-center gap-3">
            <span className="text-2xl">🔗</span>
            <div className="text-xs">
              <div className="font-black text-amber-950">Blockchain Verified</div>
              <div className="text-amber-800">Immutable proof of raw authenticity</div>
            </div>
          </div>
          <div className="bg-amber-100/90 rounded-xl border-2 border-amber-400 p-3 flex items-center gap-3">
            <span className="text-2xl">🌱</span>
            <div className="text-xs">
              <div className="font-black text-amber-950">100% Organic Foraging</div>
              <div className="text-amber-800">GPS validated pesticide-free zone</div>
            </div>
          </div>
          <div className="bg-amber-100/90 rounded-xl border-2 border-amber-400 p-3 flex items-center gap-3">
            <span className="text-2xl">💚</span>
            <div className="text-xs">
              <div className="font-black text-amber-950">Ethical Beekeeping</div>
              <div className="text-amber-800">Fair-trade master apiarists</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
