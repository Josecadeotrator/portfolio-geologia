"use client";

import { useState } from "react";

const needs = [
  "Georreferenciamento",
  "Aerolevantamento com drone",
  "Licenciamento ambiental",
  "Outorga hídrica",
  "Topografia",
  "Outro",
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  }

  return (
    <section id="contato" className="bg-page py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 md:grid-cols-2">
          {/* Texto lateral */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Contato
            </p>
            <h2
              className="mb-6 text-3xl font-bold text-[var(--color-text)] md:text-4xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Vamos conversar sobre sua terra?
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-muted">
              Descreva brevemente o que você precisa. Respondo por e-mail em
              até 48 horas com uma avaliação inicial.
            </p>

            <div className="space-y-4">
              {[
                { icon: "📍", label: "Atuação", value: "Brasil" },
                { icon: "✉️", label: "E-mail", value: "contato@yanmagalhaes.geo.br" },
                { icon: "🪪", label: "CREA", value: "00000-D/GO" },
              ].map((item) => (
                <div key={item.label} className="flex gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted">
                      {item.label}
                    </p>
                    <p className="text-sm text-[var(--color-text)]">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formulário */}
          <div className="rounded-2xl border border-theme bg-surface p-8">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 text-4xl">✅</div>
                <h3
                  className="mb-2 text-xl font-bold text-[var(--color-text)]"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Mensagem enviada!
                </h3>
                <p className="text-sm text-muted">
                  Responderei em até 48 horas no seu e-mail.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-1 block text-xs font-medium uppercase tracking-widest text-muted">
                    Nome
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Seu nome completo"
                    className="w-full rounded-lg border border-theme bg-page px-4 py-3 text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] outline-none transition focus:border-[var(--color-primary)]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium uppercase tracking-widest text-muted">
                    E-mail
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="seu@email.com"
                    className="w-full rounded-lg border border-theme bg-page px-4 py-3 text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] outline-none transition focus:border-[var(--color-primary)]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium uppercase tracking-widest text-muted">
                    Tipo de necessidade
                  </label>
                  <select
                    required
                    className="w-full rounded-lg border border-theme bg-page px-4 py-3 text-sm text-[var(--color-text)] outline-none transition focus:border-[var(--color-primary)]"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Selecione...
                    </option>
                    {needs.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium uppercase tracking-widest text-muted">
                    Mensagem
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Descreva brevemente sua propriedade ou necessidade..."
                    className="w-full rounded-lg border border-theme bg-page px-4 py-3 text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] outline-none transition focus:border-[var(--color-primary)] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full rounded-lg py-3 text-sm font-semibold disabled:opacity-60"
                >
                  {loading ? "Enviando..." : "Enviar mensagem"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
