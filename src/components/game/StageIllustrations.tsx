import React, { useState } from 'react';
import { CuteBee } from './CuteBee';
import { Sparkles, CheckCircle2, ShieldCheck, Thermometer, Droplets, Scale, Activity, HeartHandshake, Truck, MapPin } from 'lucide-react';
import { soundManager } from '../../utils/audio';

// --- STAGE 1: HIVE SCENE ---
export const HiveScene: React.FC = () => {
  return (
    <div className="relative w-full h-80 rounded-2xl bg-gradient-to-b from-sky-300 via-amber-100 to-emerald-200 overflow-hidden border-4 border-amber-500 shadow-inner flex items-center justify-center p-4">
      {/* Sun & Clouds */}
      <div className="absolute top-4 left-6 w-16 h-16 rounded-full bg-yellow-300/80 blur-xs flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-yellow-400 animate-pulse" />
      </div>
      <div className="absolute top-6 right-16 w-24 h-8 bg-white/75 rounded-full blur-xs" />
      <div className="absolute top-10 right-28 w-16 h-7 bg-white/60 rounded-full blur-xs" />

      {/* Tree Branch from top-left */}
      <svg className="absolute -top-4 -left-6 w-64 h-48 pointer-events-none" viewBox="0 0 240 180">
        <path d="M 0 30 Q 120 40 180 90 Q 200 110 230 115" stroke="#78350f" strokeWidth="22" strokeLinecap="round" fill="none" />
        <path d="M 120 45 Q 160 80 170 120" stroke="#78350f" strokeWidth="12" strokeLinecap="round" fill="none" />
        {/* Leaves */}
        <circle cx="110" cy="30" r="28" fill="#16a34a" />
        <circle cx="140" cy="20" r="32" fill="#22c55e" />
        <circle cx="175" cy="45" r="26" fill="#15803d" />
        <circle cx="210" cy="90" r="24" fill="#4ade80" />
      </svg>

      {/* The Big Cartoon Hanging Hive */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative cursor-pointer group" onClick={() => soundManager.startBeeBuzz(1.5)}>
          {/* Hanging Rope */}
          <div className="w-2 h-10 bg-amber-800 mx-auto -mb-2 rounded" />
          
          {/* Hive SVG */}
          <svg width="180" height="200" viewBox="0 0 180 200" className="drop-shadow-2xl transition-transform transform group-hover:scale-105">
            <defs>
              <linearGradient id="hiveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="40%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
            </defs>
            {/* Layers */}
            <ellipse cx="90" cy="40" rx="42" ry="24" fill="url(#hiveGrad)" stroke="#78350f" strokeWidth="4" />
            <ellipse cx="90" cy="70" rx="64" ry="28" fill="url(#hiveGrad)" stroke="#78350f" strokeWidth="4" />
            <ellipse cx="90" cy="105" rx="76" ry="32" fill="url(#hiveGrad)" stroke="#78350f" strokeWidth="4" />
            <ellipse cx="90" cy="140" rx="68" ry="30" fill="url(#hiveGrad)" stroke="#78350f" strokeWidth="4" />
            <ellipse cx="90" cy="170" rx="45" ry="22" fill="url(#hiveGrad)" stroke="#78350f" strokeWidth="4" />
            
            {/* Entrance Hole */}
            <ellipse cx="90" cy="115" rx="22" ry="20" fill="#451a03" stroke="#291002" strokeWidth="3" />
            
            {/* Honey drips */}
            <path d="M 60 145 C 60 155 68 155 68 145 Z" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />
            <path d="M 120 142 C 120 158 130 158 130 142 Z" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />
          </svg>

          {/* Bee emerging from hole */}
          <div className="absolute top-24 left-16 animate-bounce pointer-events-none">
            <CuteBee size={44} facing="right" />
          </div>
        </div>

        {/* Small floating bees */}
        <div className="absolute -left-16 top-10 animate-float">
          <CuteBee size={36} facing="right" />
        </div>
        <div className="absolute -right-16 top-28 animate-float" style={{ animationDelay: '1s' }}>
          <CuteBee size={40} facing="left" />
        </div>
      </div>

      {/* Meadow Grass at bottom */}
      <div className="absolute -bottom-3 left-0 right-0 h-16 bg-emerald-500 rounded-t-3xl border-t-4 border-emerald-700 flex items-center justify-around px-4">
        <span className="text-xl">🌼</span>
        <span className="text-xl">🌸</span>
        <span className="text-xl">🌺</span>
        <span className="text-xl">🌻</span>
        <span className="text-xl">🌼</span>
      </div>

      {/* IoT Smart Tag Badge */}
      <div className="absolute top-4 right-4 bg-amber-900/90 text-amber-100 text-xs font-bold px-3 py-1.5 rounded-full border-2 border-yellow-400 flex items-center gap-1.5 shadow-md">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        IoT Telemetry Active
      </div>
    </div>
  );
};

// --- STAGE 2: FLOWER FIELD SCENE ---
export const FlowerScene: React.FC = () => {
  const [nectarCount, setNectarCount] = useState(12);
  const [lastClickedFlower, setLastClickedFlower] = useState<string | null>(null);

  const handleFlowerClick = (name: string) => {
    setNectarCount((prev) => prev + 1);
    setLastClickedFlower(name);
    soundManager.playFlowerBirds();
    setTimeout(() => setLastClickedFlower(null), 1200);
  };

  return (
    <div className="relative w-full h-80 rounded-2xl bg-gradient-to-b from-sky-400 via-sky-200 to-emerald-200 overflow-hidden border-4 border-emerald-500 shadow-inner p-4 flex flex-col justify-between">
      {/* Header Info */}
      <div className="flex justify-between items-center z-10">
        <div className="bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full border-2 border-amber-400 text-xs font-bold text-amber-900 flex items-center gap-2">
          <span>🌸 3.2km Organic Foraging Sanctuary</span>
        </div>
        <div className="bg-amber-500 text-white font-extrabold px-3 py-1.5 rounded-full border-2 border-amber-700 flex items-center gap-1.5 shadow">
          <Sparkles className="w-4 h-4 text-yellow-200" />
          <span>Nectar Stored: {nectarCount} Drops</span>
        </div>
      </div>

      {/* Big Bee Flying Between Flowers */}
      <div className="relative z-10 flex justify-center items-center py-4">
        <div className="relative animate-float">
          <CuteBee size={88} hasHoneyBucket={true} facing="right" />
          {lastClickedFlower && (
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-yellow-400 text-amber-950 font-bold px-3 py-0.5 rounded-full text-xs shadow-lg animate-bounce border border-yellow-600 whitespace-nowrap">
              +1 Nectar from {lastClickedFlower}! ✨
            </div>
          )}
        </div>
      </div>

      {/* Interactive Flowers Row */}
      <div className="relative z-10 bg-emerald-600/90 backdrop-blur-xs rounded-2xl border-4 border-emerald-800 p-3 shadow-lg">
        <p className="text-center text-xs font-bold text-emerald-100 mb-2">
          👇 Click flowers to help the bee collect authentic nectar!
        </p>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleFlowerClick('Alpine Wildflower')}
            className="flex flex-col items-center p-2 bg-amber-100 hover:bg-yellow-200 active:scale-95 rounded-xl border-2 border-amber-400 transition"
          >
            <span className="text-3xl animate-pulse">🌸</span>
            <span className="font-bold text-xs text-amber-950 mt-1">Wildflower</span>
            <span className="text-[10px] text-amber-700 font-semibold">45% Origin</span>
          </button>
          
          <button
            onClick={() => handleFlowerClick('Sunflowers')}
            className="flex flex-col items-center p-2 bg-amber-100 hover:bg-yellow-200 active:scale-95 rounded-xl border-2 border-amber-400 transition"
          >
            <span className="text-3xl animate-pulse" style={{ animationDelay: '0.3s' }}>🌻</span>
            <span className="font-bold text-xs text-amber-950 mt-1">Sunflower</span>
            <span className="text-[10px] text-amber-700 font-semibold">35% Origin</span>
          </button>

          <button
            onClick={() => handleFlowerClick('Sweet Clover')}
            className="flex flex-col items-center p-2 bg-amber-100 hover:bg-yellow-200 active:scale-95 rounded-xl border-2 border-amber-400 transition"
          >
            <span className="text-3xl animate-pulse" style={{ animationDelay: '0.6s' }}>🌺</span>
            <span className="font-bold text-xs text-amber-950 mt-1">White Clover</span>
            <span className="text-[10px] text-amber-700 font-semibold">20% Origin</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// --- STAGE 3: BEEKEEPER SCENE ---
export const BeekeeperScene: React.FC = () => {
  return (
    <div className="relative w-full h-80 rounded-2xl bg-gradient-to-b from-sky-200 via-amber-50 to-amber-200 overflow-hidden border-4 border-yellow-600 shadow-inner p-4 flex items-center justify-between">
      {/* Left: Beekeeper Character Illustration */}
      <div className="relative z-10 flex flex-col items-center pl-4">
        {/* Beekeeper SVG */}
        <div className="relative w-40 h-52">
          {/* Hat / Veil */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-10 bg-amber-100 rounded-t-full border-3 border-amber-800 shadow" />
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-36 h-4 bg-amber-800 rounded-full" />
          {/* Veil mesh */}
          <div className="absolute top-14 left-1/2 -translate-x-1/2 w-24 h-16 bg-white/70 border-2 border-dashed border-amber-400 rounded-b-xl flex items-center justify-center">
            {/* Friendly smiling face */}
            <div className="text-center">
              <span className="text-2xl">😊</span>
              <div className="text-[10px] font-bold text-amber-950">Mateo</div>
            </div>
          </div>
          {/* Bee Suit Body */}
          <div className="absolute top-28 left-1/2 -translate-x-1/2 w-28 h-20 bg-amber-50 border-3 border-amber-700 rounded-2xl flex flex-col items-center justify-center shadow-md">
            <span className="text-xs font-black text-amber-900">HONEYCHAIN</span>
            <span className="text-[10px] font-bold text-amber-700">BK-9921</span>
            <ShieldCheck className="w-5 h-5 text-emerald-600 mt-1" />
          </div>
          {/* Wooden Honey Frame in Hands */}
          <div className="absolute top-36 -right-2 w-20 h-14 bg-amber-300 border-3 border-amber-800 rounded flex items-center justify-center shadow rotate-12">
            <div className="text-center">
              <span className="text-xs">🍯</span>
              <div className="text-[9px] font-bold text-amber-950">100% Capped</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Verification Certificate Plaque */}
      <div className="relative z-10 flex-1 max-w-xs bg-white/95 rounded-2xl border-3 border-amber-500 p-4 shadow-xl ml-4">
        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-amber-200">
          <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-500 flex items-center justify-center text-emerald-700 font-bold text-lg">
            ✓
          </div>
          <div>
            <h4 className="font-black text-sm text-amber-950 leading-tight">Master Apiarist Certified</h4>
            <p className="text-[11px] text-amber-700 font-semibold">Registered on Blockchain</p>
          </div>
        </div>

        <div className="space-y-1.5 text-xs text-amber-900 font-medium">
          <div className="flex justify-between">
            <span className="text-amber-700">Beekeeper ID:</span>
            <span className="font-bold">BK-9921 (Mateo Vance)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-amber-700">Farm:</span>
            <span className="font-bold">Golden Meadow Farm</span>
          </div>
          <div className="flex justify-between">
            <span className="text-amber-700">Inspection Date:</span>
            <span className="font-bold">Aug 24, 2026</span>
          </div>
          <div className="flex justify-between">
            <span className="text-amber-700">Status:</span>
            <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Verified ✓
            </span>
          </div>
        </div>

        <div className="mt-3 p-2 bg-amber-50 rounded-xl border border-amber-300 text-[11px] text-amber-800 italic">
          “The beekeeper registered this honey batch in HoneyChain with cryptographic signature.”
        </div>
      </div>
    </div>
  );
};

// --- STAGE 4: HARVEST SCENE ---
export const HarvestScene: React.FC = () => {
  return (
    <div className="relative w-full h-80 rounded-2xl bg-gradient-to-b from-amber-100 via-amber-200 to-amber-300 overflow-hidden border-4 border-amber-600 shadow-inner p-4 flex flex-col justify-between">
      {/* Top Banner */}
      <div className="flex justify-between items-center z-10">
        <div className="bg-amber-900 text-amber-100 font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1.5 shadow">
          <span>🔗 Batch HNY1024 Harvest Record</span>
        </div>
        <div className="bg-yellow-400 text-amber-950 text-xs font-extrabold px-3 py-1 rounded-full border-2 border-amber-700 shadow">
          Brix: 82.4° (Premium Density)
        </div>
      </div>

      {/* Animated Honey Extractor & Flowing Liquid */}
      <div className="relative z-10 flex items-center justify-center gap-8 py-2">
        {/* Honeycomb Frame */}
        <div className="w-28 h-36 bg-amber-400 rounded-xl border-4 border-amber-800 p-2 shadow-lg flex flex-col justify-between">
          <div className="text-[10px] font-black text-amber-950 text-center uppercase tracking-wider">Capped Frame</div>
          {/* Hex pattern */}
          <div className="grid grid-cols-4 gap-1 text-center text-sm">
            <span>⬡</span><span>⬡</span><span>⬡</span><span>⬡</span>
            <span>⬢</span><span>⬢</span><span>⬢</span><span>⬢</span>
            <span>⬡</span><span>⬡</span><span>⬡</span><span>⬡</span>
          </div>
          <div className="text-[9px] font-bold text-emerald-800 bg-emerald-100 rounded text-center py-0.5">Cold Uncapped</div>
        </div>

        {/* Honey Stream SVG */}
        <div className="flex flex-col items-center">
          <div className="text-2xl animate-bounce">🍯</div>
          <svg width="24" height="60" viewBox="0 0 24 60">
            <path
              d="M 12 0 Q 8 20 12 40 Q 16 50 12 60"
              stroke="#f59e0b"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
              className="animate-pulse"
            />
          </svg>
          <div className="w-16 h-5 bg-amber-500 rounded-full blur-xs" />
        </div>

        {/* Pure Honey Glass Jar */}
        <div className="relative w-28 h-40 bg-white/70 backdrop-blur-xs rounded-2xl border-4 border-amber-700 p-2 shadow-2xl flex flex-col justify-between items-center">
          {/* Wooden Lid */}
          <div className="w-24 h-5 bg-amber-900 rounded-md border-2 border-amber-950 shadow" />
          {/* Amber Honey Fluid */}
          <div className="w-full flex-1 bg-gradient-to-t from-amber-600 via-amber-500 to-yellow-400 rounded-b-xl my-1 p-1.5 flex flex-col justify-end items-center border border-amber-600">
            <div className="bg-white/90 rounded px-1.5 py-0.5 text-[10px] font-black text-amber-950 shadow mb-1">
              HNY1024
            </div>
          </div>
          <div className="text-[9px] font-bold text-amber-900">185 kg Yield</div>
        </div>
      </div>

      {/* Blockchain recorded message */}
      <div className="relative z-10 bg-amber-950/90 text-amber-100 rounded-xl p-2.5 flex items-center justify-between border-2 border-yellow-500 shadow">
        <div className="flex items-center gap-2">
          <span className="text-xl">🔗</span>
          <div>
            <div className="font-bold text-xs text-yellow-300">Harvest information recorded on the blockchain</div>
            <div className="text-[10px] text-amber-300 font-mono">Block #1048204 • TX: 0x1b5f...99d2</div>
          </div>
        </div>
        <span className="bg-emerald-500 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full">
          Verified ✓
        </span>
      </div>
    </div>
  );
};

// --- STAGE 5: PROCESSING SCENE ---
export const ProcessingScene: React.FC = () => {
  return (
    <div className="relative w-full h-80 rounded-2xl bg-gradient-to-b from-slate-100 via-amber-50 to-blue-50 overflow-hidden border-4 border-blue-500 shadow-inner p-4 flex flex-col justify-between">
      {/* Facility Header */}
      <div className="flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏭</span>
          <div>
            <h4 className="font-black text-sm text-slate-900">Processing & Quality Check</h4>
            <p className="text-[11px] text-slate-500 font-semibold">Cleanroom Lab Facility #FAC-SWISS-04</p>
          </div>
        </div>
        <span className="bg-blue-600 text-white font-bold text-xs px-3 py-1 rounded-full shadow">
          ISO 22000 Certified
        </span>
      </div>

      {/* Checklist Grid */}
      <div className="grid grid-cols-2 gap-2 z-10 my-1">
        <div className="flex items-center gap-2 bg-emerald-50 border-2 border-emerald-400 p-2 rounded-xl">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs font-bold text-emerald-950">Quality Checked</span>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border-2 border-emerald-400 p-2 rounded-xl">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs font-bold text-emerald-950">Batch Registered</span>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border-2 border-emerald-400 p-2 rounded-xl">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs font-bold text-emerald-950">Processing Recorded</span>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border-2 border-emerald-400 p-2 rounded-xl">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="text-xs font-bold text-emerald-950">No Record Changes</span>
        </div>
      </div>

      {/* Blockchain Timeline Graphic */}
      <div className="relative z-10 bg-white rounded-xl p-2.5 border-2 border-blue-300 shadow">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1 text-center">
          Blockchain Timeline
        </div>
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 px-2">
          <div className="flex items-center gap-1 text-amber-600">
            <span>🍯 Harvest</span>
          </div>
          <span className="text-blue-400 font-black">→</span>
          <div className="flex items-center gap-1 text-blue-600">
            <span>⚙️ Processing</span>
          </div>
          <span className="text-blue-400 font-black">→</span>
          <div className="flex items-center gap-1 text-emerald-600">
            <span>🔬 Quality Check</span>
          </div>
          <span className="text-blue-400 font-black">→</span>
          <div className="flex items-center gap-1 text-purple-600">
            <span>📦 Packaging</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- STAGE 6: TRANSPORT SCENE ---
export const TransportScene: React.FC = () => {
  return (
    <div className="relative w-full h-80 rounded-2xl bg-gradient-to-b from-sky-300 via-sky-100 to-emerald-200 overflow-hidden border-4 border-emerald-600 shadow-inner p-4 flex flex-col justify-between">
      {/* Road & Clouds Atmosphere */}
      <div className="flex justify-between items-center z-10">
        <div className="bg-emerald-900 text-white font-extrabold text-xs px-3 py-1 rounded-full flex items-center gap-1.5 shadow">
          <Truck className="w-4 h-4" />
          <span>Honey is on the way! 🚚</span>
        </div>
        <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500">
          Status: Delivered ✓
        </span>
      </div>

      {/* Animated Electric Delivery Truck along Road */}
      <div className="relative z-10 my-auto">
        <div className="w-full h-10 bg-slate-700 rounded-lg relative border-b-4 border-slate-900 flex items-center">
          {/* Road markings */}
          <div className="w-full border-t-2 border-dashed border-yellow-300" />
          
          {/* Animated Delivery Truck */}
          <div className="absolute -top-12 left-1/4 animate-bounce flex items-center">
            {/* Truck SVG */}
            <div className="relative bg-emerald-600 border-3 border-emerald-950 rounded-xl px-4 py-2 text-white shadow-xl flex items-center gap-2">
              <span className="text-2xl">🍯</span>
              <div className="text-[10px] font-black leading-tight">
                <div>GREEN ROUTE</div>
                <div className="text-yellow-300">EV-TRUCK-88C</div>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-300 animate-ping ml-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Route Cards */}
      <div className="relative z-10 bg-white/95 rounded-xl p-3 border-2 border-emerald-400 shadow grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-[10px] text-slate-500 font-semibold">From</div>
            <div className="font-bold text-slate-900">Beekeeper Farm</div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-[10px] text-slate-500 font-semibold">To</div>
            <div className="font-bold text-slate-900">Distribution Center & Doorstep</div>
          </div>
        </div>
        <div className="text-slate-600 col-span-2 pt-1 border-t border-slate-200 flex justify-between font-medium">
          <span>📅 Dispatch: Sep 02, 2026</span>
          <span className="text-emerald-700 font-bold">Cold Chain: 19°C Maintained</span>
        </div>
      </div>
    </div>
  );
};

// --- STAGE 7: YOUR HONEY / CUSTOMER SCENE ---
export const CustomerScene: React.FC<{ onOpenPassport?: () => void }> = ({ onOpenPassport }) => {
  return (
    <div className="relative w-full min-h-80 rounded-2xl bg-gradient-to-b from-amber-100 via-yellow-100 to-amber-200 overflow-hidden border-4 border-amber-500 shadow-2xl p-4 flex flex-col justify-between">
      {/* Title */}
      <div className="text-center z-10">
        <h3 className="text-2xl sm:text-3xl font-black text-amber-950 tracking-wide font-display">
          🍯 YOUR HONEY HAS ARRIVED!
        </h3>
        <p className="text-xs sm:text-sm font-semibold text-amber-800 mt-1">
          The complete verified journey from pristine Alpine hives to your kitchen table.
        </p>
      </div>

      {/* Verified Journey Badges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 z-10 my-3">
        <div className="bg-white/90 border-2 border-amber-400 rounded-xl p-2 text-center shadow-xs">
          <span className="text-xl">🐝</span>
          <div className="text-xs font-black text-amber-950">Hive ✓</div>
          <div className="text-[10px] text-emerald-600 font-bold">Brood 28°C</div>
        </div>
        <div className="bg-white/90 border-2 border-amber-400 rounded-xl p-2 text-center shadow-xs">
          <span className="text-xl">🌸</span>
          <div className="text-xs font-black text-amber-950">Flowers ✓</div>
          <div className="text-[10px] text-emerald-600 font-bold">Wild & Sun</div>
        </div>
        <div className="bg-white/90 border-2 border-amber-400 rounded-xl p-2 text-center shadow-xs">
          <span className="text-xl">👨🌾</span>
          <div className="text-xs font-black text-amber-950">Beekeeper ✓</div>
          <div className="text-[10px] text-emerald-600 font-bold">Mateo BK-9921</div>
        </div>
        <div className="bg-white/90 border-2 border-amber-400 rounded-xl p-2 text-center shadow-xs">
          <span className="text-xl">🍯</span>
          <div className="text-xs font-black text-amber-950">Harvest ✓</div>
          <div className="text-[10px] text-emerald-600 font-bold">Brix 82.4°</div>
        </div>
      </div>

      {/* Additional 3 tags */}
      <div className="grid grid-cols-3 gap-2 z-10 mb-3">
        <div className="bg-white/90 border-2 border-amber-400 rounded-xl p-2 text-center shadow-xs">
          <span className="text-xl">🏭</span>
          <div className="text-xs font-black text-amber-950">Processing ✓</div>
        </div>
        <div className="bg-white/90 border-2 border-amber-400 rounded-xl p-2 text-center shadow-xs">
          <span className="text-xl">🚚</span>
          <div className="text-xs font-black text-amber-950">Transport ✓</div>
        </div>
        <div className="bg-white/90 border-2 border-amber-400 rounded-xl p-2 text-center shadow-xs">
          <span className="text-xl">🏠</span>
          <div className="text-xs font-black text-amber-950">Customer ✓</div>
        </div>
      </div>

      {/* Large Verified Honey Card */}
      <div className="relative z-10 bg-white rounded-2xl border-4 border-amber-500 p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-amber-500 border-3 border-amber-700 flex items-center justify-center text-white shadow-md text-2xl">
            🔐
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 font-extrabold text-xs px-2.5 py-0.5 rounded-full border border-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              VERIFIED HONEY PASSPORT
            </div>
            <h4 className="text-lg font-black text-amber-950 mt-0.5">Batch ID: HNY1024</h4>
            <p className="text-xs text-amber-800 font-medium">
              “This honey's journey has been permanently recorded and verified on the blockchain.”
            </p>
          </div>
        </div>

        {onOpenPassport && (
          <button
            onClick={onOpenPassport}
            className="btn-game-honey px-5 py-2.5 rounded-xl font-black text-amber-950 text-sm whitespace-nowrap"
          >
            📜 VIEW DIGITAL PASSPORT
          </button>
        )}
      </div>
    </div>
  );
};
