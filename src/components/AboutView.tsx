import { motion } from 'motion/react';
import { Theme } from '../types';

export function AboutView({ theme }: { theme: Theme }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-28 pb-12 px-6 md:pt-32 md:px-16 md:pb-20"
    >
      <h1 className="text-4xl font-bold text-white mb-6 italic tracking-tight text-glow">Sobre</h1>
      
      <div className={`p-6 rounded-3xl backdrop-blur-xl border border-white/20 shadow-2xl ${
        theme === 'dark' ? 'bg-black/30' : 'bg-white/10'
      }`}>
        <p className="text-white leading-relaxed mb-6">
          <strong className="italic font-semibold">Fala ou Paga</strong> é um party game para maiores de 18 anos, pensado especialmente para casais que querem esquentar a relação, se conhecer melhor e se divertir sem rodeios. É simples: responde com sinceridade ou paga o mico — mas aqui o "mico" vira provocação, flerte e desafio íntimo.
        </p>
        
        <h2 className="text-xl font-bold text-white mb-4 italic text-glow">No que consiste</h2>
        <ul className="list-disc pl-5 text-white space-y-2 mb-6 marker:text-white/70">
          <li>Rodadas rápidas: um parceiro recebe uma pergunta ou desafio.</li>
          <li>Escolha: falar (responder com honestidade) ou pagar (cumprir um desafio sensual/íntimo).</li>
        </ul>
        
        <h2 className="text-xl font-bold text-white mb-4 italic text-glow">Recursos pensados para casais</h2>
        <ul className="list-disc pl-5 text-white space-y-2 mb-6 marker:text-white/70">
          <li>Perguntas e desafios criados para explodir a monotonia e aumentar intimidade.</li>
          <li>Sala privada e opção offline — joguem só entre vocês.</li>
        </ul>
        
        <h2 className="text-xl font-bold text-white mb-4 italic text-glow">Avisos e respeito</h2>
        <ul className="list-disc pl-5 text-white space-y-2 marker:text-white/70">
          <li>Somente maiores de 18 anos.</li>
          <li>Só joga quem consentiu — jogo baseado em respeito, limites e segurança emocional.</li>
          <li>Não serve para menores, nem para forçar situações desconfortáveis.</li>
          <li>Conteúdo adulto pode ser explícito. — responsabilidade e consentimento primeiro.</li>
        </ul>
      </div>
    </motion.div>
  );
}
