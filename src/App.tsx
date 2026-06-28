import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Tab, Theme } from './types';
import { Background } from './components/Background';
import { Navigation } from './components/Navigation';
import { HomeView } from './components/HomeView';
import { RulesView } from './components/RulesView';
import { AboutView } from './components/AboutView';
import { GameView } from './components/GameView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<Tab>('inicio');
  const [theme, setTheme] = useState<Theme>('dark');

  // Optional: Read theme from localStorage or system preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('falaoupaga_theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('falaoupaga_theme', newTheme);
      return newTheme;
    });
  };

  const handlePlay = () => {
    setCurrentTab('jogo');
  };

  return (
    <div className={`min-h-screen font-sans ${theme === 'dark' ? 'dark text-white' : 'text-gray-900'} transition-colors duration-700 selection:bg-pink-500/30`}>
      <Background theme={theme} />

      <main className="max-w-md md:max-w-[1000px] mx-auto min-h-screen bg-black/20 backdrop-blur-sm md:min-h-0 md:mt-10 md:mb-10 md:rounded-[2.5rem] md:bg-white/10 md:backdrop-blur-xl md:border md:border-white/20 md:shadow-2xl relative overflow-x-hidden">
        <Navigation
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <AnimatePresence mode="wait">
          {currentTab === 'inicio' && (
            <HomeView key="inicio" theme={theme} onPlay={handlePlay} setCurrentTab={setCurrentTab} />
          )}
          {currentTab === 'regras' && (
            <RulesView key="regras" theme={theme} />
          )}
          {currentTab === 'sobre' && (
            <AboutView key="sobre" theme={theme} />
          )}
          {currentTab === 'jogo' && (
            <GameView key="jogo" />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
