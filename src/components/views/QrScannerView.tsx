import React, { useState } from 'react';
import { QrCode, Sparkles, CheckCircle2, Camera, ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface QrScannerViewProps {
  onScanComplete: (batchId: string) => void;
  onBackToHome: () => void;
}

export const QrScannerView: React.FC<QrScannerViewProps> = ({
  onScanComplete,
  onBackToHome
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState('HNY1024');
  const [scanSuccess, setScanSuccess] = useState(false);

  const handleTriggerScan = (batchId: string = 'HNY1024') => {
    soundManager.playPop();
    setIsScanning(true);
    setScanSuccess(false);

    // Simulate camera laser scan
    setTimeout(() => {
      soundManager.playCompletionChime();
      setScanSuccess(true);
      setIsScanning(false);

      // Auto-open passport
      setTimeout(() => {
        onScanComplete(batchId);
      }, 900);
    }, 1400);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 bg-amber-100 border border-amber-400 px-3 py-1 rounded-full text-xs font-black text-amber-900">
          <Camera className="w-3.5 h-3.5" />
          <span>SMARTPHONE QR CODE VERIFIER</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-amber-950 font-display">
          📱 SCAN HONEY QR CODE
        </h2>
        <p className="text-xs sm:text-sm font-semibold text-amber-800">
          Scan the QR tag on your artisanal honey bottle to reveal its on-chain journey.
        </p>
      </div>

      {/* Simulated Smartphone Device Container */}
      <div className="relative mx-auto w-full max-w-sm bg-slate-900 rounded-[42px] p-4 sm:p-5 border-4 border-slate-800 shadow-2xl ring-8 ring-amber-200">
        {/* Phone Top Notch & Speaker */}
        <div className="w-32 h-5 bg-slate-950 rounded-full mx-auto mb-3 flex items-center justify-center gap-2">
          <div className="w-10 h-1 bg-slate-700 rounded-full" />
          <div className="w-2 h-2 rounded-full bg-slate-800" />
        </div>

        {/* Camera Viewport Screen */}
        <div className="relative w-full aspect-3/4 rounded-3xl bg-slate-950 overflow-hidden border-2 border-slate-700 flex flex-col justify-between p-4 text-center">
          {/* Top Status */}
          <div className="flex justify-between items-center z-10 text-[11px] text-slate-300 font-bold px-2">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              LIVE CAMERA
            </span>
            <span className="font-mono">4K 60FPS</span>
          </div>

          {/* Central QR Targeting Box */}
          <div className="relative my-auto flex flex-col items-center justify-center">
            {/* Target Reticle Borders */}
            <div className="relative w-56 h-56 rounded-2xl border-2 border-yellow-400/40 p-3 flex flex-col items-center justify-center">
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-yellow-400 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-yellow-400 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-yellow-400 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-yellow-400 rounded-br-lg" />

              {/* Scanning Laser Line */}
              {isScanning && (
                <div className="absolute left-2 right-2 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent shadow-[0_0_12px_#f59e0b] animate-bounce" />
              )}

              {/* QR Code Artwork Graphic */}
              <div className="p-3 bg-white rounded-xl shadow-inner flex flex-col items-center">
                <QrCode className={`w-28 h-28 text-amber-950 ${isScanning ? 'animate-pulse' : ''}`} />
                <span className="font-mono text-[10px] font-black text-amber-900 mt-1">
                  BATCH #{selectedBatch}
                </span>
              </div>

              {/* Status overlay */}
              {scanSuccess && (
                <div className="absolute inset-0 bg-emerald-600/90 rounded-2xl flex flex-col items-center justify-center text-white p-3 animate-fade-in">
                  <CheckCircle2 className="w-12 h-12 text-yellow-300 animate-bounce" />
                  <span className="font-black text-sm mt-1">QR CODE VERIFIED!</span>
                  <span className="text-xs font-semibold text-emerald-100">Opening Honey Passport...</span>
                </div>
              )}
            </div>

            <p className="text-[11px] font-bold text-yellow-300/90 mt-3 tracking-wide uppercase">
              {isScanning ? '🔍 Scanning QR code on bottle...' : 'Point camera at honey jar QR code'}
            </p>
          </div>

          {/* Bottom Scanner Prompt text */}
          <div className="z-10 bg-slate-900/80 backdrop-blur-xs rounded-xl p-2 text-xs text-slate-300">
            <span className="font-bold text-yellow-400">HoneyChain Authenticator v2.4</span>
            <div className="text-[10px] text-slate-400">Cryptographic proof verified at node 0x7B1a...4801</div>
          </div>
        </div>

        {/* Big Demo Scan Trigger Button */}
        <div className="mt-4 space-y-2">
          <button
            onClick={() => handleTriggerScan(selectedBatch)}
            disabled={isScanning}
            className="w-full btn-game-honey py-3.5 px-4 rounded-2xl font-black text-amber-950 text-base flex items-center justify-center gap-2 shadow-lg"
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>VERIFYING ON BLOCKCHAIN...</span>
              </>
            ) : (
              <>
                <QrCode className="w-5 h-5" />
                <span>SCAN DEMO BATCH ({selectedBatch})</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Alternative Sample Batches Picker */}
      <div className="bg-white rounded-2xl border-3 border-amber-400 p-4 shadow-md space-y-3">
        <div className="text-xs font-black text-amber-950 uppercase tracking-wider">
          Or Select A Demo Bottle To Test:
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              setSelectedBatch('HNY1024');
              handleTriggerScan('HNY1024');
            }}
            className="p-2.5 bg-amber-50 hover:bg-amber-100 active:scale-95 border-2 border-amber-300 rounded-xl text-left transition"
          >
            <div className="text-xs font-black text-amber-950 flex items-center justify-between">
              <span>HNY1024</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">Verified</span>
            </div>
            <div className="text-[11px] text-amber-800">Alpine Wildflower (Current)</div>
          </button>

          <button
            onClick={() => {
              setSelectedBatch('HNY1025');
              handleTriggerScan('HNY1025');
            }}
            className="p-2.5 bg-amber-50 hover:bg-amber-100 active:scale-95 border-2 border-amber-300 rounded-xl text-left transition"
          >
            <div className="text-xs font-black text-amber-950 flex items-center justify-between">
              <span>HNY1025</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">Verified</span>
            </div>
            <div className="text-[11px] text-amber-800">Acacia Spring Bloom</div>
          </button>
        </div>
      </div>
    </div>
  );
};
