"use client";

import { useRef, useState, useCallback } from "react";

interface Props {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  before,
  after,
  beforeLabel = "Antes",
  afterLabel = "Depois",
}: Props) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative select-none overflow-hidden rounded-xl"
      style={{ aspectRatio: "16/9", cursor: "ew-resize" }}
      onMouseDown={(e) => { dragging.current = true; updatePos(e.clientX); }}
      onMouseMove={(e) => { if (dragging.current) updatePos(e.clientX); }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onTouchStart={(e) => { dragging.current = true; updatePos(e.touches[0].clientX); }}
      onTouchMove={(e) => { if (dragging.current) updatePos(e.touches[0].clientX); }}
      onTouchEnd={() => { dragging.current = false; }}
    >
      {/* Imagem "depois" (fundo completo) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${after}')` }}
      />

      {/* Imagem "antes" (clip pela posição) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${before}')`,
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
        }}
      />

      {/* Linha divisória */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
        style={{ left: `${pos}%` }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-white/20 shadow-xl backdrop-blur-sm">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 4l-3 4 3 4M11 4l3 4-3 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 rounded-full bg-black/50 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="absolute top-3 right-3 rounded-full bg-black/50 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
        {afterLabel}
      </span>
    </div>
  );
}
