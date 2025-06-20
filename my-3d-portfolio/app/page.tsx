'use client'
import { useState, useEffect } from 'react';
import { Special_Elite } from 'next/font/google';
import localFont from 'next/font/local';
import WaveSidebar from './components/WaveSidebar';


// Подключение шрифтов
const specialEliteRu = localFont({
  src: '../public/fonts/clarendonbt/specialelite-cyrillic.ttf',
  display: 'swap',
})

const specialElite = Special_Elite({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const words = [
    "Тревожное расстройство",
    "Страхи",
    "Панические атаки",
    "Расставание и развод",
    "Эмоциональная зависимость",
    "Агрессия и обиды",
    "Низкая самооценка",
    "ПТСР",
    "Депрессия",
    "РПП",
    "Проблемы в личной жизни"
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Анимация смены слов
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 3000); // Меняем слово каждые 3 секунды

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative h-screen w-full bg-white text-black overflow-hidden">

            <WaveSidebar />

      {/* Логотип слева */}
      <div className="absolute left-10 top-10 z-20">
        <img src="img/logo-2.svg" alt="Logo" className="h-16 w-auto" />
      </div>

      {/* Надпись справа */}
      <div className="absolute right-10 top-10 z-20">
        <h1 className={`text-[24px] font-bold ${specialEliteRu.className}`}>
          Сущность души – одна из тайн Всевышнего
        </h1>
      </div>

      {/* Видеоконтейнер */}
      <div className="animationContainer absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <video
          loop
          muted
          playsInline
          autoPlay
          preload="auto"
          src="img/background.mp4"
          className="block w-full"
          style={{
            height: '589px',
            width: '848px',
            transform: 'matrix(1, 0, 0, 1, -3, -36.92)',
            overflow: 'hidden',
            objectFit: 'cover',
            position: 'relative',
            bottom: '100px'
          }}
        />
      </div>

      {/* Текст под анимацией */}
      <div className="absolute bottom-20 left-0 right-0 z-20 text-center">
        {/* Заголовок меньшего размера */}
        <h2 className={`${specialEliteRu.className} text-xl md:text-2xl mb-4 antialiased`}>
          С чем поможет справиться тебе Стэн?
        </h2>
        
        {/* Анимированный заголовок с вертикальной анимацией (теперь падает сверху) */}
        <div className="relative h-16 overflow-hidden mx-auto w-fit">
          <div className="relative h-full" style={{
            transform: `translateY(${currentWordIndex * -100}%)`, // Изменено на отрицательное значение
            transition: 'transform 0.5s ease-in-out'
          }}>
            {words.map((word, index) => (
              <div 
                key={word}
                className={`flex items-center justify-center h-16 text-2xl md:text-4xl font-bold ${
                  specialEliteRu.className
                }`}
                style={{
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                {word}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    
  );
}