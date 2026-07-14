const projects = [
  {
    id: 1,
    name: "Cavalcante",
    narrative: "Conhecer a terra antes de qualquer decisão",
    description:
      "Delimitação completa de APPs de serra e hidrografia em área de 800 ha na Chapada dos Veadeiros. Modelo 3D, ortomosaico, MDE e mapa de benfeitorias.",
    tags: ["Aerolevantamento", "APP", "Modelo 3D"],
    image:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    location: "Cavalcante — GO",
  },
  {
    id: 2,
    name: "Prefeitura",
    narrative: "Da terra bruta ao novo bairro",
    description:
      "Levantamento topográfico completo de área urbana como base para planejamento e execução de novo bairro — terraplanagem e abertura do terreno.",
    tags: ["Topografia", "Antes/Depois", "Planejamento urbano"],
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
    location: "Nordeste Goiano — GO",
  },
  {
    id: 3,
    name: "Propriedade Pedro",
    narrative: "Transformar terra em negócio",
    description:
      "Fracionamento e desmembramento de glebas para venda de lotes. Cálculo de captação de água por gravidade — infraestrutura hídrica sem bomba.",
    tags: ["Georreferenciamento", "Glebas", "Hídrico"],
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
    location: "Chapada dos Veadeiros — GO",
  },
  {
    id: 4,
    name: "Propriedade Ana",
    narrative: "Planejar o futuro com propósito",
    description:
      "Planejamento espacial integrado: delimitação da área destinada à RPPN, identificação dos melhores pontos de construção e área livre para outros usos.",
    tags: ["Conservação", "RPPN", "Zoneamento"],
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    location: "APA do Pouso Alto — GO",
  },
  {
    id: 5,
    name: "Fernando",
    narrative: "Do terreno ao projeto aprovado",
    description:
      "Modelo 3D urbano para construção civil e documentação técnica para outorga hídrica — perfuração de poço com processo aprovado.",
    tags: ["Outorga hídrica", "Modelo 3D", "Urbano"],
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    location: "Goiás — GO",
  },
];

export default function Projects() {
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

        {/* Projeto destaque */}
        <div className="mb-8 overflow-hidden rounded-2xl">
          <div className="grid md:grid-cols-2">
            <div
              className="relative min-h-[320px] bg-cover bg-center md:min-h-[440px]"
              style={{ backgroundImage: `url('${projects[0].image}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                {projects[0].tags.map((t) => (
                  <span
                    key={t}
                    className="mr-2 rounded-full bg-white/15 px-3 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-center bg-surface p-10">
              <p className="mb-2 text-xs uppercase tracking-widest text-muted">
                {projects[0].location}
              </p>
              <h3
                className="mb-2 text-2xl font-bold text-[var(--color-text)]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {projects[0].name}
              </h3>
              <p className="mb-4 text-sm italic text-primary">
                "{projects[0].narrative}"
              </p>
              <p className="text-sm leading-relaxed text-muted">
                {projects[0].description}
              </p>
            </div>
          </div>
        </div>

        {/* Grid 2x2 */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.slice(1).map((p) => (
            <div
              key={p.id}
              className="group overflow-hidden rounded-xl bg-surface shadow-sm transition hover:shadow-md"
            >
              <div
                className="relative h-44 bg-cover bg-center transition duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${p.image}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex flex-wrap gap-1">
                    {p.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="mb-0.5 text-[10px] uppercase tracking-widest text-muted">
                  {p.location}
                </p>
                <h4
                  className="mb-2 text-base font-bold text-[var(--color-text)]"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {p.name}
                </h4>
                <p className="text-xs leading-relaxed text-muted line-clamp-3">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
