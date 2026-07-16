"use client";

import { Suspense, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

type ModelSlide = {
  id: string;
  name: string;
  url: string;
  caption: string;
};

// useGLTF recebe strings soltas (não passam pelo pipeline de assets do
// Next), então precisam do basePath manualmente — ver next.config.ts.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const DRACO_PATH = `${BASE_PATH}/draco/`;

const MODELS: ModelSlide[] = [
  {
    id: "pedra-furada",
    name: "Pedra Furada",
    url: `${BASE_PATH}/models/pedra-furada-terreno.glb`,
    caption: "Modelo real — Pedra Furada, gerado por drone",
  },
  {
    id: "fazenda-sossego",
    name: "Fazenda Sossego",
    url: `${BASE_PATH}/models/fazenda-sossego-terreno.glb`,
    caption: "Modelo real — Fazenda Sossego, gerado por drone",
  },
];

// Os modelos são terrenos deitados (grande extensão em X/Z, relevo suave em
// Y), então o enquadramento mira numa vista aérea em ângulo (tipo drone).
const VIEW_AZIMUTH = 0.5; // rad, ~29° em torno do eixo vertical
const VIEW_POLAR = 1.0; // rad, ~57° a partir do topo (vista de cima em diagonal)

function TerrainModel({
  url,
  controlsRef,
}: {
  url: string;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}) {
  const { scene } = useGLTF(url, DRACO_PATH);
  const cloned = useMemo(() => scene.clone(true), [scene]);
  const get = useThree((state) => state.get);

  useLayoutEffect(() => {
    const { camera, gl } = get();

    // Sem filtro anisotrópico a textura fica borrada/blocuda no ângulo
    // rasante da vista aérea, especialmente longe da câmera.
    const maxAnisotropy = gl.capabilities.getMaxAnisotropy();
    cloned.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const material = child.material as THREE.MeshStandardMaterial;
      if (material.map) material.map.anisotropy = maxAnisotropy;
    });

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
    // Near/far escalados ao tamanho do modelo — Fazenda Sossego é ~7x maior
    // que Pedra Furada, um near/far fixo cortaria geometria de um dos dois.
    perspective.near = Math.max(fitDistance / 10000, 0.02);
    perspective.far = fitDistance * 10;
    perspective.updateProjectionMatrix();
    camera.lookAt(center);

    const controls = controlsRef.current;
    if (controls) {
      controls.target.copy(center);
      controls.minDistance = perspective.near * 10;
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
  // Luz neutra (branca): a textura desses modelos já vem com a iluminação
  // real "assada" das fotos do drone — luz colorida na cena distorce as
  // cores originais em vez de só sombrear o relevo.
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 20, 10]} intensity={1.1} color="#ffffff" />
      <directionalLight position={[-10, 5, -10]} intensity={0.4} color="#ffffff" />
    </>
  );
}

function Viewer3DCanvas({
  height = 480,
  model,
  slides,
  activeIndex,
  onSelectSlide,
}: {
  height?: number;
  model: ModelSlide;
  slides?: ModelSlide[];
  activeIndex?: number;
  onSelectSlide?: (index: number) => void;
}) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  return (
    <div
      className="relative w-full"
      style={{ height }}
      onMouseDown={(e) => {
        // Impede o autoscroll nativo do navegador ao clicar com o botão do
        // meio, que senão compete com o controle de rotação do OrbitControls.
        if (e.button === 1) e.preventDefault();
      }}
      onAuxClick={(e) => e.preventDefault()}
    >
      <Canvas
        key={model.id}
        camera={{ position: [0, 30, 50], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <SceneLighting />
        <Suspense fallback={<Fallback />}>
          <TerrainModel url={model.url} controlsRef={controlsRef} />
        </Suspense>
        <OrbitControls
          ref={controlsRef}
          enablePan
          screenSpacePanning
          mouseButtons={{
            LEFT: THREE.MOUSE.PAN,
            MIDDLE: THREE.MOUSE.ROTATE,
            RIGHT: THREE.MOUSE.PAN,
          }}
          minPolarAngle={0.3}
          maxPolarAngle={Math.PI / 2.2}
        />
      </Canvas>

      {slides && slides.length > 1 && (
        <div className="absolute top-4 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => onSelectSlide?.(index)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-colors ${
                index === activeIndex
                  ? "border-primary bg-primary text-white"
                  : "border-white/10 bg-black/50 text-white/50 hover:text-white/80"
              }`}
            >
              {slide.name}
            </button>
          ))}
        </div>
      )}

      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-4 py-1.5 backdrop-blur-sm">
        <p className="text-xs text-white/50">{model.caption}</p>
      </div>
    </div>
  );
}

export default function Viewer3D({ compact = false }: { compact?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (compact) {
    return (
      <div className="bg-[#0d1a09]">
        <Viewer3DCanvas height={300} model={MODELS[0]} />
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
            Modelo 3D interativo — arraste para mover, scroll para zoom,
            clique com a rodinha para rotacionar.
          </p>
        </div>
      </div>

      <Viewer3DCanvas
        height={480}
        model={MODELS[activeIndex]}
        slides={MODELS}
        activeIndex={activeIndex}
        onSelectSlide={setActiveIndex}
      />

      <div className="pb-20" />
    </section>
  );
}

for (const slide of MODELS) {
  useGLTF.preload(slide.url, DRACO_PATH);
}
