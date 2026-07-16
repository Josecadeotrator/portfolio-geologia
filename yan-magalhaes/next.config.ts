import type { NextConfig } from "next";

// Definido pelo workflow do GitHub Pages (o site fica em
// https://<usuario>.github.io/portfolio-geologia, não na raiz do domínio).
// Vazio em dev/build local, então nada muda rodando `npm run dev`.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
