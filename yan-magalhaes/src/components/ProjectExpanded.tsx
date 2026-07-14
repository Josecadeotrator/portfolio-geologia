"use client";

import dynamic from "next/dynamic";
import BeforeAfterSlider from "./BeforeAfterSlider";

const Viewer3DLoader = dynamic(() => import("./Viewer3DLoader"), {
  ssr: false,
  loading: () => (
    <div className="flex h-64 items-center justify-center bg-[#0d1a09]">
      <p className="text-xs text-white/30">Carregando modelo 3D...</p>
    </div>
  ),
});

interface Project {
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

export default function ProjectExpanded({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="col-span-full overflow-hidden rounded-2xl border border-theme bg-surface shadow-xl">
      {/* Cabeçalho */}
      <div className="grid md:grid-cols-2">
        {/* Galeria / foto principal */}
        <div className="relative min-h-[280px] md:min-h-[360px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${project.gallery[0]}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Miniaturas */}
          {project.gallery.length > 1 && (
            <div className="absolute bottom-4 left-4 flex gap-2">
              {project.gallery.map((img, i) => (
                <div
                  key={i}
                  className={`h-12 w-16 rounded-md bg-cover bg-center ring-2 ${i === 0 ? "ring-white" : "ring-white/30"}`}
                  style={{ backgroundImage: `url('${img}')` }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info */}
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

            {/* Tags */}
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

            {/* Entregas */}
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

      {/* Destaque interativo */}
      <div className="border-t border-theme">
        {project.highlight === "beforeafter" && (
          <div className="p-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
              Antes e depois
            </p>
            <BeforeAfterSlider
              before={project.gallery[0]}
              after={project.gallery[1] ?? project.gallery[0]}
              beforeLabel="Levantamento topográfico"
              afterLabel="Após terraplanagem"
            />
            <p className="mt-3 text-center text-[11px] text-muted">
              Arraste para comparar
            </p>
          </div>
        )}

        {project.highlight === "viewer3d" && (
          <div>
            <div className="border-b border-theme px-6 py-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                Modelo 3D do terreno
              </p>
            </div>
            <Viewer3DLoader compact />
          </div>
        )}

        {project.highlight === "gallery" && project.gallery.length > 1 && (
          <div className="p-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
              Galeria do projeto
            </p>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {project.gallery.map((img, i) => (
                <div
                  key={i}
                  className="aspect-video rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url('${img}')` }}
                />
              ))}
            </div>
          </div>
        )}

        {project.highlight === "map" && (
          <div className="p-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
              Zoneamento da propriedade
            </p>
            <div
              className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-cover bg-center"
              style={{ backgroundImage: `url('${project.gallery[0]}')` }}
            >
              <div className="absolute inset-0 bg-black/40" />
              {/* Legenda simulada */}
              <div className="relative z-10 rounded-xl border border-white/20 bg-black/60 p-5 backdrop-blur-sm">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/50">
                  Legenda
                </p>
                {[
                  { color: "#3d8c40", label: "Área RPPN (preservação)" },
                  { color: "#c9963b", label: "Área livre para uso" },
                  { color: "#e05c2a", label: "Pontos de construção" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 mb-1.5">
                    <span className="h-3 w-3 rounded-sm" style={{ background: item.color }} />
                    <span className="text-xs text-white/80">{item.label}</span>
                  </div>
                ))}
                <p className="mt-3 text-[10px] text-white/30">
                  Mapa real será inserido aqui (GeoJSON/MapLibre)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
