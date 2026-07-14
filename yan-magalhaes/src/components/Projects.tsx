"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const ProjectExpanded = dynamic(() => import("./ProjectExpanded"), { ssr: false });

const projects = [
  {
    id: 1,
    name: "Cavalcante",
    narrative: "Conhecer a terra antes de qualquer decisão",
    description:
      "Levantamento completo com delimitação de APPs de serra e hidrografia local em área de 800 ha na Chapada dos Veadeiros.",
    tags: ["Aerolevantamento", "APP", "Modelo 3D", "MDE"],
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    location: "Cavalcante — GO",
    deliverables: [
      "Modelo 3D do terreno",
      "Ortomosaico de alta resolução",
      "Modelo Digital de Elevação (MDE)",
      "Mapa topográfico",
      "Mapa de situação com vias de acesso",
      "Mapeamento de benfeitorias",
      "Delimitação de APPs (serra e hidrografia)",
    ],
    highlight: "viewer3d" as const,
    gallery: [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    ],
  },
  {
    id: 2,
    name: "Prefeitura",
    narrative: "Da terra bruta ao novo bairro",
    description:
      "Levantamento topográfico completo de área urbana como base para planejamento e execução de novo bairro — terraplanagem e abertura do terreno.",
    tags: ["Topografia", "Planejamento urbano", "Antes/Depois"],
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
    location: "Nordeste Goiano — GO",
    deliverables: [
      "Levantamento topográfico completo",
      "Base para projeto de terraplanagem",
      "Modelo do terreno pré-intervenção",
      "Documentação técnica para licitação",
    ],
    highlight: "beforeafter" as const,
    gallery: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    ],
  },
  {
    id: 3,
    name: "Propriedade Pedro",
    narrative: "Transformar terra em negócio",
    description:
      "Fracionamento e desmembramento de glebas para venda de lotes. Cálculo de captação de água por gravidade — infraestrutura hídrica sem bomba.",
    tags: ["Georreferenciamento", "Glebas", "Hídrico", "Ortomosaico"],
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
    location: "Chapada dos Veadeiros — GO",
    deliverables: [
      "Modelo 3D do terreno",
      "Ortomosaico",
      "Fracionamento e desmembramento de glebas",
      "Cálculo de captação d'água por gravidade",
      "Vídeos comerciais para venda dos lotes",
    ],
    highlight: "gallery" as const,
    gallery: [
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    ],
  },
  {
    id: 4,
    name: "Propriedade Ana",
    narrative: "Planejar o futuro com propósito",
    description:
      "Planejamento espacial integrado: delimitação da área RPPN, identificação dos melhores pontos de construção e área livre para outros usos.",
    tags: ["Conservação", "RPPN", "Zoneamento", "Ambiental"],
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    location: "APA do Pouso Alto — GO",
    deliverables: [
      "Modelo 3D do terreno",
      "Ortomosaico",
      "Delimitação da área RPPN",
      "Identificação de pontos de construção",
      "Mapa de zoneamento integrado",
    ],
    highlight: "map" as const,
    gallery: [
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    ],
  },
  {
    id: 5,
    name: "Fernando",
    narrative: "Do terreno ao projeto aprovado",
    description:
      "Modelo 3D urbano para construção civil e documentação técnica para outorga hídrica — perfuração de poço com processo aprovado.",
    tags: ["Outorga hídrica", "Modelo 3D", "Urbano"],
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    location: "Goiás — GO",
    deliverables: [
      "Modelo 3D urbano para construção civil",
      "Levantamento para outorga hídrica",
      "Documentação técnica para perfuração de poço",
      "Outorga aprovada",
    ],
    highlight: "gallery" as const,
    gallery: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
    ],
  },
];


export default function Projects() {
  const [openId, setOpenId] = useState<number | null>(1);

  function toggle(id: number) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  const openProject = projects.find((p) => p.id === openId) ?? null;

  return (
    <section id="projetos" className="bg-page py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Projetos
          </p>
          <h2
            className="max-w-xl text-3xl font-bold text-[var(--color-text)] md:text-4xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Trabalhos realizados no Cerrado e Chapada dos Veadeiros
          </h2>
        </div>

        {/* Expansão inline — acima dos cards */}
        {openProject && (
          <div className="mb-6">
            <ProjectExpanded
              project={openProject}
              onClose={() => setOpenId(null)}
            />
          </div>
        )}

        {/* Grid de cards */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {projects.map((p) => {
            const isOpen = openId === p.id;

            return (
              <div
                key={p.id}
                onClick={() => toggle(p.id)}
                className={`group cursor-pointer overflow-hidden rounded-xl bg-surface shadow-sm transition-all duration-300 hover:shadow-md ${
                  isOpen ? "ring-2 ring-[var(--color-primary)]" : ""
                }`}
              >
                <div
                  className="relative h-36 bg-cover bg-center transition duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${p.image}')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1">
                    {p.tags.slice(0, 1).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-medium text-white backdrop-blur-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {isOpen && (
                    <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-primary)]">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1 3l3 3 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="mb-0.5 text-[9px] uppercase tracking-widest text-muted">
                    {p.location}
                  </p>
                  <h4
                    className="text-sm font-bold text-[var(--color-text)]"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {p.name}
                  </h4>
                  <p className="mt-1 text-[10px] leading-relaxed text-muted line-clamp-2">
                    {p.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
