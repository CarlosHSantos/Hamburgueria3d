"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import Burger from "./Burger";

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0.8, 7.5], fov: 40 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "#0a0a0a" }}
    >
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.4} />

      {/* Main key light — warm, from top-right */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.8}
        color="#FFF5E6"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Fill light — cooler, from left */}
      <directionalLight position={[-4, 3, 2]} intensity={0.6} color="#B0C4DE" />

      {/* Rim light — from behind for edge definition */}
      <directionalLight position={[0, 2, -5]} intensity={0.8} color="#FF6B35" />

      {/* Spot light — dramatic top-down on burger */}
      <spotLight
        position={[0, 10, 0]}
        angle={0.4}
        penumbra={0.8}
        intensity={1.2}
        color="#FFFFFF"
        castShadow
      />

      {/* Environment map for realistic reflections */}
      <Environment preset="city" />

      {/* Contact shadow below the burger */}
      <ContactShadows
        position={[0, -3.0, 0]}
        opacity={0.5}
        scale={10}
        blur={2.5}
        far={5}
        color="#000000"
      />

      {/* The Burger */}
      <Burger />
    </Canvas>
  );
}
