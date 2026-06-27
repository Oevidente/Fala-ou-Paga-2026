import { motion } from 'motion/react';
import { Card } from '../types';

interface PlayingCardProps {
  card: Card | null;
}

export function PlayingCard({ card }: PlayingCardProps) {
  if (!card) return null;

  const isLivre = card.category === 'livre';
  const isPaga = card.category === 'paga';

  // Determine styles based on category
  let cardBg = '';
  let borderGlow = '';
  let labelText = '';
  let labelColor = '';
  let mainIcon = null;

  if (isLivre) {
    cardBg = 'bg-gradient-to-b from-slate-50 to-slate-200';
    borderGlow = 'shadow-[0_0_30px_rgba(255,255,255,0.5)] border-white/80';
    labelText = 'LIVRE';
    labelColor = 'text-slate-400';
    mainIcon = <img src="/pngs/interrogação.png" alt="?" className="w-24 h-24 object-contain opacity-50 mix-blend-multiply" />;
  } else if (isPaga) {
    cardBg = 'bg-gradient-to-b from-yellow-50 to-orange-100';
    borderGlow = 'shadow-[0_0_30px_rgba(255,200,0,0.4)] border-yellow-300/80';
    labelText = 'PAGA';
    labelColor = 'text-yellow-500';
    mainIcon = <img src="/pngs/18 simbolo.png" alt="18" className="w-32 h-32 object-contain drop-shadow-md" />;
  } else {
    cardBg = 'bg-gradient-to-b from-pink-100 to-pink-200';
    borderGlow = 'shadow-[0_0_30px_rgba(255,100,150,0.5)] border-pink-300/80';
    labelText = 'FALA ou PAGA';
    labelColor = 'text-pink-400';
    mainIcon = <img src="/pngs/interrogação.png" alt="?" className="w-32 h-32 object-contain opacity-80 drop-shadow-md" />;
  }

  return (
    <motion.div
      key={card.id}
      initial={{ opacity: 0, scale: 0.8, y: 50, rotateY: 90 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -50 }}
      transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
      className="relative w-full max-w-[280px] aspect-[2/3] mx-auto perspective-1000"
    >
      <div className={`w-full h-full rounded-2xl border-4 flex flex-col p-0 relative overflow-hidden ${cardBg} ${borderGlow}`}>
        
        {card.image ? (
          <img 
            src={`/cards/${card.image}`} 
            alt={card.text || 'Card'}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        ) : (
          <div className="p-6 relative z-10 flex flex-col h-full pointer-events-none w-full">
            <div className={`text-center font-bold tracking-widest text-sm mb-6 ${labelColor}`}>
              {labelText}
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              {mainIcon}
            </div>

            <div className="w-full h-24 rounded-xl bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-sm border border-white/30 shadow-inner flex items-center justify-center p-3 text-center">
               <p className="text-gray-800 text-sm font-medium leading-tight">
                 {card.text}
               </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
