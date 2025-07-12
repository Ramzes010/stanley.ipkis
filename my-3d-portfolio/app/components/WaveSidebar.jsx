import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FullScreenMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Отслеживание скролла и наведения
  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Если мы на первом блоке (высота экрана) - показываем сайдбар
      if (scrollY < windowHeight * 0.8) {
        setIsVisible(true);
        return;
      }

      // Если прокрутили ниже первого блока - скрываем сайдбар
      setIsVisible(false);
    };

    const handleMouseMove = (e) => {
      const windowWidth = window.innerWidth;
      const mouseX = e.clientX;
      
      // Если мышь в правой части экрана (последние 80px) и сайдбар скрыт
      if (mouseX > windowWidth - 80 && !isVisible && !isOpen) {
        setIsHovering(true);
        setIsVisible(true);
      } else if (mouseX <= windowWidth - 80 && isHovering) {
        setIsHovering(false);
        // Не скрываем сразу, даем время пользователю
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          if (!isHovering && window.scrollY >= window.innerHeight * 0.8) {
            setIsVisible(false);
          }
        }, 1000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(scrollTimeout);
    };
  }, [isVisible, isHovering, isOpen]);

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

  const menuVariants = {
    open: {
      x: '0%',
      borderTopLeftRadius: '0%',
      borderBottomLeftRadius: '0%',
    },
    closed: {
      x: '100%',
      borderTopLeftRadius: '75%',
      borderBottomLeftRadius: '30%',
    },
  };

  const sidebarVariants = {
    visible: {
      x: '0%',
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    hidden: {
      x: '100%',
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeIn' }
    }
  };

  const menuTransition = {
    duration: 0.8,
  };

  const navContainerVariants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.3 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const navItemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  const navItems = ['Услуги', 'Помощь', 'Отзывы', 'Контакты'];

  const dotVariants = {
    initial: {
      opacity: 0,
      y: -20,
      scaleX: 1,
      scaleY: 1,
      borderRadius: '50%',
    },
    animate: {
      opacity: 1,
      y: [ -20, 20, 0 ],
      scaleX: [1, 0.7, 1],
      scaleY: [1, 1.6, 1],
      borderRadius: ['50%', '40% / 70%', '50%'],
      transition: { duration: 0.2, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      y: [0, 20, 40],
      scaleX: [1, 0.7, 1],
      scaleY: [1, 1.6, 1],
      borderRadius: ['50%', '40% / 70%', '50%'],
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  };

  return (
    <>
      {/* Глобальный шрифт */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@300&display=swap');
        .font-lxgw {
          font-family: "IBM Plex Serif", serif;
          font-weight: 300;
          font-style: normal;
        }
      `}</style>

      {/* Кнопка меню */}
      <motion.div
        variants={sidebarVariants}
        animate={isVisible ? 'visible' : 'hidden'}
        onClick={toggleMenu}
        className="fixed right-0 top-0 z-50 h-full w-16 cursor-pointer"
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <motion.path
            d="M100,15 Q-100,50 100,85 L100,100 L200,10 Z"
            initial={false}
            animate={{ fill: isOpen ? 'white' : 'black' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
        </svg>

        {/* Иконка "бургер" */}
        <motion.div
          className="absolute right-4 top-1/2 -translate-y-1/2"
          initial={{ opacity: 1 }}
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.25 }}
        >
          <img
            src="/img/icons/menu-2.svg"
            alt="Open menu"
            className="h-8 w-8 object-contain"
          />
        </motion.div>

        {/* Иконка закрытия */}
        <motion.div
          className="absolute right-4 top-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.25, delay: isOpen ? 0.2 : 0 }}
        >
          <img
            src="/img/icons/X.svg"
            alt="Close menu"
            className="h-10 w-10 object-contain"
          />
        </motion.div>
      </motion.div>

      {/* Полноэкранное меню */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={menuTransition}
            className="fixed inset-0 z-40 flex overflow-hidden bg-black text-white font-lxgw"
          >
            <div className="flex w-full justify-between pt-6 pb-8 px-8 pt-10 md:p-16 md:pt-12">
              {/* Логотип с морганием */}
              <div>
                <img
                  src={isBlinking ? '/img/menuLogoCloseEyes.svg' : '/img/menuLogo.svg'}
                  alt="Logo"
                  className="h-[10vw] w-auto transition-all duration-200"
                />
              </div>

              {/* Навигация */}
              <div className="flex flex-col items-start justify-between">
                <motion.nav
                  variants={navContainerVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="flex flex-col items-start gap-6 text-[4vw] mr-[20vw] font-bold"
                >
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item}
                      variants={navItemVariants}
                      className="relative flex items-center cursor-pointer"
                      onHoverStart={() => setHoveredIndex(i)}
                      onHoverEnd={() => setHoveredIndex(null)}
                      style={{ gap: '0.8rem' }}
                    >
                      <AnimatePresence>
                        {hoveredIndex === i && (
                          <motion.div
                            className="bg-white"
                            style={{
                              width: '0.75vw',
                              height: '0.75vw',
                              borderRadius: '50%',
                              position: 'absolute',
                              left: '-2vw',
                              top: '50%',
                              transform: 'translateY(-50%)',
                            }}
                            variants={dotVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                          />
                        )}
                      </AnimatePresence>

                      <motion.button
                        className="text-right cursor-pointer"
                        animate={{
                          x: hoveredIndex === i ? 10 : 0,
                          transition: { duration: 0.3, ease: 'easeOut' },
                        }}
                      >
                        {item}
                      </motion.button>
                    </motion.div>
                  ))}
                </motion.nav>

                {/* Социальные сети */}
                <div className="flex gap-6 text-lg">
                  <button className="cursor-pointer opacity-[0.5]  hover:opacity-100 transition-opacity ">WhatsApp</button>
                  <button className="cursor-pointer opacity-[0.5]  hover:opacity-100 transition-opacity ">Instagram</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Невидимая область для наведения (только когда сайдбар скрыт) */}
      {!isVisible && !isOpen && (
        <div 
          className="fixed right-0 top-0 z-30 h-full w-16"
          onMouseEnter={() => {
            setIsHovering(true);
            setIsVisible(true);
          }}
          onMouseLeave={() => {
            setIsHovering(false);
            setTimeout(() => {
              if (!isHovering && window.scrollY >= window.innerHeight * 0.8) {
                setIsVisible(false);
              }
            }, 1000);
          }}
        />
      )}
    </>
  );
}
