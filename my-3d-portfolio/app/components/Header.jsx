'use client'
import localFont from 'next/font/local';

// Подключение шрифтов
const specialEliteRu = localFont({
  src: '../../public/fonts/clarendonbt/specialelite-cyrillic.ttf',
  display: 'swap',
})

export default function Header() {
  return (
    <div className="w-full bg-white/95 backdrop-blur-md border-b border-gray-200/30 shadow-sm">
      <div className="flex justify-between items-center px-6 md:px-10 py-3 md:py-4">
        {/* Логотип слева */}
        <div className="flex-shrink-0">
          <img 
            src="img/logo-2.svg" 
            alt="Logo" 
            className="h-8 md:h-[4vw] w-auto max-h-12 object-contain" 
          />
        </div>

        {/* Надпись справа */}
        <div className="flex-1 flex justify-end">
          <h1 className={`text-sm md:text-[1.2vw] font-bold ${specialEliteRu.className} max-w-xs md:max-w-md text-right leading-tight`}>
            Сущность души – одна из тайн Всевышнего
          </h1>
        </div>
      </div>
    </div>
  );
} 