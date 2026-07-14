"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import * as THREE from "three";

function TerrainMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Gera um terreno procedural simples
  const width = 60;
  const height = 60;
  const segments = 40;

  const geometry = new THREE.PlaneGeometry(width, height, segments, segments);
  const positions = geometry.attributes.position;

  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const z =
      Math.sin(x * 0.15) * 3 +
      Math.cos(y * 0.12) * 2 +
      Math.sin((x + y) * 0.08) * 1.5 +
      Math.cos(x * 0.05) * 4;
    positions.setZ(i, z);
  }

  geometry.computeVertexNormals();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.04;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2.5, 0, 0]}>
      <meshStandardMaterial
        color="var(--color-primary, #3d5c2e)"
        wireframe={false}
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
}

function WireframeTerrain() {
  const width = 60;
  const height = 60;
  const segments = 40;

  const geometry = new THREE.PlaneGeometry(width, height, segments, segments);
  const positions = geometry.attributes.position;

  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const z =
      Math.sin(x * 0.15) * 3 +
      Math.cos(y * 0.12) * 2 +
      Math.sin((x + y) * 0.08) * 1.5 +
      Math.cos(x * 0.05) * 4;
    positions.setZ(i, z);
  }

  geometry.computeVertexNormals();

  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2.5, 0, 0]}>
      <meshBasicMaterial color="#ffffff" wireframe opacity={0.08} transparent />
    </mesh>
  );
}

function Viewer3DCanvas({ height = 480 }: { height?: number }) {
  return (
    <div className="relative w-full" style={{ height }}>
      <Canvas
        camera={{ position: [0, 30, 50], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 20, 10]} intensity={1.2} color="#a8d08a" />
        <directionalLight position={[-10, 5, -10]} intensity={0.3} color="#4a7030" />
        <TerrainMesh />
        <WireframeTerrain />
        <OrbitControls
          enablePan={false}
          minPolarAngle={0.3}
          maxPolarAngle={Math.PI / 2.2}
          minDistance={20}
          maxDistance={90}
        />
      </Canvas>
      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-4 py-1.5 backdrop-blur-sm">
        <p className="text-xs text-white/50">
          Terreno simulado — modelo 3D real será inserido aqui
        </p>
      </div>
    </div>
  );
}

export default function Viewer3D({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="bg-[#0d1a09]">
        <Viewer3DCanvas height={300} />
      </div>
    );
  }

  return (
    <section id="visualizar" className="relative overflow-hidden bg-[#0d1a09] py-0">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Visualize os dados
          </p>
          <h2
            className="max-w-xl text-3xl font-bold text-white md:text-4xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Seu terreno em três dimensões
          </h2>
          <p className="mt-3 max-w-lg text-sm text-white/50">
            Modelo 3D interativo — arraste para rotacionar, scroll para zoom.
            Nos projetos reais, este é o modelo gerado pelo drone da sua propriedade.
          </p>
        </div>
      </div>

      <Viewer3DCanvas height={480} />

      <div className="pb-20" />
    </section>
  );
}
