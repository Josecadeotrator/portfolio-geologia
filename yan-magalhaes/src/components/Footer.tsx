export default function Footer() {
  return (
    <footer className="bg-[#0d1a09] py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <div>
          <p
            className="text-base font-bold text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Yan Magalhães
          </p>
          <p className="text-xs text-white/40">
            Geólogo · CREA 00000-D/GO
          </p>
        </div>

        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} · Cerrado · Chapada dos Veadeiros · GO
        </p>

        <a
          href="mailto:contato@yanmagalhaes.geo.br"
          className="text-xs text-white/50 transition hover:text-white"
        >
          contato@yanmagalhaes.geo.br
        </a>
      </div>
    </footer>
  );
}
