const services = [
  {
    number: "01",
    title: "Regularize sua terra",
    description:
      "Georreferenciamento com precisão RTK para regularização fundiária junto ao INCRA e SEAPA. Topografia completa, delimitação de divisas e documentação técnica para cartório.",
    tags: ["Georreferenciamento", "Topografia", "INCRA", "SEAPA"],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 3L3 10v12l13 7 13-7V10L16 3z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
        <line x1="16" y1="13" x2="16" y2="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Conheça seu território do ar",
    description:
      "Aerolevantamento por drone: ortomosaico de alta resolução, Modelo Digital de Elevação (MDE) e modelo 3D do terreno. Dados de toda a sua propriedade em dias, não em meses.",
    tags: ["Drone", "Ortomosaico", "Modelo 3D", "MDE"],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 6l3 6h6l-5 4 2 6-6-4-6 4 2-6-5-4h6l3-6z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M5 26h22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 20v6M22 20v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Cumpra a legislação ambiental",
    description:
      "Licenciamento ambiental e outorga de uso de recursos hídricos — toda a documentação técnica para perfuração de poços, captação hídrica e regularização de APPs.",
    tags: ["Licenciamento", "Outorga hídrica", "APP", "Recursos hídricos"],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 4C10 12 6 16 6 20a10 10 0 0020 0c0-4-4-8-10-16z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M16 24v-8M12 20l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="servicos" className="bg-page py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            O que eu faço
          </p>
          <h2
            className="max-w-xl text-3xl font-bold text-[var(--color-text)] md:text-4xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Soluções técnicas orientadas pelo problema da sua terra
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.number}
              className="group relative flex flex-col rounded-2xl border border-theme bg-surface p-8 transition hover:shadow-lg"
            >
              <span
                className="mb-6 text-5xl font-bold leading-none"
                style={{ color: "var(--color-border)", fontFamily: "var(--font-playfair)" }}
              >
                {s.number}
              </span>

              <div className="mb-4 text-primary">{s.icon}</div>

              <h3
                className="mb-3 text-xl font-bold text-[var(--color-text)]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {s.title}
              </h3>

              <p className="mb-6 flex-1 text-sm leading-relaxed text-muted">
                {s.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-theme px-3 py-0.5 text-[11px] font-medium text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
