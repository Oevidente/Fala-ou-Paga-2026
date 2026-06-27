import { motion } from 'motion/react';
import { Tab, Theme } from '../types';
import { useState } from 'react';

interface HomeViewProps {
  key?: string;
  theme: Theme;
  onPlay: () => void;
  setCurrentTab: (tab: Tab) => void;
}

export function HomeView({ theme, onPlay, setCurrentTab }: HomeViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-12 px-6 md:pt-32 md:px-16 md:pb-20"
    >
      {/* Header section with logo and cards */}
      <div className="flex justify-between items-center mb-10 md:mb-24 relative mt-4 md:mt-8">
        <div className="z-10 w-[140px] md:w-[280px] flex flex-col items-start">
          <img src={`${import.meta.env.BASE_URL}pngs/Logo.png`} alt="Fala ou Paga" className="w-full h-auto img-glow" />
          <button
            onClick={onPlay}
            className="mt-6 md:mt-10 w-full py-2 md:py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white font-medium md:text-xl rounded-full shadow-lg transition-all active:scale-95 text-center"
          >
            Jogue Agora
          </button>
        </div>

        {/* Decorative cards stack */}
        <div className="absolute right-[-2rem] md:right-0 top-[-1rem] md:top-0 w-[55%] md:w-auto md:h-full z-0 drop-shadow-2xl pointer-events-none">
          <img
            src={`${import.meta.env.BASE_URL}pngs/Capa do online.png`}
            alt="Cartas"
            className="w-full h-auto md:h-full md:w-auto object-contain scale-110 md:scale-100 origin-right"
          />
        </div>
      </div>

      {/* Tipos de Cartas */}
      <div className="mb-8 md:mb-16 relative z-10">
        <h2 className="text-xl md:text-4xl font-bold text-white mb-4 md:mb-8 italic tracking-tight text-glow">Tipos de Cartas</h2>
        <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-8">

          {/* Carta Prata */}
          <div className="flex flex-col gap-2 md:gap-0">
            <div className="group aspect-square md:aspect-[4/3] rounded-2xl sm:rounded-3xl md:rounded-[2rem] bg-gradient-to-br from-white/80 to-white/40 hover:from-[#4a72ba] hover:to-[#223963] backdrop-blur border border-white/50 flex items-center justify-center shadow-lg p-2 md:p-6 overflow-hidden relative transition-all duration-300 cursor-pointer">
              <img src={`${import.meta.env.BASE_URL}pngs/interrogação.png`} alt="Livre" className="w-full h-full object-contain opacity-40 mix-blend-multiply transition-all duration-300 group-hover:opacity-10 group-hover:mix-blend-normal group-hover:scale-110" />
              <div className="absolute inset-0 md:flex flex-col items-center justify-center p-2 md:p-6 hidden group-hover:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 text-center bg-gradient-to-t from-black/50 to-transparent">
                <h3 className="text-white font-bold text-[13px] sm:text-[15px] md:text-2xl mb-1 md:mb-3 leading-tight drop-shadow-md">Carta Prata</h3>
                <p className="text-white text-[10px] sm:text-[11px] md:text-base leading-[1.1] sm:leading-tight drop-shadow">Essa carta permite que se faça a pergunta que desejar.</p>
              </div>
            </div>
            {/* Mobile-only description */}
            <div className="md:hidden text-center p-2 rounded-lg bg-black/20 backdrop-blur-sm">
              <h3 className="text-white font-bold text-[12px] sm:text-[13px] leading-tight mb-0.5 drop-shadow">Carta Prata</h3>
              <p className="text-white/80 text-[10px] sm:text-[11px] leading-snug drop-shadow-sm">Essa carta permite que se faça a pergunta que desejar.</p>
            </div>
          </div>

          {/* Carta Rosa */}
          <div className="flex flex-col gap-2 md:gap-0">
            <div className="group aspect-square md:aspect-[4/3] rounded-2xl sm:rounded-3xl md:rounded-[2rem] bg-gradient-to-br from-pink-400 to-pink-500 hover:from-[#2a2640] hover:to-[#151221] backdrop-blur border border-pink-300/50 flex items-center justify-center shadow-lg p-2 md:p-6 overflow-hidden relative transition-all duration-300 cursor-pointer">
              <img src={`${import.meta.env.BASE_URL}pngs/interrogação.png`} alt="Fala ou Paga" className="w-full h-full object-contain opacity-90 drop-shadow-md transition-all duration-300 group-hover:opacity-10 group-hover:scale-110" />
              <div className="absolute inset-0 md:flex flex-col items-center justify-center p-2 md:p-6 hidden group-hover:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 text-center bg-gradient-to-t from-black/50 to-transparent">
                <h3 className="text-white font-bold text-[13px] sm:text-[15px] md:text-2xl mb-1 md:mb-3 leading-tight drop-shadow-md">Carta Rosa</h3>
                <p className="text-white text-[10px] sm:text-[11px] md:text-base leading-[1.1] sm:leading-tight drop-shadow">Essa carta contém uma pergunta escrita de qualquer tipo.</p>
              </div>
            </div>
            {/* Mobile-only description */}
            <div className="md:hidden text-center p-2 rounded-lg bg-black/20 backdrop-blur-sm">
              <h3 className="text-white font-bold text-[12px] sm:text-[13px] leading-tight mb-0.5 drop-shadow">Carta Rosa</h3>
              <p className="text-white/80 text-[10px] sm:text-[11px] leading-snug drop-shadow-sm">Essa carta contém uma pergunta escrita de qualquer tipo.</p>
            </div>
          </div>

          {/* Carta Desafio */}
          <div className="flex flex-col gap-2 md:gap-0">
            <div className="group aspect-square md:aspect-[4/3] rounded-2xl sm:rounded-3xl md:rounded-[2rem] bg-gradient-to-br from-orange-400 to-yellow-500 hover:from-[#1b301f] hover:to-[#0f1d12] backdrop-blur border border-yellow-300/50 flex items-center justify-center shadow-lg p-2 md:p-6 overflow-hidden relative transition-all duration-300 cursor-pointer">
              <img src={`${import.meta.env.BASE_URL}pngs/18 simbolo.png`} alt="Desafio" className="w-full h-full object-contain drop-shadow-md opacity-90 transition-all duration-300 group-hover:opacity-10 group-hover:scale-110" />
              <div className="absolute inset-0 md:flex flex-col items-center justify-center p-2 md:p-6 hidden group-hover:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 text-center bg-gradient-to-t from-black/50 to-transparent">
                <h3 className="text-white font-bold text-[13px] sm:text-[15px] md:text-2xl mb-1 md:mb-3 leading-tight drop-shadow-md">Carta Desafio</h3>
                <p className="text-white text-[10px] sm:text-[11px] md:text-base leading-[1.1] sm:leading-tight drop-shadow">Essa carta traz uma punição/desafio para quem se recusar a perguntar ou responder uma pergunta.</p>
              </div>
            </div>
            {/* Mobile-only description */}
            <div className="md:hidden text-center p-2 rounded-lg bg-black/20 backdrop-blur-sm">
              <h3 className="text-white font-bold text-[12px] sm:text-[13px] leading-tight mb-0.5 drop-shadow">Carta Desafio</h3>
              <p className="text-white/80 text-[10px] sm:text-[11px] leading-snug drop-shadow-sm">Essa carta traz uma punição/desafio para quem se recusar a responder.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Objetivo */}
      <div className="mb-8 md:mb-16">
        <h2 className="text-xl md:text-4xl font-bold text-white mb-4 md:mb-8 italic tracking-tight text-glow">Objetivo</h2>
        <div className="p-5 md:p-10 rounded-[1.5rem] md:rounded-[2rem] backdrop-blur-xl border border-white/20 shadow-xl bg-white/10">
          <p className="text-white text-[15px] md:text-2xl leading-relaxed md:leading-relaxed">
            Criar um ambiente divertido e desinibido, em que os participantes se desafiem a responder perguntas ou cumpram punições criativas.
          </p>
        </div>
      </div>

      {/* Regras preview */}
      <div>
        <h2 className="text-xl md:text-4xl font-bold text-white mb-4 md:mb-8 italic tracking-tight text-glow">Regras</h2>
        <div className="p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] backdrop-blur-xl border border-white/20 shadow-xl bg-white/10">
          <div className="max-h-[300px] md:max-h-[400px] overflow-y-auto pr-4 space-y-6 text-white/90 text-[15px] md:text-lg leading-relaxed md:leading-relaxed">
            <section>
              <h3 className="text-lg font-bold text-white mb-2 text-glow">1. Objetivo:</h3>
              <p>
                Criar um ambiente divertido e desinibido, em que os participantes se desafiem a responder perguntas ou cumpram punições criativas.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-white mb-2 text-glow">2. Componentes:</h3>
              <ul className="space-y-1 list-disc list-inside">
                <li>Baralho de cartas vermelhas (contém as perguntas principais)</li>
                <li>1 carta prateada por rodada (pergunta livre)</li>
                <li>Baralho de cartas douradas (desafios/punições)</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-white mb-2 text-glow">3. Preparação:</h3>
              <ul className="space-y-1 list-disc list-inside">
                <li>Embaralhe bem o baralho vermelho.</li>
                <li>Insira aleatoriamente, entre as vermelhas, uma carta prateada.</li>
                <li>Deixe o baralho dourado separado, virado para baixo.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-white mb-2 text-glow">4. Como Jogar:</h3>
              <ul className="space-y-1 list-disc list-inside">
                <li>O jogador da vez puxa a primeira carta vermelha.</li>
                <li>Se for vermelha, lê em voz alta a pergunta e faz ao outro participante.</li>
                <li>Se for prateada, o jogador escolhe qualquer pergunta que quiser (pergunta livre).</li>
                <li>O outro participante responde ou recusa.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-bold text-white mb-2 text-glow">5. Recusa de Resposta:</h3>
              <ul className="space-y-1 list-disc list-inside">
                <li>Se o questionado se recusar a responder, o questionador deve puxar uma carta dourada e cumprir o desafio indicado.</li>
                <li>Se quem puxou a carta (a vez) se sentir tímido ou não quiser fazer a pergunta, o outro jogador puxa uma carta dourada e realiza o desafio.</li>
              </ul>
            </section>
          </div>

          <div className="flex justify-center mt-6 md:mt-10">
            <button
              onClick={() => {
                const mainEl = document.querySelector('main');
                if (mainEl && window.innerWidth >= 768) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  mainEl.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="text-white/90 text-[15px] md:text-lg font-medium hover:text-white"
            >
              Voltar ao topo
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
