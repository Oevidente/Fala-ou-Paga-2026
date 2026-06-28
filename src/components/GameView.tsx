import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../types';
import { mainDeck, challengeDeck } from '../data';
import { PlayingCard } from './PlayingCard';
import { playClickSound, playRevealSound } from '../audio';

type GameState = 'mode_selection' | 'cover' | 'gallery' | 'shuffling' | 'playing';
type GameMode = 'local' | 'individual';

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
  const [gameState, setGameState] = useState<GameState>('mode_selection');
  const [gameMode, setGameMode] = useState<GameMode>('individual');
  const [players, setPlayers] = useState<string[]>([]);
  const [newPlayerName, setNewPlayerName] = useState<string>('');
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);

  const [availableMainCards, setAvailableMainCards] = useState<Card[]>([...mainDeck]);
  const [availableChallengeCards, setAvailableChallengeCards] = useState<Card[]>([...challengeDeck]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Para compatibilidade com a estrutura de layout em desktop
    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.scrollTo(0, 0);
    }
  }, []);

  const deckStack = [0, 1, 2, 3, 4];

  useEffect(() => {
    if (gameState === 'shuffling') {
      const timer = setTimeout(() => {
        setGameState('playing');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  const handleAddPlayer = () => {
    const trimmed = newPlayerName.trim();
    if (trimmed && !players.includes(trimmed)) {
      setPlayers(prev => [...prev, trimmed]);
      setNewPlayerName('');
      playClickSound();
    }
  };

  const handleRemovePlayer = (index: number) => {
    setPlayers(prev => prev.filter((_, idx) => idx !== index));
    setCurrentPlayerIndex(prev => {
      if (prev >= players.length - 1) {
        return 0;
      }
      return prev;
    });
    playClickSound();
  };

  const drawMainCard = () => {
    let pool = availableMainCards;
    if (pool.length === 0) {
      pool = [...mainDeck];
    }

    const randomIndex = Math.floor(Math.random() * pool.length);
    const drawnCard = pool[randomIndex];

    const newPool = pool.filter((_, index) => index !== randomIndex);
    setAvailableMainCards(newPool);

    // Rotate turn only if a card was already drawn previously
    if (gameMode === 'local' && players.length > 0 && currentCard !== null) {
      setCurrentPlayerIndex(prev => (prev + 1) % players.length);
    }

    setCurrentCard(drawnCard);
    playRevealSound();
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
    playRevealSound();
  };

  const isPaga = currentCard?.category === 'paga';

  return (
    <div className="pt-28 pb-12 px-6 flex flex-col items-center justify-center min-h-[85vh]">

      {gameState === 'playing' && gameMode === 'local' && players.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 px-6 py-2.5 bg-gradient-to-r from-pink-500/25 to-rose-500/25 border border-pink-500/40 text-pink-200 font-semibold rounded-full shadow-[0_0_20px_rgba(244,63,94,0.2)] flex items-center gap-2.5 text-sm tracking-wide"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
          Vez de: <span className="text-white text-base font-extrabold italic tracking-tight">{players[currentPlayerIndex]}</span>
        </motion.div>
      )}

      <div className="flex-1 flex items-center justify-center w-full mb-8 relative">
        <AnimatePresence mode="wait">
          {gameState === 'mode_selection' ? (
            <motion.div
              key="mode-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-[340px] flex flex-col gap-6"
            >
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white italic tracking-tight text-glow">
                  Modo de Jogo
                </h1>
                <p className="text-white/50 text-sm mt-1">Como vocês vão jogar hoje?</p>
              </div>

              <div className="flex flex-col gap-4">
                {/* Individual Card */}
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setGameMode('individual');
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col gap-1 active:scale-98 cursor-pointer backdrop-blur-md ${gameMode === 'individual'
                    ? 'bg-gradient-to-r from-pink-500/20 to-rose-500/20 border-pink-500/80 shadow-[0_0_20px_rgba(244,63,94,0.25)]'
                    : 'bg-white/5 hover:bg-white/10 border-white/10'
                    }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold text-white text-base">Modo Individual</span>
                    {gameMode === 'individual' && (
                      <span className="w-3.5 h-3.5 rounded-full bg-pink-500 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-white/60">
                    Cada pessoa joga no seu próprio celular. Ideal para distanciamento ou aparelhos próprios.
                  </span>
                </button>

                {/* Local Play Card */}
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setGameMode('local');
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col gap-1 active:scale-98 cursor-pointer backdrop-blur-md ${gameMode === 'local'
                    ? 'bg-gradient-to-r from-pink-500/20 to-rose-500/20 border-pink-500/80 shadow-[0_0_20px_rgba(244,63,94,0.25)]'
                    : 'bg-white/5 hover:bg-white/10 border-white/10'
                    }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold text-white text-base">Passa e Joga (Local)</span>
                    {gameMode === 'local' && (
                      <span className="w-3.5 h-3.5 rounded-full bg-pink-500 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-white/60">
                    Vários jogadores dividindo o mesmo celular. As cartas mudam conforme a vez de cada um.
                  </span>
                </button>
              </div>

              {/* Player Names Input Section (Only for local mode) */}
              <AnimatePresence>
                {gameMode === 'local' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden flex flex-col gap-3"
                  >
                    <div className="h-px bg-white/10 my-1" />
                    <span className="text-sm font-bold text-white/70">Nomes dos Jogadores</span>

                    {/* Add Player Input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newPlayerName}
                        onChange={(e) => setNewPlayerName(e.target.value)}
                        placeholder="Nome do jogador"
                        maxLength={20}
                        className="flex-1 px-4 py-2 rounded-full bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-pink-500 transition-colors"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddPlayer();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleAddPlayer}
                        className="px-4 py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm active:scale-95 transition-all shadow-md shadow-pink-500/20 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* Players list */}
                    <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto pr-1">
                      {players.length === 0 ? (
                        <div className="text-center py-4 text-white/30 text-xs italic">
                          Adicione pelo menos 2 jogadores.
                        </div>
                      ) : (
                        players.map((name, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between px-4 py-2 rounded-xl bg-white/5 border border-white/5 group animate-fadeIn"
                          >
                            <span className="text-sm text-white/90 font-medium">{name}</span>
                            <button
                              type="button"
                              onClick={() => handleRemovePlayer(idx)}
                              className="text-white/40 hover:text-rose-400 text-xs px-2 py-1 transition-colors cursor-pointer"
                            >
                              Remover
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setGameState('cover');
                }}
                disabled={gameMode === 'local' && players.length < 2}
                className={`w-full py-3.5 rounded-full text-base font-bold transition-all shadow-[0_0_20px_rgba(244,63,94,0.4)] active:scale-95 ${gameMode === 'local' && players.length < 2
                  ? 'bg-slate-700/50 border border-slate-600/30 text-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 border border-pink-400/50 text-white cursor-pointer'
                  }`}
              >
                Confirmar
              </button>
            </motion.div>
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
              key="playing-stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative w-full max-w-[280px] aspect-[2/3] mx-auto perspective-1000"
            >
              {/* Static Deck Stack */}
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

              {/* Active Card overlay */}
              <AnimatePresence mode="wait">
                {currentCard && (
                  <div className="absolute inset-0 z-50">
                    <PlayingCard key={currentCard.id} card={currentCard} />
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {gameState !== 'mode_selection' && (
        <div className="w-full flex flex-col gap-4 max-w-[280px]">
          {gameState === 'cover' && (
            <button
              onClick={() => {
                playClickSound();
                setGameState('gallery');
              }}
              className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 border border-pink-400/50 text-white font-semibold rounded-full shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all active:scale-95 text-base font-bold cursor-pointer"
            >
              Iniciar
            </button>
          )}

          {gameState === 'gallery' && (
            <button
              onClick={() => {
                playClickSound();
                setGameState('shuffling');
              }}
              className="w-full py-3.5 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 border border-purple-400/50 text-white font-semibold rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all active:scale-95 text-base font-bold cursor-pointer"
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
                className="w-full py-3.5 bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/30 text-white font-medium rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all active:scale-95 text-base cursor-pointer"
              >
                Sortear Carta
              </button>

              {currentCard && !isPaga && (
                <motion.button
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  onClick={drawChallengeCard}
                  className="w-full py-3.5 bg-yellow-500/20 hover:bg-yellow-500/30 backdrop-blur-xl border border-yellow-400/50 text-yellow-100 font-medium rounded-full shadow-[0_0_20px_rgba(234,179,8,0.2)] transition-all active:scale-95 text-base cursor-pointer"
                >
                  Sortear Desafio
                </motion.button>
              )}
            </>
          )}
        </div>
      )}

    </div>
  );
}
