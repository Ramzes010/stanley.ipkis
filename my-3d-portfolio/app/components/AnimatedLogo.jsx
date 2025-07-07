import React, { useRef, useEffect, useState } from "react";

// Размеры SVG и координаты глаз (примерно по центру лого, можно скорректировать)
const EYE1 = { cx: 110, cy: 80 };
const EYE2 = { cx: 230, cy: 80 };
const EYE_RADIUS = 18; // радиус "глаза"
const PUPIL_RADIUS = 7; // радиус зрачка
const PUPIL_MOVE_RADIUS = 7; // максимальное смещение зрачка от центра глаза

export default function AnimatedLogo() {
  const svgRef = useRef(null);
  const [pupilPos, setPupilPos] = useState({
    eye1: { x: EYE1.cx, y: EYE1.cy },
    eye2: { x: EYE2.cx, y: EYE2.cy },
  });

  useEffect(() => {
    function handleMouseMove(e) {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      // координаты мыши относительно SVG
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      // функция для расчёта позиции зрачка
      function calcPupil(eye) {
        const dx = mouseX - eye.cx;
        const dy = mouseY - eye.cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 1) return { x: eye.cx, y: eye.cy };
        const maxDist = Math.min(PUPIL_MOVE_RADIUS, dist);
        const ratio = maxDist / dist;
        return {
          x: eye.cx + dx * ratio,
          y: eye.cy + dy * ratio,
        };
      }
      setPupilPos({
        eye1: calcPupil(EYE1),
        eye2: calcPupil(EYE2),
      });
    }
    const svg = svgRef.current;
    svg && svg.addEventListener("mousemove", handleMouseMove);
    return () => svg && svg.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <svg
      ref={svgRef}
      width="345"
      height="166"
      viewBox="0 0 345 166"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", maxWidth: "100%", height: "auto", cursor: "pointer" }}
    >
      <rect width="179" height="166" rx="1" fill="url(#pattern0_253_7174)" />
      <path d="M172.5 128V92.4375H179.562C180.896 101.771 184.396 109.125 190.062 114.5C195.729 119.833 202.854 122.5 211.438 122.5C217.646 122.5 222.625 121.021 226.375 118.062C230.125 115.104 232 111.208 232 106.375C232 102.25 230.583 99.0417 227.75 96.75C224.917 94.4167 219.729 92.4167 212.188 90.75L201.562 88.4375C190.062 85.8542 182.375 82.7708 178.5 79.1875C174.667 75.6042 172.75 70.3333 172.75 63.375C172.75 56.125 175.542 50.3542 181.125 46.0625C186.708 41.7292 194.25 39.5625 203.75 39.5625C208.458 39.5625 212.896 40.3542 217.062 41.9375C221.271 43.4792 225.354 45.875 229.312 49.125L233.062 41.375H239.062V73.875H232.125C231.042 65.2083 228.062 58.5625 223.188 53.9375C218.354 49.3125 211.917 47 203.875 47C197.542 47 192.604 48.2917 189.062 50.875C185.521 53.4167 183.75 56.9792 183.75 61.5625C183.75 65.1458 185.146 68.0625 187.938 70.3125C190.771 72.5208 195.188 74.2083 201.188 75.375L213.562 77.9375C224.562 80.1458 232.333 83.2083 236.875 87.125C241.417 91.0417 243.688 96.5625 243.688 103.688C243.688 111.646 240.729 118.125 234.812 123.125C228.938 128.083 221.271 130.562 211.812 130.562C206.312 130.562 201.229 129.583 196.562 127.625C191.938 125.667 187.5 122.625 183.25 118.5L179.062 128H172.5ZM260.062 123C260.062 121 260.75 119.292 262.125 117.875C263.5 116.417 265.188 115.688 267.188 115.688C269.188 115.688 270.896 116.417 272.312 117.875C273.771 119.333 274.5 121.042 274.5 123C274.5 124.958 273.771 126.646 272.312 128.062C270.896 129.479 269.188 130.188 267.188 130.188C265.188 130.188 263.5 129.479 262.125 128.062C260.75 126.688 260.062 125 260.062 123ZM290.688 128V121.188H296.5C300.208 121.188 302.646 120.688 303.812 119.688C304.979 118.688 305.562 116.042 305.562 111.75V58.25C305.562 54 304.979 51.375 303.812 50.375C302.646 49.375 300.208 48.875 296.5 48.875H290.688V42.125H333.062V48.875H327.312C323.562 48.875 321.104 49.375 319.938 50.375C318.812 51.375 318.25 54 318.25 58.25V111.75C318.25 116.042 318.833 118.688 320 119.688C321.167 120.688 323.604 121.188 327.312 121.188H333.062V128H290.688Z" fill="black" />
      {/* Глаза */}
      <circle cx={EYE1.cx} cy={EYE1.cy} r={EYE_RADIUS} fill="#fff" stroke="#222" strokeWidth="2" />
      <circle cx={EYE2.cx} cy={EYE2.cy} r={EYE_RADIUS} fill="#fff" stroke="#222" strokeWidth="2" />
      {/* Зрачки */}
      <circle cx={pupilPos.eye1.x} cy={pupilPos.eye1.y} r={PUPIL_RADIUS} fill="#222" />
      <circle cx={pupilPos.eye2.x} cy={pupilPos.eye2.y} r={PUPIL_RADIUS} fill="#222" />
      {/* Градиент для фона (если нужен) */}
      <defs>
        <linearGradient id="pattern0_253_7174" x1="0" y1="0" x2="179" y2="166" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F0F0F0" />
          <stop offset="1" stopColor="#E0E0E0" />
        </linearGradient>
      </defs>
    </svg>
  );
} 