import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FullScreenMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

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
  
  const navItems = ["Услуги", "Помощь", "Отзывы", "Контакты"];

  return (
    <>
      {/* Анимированная волна-триггер */}
      <div
        onClick={toggleMenu}
        className={`fixed right-0 top-0 z-50 h-full w-16 cursor-pointer`}
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

        {/* Анимация иконки-бургера */}
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

        {/* Анимация иконки-крестика */}
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
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={menuTransition}
            className="fixed inset-0 z-40 flex overflow-hidden bg-black text-white"
          >
            <div className="flex w-full justify-between p-8 pt-24 md:p-16 md:pt-32">
              {/* Left Side: Logo */}
              <div>
                <img
                  src="/img/logo-2.svg"
                  alt="Logo"
                  className="h-16 w-auto"
                />
              </div>

              {/* Right Side: Nav and Social */}
              <div className="flex flex-col items-end justify-between">
                <motion.nav
                  variants={navContainerVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="flex flex-col items-end gap-6 text-4xl font-bold menu-front"
                >
                  {navItems.map((item) => (
                    <motion.button
                      key={item}
                      variants={navItemVariants}
                      className="text-right"
                    >
                      {item}
                    </motion.button>
                  ))}
                </motion.nav>
                <div className="flex gap-6 text-lg">
                  <button>WhatsApp</button>
                  <button>Instagram</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}