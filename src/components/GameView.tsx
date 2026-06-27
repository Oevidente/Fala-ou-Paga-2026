import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../types';
import { mainDeck, challengeDeck } from '../data';
import { PlayingCard } from './PlayingCard';

export function GameView() {
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  
  const [availableMainCards, setAvailableMainCards] = useState<Card[]>([...mainDeck]);
  const [availableChallengeCards, setAvailableChallengeCards] = useState<Card[]>([...challengeDeck]);

  const drawMainCard = () => {
    let pool = availableMainCards;
    if (pool.length === 0) {
      pool = [...mainDeck];
    }
    
    const randomIndex = Math.floor(Math.random() * pool.length);
    const drawnCard = pool[randomIndex];
    
    const newPool = pool.filter((_, index) => index !== randomIndex);
    setAvailableMainCards(newPool);
    setCurrentCard(drawnCard);
  };

  const drawChallengeCard = () => {
    let pool = availableChallengeCards;
    if (pool.length === 0) {
      pool = [...challengeDeck];
    }
    
    const randomIndex = Math.floor(Math.random() * pool.length);
    const drawnCard = pool[randomIndex];
    
    const newPool = pool.filter((_, index) => index !== randomIndex);
    setAvailableChallengeCards(newPool);
    setCurrentCard(drawnCard);
  };

  const isPaga = currentCard?.category === 'paga';

  return (
    <div className="pt-28 pb-12 px-6 flex flex-col items-center justify-center min-h-[85vh]">
      
      <div className="flex-1 flex items-center justify-center w-full mb-8 relative">
        <AnimatePresence mode="wait">
          {currentCard ? (
            <PlayingCard key={currentCard.id} card={currentCard} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative w-full max-w-[280px] aspect-[2/3] mx-auto"
            >
              <img src="/pngs/Capa-ou-Verso.png" alt="Capa do Jogo" className="w-full h-full object-cover rounded-2xl" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full flex flex-col gap-4 max-w-[280px]">
        <button
          onClick={drawMainCard}
          className="w-full py-3.5 bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/30 text-white font-medium rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all active:scale-95"
        >
          Sortear Carta
        </button>
        
        {currentCard && !isPaga && (
          <motion.button
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            onClick={drawChallengeCard}
            className="w-full py-3.5 bg-yellow-500/20 hover:bg-yellow-500/30 backdrop-blur-xl border border-yellow-400/50 text-yellow-100 font-medium rounded-full shadow-[0_0_20px_rgba(234,179,8,0.2)] transition-all active:scale-95"
          >
            Sortear Desafio
          </motion.button>
        )}
      </div>

    </div>
  );
}
