/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/layout/Navbar';
import { HomeView } from './components/views/HomeView';
import { HoneyWorldMap } from './components/game/HoneyWorldMap';
import { QrScannerView } from './components/views/QrScannerView';
import { HoneyPassportView } from './components/views/HoneyPassportView';
import { BeekeeperDashboardView } from './components/views/BeekeeperDashboardView';
import { soundManager } from './utils/audio';
import { Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(!soundManager.getIsMuted());

  // Listen for initial user gesture to ensure Web Audio is unlocked
  useEffect(() => {
    const handleFirstGesture = () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
    window.addEventListener('click', handleFirstGesture);
    window.addEventListener('keydown', handleFirstGesture);
    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, []);

  const handleToggleSound = () => {
    const newEnabled = soundManager.toggleMute();
    setSoundEnabled(newEnabled);
    if (newEnabled) {
      soundManager.playPop();
    }
  };

  return (
    <div className="min-h-screen bg-honeycomb flex flex-col font-body selection:bg-yellow-300 selection:text-amber-950">
      {/* Top Game Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main View Switcher */}
      <main className="flex-1 pb-10">
        {activeTab === 'home' && (
          <HomeView
            onPlayJourney={() => setActiveTab('journey')}
            onScanQr={() => setActiveTab('scanner')}
            onOpenPassport={() => setActiveTab('passport')}
          />
        )}

        {activeTab === 'journey' && (
          <HoneyWorldMap
            onNavigateToPassport={() => setActiveTab('passport')}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
          />
        )}

        {activeTab === 'scanner' && (
          <QrScannerView
            onScanComplete={(batchId) => {
              setActiveTab('passport');
            }}
            onBackToHome={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'passport' && (
          <HoneyPassportView
            onPlayJourney={() => setActiveTab('journey')}
          />
        )}

        {activeTab === 'dashboard' && (
          <BeekeeperDashboardView />
        )}
      </main>

      {/* Game Footer */}
      <footer className="bg-amber-950 text-amber-200 py-6 border-t-4 border-yellow-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-xl">🍯</span>
            <div>
              <span className="font-black text-white font-display text-sm tracking-wide">
                HONEYCHAIN
              </span>
              <span className="text-amber-400 font-semibold ml-2">
                • Follow the Bee. Discover the Honey.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 font-semibold text-amber-300">
            <button
              onClick={() => setActiveTab('journey')}
              className="hover:text-white transition"
            >
              2D Game Journey
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('scanner')}
              className="hover:text-white transition"
            >
              Bottle QR Scanner
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="hover:text-white transition"
            >
              Beekeeper Portal
            </button>
          </div>

          <div className="text-amber-400 font-mono text-[11px] text-center sm:text-right">
            Blockchain Verified Honey Passport • Batch #HNY1024
          </div>
        </div>
      </footer>
    </div>
  );
}
