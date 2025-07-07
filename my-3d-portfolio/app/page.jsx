'use client'
import { useState, useEffect } from 'react';
import { Special_Elite } from 'next/font/google';
import localFont from 'next/font/local';
import WaveSidebar from './components/WaveSidebar';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedLogo from "./components/AnimatedLogo";

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
  const [animationPhase, setAnimationPhase] = useState('enter');

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

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    // Таймер для основного показа слова
    const showTimer = setTimeout(() => {
      setAnimationPhase('visible');
    }, 300); // Появление элементов

    // Таймер для начала исчезновения
    const hideTimer = setTimeout(() => {
      setAnimationPhase('exit');
    }, 2500); // Время показа слова

    // Таймер для смены слова
    const changeTimer = setTimeout(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
      setAnimationPhase('enter');
    }, 3000); // Полный цикл анимации

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(changeTimer);
    };
  }, [currentWordIndex]);

  // Анимация для текста
  const wordVariants = {
    enter: {
      y: -30,
      opacity: 0,
      transition: { duration: 0.5, delay: 0.2 }
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: {
      y: 30,
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  // Анимация для точки
  const dotVariants = {
    enter: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.1 } // Появляется быстрее текста
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      y: 40,
      scaleY: 1.5,
      transition: { 
        duration: 0.4,
        ease: [0.17, 0.67, 0.83, 0.67] // Эффект "падения"
      }
    }
  };

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
        <h2 className={`${specialEliteRu.className} text-[5px] md:text-[14px] antialiased text-bold`}>
          (С чем поможет справиться тебе Стэн?)
        </h2>
        
        <div className="flex flex-col items-center">
          <div className="relative h-16 w-full max-w-lg overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`word-${currentWordIndex}`}
                initial="enter"
                animate={animationPhase}
                variants={wordVariants}
                className={`absolute inset-0 flex items-center justify-center text-2xl md:text-4xl font-bold ${specialEliteRu.className}`}
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
              >
                {words[currentWordIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Анимированная точка */}
          <div className="h-4 mt-4">
            <motion.div
              key={`dot-${currentWordIndex}`}
              initial="enter"
              animate={animationPhase}
              variants={dotVariants}
              className="mx-auto h-2 w-2 rounded-full bg-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
}