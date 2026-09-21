import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { STAGES_LIST, DEMO_BATCH } from '../../data/honeyData';
import { StageId, StageInfo } from '../../types';
import { CuteBee } from './CuteBee';
import { soundManager } from '../../utils/audio';
import { 
  HiveScene, 
  FlowerScene, 
  BeekeeperScene, 
  HarvestScene, 
  ProcessingScene, 
  TransportScene, 
  CustomerScene 
} from './StageIllustrations';
import { 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Check, 
  Link as LinkIcon, 
  RotateCcw,
  Volume2,
  VolumeX,
  Compass,
  FileText
} from 'lucide-react';

interface HoneyWorldMapProps {
  onNavigateToPassport: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const HoneyWorldMap: React.FC<HoneyWorldMapProps> = ({
  onNavigateToPassport,
  soundEnabled,
  onToggleSound
}) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isBeeMoving, setIsBeeMoving] = useState(false);
  const [completedStages, setCompletedStages] = useState<number[]>([0]);

  const currentStage: StageInfo = STAGES_LIST[currentStageIndex];

  // Sound triggers for current stage
  useEffect(() => {
    if (!soundEnabled) return;
    if (currentStage.id === 'hive') {
      soundManager.startBeeBuzz(1.2);
    } else if (currentStage.id === 'flowers') {
      soundManager.playFlowerBirds();
    } else if (currentStage.id === 'harvest') {
      soundManager.playHoneyPour();
    } else if (currentStage.id === 'transport') {
      soundManager.playTruckSound(2);
    } else if (currentStage.id === 'customer') {
      soundManager.playCompletionChime();
    }
  }, [currentStageIndex, soundEnabled, currentStage.id]);

  const goToStage = (targetIndex: number) => {
    if (targetIndex === currentStageIndex || isBeeMoving) return;
    if (targetIndex < 0 || targetIndex >= STAGES_LIST.length) return;

    soundManager.playPop();
    setIsBeeMoving(true);
    // Play buzzing sound during bee flight
    soundManager.startBeeBuzz(1.2);

    setCurrentStageIndex(targetIndex);
    setCompletedStages((prev) => {
      const set = new Set([...prev, targetIndex]);
      return Array.from(set);
    });

    setTimeout(() => {
      setIsBeeMoving(false);
      soundManager.stopBeeBuzz();
    }, 1100);
  };

  const handleNext = () => {
    if (currentStageIndex < STAGES_LIST.length - 1) {
      goToStage(currentStageIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStageIndex > 0) {
      goToStage(currentStageIndex - 1);
    }
  };

  const handleReset = () => {
    soundManager.playPop();
    setIsBeeMoving(true);
    soundManager.startBeeBuzz(0.8);
    setCurrentStageIndex(0);
    setTimeout(() => {
      setIsBeeMoving(false);
      soundManager.stopBeeBuzz();
    }, 900);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Top Header Card */}
      <div className="game-card-wood p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 text-amber-950">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-bounce">🗺️</span>
            <h2 className="text-xl sm:text-2xl font-black font-display tracking-wide text-amber-950">
              HONEY JOURNEY ADVENTURE MAP
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-amber-800 mt-0.5">
            Follow the cute bee from flower foraging to your verified honey jar.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleSound}
            className="p-2.5 bg-amber-200 hover:bg-amber-300 active:scale-95 rounded-xl border-2 border-amber-800 text-amber-950 font-bold transition flex items-center gap-1.5 text-xs"
            title={soundEnabled ? 'Mute Game Sounds' : 'Turn On Game Sounds'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-700" /> : <VolumeX className="w-4 h-4 text-rose-700" />}
            <span>{soundEnabled ? 'Sound ON' : 'Muted'}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2.5 bg-amber-100 hover:bg-amber-200 active:scale-95 rounded-xl border-2 border-amber-700 text-amber-900 font-bold transition flex items-center gap-1 text-xs"
            title="Restart Journey"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Restart</span>
          </button>

          <button
            onClick={onNavigateToPassport}
            className="btn-game-honey px-3.5 py-2 rounded-xl text-amber-950 font-black text-xs flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4" />
            <span>Digital Passport</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-amber-100 border-3 border-amber-700 rounded-2xl p-3 shadow-md">
        <div className="flex items-center justify-between text-xs font-black text-amber-950 mb-1.5">
          <span>PROGRESS: LEVEL 0{currentStageIndex + 1} OF 07</span>
          <span className="text-emerald-700 font-extrabold">
            {Math.round(((currentStageIndex + 1) / STAGES_LIST.length) * 100)}% UNLOCKED ✓
          </span>
        </div>
        <div className="w-full h-4 bg-amber-200 rounded-full border-2 border-amber-800 overflow-hidden relative p-0.5">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-400 rounded-full"
            initial={{ width: '14%' }}
            animate={{ width: `${((currentStageIndex + 1) / STAGES_LIST.length) * 100}%` }}
            transition={{ type: 'spring', stiffness: 80, damping: 15 }}
          />
        </div>
      </div>

      {/* 2D ADVENTURE GAME MAP WORLD */}
      <div className="relative w-full rounded-3xl overflow-hidden border-4 border-amber-800 bg-gradient-to-b from-sky-200 via-amber-100 to-emerald-200 shadow-2xl p-4 sm:p-6 select-none min-h-[360px] sm:min-h-[420px] flex flex-col justify-between">
        
        {/* Soft floating background scenery clouds and trees */}
        <div className="absolute top-4 left-10 text-4xl opacity-50 pointer-events-none">☁️</div>
        <div className="absolute top-8 right-24 text-3xl opacity-40 pointer-events-none">☁️</div>
        <div className="absolute bottom-6 left-12 text-3xl opacity-40 pointer-events-none">🌲</div>
        <div className="absolute bottom-8 right-16 text-3xl opacity-40 pointer-events-none">🌳</div>
        <div className="absolute top-20 left-1/3 text-2xl opacity-30 pointer-events-none">🌼</div>
        <div className="absolute bottom-16 right-1/3 text-2xl opacity-30 pointer-events-none">🌻</div>

        {/* Map Header Overlay */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="bg-amber-950/80 backdrop-blur-xs text-amber-200 px-3.5 py-1.5 rounded-full text-xs font-bold border-2 border-yellow-500 shadow-md flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-yellow-400 animate-spin" />
            <span>BATCH HNY1024 • GOLDEN MEADOW VALLEY</span>
          </div>
          <div className="bg-emerald-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-full border-2 border-emerald-800 shadow">
            Blockchain Verified Network 🔗
          </div>
        </div>

        {/* Map Content - Level Nodes & Path */}
        <div className="relative my-auto py-6 sm:py-8">
          {/* Glowing Path SVG connecting nodes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
            {/* Background Path Glow */}
            <path
              d="M 12 35 C 18 75 22 75 25 70 C 32 60 38 35 42 35 C 48 35 52 75 58 75 C 64 75 68 40 72 40 C 78 40 80 75 84 75 C 88 75 90 40 92 35"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="4 2"
              className="opacity-70 animate-pulse"
            />
            {/* Glowing inner golden line */}
            <path
              d="M 12 35 C 18 75 22 75 25 70 C 32 60 38 35 42 35 C 48 35 52 75 58 75 C 64 75 68 40 72 40 C 78 40 80 75 84 75 C 88 75 90 40 92 35"
              fill="none"
              stroke="#d97706"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Level Nodes Grid */}
          <div className="relative z-10 grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-4 items-center justify-items-center">
            {STAGES_LIST.map((stage, idx) => {
              const isCurrent = idx === currentStageIndex;
              const isCompleted = completedStages.includes(idx);
              const isUnlocked = idx <= currentStageIndex || isCompleted;

              return (
                <div
                  key={stage.id}
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => goToStage(idx)}
                >
                  {/* Stage Level Badge */}
                  <div
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full mb-1 transition-colors border shadow-xs ${
                      isCurrent
                        ? 'bg-amber-950 text-yellow-300 border-yellow-400'
                        : isCompleted
                        ? 'bg-emerald-700 text-emerald-100 border-emerald-900'
                        : 'bg-amber-200 text-amber-900 border-amber-400'
                    }`}
                  >
                    LEVEL 0{stage.levelNumber}
                  </div>

                  {/* Level Circle Button */}
                  <div
                    className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all transform duration-200 group-hover:scale-110 ${
                      isCurrent
                        ? 'btn-game-honey scale-110 ring-4 ring-yellow-300 shadow-xl'
                        : isCompleted
                        ? 'bg-gradient-to-b from-emerald-300 to-emerald-500 border-3 border-emerald-800 text-white shadow-md'
                        : 'bg-gradient-to-b from-amber-100 to-amber-300 border-3 border-amber-700 text-amber-900 shadow-sm opacity-90'
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl">{stage.icon}</span>

                    {/* Checkmark badge */}
                    {isCompleted && !isCurrent && (
                      <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-emerald-600 text-white rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black shadow">
                        ✓
                      </div>
                    )}

                    {/* Active Pulsing Indicator */}
                    {isCurrent && (
                      <div className="absolute -bottom-2 w-3 h-3 bg-amber-950 rounded-full border-2 border-yellow-300 animate-bounce" />
                    )}
                  </div>

                  {/* Level Name */}
                  <span
                    className={`text-[11px] sm:text-xs font-black mt-1.5 text-center leading-tight whitespace-nowrap transition-colors ${
                      isCurrent ? 'text-amber-950 font-black scale-105' : 'text-amber-800'
                    }`}
                  >
                    {stage.shortName}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Animated Bee positioned above current active node */}
          <div className="relative mt-4 flex justify-center">
            <div className="inline-flex items-center gap-3 bg-amber-900/90 backdrop-blur-xs text-amber-100 px-4 py-2 rounded-2xl border-2 border-yellow-400 shadow-xl">
              <CuteBee size={44} isFlying={true} facing="right" />
              <div>
                <div className="text-xs font-bold text-yellow-300 flex items-center gap-1">
                  <span>Currently at:</span>
                  <span className="font-black text-white">{currentStage.name}</span>
                  {isBeeMoving && <span className="text-[11px] text-yellow-200 animate-pulse">(Bee is buzzing...)</span>}
                </div>
                <div className="text-[11px] text-amber-200">
                  {currentStage.tagline}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Level Navigation Footer */}
        <div className="relative z-10 flex items-center justify-between pt-3 border-t-2 border-amber-400/60">
          <button
            onClick={handlePrev}
            disabled={currentStageIndex === 0 || isBeeMoving}
            className={`btn-game-wood px-4 py-2 rounded-xl text-amber-100 text-xs font-bold flex items-center gap-1 ${
              currentStageIndex === 0 ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>← PREVIOUS LEVEL</span>
          </button>

          <span className="text-xs font-extrabold text-amber-900 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-400">
            Stage {currentStageIndex + 1} of {STAGES_LIST.length}
          </span>

          <button
            onClick={handleNext}
            disabled={currentStageIndex === STAGES_LIST.length - 1 || isBeeMoving}
            className={`btn-game-honey px-5 py-2 rounded-xl text-amber-950 text-xs font-black flex items-center gap-1 ${
              currentStageIndex === STAGES_LIST.length - 1 ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            <span>NEXT LEVEL →</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ACTIVE LEVEL DETAIL VIEW */}
      <div className="game-card p-4 sm:p-6 bg-white space-y-4">
        {/* Stage Title and Level Tag */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-amber-200">
          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-4xl p-2 bg-amber-100 rounded-2xl border-2 border-amber-400">
              {currentStage.icon}
            </span>
            <div>
              <div className="text-xs font-black text-amber-700 tracking-wider">
                LEVEL 0{currentStage.levelNumber} EXPLORATION
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-amber-950 font-display">
                {currentStage.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold border border-amber-400 font-mono">
              Block #{currentStage.blockchainBlock}
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-400 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              Verified
            </span>
          </div>
        </div>

        {/* Dedicated Scene Render per Level */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStage.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {currentStage.id === 'hive' && (
              <div className="space-y-4">
                <HiveScene />
                
                {/* Level 1 Specific Info Cards as requested */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-3 text-center">
                    <div className="text-xs text-amber-700 font-bold">🌡️ Temperature</div>
                    <div className="text-lg font-black text-amber-950 mt-1">{DEMO_BATCH.hive.temperature}</div>
                    <div className="text-[10px] text-emerald-600 font-bold">Optimal Brood Heat</div>
                  </div>
                  <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-3 text-center">
                    <div className="text-xs text-amber-700 font-bold">💧 Humidity</div>
                    <div className="text-lg font-black text-amber-950 mt-1">{DEMO_BATCH.hive.humidity}</div>
                    <div className="text-[10px] text-emerald-600 font-bold">Moisture Balanced</div>
                  </div>
                  <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-3 text-center">
                    <div className="text-xs text-amber-700 font-bold">⚖️ Hive Weight</div>
                    <div className="text-lg font-black text-amber-950 mt-1">{DEMO_BATCH.hive.hiveWeight}</div>
                    <div className="text-[10px] text-emerald-600 font-bold">High Honey Store</div>
                  </div>
                  <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-3 text-center">
                    <div className="text-xs text-amber-700 font-bold">💚 Hive Status</div>
                    <div className="text-lg font-black text-emerald-700 mt-1">{DEMO_BATCH.hive.hiveStatus}</div>
                    <div className="text-[10px] text-emerald-600 font-bold">Queen Active</div>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-amber-100 p-3 rounded-xl border border-amber-300 text-xs text-amber-900 font-medium">
                  <div>📍 <strong>Hive Location:</strong> {DEMO_BATCH.hive.location} ({DEMO_BATCH.hive.coordinates})</div>
                  <button
                    onClick={handleNext}
                    className="btn-game-honey px-4 py-1.5 rounded-lg text-amber-950 font-black text-xs"
                  >
                    NEXT →
                  </button>
                </div>
              </div>
            )}

            {currentStage.id === 'flowers' && (
              <div className="space-y-4">
                <FlowerScene />
                <div className="flex justify-between items-center bg-amber-100 p-3 rounded-xl border border-amber-300 text-xs text-amber-900 font-medium">
                  <div><strong>“This is where the bees collected nectar.”</strong> Botanical variety: Wildflower (45%), Sunflower (35%), Local Clover (20%).</div>
                  <button
                    onClick={handleNext}
                    className="btn-game-honey px-4 py-1.5 rounded-lg text-amber-950 font-black text-xs shrink-0 ml-2"
                  >
                    NEXT →
                  </button>
                </div>
              </div>
            )}

            {currentStage.id === 'beekeeper' && (
              <div className="space-y-4">
                <BeekeeperScene />
                <div className="flex justify-between items-center bg-amber-100 p-3 rounded-xl border border-amber-300 text-xs text-amber-900 font-medium">
                  <div><strong>Inspection:</strong> {DEMO_BATCH.beekeeper.quote}</div>
                  <button
                    onClick={handleNext}
                    className="btn-game-honey px-4 py-1.5 rounded-lg text-amber-950 font-black text-xs shrink-0 ml-2"
                  >
                    NEXT →
                  </button>
                </div>
              </div>
            )}

            {currentStage.id === 'harvest' && (
              <div className="space-y-4">
                <HarvestScene />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold text-amber-900">
                  <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-300">
                    <span className="text-amber-700 block text-[11px]">📅 Harvest Date</span>
                    <span className="font-bold text-amber-950">{DEMO_BATCH.harvest.harvestDate}</span>
                  </div>
                  <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-300">
                    <span className="text-amber-700 block text-[11px]">🍯 Batch ID</span>
                    <span className="font-bold text-amber-950">{DEMO_BATCH.harvest.batchId}</span>
                  </div>
                  <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-300">
                    <span className="text-amber-700 block text-[11px]">⚖️ Quantity</span>
                    <span className="font-bold text-amber-950">{DEMO_BATCH.harvest.quantity}</span>
                  </div>
                  <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-300">
                    <span className="text-amber-700 block text-[11px]">🌸 Flower Source</span>
                    <span className="font-bold text-amber-950">{DEMO_BATCH.harvest.flowerSource}</span>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    className="btn-game-honey px-4 py-1.5 rounded-lg text-amber-950 font-black text-xs"
                  >
                    NEXT →
                  </button>
                </div>
              </div>
            )}

            {currentStage.id === 'processing' && (
              <div className="space-y-4">
                <ProcessingScene />
                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    className="btn-game-honey px-4 py-1.5 rounded-lg text-amber-950 font-black text-xs"
                  >
                    NEXT →
                  </button>
                </div>
              </div>
            )}

            {currentStage.id === 'transport' && (
              <div className="space-y-4">
                <TransportScene />
                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    className="btn-game-honey px-4 py-1.5 rounded-lg text-amber-950 font-black text-xs"
                  >
                    NEXT →
                  </button>
                </div>
              </div>
            )}

            {currentStage.id === 'customer' && (
              <div className="space-y-4">
                <CustomerScene onOpenPassport={onNavigateToPassport} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
