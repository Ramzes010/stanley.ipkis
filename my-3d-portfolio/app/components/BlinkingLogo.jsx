import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function BlinkingLogo() {
  const [isBlinking, setIsBlinking] = useState(false);

  // Анимация моргания
  useEffect(() => {
    let timeoutId;
    let intervalId;

    const blink = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);

        // 50% шанс на двойное моргание
        if (Math.random() < 0.5) {
          timeoutId = setTimeout(() => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 120);
          }, 150);
        }
      }, 120);
    };

    const startBlinking = () => {
      blink();
      intervalId = setInterval(() => {
        blink();
      }, Math.random() * 4000 + 3000); // 3–7 секунд
    };

    startBlinking();

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <img
        src={isBlinking ? '/img/menuLogoCloseEyes.svg' : '/img/menuLogo.svg'}
        alt="Animated Logo"
        className="h-[6vw] w-auto transition-all duration-200"
      />
    </motion.div>
  );
} 