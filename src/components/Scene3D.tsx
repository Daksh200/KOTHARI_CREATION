import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function GlassPanel({ position, rotation, scale }: { position: [number, number, number]; rotation: [number, number, number]; scale: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={ref} position={position} rotation={rotation} scale={scale}>
        <boxGeometry args={[1, 1, 0.02]} />
        <meshStandardMaterial
          color="#D4AF37"
          transparent
          opacity={0.25}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const count = 200;
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20;
    positions[i + 1] = (Math.random() - 0.5) * 20;
    positions[i + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#D4AF37" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#121212"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#D4AF37" />
      <pointLight position={[-5, 3, 2]} intensity={0.6} color="#f5e6c8" />
      <pointLight position={[3, -2, 4]} intensity={0.3} color="#D4AF37" />

      <GlassPanel position={[-3, 1, -2]} rotation={[0, 0.3, 0]} scale={[2.5, 3.5, 1]} />
      <GlassPanel position={[2.5, -0.5, -1]} rotation={[0, -0.2, 0.05]} scale={[2, 2.8, 1]} />
      <GlassPanel position={[0, 0.5, -3]} rotation={[0, 0, 0]} scale={[3, 4, 1]} />
      
      <Particles />
    </Canvas>
  );
}
