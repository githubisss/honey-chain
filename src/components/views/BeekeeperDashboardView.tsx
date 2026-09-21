import React, { useState } from 'react';
import { BEEKEEPER_HIVES } from '../../data/honeyData';
import { HiveSensor } from '../../types';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Thermometer, 
  Droplets, 
  Scale, 
  Volume2, 
  PlusCircle, 
  ShieldCheck,
  Activity,
  Sparkles
} from 'lucide-react';
import { soundManager } from '../../utils/audio';

export const BeekeeperDashboardView: React.FC = () => {
  const [selectedHiveId, setSelectedHiveId] = useState<string>('HIVE-03');
  const [hives, setHives] = useState<HiveSensor[]>(BEEKEEPER_HIVES);
  const [inspectionSuccess, setInspectionSuccess] = useState<string | null>(null);

  const currentHive = hives.find((h) => h.id === selectedHiveId) || hives[0];

  const handleSelectHive = (hive: HiveSensor) => {
    soundManager.playPop();
    setSelectedHiveId(hive.id);
    if (hive.id === 'HIVE-03') {
      // higher pitched warning buzz
      soundManager.startBeeBuzz(0.8);
    } else {
      soundManager.startBeeBuzz(0.4);
    }
  };

  const handleResolveWarning = () => {
    soundManager.playCompletionChime();
    setHives((prev) =>
      prev.map((h) =>
        h.id === 'HIVE-03'
          ? {
              ...h,
              status: 'healthy',
              temperature: 28.5,
              humidity: 62,
              soundFrequency: 188,
              soundLabel: 'Calm Queen Humming (188 Hz)',
              alertMessage: undefined
            }
          : h
      )
    );
    setInspectionSuccess('Hive 03 ventilation adjusted & water supplemented. Colony calmed!');
    setTimeout(() => setInspectionSuccess(null), 3500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="game-card-wood p-5 sm:p-6 text-amber-950 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-yellow-300 text-amber-950 font-black text-xs px-3 py-1 rounded-full border border-amber-800 shadow-xs mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CERTIFIED APIARY IOT HUB</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-amber-950 font-display">
            👨🌾 BEEKEEPER DASHBOARD
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-amber-800">
            Monitor real-time colony health telemetry and sign verified blockchain harvest batches.
          </p>
        </div>

        <div className="bg-amber-100 border-2 border-amber-700 rounded-2xl px-4 py-2.5 text-xs text-amber-950 font-bold">
          <div>Beekeeper: <span className="font-black">Mateo Vance (BK-9921)</span></div>
          <div className="text-amber-800">Location: Golden Meadow Valley Apiary</div>
        </div>
      </div>

      {/* Prominent Warning Banner if any hive has warning */}
      {hives.some((h) => h.status === 'warning') && (
        <div className="bg-amber-50 border-3 border-amber-500 rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-amber-950 flex items-center justify-center font-black text-xl shrink-0">
              ⚠️
            </div>
            <div>
              <h3 className="text-base font-black text-amber-950">
                ⚠️ Hive 03 needs attention
              </h3>
              <p className="text-xs font-semibold text-amber-800">
                Elevated internal temperature (34.8°C) and agitated acoustic frequency (260 Hz) detected.
              </p>
            </div>
          </div>

          <button
            onClick={handleResolveWarning}
            className="btn-game-honey px-4 py-2 rounded-xl text-xs font-black text-amber-950 whitespace-nowrap shrink-0"
          >
            🔧 ADJUST VENTILATION & CALM
          </button>
        </div>
      )}

      {/* Inspection feedback toast */}
      {inspectionSuccess && (
        <div className="bg-emerald-100 border-2 border-emerald-500 text-emerald-950 rounded-2xl p-3.5 text-xs font-black flex items-center gap-2 shadow-md">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{inspectionSuccess}</span>
        </div>
      )}

      {/* MAIN CONTENT: MY HIVES LIST + SENSOR TELEMETRY CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COLUMN 1: "MY HIVES" SELECTOR */}
        <div className="game-card p-5 bg-white space-y-3">
          <div className="flex items-center justify-between pb-2 border-b-2 border-amber-200">
            <h3 className="text-lg font-black text-amber-950 font-display">
              My Hives
            </h3>
            <span className="text-xs font-bold text-amber-800">4 Monitored</span>
          </div>

          <div className="space-y-2">
            {hives.map((hive) => {
              const isSelected = hive.id === currentHive.id;
              const isHealthy = hive.status === 'healthy';

              return (
                <div
                  key={hive.id}
                  onClick={() => handleSelectHive(hive)}
                  className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-100 border-amber-700 shadow-md scale-[1.02]'
                      : 'bg-amber-50/70 border-amber-300 hover:bg-amber-100/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">🐝</span>
                    <div>
                      <div className="font-black text-xs text-amber-950">
                        {hive.name.split('—')[0].trim()}
                      </div>
                      <div className="text-[11px] text-amber-800 font-semibold">
                        {hive.name.split('—')[1]?.trim() || 'Brood Box'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 font-black text-xs">
                    {isHealthy ? (
                      <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        🟢 Healthy
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full border border-amber-500">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                        🟡 Check
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick info tip */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-300 text-xs text-amber-900 font-medium">
            💡 Select any hive to view live IoT sensor telemetry below.
          </div>
        </div>

        {/* COLUMN 2 & 3: LIVE SENSOR CARDS FOR SELECTED HIVE */}
        <div className="lg:col-span-2 game-card p-5 bg-white space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-amber-200">
            <div>
              <div className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Live Colony Telemetry
              </div>
              <h3 className="text-xl font-black text-amber-950 font-display">
                {currentHive.name}
              </h3>
            </div>

            <span
              className={`text-xs font-black px-3 py-1 rounded-full border ${
                currentHive.status === 'healthy'
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-400'
                  : 'bg-amber-100 text-amber-900 border-amber-500'
              }`}
            >
              {currentHive.status === 'healthy' ? 'Status: 🟢 Healthy' : 'Status: 🟡 Check Required'}
            </span>
          </div>

          {/* 4 SIMPLE SENSOR CARDS */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            
            {/* 1. Temperature */}
            <div className={`p-4 rounded-2xl border-3 shadow-xs ${
              currentHive.temperature > 32 
                ? 'bg-red-50 border-red-400' 
                : 'bg-amber-50 border-amber-300'
            }`}>
              <div className="flex items-center justify-between text-xs font-bold text-amber-800 mb-1">
                <span>🌡️ Temperature</span>
                <Thermometer className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-950 font-display">
                {currentHive.temperature}°C
              </div>
              <div className="text-[11px] font-semibold mt-1">
                {currentHive.temperature > 32 ? (
                  <span className="text-red-700 font-bold">⚠️ High (+6.6°C elevated)</span>
                ) : (
                  <span className="text-emerald-700 font-bold">✓ Optimal Brood (27-29°C)</span>
                )}
              </div>
            </div>

            {/* 2. Humidity */}
            <div className="p-4 rounded-2xl border-3 border-amber-300 bg-amber-50 shadow-xs">
              <div className="flex items-center justify-between text-xs font-bold text-amber-800 mb-1">
                <span>💧 Humidity</span>
                <Droplets className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-950 font-display">
                {currentHive.humidity}%
              </div>
              <div className="text-[11px] font-semibold mt-1 text-emerald-700">
                ✓ Normal (55-65% target)
              </div>
            </div>

            {/* 3. Weight */}
            <div className="p-4 rounded-2xl border-3 border-amber-300 bg-amber-50 shadow-xs">
              <div className="flex items-center justify-between text-xs font-bold text-amber-800 mb-1">
                <span>⚖️ Hive Weight</span>
                <Scale className="w-4 h-4 text-amber-700" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-950 font-display">
                {currentHive.weight} kg
              </div>
              <div className="text-[11px] font-semibold mt-1 text-amber-800">
                Honey Store: Ready for harvest
              </div>
            </div>

            {/* 4. Hive Sound */}
            <div className={`p-4 rounded-2xl border-3 shadow-xs ${
              currentHive.soundFrequency > 220 
                ? 'bg-amber-100 border-amber-500' 
                : 'bg-amber-50 border-amber-300'
            }`}>
              <div className="flex items-center justify-between text-xs font-bold text-amber-800 mb-1">
                <span>🔊 Hive Sound</span>
                <Volume2 className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-950 font-display">
                {currentHive.soundFrequency} Hz
              </div>
              <div className="text-[11px] font-semibold mt-1 text-amber-900 truncate">
                {currentHive.soundLabel}
              </div>
            </div>
          </div>

          {/* Alert Message Box if present */}
          {currentHive.alertMessage && (
            <div className="p-3 bg-red-50 border-2 border-red-300 rounded-xl text-xs text-red-900 font-semibold flex items-start gap-2">
              <span className="text-lg">⚠️</span>
              <div>
                <strong className="block font-black">Colony Alert:</strong>
                {currentHive.alertMessage}
              </div>
            </div>
          )}

          {/* Actions Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-amber-200 text-xs">
            <span className="text-amber-800 font-semibold">
              Ready to record new harvest on HoneyChain blockchain?
            </span>
            <button
              onClick={() => {
                soundManager.playCompletionChime();
                setInspectionSuccess(`Batch record initialized for ${currentHive.name}!`);
                setTimeout(() => setInspectionSuccess(null), 3000);
              }}
              className="btn-game-honey px-4 py-2 rounded-xl text-xs font-black text-amber-950 flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>RECORD HARVEST BATCH</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
