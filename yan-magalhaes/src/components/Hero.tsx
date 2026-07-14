export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden">
      {/* Imagem de fundo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1800&q=80')",
        }}
      />

      {/* Overlay escuro gradiente */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,18,6,0.95) 0%, rgba(10,18,6,0.4) 60%, rgba(10,18,6,0.2) 100%)",
        }}
      />

      {/* Conteúdo */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24">
        {/* Tags */}
        <div className="mb-6 flex flex-wrap gap-2">
          {["Drone", "Georreferenciamento", "Cerrado", "Chapada dos Veadeiros"].map(
            (tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm"
              >
                {tag}
              </span>
            )
          )}
        </div>

        <h1
          className="mb-6 max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Conheça sua terra antes de qualquer decisão.
        </h1>

        <p className="mb-10 max-w-xl text-base text-white/70 md:text-lg">
          Geólogo no Cerrado e Chapada dos Veadeiros — aerolevantamento,
          georreferenciamento e análise ambiental com precisão técnica.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="#contato"
            className="btn-primary rounded-full px-8 py-3 text-base font-semibold"
          >
            Fale comigo
          </a>
          <a
            href="#projetos"
            className="rounded-full border border-white/30 px-8 py-3 text-base font-medium text-white transition hover:bg-white/10"
          >
            Ver projetos
          </a>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <svg
          width="20"
          height="28"
          viewBox="0 0 20 28"
          fill="none"
          className="opacity-50"
        >
          <rect x="1" y="1" width="18" height="26" rx="9" stroke="white" strokeWidth="1.5" />
          <rect x="9" y="6" width="2" height="6" rx="1" fill="white" />
        </svg>
      </div>
    </section>
  );
}
