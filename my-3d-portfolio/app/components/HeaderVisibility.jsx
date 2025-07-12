'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeaderVisibility({ children }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Определяем направление прокрутки
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      setScrollDirection(direction);
      
      // Показываем шапку если мы на первом блоке (в пределах высоты экрана)
      if (currentScrollY < window.innerHeight * 0.8) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // Скрываем при прокрутке вниз, показываем при прокрутке вверх
      if (direction === 'down' && currentScrollY > window.innerHeight) {
        setIsVisible(false);
      } else if (direction === 'up') {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    const handleMouseMove = (e) => {
      // Показываем шапку при наведении на верхнюю область экрана (первые 80px)
      if (e.clientY <= 80 && lastScrollY > window.innerHeight) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // Добавляем обработчик для сброса состояния при клике в верхней области
    const handleClick = (e) => {
      if (e.clientY <= 80 && !isVisible) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [lastScrollY, isVisible]);

  const shouldShow = isVisible || isHovering;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ 
            duration: 0.4, 
            ease: [0.25, 0.46, 0.45, 0.94] // Плавная кривая
          }}
          className="fixed top-0 left-0 right-0 z-50"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
} 