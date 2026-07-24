"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Burger Layer Configuration
 *
 * Each layer represents an ingredient in the burger.
 * The burger is positioned lower in the viewport so it doesn't overlap
 * with the hero text at the top.
 *
 * - baseY: Y position when fully assembled
 * - targetOffset: Y offset at full deconstruction (progress = 1)
 * - rotZ / rotX: organic tilt rotation at full deconstruction
 */
const LAYERS = [
  {
    name: "topBun",
    baseY: 1.0,
    targetOffset: 2.8,
    rotZ: -0.12,
    rotX: 0.05,
  },
  {
    name: "lettuce",
    baseY: 0.6,
    targetOffset: 1.6,
    rotZ: 0.1,
    rotX: -0.06,
  },
  {
    name: "tomato",
    baseY: 0.35,
    targetOffset: 0.8,
    rotZ: -0.08,
    rotX: 0.05,
  },
  {
    name: "cheese",
    baseY: 0.15,
    targetOffset: 0.2,
    rotZ: 0.06,
    rotX: -0.03,
  },
  {
    name: "patty",
    baseY: -0.15,
    targetOffset: 0,
    rotZ: 0,
    rotX: 0,
  },
  {
    name: "bottomBun",
    baseY: -0.65,
    targetOffset: -2.0,
    rotZ: 0.08,
    rotX: -0.04,
  },
];

export default function Burger() {
  const groupRef = useRef<THREE.Group>(null);
  const layerRefs = useRef<(THREE.Group | null)[]>([]);
  const progressRef = useRef(0);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;

    // Calculate scroll progress
    // Deconstruction happens from ~0.6vh to ~2.8vh of scroll
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const startScroll = vh * 0.6;
    const endScroll = vh * 2.8;
    const targetProgress = THREE.MathUtils.clamp(
      (scrollY - startScroll) / (endScroll - startScroll),
      0,
      1
    );

    // Smooth exponential lerp (framerate-independent)
    progressRef.current = THREE.MathUtils.lerp(
      progressRef.current,
      targetProgress,
      1 - Math.pow(0.001, delta)
    );
    const p = progressRef.current;

    // Auto-rotation: slows as burger deconstructs
    groupRef.current.rotation.y += delta * 0.2 * (1 - p * 0.4);

    // Animate each layer
    LAYERS.forEach((layer, i) => {
      const ref = layerRefs.current[i];
      if (!ref) return;

      ref.position.y = layer.baseY + layer.targetOffset * p;
      ref.rotation.z = layer.rotZ * p;
      ref.rotation.x = layer.rotX * p;
    });
  });

  return (
    <group ref={groupRef} position={[0, -1.2, 0]} scale={1.0}>
      {LAYERS.map((layer, i) => (
        <group
          key={layer.name}
          ref={(el) => {
            layerRefs.current[i] = el;
          }}
          position={[0, layer.baseY, 0]}
        >
          {layer.name === "topBun" && <TopBun />}
          {layer.name === "lettuce" && <Lettuce />}
          {layer.name === "tomato" && <Tomato />}
          {layer.name === "cheese" && <Cheese />}
          {layer.name === "patty" && <Patty />}
          {layer.name === "bottomBun" && <BottomBun />}
        </group>
      ))}
    </group>
  );
}

/* ============================================ */
/*        PROCEDURAL INGREDIENT MESHES          */
/* ============================================ */

/** Top Bun — Dome shape with sesame seeds */
function TopBun() {
  const seeds = useMemo(() => {
    const result: {
      x: number;
      y: number;
      z: number;
      rotX: number;
      rotZ: number;
    }[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < 30; i++) {
      const theta = i * goldenAngle;
      const phi = 0.15 + (i / 30) * 0.55;
      const r = 1.08;
      result.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.cos(phi) * 0.45 + 0.02,
        z: r * Math.sin(phi) * Math.sin(theta),
        rotX: i * 1.3,
        rotZ: i * 0.9,
      });
    }
    return result;
  }, []);

  return (
    <group>
      {/* Bun body — cylindrical base */}
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[1.05, 1.12, 0.22, 32]} />
        <meshStandardMaterial
          color="#C68B3A"
          roughness={0.65}
          metalness={0.05}
        />
      </mesh>

      {/* Bun dome — squashed sphere for rounded top */}
      <mesh position={[0, 0.08, 0]} scale={[1, 0.48, 1]}>
        <sphereGeometry args={[1.08, 32, 24]} />
        <meshStandardMaterial
          color="#B87A2E"
          roughness={0.6}
          metalness={0.05}
        />
      </mesh>

      {/* Sesame seeds */}
      {seeds.map((seed, i) => (
        <mesh
          key={i}
          position={[seed.x, seed.y, seed.z]}
          rotation={[seed.rotX, 0, seed.rotZ]}
          scale={[0.045, 0.022, 0.028]}
        >
          <sphereGeometry args={[1, 6, 4]} />
          <meshStandardMaterial color="#F5E6C8" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

/** Lettuce — Ruffled ring shape */
function Lettuce() {
  const geometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(1.18, 1.22, 0.08, 48, 1);
    const pos = geo.attributes.position;
    const vec = new THREE.Vector3();

    for (let i = 0; i < pos.count; i++) {
      vec.fromBufferAttribute(pos, i);
      const dist = Math.sqrt(vec.x * vec.x + vec.z * vec.z);
      if (dist > 0.9) {
        const angle = Math.atan2(vec.z, vec.x);
        const ruffle =
          Math.sin(angle * 8) * 0.06 + Math.sin(angle * 13) * 0.03;
        vec.y += ruffle;
        const extend = 1 + Math.sin(angle * 6) * 0.08;
        vec.x *= extend;
        vec.z *= extend;
      }
      pos.setXYZ(i, vec.x, vec.y, vec.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color="#4CAF50"
        roughness={0.75}
        metalness={0.0}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/** Tomato — Flat red disc */
function Tomato() {
  return (
    <mesh>
      <cylinderGeometry args={[0.95, 0.95, 0.1, 32]} />
      <meshStandardMaterial color="#D32F2F" roughness={0.35} metalness={0.1} />
    </mesh>
  );
}

/** Cheese — Square with droopy edges */
function Cheese() {
  const geometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(1.12, 1.15, 0.04, 4, 1);
    const pos = geo.attributes.position;
    const vec = new THREE.Vector3();

    for (let i = 0; i < pos.count; i++) {
      vec.fromBufferAttribute(pos, i);
      const dist = Math.sqrt(vec.x * vec.x + vec.z * vec.z);
      if (dist > 0.8) {
        vec.y -= (dist - 0.8) * 0.15;
      }
      pos.setXYZ(i, vec.x, vec.y, vec.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} rotation={[0, Math.PI / 4, 0]}>
      <meshStandardMaterial
        color="#FFA726"
        roughness={0.45}
        metalness={0.15}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/** Patty — Thick brown disc with char layer */
function Patty() {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[1.0, 1.02, 0.3, 32]} />
        <meshStandardMaterial
          color="#3E2723"
          roughness={0.85}
          metalness={0.05}
          emissive="#1A0500"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[1.01, 1.0, 0.03, 32]} />
        <meshStandardMaterial color="#2D1B11" roughness={0.95} metalness={0.0} />
      </mesh>
    </group>
  );
}

/** Bottom Bun — Flatter cylindrical shape */
function BottomBun() {
  return (
    <group>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[1.12, 1.15, 0.25, 32]} />
        <meshStandardMaterial
          color="#C6893A"
          roughness={0.65}
          metalness={0.05}
        />
      </mesh>
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[1.1, 1.12, 0.04, 32]} />
        <meshStandardMaterial color="#D4A050" roughness={0.55} metalness={0.0} />
      </mesh>
    </group>
  );
}
