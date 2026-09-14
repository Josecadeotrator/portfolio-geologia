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
  // Vista inicial fixa (ajustada manualmente); quando ausente, cai no
  // enquadramento automático calculado a partir do bounding box.
  initialCameraPosition?: [number, number, number];
  initialCameraTarget?: [number, number, number];
};

// useGLTF recebe strings soltas (não passam pelo pipeline de assets do
// Next), então precisam do basePath manualmente — ver next.config.ts.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const DRACO_PATH = `${BASE_PATH}/draco/`;

const MODELS: ModelSlide[] = [
  {
    id: "fazenda-sossego",
    name: "Fazenda Sossego",
    url: `${BASE_PATH}/models/fazenda-sossego-terreno.glb`,
    caption: "Modelo real — Fazenda Sossego, gerado por drone",
    initialCameraPosition: [2436.5996478041598, 1176.1868145851327, -1036.1427225015075],
    initialCameraTarget: [304.489295218681, -312.8402525450064, -306.24591859599747],
  },
];

// Os modelos são terrenos deitados (grande extensão em X/Z, relevo suave em
// Y), então o enquadramento mira numa vista aérea em ângulo (tipo drone).
const VIEW_AZIMUTH = 0.5; // rad, ~29° em torno do eixo vertical
const VIEW_POLAR = 1.0; // rad, ~57° a partir do topo (vista de cima em diagonal)

function TerrainModel({
  model,
  controlsRef,
}: {
  model: ModelSlide;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}) {
  const { scene } = useGLTF(model.url, DRACO_PATH);
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
    const boxCenter = box.getCenter(new THREE.Vector3());

    const perspective = camera as THREE.PerspectiveCamera;
    const maxDim = Math.max(size.x, size.z);
    const fitDistance =
      (maxDim / 2 / Math.tan((perspective.fov * Math.PI) / 360)) * 1.5;

    const center = model.initialCameraTarget
      ? new THREE.Vector3(...model.initialCameraTarget)
      : boxCenter;

    if (model.initialCameraPosition) {
      camera.position.set(...model.initialCameraPosition);
    } else {
      camera.position.set(
        center.x + fitDistance * Math.sin(VIEW_POLAR) * Math.sin(VIEW_AZIMUTH),
        center.y + fitDistance * Math.cos(VIEW_POLAR),
        center.z + fitDistance * Math.sin(VIEW_POLAR) * Math.cos(VIEW_AZIMUTH)
      );
    }
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
  }, [cloned, get, controlsRef, model.initialCameraPosition, model.initialCameraTarget]);

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
  // Controles só ficam ativos depois de um clique explícito — assim o
  // scroll do mouse passando por cima do modelo rola a página normalmente,
  // em vez de dar zoom no canvas sem o usuário querer.
  const [active, setActive] = useState(false);

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
      onMouseLeave={() => setActive(false)}
    >
      <Canvas
        key={model.id}
        camera={{ position: [0, 30, 50], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <SceneLighting />
        <Suspense fallback={<Fallback />}>
          <TerrainModel model={model} controlsRef={controlsRef} />
        </Suspense>
        <OrbitControls
          ref={controlsRef}
          enabled={active}
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

      {!active && (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-black/25 text-center transition-colors hover:bg-black/35"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/50">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 3v7.5M9 3L6.5 5.5M9 3l2.5 2.5M15 21v-7.5M15 21l-2.5-2.5M15 21l2.5-2.5M3 15h7.5M3 15l2.5-2.5M3 15l2.5 2.5M21 9h-7.5M21 9l-2.5 2.5M21 9l-2.5-2.5"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-sm font-medium text-white">Clique para interagir</span>
          <span className="max-w-[220px] text-[11px] leading-relaxed text-white/60">
            Arraste para mover · Scroll para zoom · Botão do meio para girar
          </span>
        </button>
      )}

      {slides && slides.length > 1 && (
        <div className="absolute top-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
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

      <div className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <Viewer3DCanvas
            height={480}
            model={MODELS[activeIndex]}
            slides={MODELS}
            activeIndex={activeIndex}
            onSelectSlide={setActiveIndex}
          />
        </div>
      </div>

      <div className="pb-20" />
    </section>
  );
}

for (const slide of MODELS) {
  useGLTF.preload(slide.url, DRACO_PATH);
}
