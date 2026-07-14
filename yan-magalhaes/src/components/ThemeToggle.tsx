"use client";

import { useTheme } from "./ThemeProvider";

const themes = [
  { key: "cerrado", label: "Verde Cerrado", dot: "#3d5c2e" },
  { key: "terracota", label: "Terracota", dot: "#8b4513" },
  { key: "arenito", label: "Arenito", dot: "#c9963b" },
] as const;

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-1 rounded-xl border border-white/20 bg-black/70 p-3 backdrop-blur-sm">
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/50">
        Paleta (dev)
      </p>
      {themes.map((t) => (
        <button
          key={t.key}
          onClick={() => setTheme(t.key)}
          className="flex items-center gap-2 rounded-lg px-2 py-1 text-xs text-white transition hover:bg-white/10"
          style={{ opacity: theme === t.key ? 1 : 0.5 }}
        >
          <span
            className="h-3 w-3 rounded-full border border-white/30"
            style={{ background: t.dot }}
          />
          {t.label}
          {theme === t.key && <span className="ml-auto text-[10px]">✓</span>}
        </button>
      ))}
    </div>
  );
}
