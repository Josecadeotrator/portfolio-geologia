"use client";

import dynamic from "next/dynamic";

const Viewer3D = dynamic(() => import("./Viewer3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[480px] items-center justify-center bg-[#0d1a09]">
      <p className="text-xs text-white/30">Carregando modelo 3D...</p>
    </div>
  ),
});

export default function Viewer3DLoader({ compact = false }: { compact?: boolean }) {
  return <Viewer3D compact={compact} />;
}
