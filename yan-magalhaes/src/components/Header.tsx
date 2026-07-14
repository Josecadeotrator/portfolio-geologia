"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Serviços", href: "#servicos" },
  { label: "Visualizar", href: "#visualizar" },
  { label: "Projetos", href: "#projetos" },
  { label: "Sobre", href: "#sobre" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#0d1a09]/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a href="#" className="flex flex-col leading-none">
          <span
            className="text-xl font-bold tracking-tight text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Yan Magalhães
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">
            Geólogo
          </span>
        </a>

        <nav className="hidden gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-white/70 transition hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contato"
          className="btn-primary rounded-full px-5 py-2 text-sm font-medium"
        >
          Fale comigo
        </a>
      </div>
    </header>
  );
}
