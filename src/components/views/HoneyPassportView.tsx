import React, { useState } from 'react';
import { DEMO_BATCH, BLOCKCHAIN_LEDGER } from '../../data/honeyData';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  ExternalLink, 
  Share2, 
  Download, 
  Play, 
  Link as LinkIcon,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface HoneyPassportViewProps {
  onPlayJourney: () => void;
}

export const HoneyPassportView: React.FC<HoneyPassportViewProps> = ({
  onPlayJourney
}) => {
  const [copiedHash, setCopiedHash] = useState(false);
  const [expandedBlock, setExpandedBlock] = useState<number | null>(null);

  const handleCopy = () => {
    soundManager.playPop();
    navigator.clipboard?.writeText(DEMO_BATCH.blockchainContract);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Passport Header Plaque */}
      <div className="game-card-wood p-5 sm:p-7 relative overflow-hidden text-amber-950">
        {/* Subtle decorative stamp watermark */}
        <div className="absolute -right-6 -bottom-6 text-9xl opacity-10 pointer-events-none">
          🍯
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b-2 border-amber-900/40">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-yellow-400 text-amber-950 font-black text-xs px-3 py-1 rounded-full border border-amber-800 shadow-xs mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>OFFICIAL DIGITAL HONEY PASSPORT</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-amber-950 font-display">
              🍯 HONEY PASSPORT
            </h1>
            <p className="text-sm font-bold text-amber-800">
              Batch ID: <span className="font-mono text-amber-950 bg-amber-200 px-2 py-0.5 rounded-md">{DEMO_BATCH.batchId}</span>
            </p>
          </div>

          {/* Blockchain Verified Large Badge */}
          <div className="bg-emerald-600 border-3 border-emerald-950 text-white px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-emerald-400/30 border border-white flex items-center justify-center font-black text-lg">
              ✓
            </div>
            <div>
              <div className="font-black text-xs text-emerald-100 uppercase tracking-wider">Status</div>
              <div className="font-black text-base leading-tight">Blockchain Verified ✓</div>
            </div>
          </div>
        </div>

        {/* Honey Details Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs">
          <div className="bg-amber-100/90 rounded-xl p-2.5 border border-amber-400">
            <span className="text-amber-800 font-semibold block text-[11px]">Product</span>
            <span className="font-black text-amber-950 text-xs">{DEMO_BATCH.productName}</span>
          </div>
          <div className="bg-amber-100/90 rounded-xl p-2.5 border border-amber-400">
            <span className="text-amber-800 font-semibold block text-[11px]">Variety</span>
            <span className="font-black text-amber-950 text-xs">{DEMO_BATCH.variety}</span>
          </div>
          <div className="bg-amber-100/90 rounded-xl p-2.5 border border-amber-400">
            <span className="text-amber-800 font-semibold block text-[11px]">Purity Score</span>
            <span className="font-black text-emerald-800 text-xs">{DEMO_BATCH.purityScore}% Pure Raw</span>
          </div>
          <div className="bg-amber-100/90 rounded-xl p-2.5 border border-amber-400">
            <span className="text-amber-800 font-semibold block text-[11px]">Net Weight</span>
            <span className="font-black text-amber-950 text-xs">{DEMO_BATCH.netWeight}</span>
          </div>
        </div>

        {/* Replay journey callout button */}
        <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-amber-900/20 text-xs">
          <span className="font-bold text-amber-900">
            Experience every step in the 2D interactive adventure game:
          </span>
          <button
            onClick={() => {
              soundManager.playPop();
              onPlayJourney();
            }}
            className="btn-game-honey px-4 py-2 rounded-xl font-black text-amber-950 text-xs flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>PLAY INTERACTIVE JOURNEY</span>
          </button>
        </div>
      </div>

      {/* TWO COLUMN SECTION: VERTICAL TIMELINE & BLOCKCHAIN VISUALIZATION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* COLUMN 1: VERTICAL TIMELINE */}
        <div className="game-card p-5 sm:p-6 bg-white space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b-2 border-amber-200">
            <span className="text-2xl">📜</span>
            <h3 className="text-lg font-black text-amber-950 font-display">
              Verified Journey Timeline
            </h3>
          </div>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-1 before:bg-gradient-to-b before:from-amber-400 before:via-yellow-400 before:to-emerald-500">
            
            {/* 1. Hive */}
            <div className="relative">
              <div className="absolute -left-6 top-0.5 w-6 h-6 rounded-full bg-amber-500 text-white border-2 border-white flex items-center justify-center text-xs font-bold shadow">
                🐝
              </div>
              <div className="bg-amber-50 rounded-xl p-3 border border-amber-300">
                <div className="flex justify-between items-center">
                  <h4 className="font-black text-sm text-amber-950">Hive</h4>
                  <span className="bg-emerald-100 text-emerald-800 font-bold text-[11px] px-2 py-0.5 rounded-full">
                    ✓ Recorded
                  </span>
                </div>
                <p className="text-xs text-amber-800 mt-1">
                  Brood box telemetry: 28°C, 62% humidity, 42kg weight. Healthy colony registered.
                </p>
              </div>
            </div>

            {/* 2. Flower Source */}
            <div className="relative">
              <div className="absolute -left-6 top-0.5 w-6 h-6 rounded-full bg-amber-500 text-white border-2 border-white flex items-center justify-center text-xs font-bold shadow">
                🌸
              </div>
              <div className="bg-amber-50 rounded-xl p-3 border border-amber-300">
                <div className="flex justify-between items-center">
                  <h4 className="font-black text-sm text-amber-950">Flower Source</h4>
                  <span className="bg-emerald-100 text-emerald-800 font-bold text-[11px] px-2 py-0.5 rounded-full">
                    ✓ Recorded
                  </span>
                </div>
                <p className="text-xs text-amber-800 mt-1">
                  Alpine Wildflower (45%), Sunflower (35%), Local Clover (20%). 3.2km organic radius.
                </p>
              </div>
            </div>

            {/* 3. Beekeeper */}
            <div className="relative">
              <div className="absolute -left-6 top-0.5 w-6 h-6 rounded-full bg-amber-500 text-white border-2 border-white flex items-center justify-center text-xs font-bold shadow">
                👨🌾
              </div>
              <div className="bg-amber-50 rounded-xl p-3 border border-amber-300">
                <div className="flex justify-between items-center">
                  <h4 className="font-black text-sm text-amber-950">Beekeeper</h4>
                  <span className="bg-emerald-100 text-emerald-800 font-bold text-[11px] px-2 py-0.5 rounded-full">
                    ✓ Verified
                  </span>
                </div>
                <p className="text-xs text-amber-800 mt-1">
                  Master Apiarist Mateo Vance (BK-9921) certified organic readiness.
                </p>
              </div>
            </div>

            {/* 4. Harvest */}
            <div className="relative">
              <div className="absolute -left-6 top-0.5 w-6 h-6 rounded-full bg-amber-500 text-white border-2 border-white flex items-center justify-center text-xs font-bold shadow">
                🍯
              </div>
              <div className="bg-amber-50 rounded-xl p-3 border border-amber-300">
                <div className="flex justify-between items-center">
                  <h4 className="font-black text-sm text-amber-950">Harvest</h4>
                  <span className="bg-emerald-100 text-emerald-800 font-bold text-[11px] px-2 py-0.5 rounded-full">
                    ✓ Recorded
                  </span>
                </div>
                <p className="text-xs text-amber-800 mt-1">
                  185 kg harvested. Brix tested 82.4° and 16.8% moisture.
                </p>
              </div>
            </div>

            {/* 5. Processing */}
            <div className="relative">
              <div className="absolute -left-6 top-0.5 w-6 h-6 rounded-full bg-amber-500 text-white border-2 border-white flex items-center justify-center text-xs font-bold shadow">
                🏭
              </div>
              <div className="bg-amber-50 rounded-xl p-3 border border-amber-300">
                <div className="flex justify-between items-center">
                  <h4 className="font-black text-sm text-amber-950">Processing</h4>
                  <span className="bg-emerald-100 text-emerald-800 font-bold text-[11px] px-2 py-0.5 rounded-full">
                    ✓ Verified
                  </span>
                </div>
                <p className="text-xs text-amber-800 mt-1">
                  Cold spin & NMR purity scan. Zero adulterants. ISO 22000 certified.
                </p>
              </div>
            </div>

            {/* 6. Transport */}
            <div className="relative">
              <div className="absolute -left-6 top-0.5 w-6 h-6 rounded-full bg-amber-500 text-white border-2 border-white flex items-center justify-center text-xs font-bold shadow">
                🚚
              </div>
              <div className="bg-amber-50 rounded-xl p-3 border border-amber-300">
                <div className="flex justify-between items-center">
                  <h4 className="font-black text-sm text-amber-950">Transport</h4>
                  <span className="bg-emerald-100 text-emerald-800 font-bold text-[11px] px-2 py-0.5 rounded-full">
                    ✓ Recorded
                  </span>
                </div>
                <p className="text-xs text-amber-800 mt-1">
                  GreenRoute EV #88C refrigerated transit with live temperature tracking.
                </p>
              </div>
            </div>

            {/* 7. Customer */}
            <div className="relative">
              <div className="absolute -left-6 top-0.5 w-6 h-6 rounded-full bg-emerald-600 text-white border-2 border-white flex items-center justify-center text-xs font-bold shadow">
                🏠
              </div>
              <div className="bg-emerald-50 rounded-xl p-3 border-2 border-emerald-400">
                <div className="flex justify-between items-center">
                  <h4 className="font-black text-sm text-emerald-950">Customer</h4>
                  <span className="bg-emerald-600 text-white font-extrabold text-[11px] px-2 py-0.5 rounded-full">
                    ✓ Delivered
                  </span>
                </div>
                <p className="text-xs text-emerald-900 mt-1 font-medium">
                  QR scan matched digital passport. Tamper seal intact and authentic.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 2: SIMPLE BLOCKCHAIN VISUALIZATION */}
        <div className="game-card p-5 sm:p-6 bg-white space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b-2 border-amber-200">
              <span className="text-2xl">🔗</span>
              <div>
                <h3 className="text-lg font-black text-amber-950 font-display">
                  Blockchain Visualization
                </h3>
                <p className="text-xs text-amber-800 font-medium">
                  Simple, tamper-proof cryptographic ledger
                </p>
              </div>
            </div>

            {/* Simple Visual Blocks chain */}
            <div className="py-2 space-y-2">
              {/* BLOCK 001 */}
              <div className="bg-amber-50 rounded-xl p-2.5 border-2 border-amber-300 shadow-xs flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono font-black text-amber-700">BLOCK #001</div>
                  <div className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                    <span>🐝 Hive Data</span>
                  </div>
                </div>
                <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[10px] px-2 py-0.5 rounded-full border border-emerald-400">
                  ✓ Verified
                </span>
              </div>

              {/* Connecting Down Arrow */}
              <div className="flex justify-center text-amber-600 font-black text-xs -my-1">
                ↓
              </div>

              {/* BLOCK 002 */}
              <div className="bg-amber-50 rounded-xl p-2.5 border-2 border-amber-300 shadow-xs flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono font-black text-amber-700">BLOCK #002</div>
                  <div className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                    <span>🌸 Flower Source</span>
                  </div>
                </div>
                <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[10px] px-2 py-0.5 rounded-full border border-emerald-400">
                  ✓ Verified
                </span>
              </div>

              {/* Connecting Down Arrow */}
              <div className="flex justify-center text-amber-600 font-black text-xs -my-1">
                ↓
              </div>

              {/* BLOCK 003 */}
              <div className="bg-amber-50 rounded-xl p-2.5 border-2 border-amber-300 shadow-xs flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono font-black text-amber-700">BLOCK #003</div>
                  <div className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                    <span>🍯 Harvest</span>
                  </div>
                </div>
                <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[10px] px-2 py-0.5 rounded-full border border-emerald-400">
                  ✓ Verified
                </span>
              </div>

              {/* Connecting Down Arrow */}
              <div className="flex justify-center text-amber-600 font-black text-xs -my-1">
                ↓
              </div>

              {/* BLOCK 004 */}
              <div className="bg-amber-50 rounded-xl p-2.5 border-2 border-amber-300 shadow-xs flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono font-black text-amber-700">BLOCK #004</div>
                  <div className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                    <span>🏭 Processing</span>
                  </div>
                </div>
                <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[10px] px-2 py-0.5 rounded-full border border-emerald-400">
                  ✓ Verified
                </span>
              </div>

              {/* Connecting Down Arrow */}
              <div className="flex justify-center text-amber-600 font-black text-xs -my-1">
                ↓
              </div>

              {/* BLOCK 005 */}
              <div className="bg-amber-50 rounded-xl p-2.5 border-2 border-amber-300 shadow-xs flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono font-black text-amber-700">BLOCK #005</div>
                  <div className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                    <span>🚚 Transport</span>
                  </div>
                </div>
                <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[10px] px-2 py-0.5 rounded-full border border-emerald-400">
                  ✓ Verified
                </span>
              </div>
            </div>

            {/* Simple Language Explanation Box as explicitly specified */}
            <div className="mt-4 p-3.5 bg-yellow-50 rounded-xl border-2 border-yellow-400 text-xs text-amber-950 font-bold flex items-start gap-2 shadow-xs">
              <span className="text-xl shrink-0">💡</span>
              <p className="leading-relaxed">
                “Blockchain keeps a permanent record of each important step in the honey journey.”
              </p>
            </div>
          </div>

          {/* Cryptographic Contract Info */}
          <div className="bg-amber-100 rounded-xl p-3 border border-amber-300 text-xs space-y-1.5">
            <div className="flex justify-between items-center text-[11px] text-amber-800 font-bold">
              <span>Smart Contract:</span>
              <button
                onClick={handleCopy}
                className="text-amber-900 font-bold underline hover:text-amber-700 cursor-pointer"
              >
                {copiedHash ? '✓ Copied!' : 'Copy Hash'}
              </button>
            </div>
            <div className="font-mono text-[11px] text-amber-950 bg-white/80 p-1.5 rounded border border-amber-300 truncate">
              {DEMO_BATCH.blockchainContract}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
