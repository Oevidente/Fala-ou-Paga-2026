import { Theme } from '../types';

export function Background({ theme }: { theme: Theme }) {
  const isDark = theme === 'dark';
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] bg-[#1a1a1e]">
      <img 
        src="/pngs/bg preto.png"
        alt="" 
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isDark ? 'opacity-100' : 'opacity-0'}`}
      />
      <img 
        src="/pngs/bg azul.png"
        alt="" 
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${!isDark ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
