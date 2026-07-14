export default function About() {
  return (
    <section id="sobre" className="bg-[#0d1a09] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-16 md:grid-cols-2">
          {/* Foto placeholder */}
          <div className="relative">
            <div
              className="aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80')",
              }}
            />
            {/* Badge CREA */}
            <div className="absolute -bottom-4 -right-4 rounded-xl border border-white/10 bg-[#1a2e10] px-5 py-3 shadow-xl">
              <p className="text-[10px] uppercase tracking-widest text-white/40">
                Registro profissional
              </p>
              <p className="text-sm font-bold text-white">CREA 00000-D/GO</p>
            </div>
          </div>

          {/* Texto */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Quem sou eu
            </p>
            <h2
              className="mb-6 text-3xl font-bold text-white md:text-4xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Yan Magalhães
            </h2>

            <div className="space-y-4 text-sm leading-relaxed text-white/60">
              <p>
                Sou geólogo com foco em dados precisos para que proprietários
                rurais, organizações ambientais e construtores tomem decisões
                com segurança sobre a terra.
              </p>
              <p>
                Meu trabalho começa no campo — com drone, estação RTK e o
                conhecimento da geologia local — e termina em dados que o
                cliente consegue usar: mapas, modelos 3D, documentação técnica
                aprovada nos órgãos competentes.
              </p>
              <p>
                O nome{" "}
                <strong className="text-white">Araí</strong> vem da{" "}
                <em>Formação Araí</em> — unidade geológica que define a
                paisagem e a história do Nordeste Goiano. É o nome da pedra
                sob nossos pés.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-6">
              {[
                { label: "Atuação", value: "Brasil" },
                { label: "Tecnologia", value: "RTK · Drone · QGIS · Metashape" },
                { label: "Contato", value: "E-mail direto" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] uppercase tracking-widest text-white/30">
                    {item.label}
                  </p>
                  <p className="text-sm font-medium text-white/80">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
