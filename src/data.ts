import { Card } from './types';

// ============================================================================
// CONFIGURAÇÃO DO TOTAL DE CARTAS
// Sempre que você adicionar novas cartas numeradas na pasta public/cards,
// basta atualizar o número máximo abaixo (exemplo: se colocar até a 150, mude para 150):
// ============================================================================
const MAX_CARD_NUMBER = 116;

const numberedFiles: string[] = [];
for (let i = 1; i <= MAX_CARD_NUMBER; i++) {
  // Pula a carta 37 pois ela não existe no lote original
  if (i !== 37) {
    numberedFiles.push(`${i}.png`);
  }
}

const specialFiles = [
  'Fez ou faria.png', 'Livre.png', 'Preferências.png', 'Segredos.png'
];

const allCardFiles = [...numberedFiles, ...specialFiles];

export const mainDeck: Card[] = allCardFiles.map((file, index) => ({
  id: `c${index}`,
  category: 'livre',
  text: '',
  image: file
}));

const challengeFiles = [
  'desafios/1.png', 'desafios/2.png', 'desafios/3.png', 'desafios/4.png', 'desafios/5.png', 'desafios/6.png', 'desafios/7.png',
  'desafios/Jogo do Tato.png', 'desafios/O mestre mandou.png', 'desafios/Strip Game.png'
];

export const challengeDeck: Card[] = challengeFiles.map((file, index) => ({
  id: `ch${index}`,
  category: 'paga',
  text: '',
  image: file
}));

