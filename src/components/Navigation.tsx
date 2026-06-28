import { Tab, Theme } from '../types';
import { motion } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';
import { toggleSound, getSoundEnabled, playClickSound } from '../audio';
import { useState, useEffect } from 'react';

interface NavigationProps {
  currentTab: Tab;
  setCurrentTab: (tab: Tab) => void;
  theme: Theme;
  toggleTheme: () => void;
}

export function Navigation({ currentTab, setCurrentTab, theme, toggleTheme }: NavigationProps) {
  const [isSoundOn, setIsSoundOn] = useState(true);

  useEffect(() => {
    setIsSoundOn(getSoundEnabled());
  }, []);

  const handleToggleSound = () => {
    const newState = toggleSound();
    setIsSoundOn(newState);
    playClickSound();
  };

  const handleTabClick = (tabId: Tab) => {
    playClickSound();
    setCurrentTab(tabId);
  };

  const handleToggleTheme = () => {
    playClickSound();
    toggleTheme();
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'inicio', label: 'Início' },
    { id: 'regras', label: 'Regras' },
    { id: 'sobre', label: 'Sobre' },
  ];

  return (
    <nav className="fixed md:sticky top-6 md:top-6 left-0 right-0 md:left-auto md:right-auto z-50 flex justify-center px-4 md:mb-[-2rem]">
      <div className="flex items-center gap-2 max-w-sm md:max-w-lg w-full">
        <div className="flex-1 flex items-center bg-white/10 backdrop-blur-md rounded-full p-1 shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-white/20">
          {tabs.map((tab) => {
            // Se estiver no jogo, as abas continuam aparecendo, mas o Início fica "ativo" para voltar
            const isActive = currentTab === tab.id || (currentTab === 'jogo' && tab.id === 'inicio');
            
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`relative flex-1 py-2 text-sm font-medium rounded-full transition-colors ${
                  isActive ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-white/20 rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleToggleSound}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Toggle sound"
            title="Alternar som"
          >
            {isSoundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          
          <button
            onClick={handleToggleTheme}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Toggle theme"
            title="Alternar tema"
          >
            <img src={theme === 'light' ? `${import.meta.env.BASE_URL}pngs/dark room.png` : `${import.meta.env.BASE_URL}pngs/light room.png`} alt="Theme" className="w-6 h-6 object-contain drop-shadow-sm" />
          </button>
        </div>
      </div>
    </nav>
  );
}
