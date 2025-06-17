'use client'
import { useState, useEffect, useRef } from 'react';

export default function WaveHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const waveRef = useRef(null);
  const [wavePosition, setWavePosition] = useState(50);

  // Анимация волны по курсору
  const handleMouseMove = (e) => {
    if (waveRef.current && !isMenuOpen) {
      const rect = waveRef.current.getBoundingClientRect();
      setWavePosition(((e.clientY - rect.top) / rect.height) * 100);
    }
  };

  // Закрытие по ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Контейнер волны */}
      <div 
        ref={waveRef}
        className="fixed top-0 right-0 h-full z-50 w-1/2"
        onMouseMove={handleMouseMove}
      >
        {/* Анимированная волна */}
        <div 
          className={`absolute right-0 h-full bg-black transition-all duration-500 ease-in-out ${
            isMenuOpen ? 'w-full' : 'w-20'
          }`}
          style={{
            clipPath: isMenuOpen 
              ? 'none' 
              : `path('M0 ${wavePosition - 10}% Q 25% ${wavePosition}% 50% ${wavePosition - 10}% T 100% ${wavePosition}% L 100% 100% L 0 100% Z')`
          }}
        >
          {/* Кнопка меню */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <CloseIcon />
            ) : (
              <MenuIcon />
            )}
          </button>
        </div>

        {/* Контент меню */}
        {isMenuOpen && (
          <div className="absolute inset-0 flex flex-col justify-center items-start p-12 text-white">
            <nav className="space-y-6">
              <a href="/work" className="block text-2xl hover:text-gray-300">Work</a>
              <a href="/services" className="block text-2xl hover:text-gray-300">Services</a>
              <div className="space-y-2">
                <a href="/about" className="block hover:text-gray-300">About</a>
                <a href="/stories" className="block hover:text-gray-300">Stories</a>
                <a href="/product" className="block hover:text-gray-300">Product</a>
              </div>
            </nav>
            
            <div className="mt-auto flex space-x-4">
              <a href="#" className="hover:text-gray-300">Facebook</a>
              <a href="#" className="hover:text-gray-300">Instagram</a>
              <a href="#" className="hover:text-gray-300">Twitter</a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// Выносим иконки в отдельные компоненты
function MenuIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 19 15" fill="white">
      {/* Ваш SVG код меню */}
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="white">
      {/* Ваш SVG код закрытия */}
    </svg>
  );
}