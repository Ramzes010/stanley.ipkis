'use client'
import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ElegantWave({ isOpen, mouseY }) {
  const mesh = useRef()
  const material = useRef()
  const hoverProgress = useRef(0)
  
  useFrame(({ clock }) => {
    if (!mesh.current) return
    
    const time = clock.getElapsedTime()
    const positions = mesh.current.geometry.attributes.position
    const factor = isOpen ? 0.3 : 1.0 // Уменьшаем эффект при открытии
    
    // Плавное следование за курсором
    hoverProgress.current = THREE.MathUtils.lerp(
      hoverProgress.current, 
      isOpen ? 0 : 1, 
      0.1
    )
    
    const targetY = (mouseY / window.innerHeight) * 2 - 1 // Нормализуем в [-1, 1]
    
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const y = positions.getY(i)
      
      // Органичная волна с плавными изгибами
      const wave = 
        Math.sin(x * 5 + time * 1.5) * 0.15 * factor * hoverProgress.current +
        Math.cos(y * 3 + time) * 0.1 * factor * hoverProgress.current +
        Math.sin(x * 10 + y * 5 + time * 2) * 0.05 * factor * hoverProgress.current
      
      // Плавное отклонение к курсору
      const followEffect = (1 - Math.abs(y - targetY)) * 0.3 * hoverProgress.current
      
      positions.setZ(i, wave + followEffect)
    }
    
    positions.needsUpdate = true
    
    // Плавное изменение цвета
    material.current.color.lerp(
      new THREE.Color(isOpen ? '#ffffff' : '#000000'), 
      0.1
    )
  })

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[1, 2, 64, 64]} /> {/* Больше детализации */}
      <meshStandardMaterial 
        ref={material}
        roughness={0.15}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export default function WaveHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [mouseY, setMouseY] = useState(0)
  const containerRef = useRef()

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) setMouseY(e.clientY - rect.top)
  }

  return (
    <div className="fixed top-0 right-0 z-50 h-screen w-20">
      <div
        ref={containerRef}
        className={`h-full w-full transition-all duration-500 ${isOpen ? 'w-screen' : 'w-20'}`}
        onMouseMove={handleMouseMove}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Canvas>
          <ambientLight intensity={0.7} />
          <pointLight position={[5, 5, 5]} intensity={1.5} />
          <ElegantWave isOpen={isOpen} mouseY={mouseY} />
        </Canvas>

        <button 
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10
            text-2xl transition-all duration-300 ${isOpen ? 'text-black' : 'text-white'}`}
        >
          {isOpen ? (
            <CloseIcon className="w-8 h-8" />
          ) : (
            <MenuIcon className="w-8 h-8" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-40 flex bg-black text-white p-12">
          <div className="w-20 h-full" />
          <div className="flex-1 pl-8">
            <h1 className="text-5xl font-bold mb-8">HELLO MONDAY</h1>
            <div className="text-xl opacity-80 mb-12">We craft digital experiences</div>
            <div className="space-y-6">
              <NavItem>Work</NavItem>
              <NavItem>About</NavItem>
              <NavItem>Contact</NavItem>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Компоненты иконок
const MenuIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const CloseIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const NavItem = ({ children }) => (
  <div className="text-3xl font-medium hover:opacity-70 transition-opacity cursor-pointer">
    {children}
  </div>
)