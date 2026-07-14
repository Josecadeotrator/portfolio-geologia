"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import BeforeAfterSlider from "./BeforeAfterSlider";

const Viewer3DLoader = dynamic(() => import("./Viewer3DLoader"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[340px] items-center justify-center bg-[#0d1a09]">
      <p className="text-xs text-white/30">Carregando modelo 3D...</p>
    </div>
  ),
});

export interface Project {
  id: number;
  name: string;
  narrative: string;
  description: string;
  tags: string[];
  image: string;
  location: string;
  deliverables: string[];
  highlight: "viewer3d" | "beforeafter" | "gallery" | "map";
  gallery: string[];
}

// Item da galeria unificada: o primeiro é sempre o interativo, os demais são fotos
type GalleryItem =
  | { type: "viewer3d" }
  | { type: "beforeafter"; before: string; after: string }
  | { type: "map" }
  | { type: "photo"; url: string; label?: string };

function buildGalleryItems(project: Project): GalleryItem[] {
  const photos: GalleryItem[] = project.gallery.map((url) => ({
    type: "photo",
    url,
  }));

  if (project.highlight === "viewer3d") {
    return [{ type: "viewer3d" }, ...photos];
  }
  if (project.highlight === "beforeafter") {
    return [
      { type: "beforeafter", before: project.gallery[0], after: project.gallery[1] ?? project.gallery[0] },
      ...photos,
    ];
  }
  if (project.highlight === "map") {
    return [{ type: "map" }, ...photos];
  }
  return photos;
}

function GalleryMain({ item, project }: { item: GalleryItem; project: Project }) {
  if (item.type === "viewer3d") {
    return (
      <div className="absolute inset-0 bg-[#0d1a09]">
        <Viewer3DLoader compact />
      </div>
    );
  }
  if (item.type === "beforeafter") {
    return (
      <div className="absolute inset-0 flex items-center bg-[#0d1a09] p-4">
        <div className="w-full">
          <BeforeAfterSlider
            before={item.before}
            after={item.after}
            beforeLabel="Levantamento topográfico"
            afterLabel="Após terraplanagem"
          />
          <p className="mt-2 text-center text-[11px] text-white/40">Arraste para comparar</p>
        </div>
      </div>
    );
  }
  if (item.type === "map") {
    return (
      <div
        className="absolute inset-0 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url('${project.gallery[0]}')` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 rounded-xl border border-white/20 bg-black/60 p-5 backdrop-blur-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/50">Legenda</p>
          {[
            { color: "#3d8c40", label: "Área RPPN (preservação)" },
            { color: "#c9963b", label: "Área livre para uso" },
            { color: "#e05c2a", label: "Pontos de construção" },
          ].map((i) => (
            <div key={i.label} className="mb-1.5 flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm" style={{ background: i.color }} />
              <span className="text-xs text-white/80">{i.label}</span>
            </div>
          ))}
          <p className="mt-3 text-[10px] text-white/30">Mapa real será inserido aqui</p>
        </div>
      </div>
    );
  }
  // photo
  return (
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url('${item.url}')` }}
    />
  );
}

function ThumbnailIcon({ item, photo }: { item: GalleryItem; photo?: string }) {
  if (item.type === "viewer3d") {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#1a2e10]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#6b8f4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }
  if (item.type === "beforeafter") {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#1a1a1a] gap-0.5 overflow-hidden rounded">
        <div className="h-full w-1/2 bg-cover bg-center" style={{ backgroundImage: `url('${item.before}')` }} />
        <div className="h-full w-1/2 bg-cover bg-center" style={{ backgroundImage: `url('${item.after}')` }} />
      </div>
    );
  }
  if (item.type === "map") {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#1a2e10]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M9 20l-5-2V4l5 2m0 14l6-2m-6 2V6m6 12l5 2V6l-5-2m0 14V4" stroke="#6b8f4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }
  return (
    <div
      className="h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url('${item.url}')` }}
    />
  );
}

export default function ProjectExpanded({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const items = buildGalleryItems(project);
  const [activeIdx, setActiveIdx] = useState(0);
  const active = items[activeIdx];

  return (
    <div className="overflow-hidden rounded-2xl border border-theme bg-surface shadow-xl">
      <div className="grid md:grid-cols-2">

        {/* Lado esquerdo — galeria unificada */}
        <div className="flex flex-col bg-[#0d1a09]">
          {/* Área principal */}
          <div className="relative flex-1" style={{ minHeight: 420 }}>
            <GalleryMain item={active} project={project} />
            {/* Label do item ativo */}
            <div className="pointer-events-none absolute top-3 left-3">
              {active.type === "viewer3d" && (
                <span className="rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white/60 backdrop-blur-sm">
                  Modelo 3D
                </span>
              )}
              {active.type === "beforeafter" && (
                <span className="rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white/60 backdrop-blur-sm">
                  Antes / Depois
                </span>
              )}
              {active.type === "map" && (
                <span className="rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-white/60 backdrop-blur-sm">
                  Zoneamento
                </span>
              )}
            </div>
          </div>

          {/* Thumbnails */}
          {items.length > 1 && (
            <div className="flex gap-2 overflow-x-auto px-3 pb-3 pt-2">
              {items.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${
                    i === activeIdx
                      ? "border-[var(--color-primary-light)] opacity-100"
                      : "border-white/10 opacity-50 hover:opacity-80"
                  }`}
                >
                  <ThumbnailIcon item={item} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Lado direito — info */}
        <div className="flex flex-col justify-between p-8">
          <div>
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-widest text-muted">
                  {project.location}
                </p>
                <h3
                  className="text-2xl font-bold text-[var(--color-text)]"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {project.name}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="ml-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-theme text-muted transition hover:bg-page"
                aria-label="Fechar"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <p className="mb-4 text-sm italic text-primary">"{project.narrative}"</p>
            <p className="mb-6 text-sm leading-relaxed text-muted">{project.description}</p>

            <div className="mb-6 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-theme px-3 py-0.5 text-[11px] font-medium text-muted"
                >
                  {t}
                </span>
              ))}
            </div>

            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted">
                Produtos entregues
              </p>
              <ul className="space-y-1.5">
                {project.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-2 text-xs text-[var(--color-text)]">
                    <span className="text-primary">✓</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <a
            href="#contato"
            className="btn-primary mt-8 inline-block rounded-full px-6 py-2.5 text-sm font-semibold text-center"
          >
            Solicitar projeto similar
          </a>
        </div>
      </div>
    </div>
  );
}
