import React, { useState } from 'react';
import { CuteBee } from '../game/CuteBee';
import { 
  Play, 
  QrCode, 
  FileText, 
  LayoutDashboard, 
  Home, 
  Volume2, 
  VolumeX, 
  Menu, 
  X,
  Compass
} from 'lucide-react';
import { soundManager } from '../../utils/audio';

export type NavTab = 'home' | 'journey' | 'scanner' | 'passport' | 'dashboard';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  soundEnabled,
  onToggleSound
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabClick = (tab: NavTab) => {
    soundManager.playPop();
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-amber-100/90 backdrop-blur-md border-b-4 border-amber-800 shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleTabClick('home')}
          className="flex items-center gap-2 cursor-pointer group select-none"
        >
          <div className="relative">
            <CuteBee size={44} facing="right" isFlying={true} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-amber-950 font-display group-hover:text-amber-700 transition">
                🍯 HONEYCHAIN
              </span>
            </div>
            <div className="text-[10px] font-bold text-amber-800 tracking-wide uppercase hidden sm:block">
              Follow The Honey
            </div>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1.5">
          <button
            onClick={() => handleTabClick('home')}
            className={`px-3 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeTab === 'home'
                ? 'bg-amber-950 text-yellow-300 shadow-sm'
                : 'text-amber-900 hover:bg-amber-200/80'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>

          <button
            onClick={() => handleTabClick('journey')}
            className={`px-3 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeTab === 'journey'
                ? 'bg-amber-950 text-yellow-300 shadow-sm'
                : 'text-amber-900 hover:bg-amber-200/80'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Honey Journey</span>
          </button>

          <button
            onClick={() => handleTabClick('scanner')}
            className={`px-3 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeTab === 'scanner'
                ? 'bg-amber-950 text-yellow-300 shadow-sm'
                : 'text-amber-900 hover:bg-amber-200/80'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Scan QR</span>
          </button>

          <button
            onClick={() => handleTabClick('passport')}
            className={`px-3 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeTab === 'passport'
                ? 'bg-amber-950 text-yellow-300 shadow-sm'
                : 'text-amber-900 hover:bg-amber-200/80'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Honey Passport</span>
          </button>

          <button
            onClick={() => handleTabClick('dashboard')}
            className={`px-3 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeTab === 'dashboard'
                ? 'bg-amber-950 text-yellow-300 shadow-sm'
                : 'text-amber-900 hover:bg-amber-200/80'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Beekeeper Dashboard</span>
          </button>
        </nav>

        {/* Right Controls: Sound Toggle & Play Button */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-amber-200 hover:bg-amber-300 active:scale-95 border-2 border-amber-800 text-amber-950 font-bold transition flex items-center gap-1 text-xs"
            title={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-800" />
            ) : (
              <VolumeX className="w-4 h-4 text-rose-700" />
            )}
            <span className="hidden sm:inline font-black">
              {soundEnabled ? 'Sound ON' : 'Muted'}
            </span>
          </button>

          {/* Quick Play Button on Nav as explicitly requested */}
          <button
            onClick={() => handleTabClick('journey')}
            className="btn-game-honey px-3.5 sm:px-4 py-2 rounded-xl font-black text-amber-950 text-xs flex items-center gap-1.5 shadow-md"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>PLAY</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-amber-200 text-amber-950 border-2 border-amber-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-amber-100 border-t-2 border-amber-300 p-4 space-y-2 shadow-xl">
          <button
            onClick={() => handleTabClick('home')}
            className="w-full text-left px-3 py-2.5 rounded-xl font-black text-amber-950 bg-amber-50 border border-amber-300 flex items-center gap-2 text-xs"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>
          <button
            onClick={() => handleTabClick('journey')}
            className="w-full text-left px-3 py-2.5 rounded-xl font-black text-amber-950 bg-amber-50 border border-amber-300 flex items-center gap-2 text-xs"
          >
            <Compass className="w-4 h-4" />
            <span>Honey Journey (Game Map)</span>
          </button>
          <button
            onClick={() => handleTabClick('scanner')}
            className="w-full text-left px-3 py-2.5 rounded-xl font-black text-amber-950 bg-amber-50 border border-amber-300 flex items-center gap-2 text-xs"
          >
            <QrCode className="w-4 h-4" />
            <span>Scan QR</span>
          </button>
          <button
            onClick={() => handleTabClick('passport')}
            className="w-full text-left px-3 py-2.5 rounded-xl font-black text-amber-950 bg-amber-50 border border-amber-300 flex items-center gap-2 text-xs"
          >
            <FileText className="w-4 h-4" />
            <span>Honey Passport</span>
          </button>
          <button
            onClick={() => handleTabClick('dashboard')}
            className="w-full text-left px-3 py-2.5 rounded-xl font-black text-amber-950 bg-amber-50 border border-amber-300 flex items-center gap-2 text-xs"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Beekeeper Dashboard</span>
          </button>
        </div>
      )}
    </header>
  );
};
