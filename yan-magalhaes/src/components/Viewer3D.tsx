"use client";

import { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

const MODEL_URL = "/models/pedra-furada-terreno.glb";

// O modelo é um terreno deitado (grande extensão em X/Z, relevo suave em Y),
// então o enquadramento mira numa vista aérea em ângulo (tipo drone), não frontal.
const VIEW_AZIMUTH = 0.5; // rad, ~29° em torno do eixo vertical
const VIEW_POLAR = 1.0; // rad, ~57° a partir do topo (vista de cima em diagonal)

function TerrainModel({
  controlsRef,
}: {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}) {
  const { scene } = useGLTF(MODEL_URL, "/draco/");
  const cloned = useMemo(() => scene.clone(true), [scene]);
  const get = useThree((state) => state.get);

  useLayoutEffect(() => {
    const { camera } = get();
    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const perspective = camera as THREE.PerspectiveCamera;
    const maxDim = Math.max(size.x, size.z);
    const fitDistance =
      (maxDim / 2 / Math.tan((perspective.fov * Math.PI) / 360)) * 1.5;

    camera.position.set(
      center.x + fitDistance * Math.sin(VIEW_POLAR) * Math.sin(VIEW_AZIMUTH),
      center.y + fitDistance * Math.cos(VIEW_POLAR),
      center.z + fitDistance * Math.sin(VIEW_POLAR) * Math.cos(VIEW_AZIMUTH)
    );
    perspective.near = fitDistance / 100;
    perspective.far = fitDistance * 10;
    perspective.updateProjectionMatrix();
    camera.lookAt(center);

    const controls = controlsRef.current;
    if (controls) {
      controls.target.copy(center);
      controls.minDistance = fitDistance * 0.3;
      controls.maxDistance = fitDistance * 2.5;
      controls.update();
    }
  }, [cloned, get, controlsRef]);

  return <primitive object={cloned} />;
}

function Fallback() {
  return (
    <mesh rotation={[-Math.PI / 2.5, 0, 0]}>
      <planeGeometry args={[60, 60, 1, 1]} />
      <meshStandardMaterial color="#3d5c2e" wireframe opacity={0.15} transparent />
    </mesh>
  );
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 10]} intensity={1.2} color="#a8d08a" />
      <directionalLight position={[-10, 5, -10]} intensity={0.35} color="#4a7030" />
    </>
  );
}

function Viewer3DCanvas({ height = 480 }: { height?: number }) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  return (
    <div className="relative w-full" style={{ height }}>
      <Canvas
        camera={{ position: [0, 30, 50], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <SceneLighting />
        <Suspense fallback={<Fallback />}>
          <TerrainModel controlsRef={controlsRef} />
        </Suspense>
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          minPolarAngle={0.3}
          maxPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-4 py-1.5 backdrop-blur-sm">
        <p className="text-xs text-white/50">
          Modelo real — Pedra Furada, gerado por drone
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
            Este é o modelo gerado pelo drone da propriedade Pedra Furada.
          </p>
        </div>
      </div>

      <Viewer3DCanvas height={480} />

      <div className="pb-20" />
    </section>
  );
}

useGLTF.preload(MODEL_URL, "/draco/");
