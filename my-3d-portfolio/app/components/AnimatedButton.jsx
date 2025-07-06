import React, { useState, useEffect } from "react";

export default function AnimatedButton({ children }) {
  const [hover, setHover] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);

  // Когда мышь уходит — запускаем анимацию падения вниз точки, затем скрываем её
  useEffect(() => {
    if (!hover && animatingOut) {
      const timer = setTimeout(() => {
        setAnimatingOut(false);
      }, 500); // длительность анимации падения
      return () => clearTimeout(timer);
    }
  }, [hover, animatingOut]);

  // При наведении точка появляется и анимация падения сверху
  // При уходе — запускаем анимацию падения вниз (обратную)
  const dotClassName = hover
    ? "dot dropIn"
    : animatingOut
    ? "dot dropOut"
    : "";

  const onMouseLeave = () => {
    setHover(false);
    setAnimatingOut(true);
  };

  const onMouseEnter = () => {
    setHover(true);
    setAnimatingOut(false);
  };

  return (
    <>
      <style>{`
        .btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding: 12px 24px;
          font-size: 16px;
          border: 2px solid #333;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          overflow: visible;
          user-select: none;
          transition: padding-left 0.3s ease;
          padding-left: 40px; /* чтобы текст изначально был немного правее для плавности */
        }

        /* При наведении сдвигаем текст чуть правее */
        .btn.hovered {
          padding-left: 48px;
          transition: padding-left 0.3s ease;
        }

        .dot {
          position: absolute;
          top: -24px;
          left: 12px; /* слева от текста */
          width: 1vw;
          height: 1vw;
          background: #333;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
          transform-origin: center center;
        }

        /* Анимация падения сверху с растяжением */
        @keyframes dropInAnim {
          0% {
            opacity: 1;
            top: -24px;
            width: 1vw;
            height: 1vw;
            border-radius: 50%;
            transform: scaleX(1) scaleY(1);
          }
          50% {
            top: 50%;
            width: 12px;
            height: 24px;
            border-radius: 50% / 40%;
            transform: scaleX(0.75) scaleY(1.5);
          }
          100% {
            opacity: 1;
            top: 50%;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            transform: scaleX(1) scaleY(1);
          }
        }

        /* Анимация падения вниз с сжатием */
        @keyframes dropOutAnim {
          0% {
            opacity: 1;
            top: 50%;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            transform: scaleX(1) scaleY(1);
          }
          50% {
            top: 100%;
            width: 12px;
            height: 24px;
            border-radius: 50% / 40%;
            transform: scaleX(0.75) scaleY(1.5);
          }
          100% {
            opacity: 0;
            top: 150%;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            transform: scaleX(1) scaleY(1);
          }
        }

        .dot.dropIn {
          animation: dropInAnim 0.5s forwards ease-out;
          opacity: 1;
        }

        .dot.dropOut {
          animation: dropOutAnim 0.5s forwards ease-in;
          opacity: 1;
        }
      `}</style>

      <button
        className={`btn ${hover ? "hovered" : ""}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {(hover || animatingOut) && <span className={dotClassName} />}
        {children}
      </button>
    </>
  );
}