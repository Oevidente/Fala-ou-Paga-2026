import { motion } from 'motion/react';
import { Theme } from '../types';

export function RulesView({ theme }: { theme: Theme }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-28 pb-12 px-6 md:pt-32 md:px-16 md:pb-20"
    >
      <h1 className="text-4xl font-bold text-white mb-6 italic tracking-tight text-glow">Regras</h1>
      
      <div className={`p-6 rounded-3xl backdrop-blur-xl border border-white/20 shadow-2xl ${
        theme === 'dark' ? 'bg-black/30' : 'bg-white/10'
      }`}>
        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-bold text-white mb-2 text-glow">1. Objetivo:</h2>
            <p className="text-white/90">
              Criar um ambiente divertido e desinibido, em que os participantes se desafiem a responder perguntas ou cumpram punições criativas.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2 text-glow">2. Componentes:</h2>
            <ul className="text-white/90 space-y-1">
              <li>Baralho de cartas vermelhas (contém as perguntas principais)</li>
              <li>1 carta prateada por rodada (pergunta livre)</li>
              <li>Baralho de cartas douradas (desafios/punições)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2 text-glow">3. Preparação:</h2>
            <ul className="text-white/90 space-y-1">
              <li>Embaralhe bem o baralho vermelho.</li>
              <li>Insira aleatoriamente, entre as vermelhas, uma carta prateada.</li>
              <li>Deixe o baralho dourado separado, virado para baixo.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2 text-glow">4. Como Jogar:</h2>
            <ul className="text-white/90 space-y-1">
              <li>O jogador da vez puxa a primeira carta vermelha.</li>
              <li>Se for vermelha, lê em voz alta a pergunta e faz ao outro participante.</li>
              <li>Se for prateada, o jogador escolhe qualquer pergunta que quiser (pergunta livre).</li>
              <li>O outro participante responde ou recusa.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2 text-glow">5. Recusa de Resposta:</h2>
            <ul className="text-white/90 space-y-1">
              <li>Se o questionado se recusar a responder, o questionador deve puxar uma carta dourada e cumprir o desafio indicado.</li>
              <li>Se quem puxou a carta (a vez) se sentir tímido ou não quiser fazer a pergunta, o outro jogador puxa uma carta dourada e realiza o desafio.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2 text-glow">6. Cartas de Desafio (Douradas):</h2>
            <p className="text-white/90">
              Cada carta dourada traz uma punição criativa.
            </p>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
