export type Tab = 'inicio' | 'regras' | 'sobre' | 'jogo';
export type Theme = 'light' | 'dark';
export type CardCategory = 'falaoupaga' | 'livre' | 'paga';

export interface Card {
  id: string;
  category: CardCategory;
  text: string;
  image?: string;
}
