'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function FluidWave({ isOpen, mouseY }) {
  const meshRef = useRef()
  const uniforms = useRef({
    time: { value: 0 },
    mouseY: { value: 0.5 },
    progress: { value: 0 }
  })

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    
    uniforms.current.time.value = clock.getElapsedTime()
    uniforms.current.mouseY.value = THREE.MathUtils.lerp(
      uniforms.current.mouseY.value,
      isOpen ? 0.5 : mouseY / window.innerHeight,
      0.1
    )
    uniforms.current.progress.value = isOpen ? 1 : 0
  })

  // Вершинный шейдер
  const vertexShader = `
    uniform float time;
    uniform float mouseY;
    uniform float progress;
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      float wave = sin(time * 2.0 + uv.x * 10.0) * 0.1 * (1.0 - progress);
      float verticalFollow = smoothstep(0.3, 0.7, uv.y) * 0.5;
      vec3 pos = position;
      pos.x += wave * (1.0 - abs(uv.y - mouseY)) * verticalFollow;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `

  // Фрагментный шейдер
  const fragmentShader = `
    uniform float progress;
    varying vec2 vUv;
    
    void main() {
      vec3 color = mix(
        vec3(0.0, 0.0, 0.0), // Чёрный
        vec3(1.0, 1.0, 1.0), // Белый
        progress
      );
      gl_FragColor = vec4(color, 1.0);
    }
  `

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[1, 2, 32, 32]} />
      <shaderMaterial
        uniforms={uniforms.current}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}