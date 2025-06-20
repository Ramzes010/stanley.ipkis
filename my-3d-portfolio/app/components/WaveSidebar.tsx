import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WavySidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Триггерная волна справа */}
      {!isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed right-0 top-0 z-30 h-full w-12 cursor-pointer"
        >
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
            <path d="M0,0 C40,50 40,50 0,100 L100,100 L100,0 Z" fill="black" />
          </svg>
          <div className="absolute top-1/2 right-2 -translate-y-1/2 text-white">
            {/* Ваша иконка */}
            <span className="text-2xl">≡</span>
          </div>
        </div>
      )}

      {/* Меню */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 flex bg-black text-white"
          >
            {/* Волна слева */}
            <div
              onClick={toggleSidebar}
              className="relative z-50 h-full w-12 cursor-pointer"
            >
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
                <path d="M100,0 C60,50 60,50 100,100 L0,100 L0,0 Z" fill="white" />
              </svg>
              <div className="absolute top-1/2 left-2 -translate-y-1/2 text-black">
                <span className="text-2xl">×</span>
              </div>
            </div>

            {/* Контент */}
            <div className="flex flex-1 flex-col justify-between px-12 py-10">
              <div>
                {/* Ваш логотип */}
                <div className="mb-10">
                  <img src="/img/logo-2.svg" alt="Logo" className="h-16 w-auto" />
                </div>

                {/* Основные кнопки */}
                <nav className="flex flex-col gap-6 text-4xl font-bold">
                  <button>Обо мне</button>
                  <button>Услуги</button>
                  <button>Отзывы</button>
                  <button>Контакты</button>
                </nav>
              </div>

              {/* Соцсети */}
              <div className="flex gap-6">
                <button>WhatsApp</button>
                <button>Instagram</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}