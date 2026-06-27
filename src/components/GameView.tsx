import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../types';
import { mainDeck, challengeDeck } from '../data';
import { PlayingCard } from './PlayingCard';

type GameState = 'cover' | 'gallery' | 'shuffling' | 'playing';

const shufflingCards = [
  { id: 0, xStart: -120, yStart: -150, rotateStart: -15, frontImage: mainDeck[0].image },
  { id: 1, xStart: 120, yStart: -150, rotateStart: 10, frontImage: mainDeck[1].image },
  { id: 2, xStart: -120, yStart: 150, rotateStart: 5, frontImage: mainDeck[2].image },
  { id: 3, xStart: 120, yStart: 150, rotateStart: -10, frontImage: mainDeck[3].image },
  { id: 4, xStart: -60, yStart: -50, rotateStart: -8, frontImage: mainDeck[4].image },
  { id: 5, xStart: 60, yStart: -50, rotateStart: 12, frontImage: mainDeck[5].image },
  { id: 6, xStart: -60, yStart: 50, rotateStart: 18, frontImage: mainDeck[6].image },
  { id: 7, xStart: 60, yStart: 50, rotateStart: -5, frontImage: mainDeck[7].image },
];

export function GameView() {
  const [gameState, setGameState] = useState<GameState>('cover');
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  
  const [availableMainCards, setAvailableMainCards] = useState<Card[]>([...mainDeck]);
  const [availableChallengeCards, setAvailableChallengeCards] = useState<Card[]>([...challengeDeck]);

  const deckStack = [0, 1, 2, 3, 4];

  useEffect(() => {
    if (gameState === 'shuffling') {
      const timer = setTimeout(() => {
        setGameState('playing');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [gameState]);

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
          ) : gameState === 'cover' ? (
            <motion.div
              key="cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative w-full max-w-[280px] aspect-[2/3] mx-auto"
            >
              <img src={`${import.meta.env.BASE_URL}pngs/Capa-ou-Verso.png`} alt="Capa do Jogo" className="w-full h-full object-cover rounded-2xl" />
            </motion.div>
          ) : gameState === 'gallery' ? (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-4xl flex flex-col items-center justify-center"
            >
              <h2 className="text-white/60 text-sm font-semibold tracking-wider uppercase mb-4 text-glow">Conheça as Cartas</h2>
              <div className="w-full h-[50vh] md:h-[58vh] overflow-y-auto rounded-3xl bg-black/30 border border-white/10 p-4 md:p-6 shadow-inner">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
                  {mainDeck.map((card) => (
                    <div
                      key={card.id}
                      className="aspect-[2/3] rounded-xl overflow-hidden border border-white/10 shadow-md bg-white/5 relative group transition-all duration-300 hover:border-pink-500/50 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]"
                    >
                      <img
                        src={`${import.meta.env.BASE_URL}cards/${card.image}`}
                        alt={card.text}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : gameState === 'shuffling' ? (
            <motion.div
              key="shuffling-deck"
              className="relative w-full max-w-[280px] aspect-[2/3] mx-auto perspective-1000"
            >
              {shufflingCards.map((card) => {
                const direction = card.id % 2 === 0 ? -1 : 1;
                const xShuffle = direction * (120 + card.id * 10);
                const yShuffle = card.id === 0 ? 5 : card.id === 1 ? -3 : card.id === 2 ? 4 : card.id === 3 ? -4 : 0;
                const rotateShuffle = direction * (15 + card.id * 2);

                return (
                  <motion.div
                    key={card.id}
                    animate={{
                      x: [card.xStart, 0, xShuffle, 0],
                      y: [card.yStart, 0, yShuffle, 0],
                      rotate: [card.rotateStart, 0, rotateShuffle, 0],
                      rotateY: [0, 180, 180, 180],
                    }}
                    transition={{
                      duration: 2.2,
                      times: [0, 0.4, 0.7, 1.0],
                      ease: 'easeInOut',
                      delay: card.id * 0.05,
                    }}
                    style={{ transformStyle: 'preserve-3d', zIndex: card.id }}
                    className="absolute inset-0 w-full h-full rounded-2xl"
                  >
                    {/* Front Face */}
                    <div 
                      className="absolute inset-0 w-full h-full rounded-2xl border-4 border-white/80 overflow-hidden shadow-xl"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <img
                        src={`${import.meta.env.BASE_URL}cards/${card.frontImage}`}
                        alt="Frente"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Back Face */}
                    <div 
                      className="absolute inset-0 w-full h-full rounded-2xl border-4 border-white/80 overflow-hidden shadow-xl"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      <img
                        src={`${import.meta.env.BASE_URL}pngs/Capa-ou-Verso.png`}
                        alt="Verso"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="deck-static"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative w-full max-w-[280px] aspect-[2/3] mx-auto"
            >
              {deckStack.map((index) => {
                const rotate = index === 0 ? -3 : index === 1 ? 2 : index === 2 ? -1 : index === 3 ? 3 : -1;
                const xOffset = index === 0 ? -4 : index === 1 ? 3 : index === 2 ? -2 : index === 3 ? 2 : 0;
                const yOffset = index === 0 ? 5 : index === 1 ? -1 : index === 2 ? 3 : index === 3 ? -3 : 0;

                return (
                  <div
                    key={index}
                    className="absolute inset-0 w-full h-full rounded-2xl border-4 border-white/80 overflow-hidden bg-gradient-to-b from-slate-50 to-slate-200 shadow-xl"
                    style={{
                      zIndex: index,
                      transform: `translate3d(${xOffset}px, ${yOffset}px, 0) rotate(${rotate}deg)`,
                    }}
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}pngs/Capa-ou-Verso.png`}
                      alt="Verso da Carta"
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full flex flex-col gap-4 max-w-[280px]">
        {gameState === 'cover' && (
          <button
            onClick={() => setGameState('gallery')}
            className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 border border-pink-400/50 text-white font-semibold rounded-full shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all active:scale-95 text-base font-bold"
          >
            Iniciar
          </button>
        )}

        {gameState === 'gallery' && (
          <button
            onClick={() => setGameState('shuffling')}
            className="w-full py-3.5 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 border border-purple-400/50 text-white font-semibold rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all active:scale-95 text-base font-bold"
          >
            Embaralhar
          </button>
        )}

        {gameState === 'shuffling' && (
          <button
            disabled
            className="w-full py-3.5 bg-slate-600/30 border border-slate-500/20 text-slate-400 font-semibold rounded-full cursor-not-allowed text-base flex items-center justify-center gap-2 animate-pulse"
          >
            <svg className="animate-spin h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Embaralhando...
          </button>
        )}

        {gameState === 'playing' && (
          <>
            <button
              onClick={drawMainCard}
              className="w-full py-3.5 bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/30 text-white font-medium rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all active:scale-95 text-base"
            >
              Sortear Carta
            </button>
            
            {currentCard && !isPaga && (
              <motion.button
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                onClick={drawChallengeCard}
                className="w-full py-3.5 bg-yellow-500/20 hover:bg-yellow-500/30 backdrop-blur-xl border border-yellow-400/50 text-yellow-100 font-medium rounded-full shadow-[0_0_20px_rgba(234,179,8,0.2)] transition-all active:scale-95 text-base"
              >
                Sortear Desafio
              </motion.button>
            )}
          </>
        )}
      </div>

    </div>
  );
}
