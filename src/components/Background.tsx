import { Theme } from '../types';

export function Background({ theme }: { theme: Theme }) {
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] bg-[#1a1a1e]">
      {/* Dark Theme Backgrounds */}
      <img
        src={`${import.meta.env.BASE_URL}pngs/bg preto mobile.png`}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 md:hidden ${isDark ? 'opacity-100' : 'opacity-0'}`}
      />
      <img
        src={`${import.meta.env.BASE_URL}pngs/bg preto.png`}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 hidden md:block ${isDark ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Light Theme Backgrounds */}
      <img
        src={`${import.meta.env.BASE_URL}pngs/bg azul mobile.png`}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 md:hidden ${!isDark ? 'opacity-100' : 'opacity-0'}`}
      />
      <img
        src={`${import.meta.env.BASE_URL}pngs/bg azul.png`}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 hidden md:block ${!isDark ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
