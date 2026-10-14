import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site 100% estático: `next build` gera a pasta out/ pronta pra qualquer hospedagem.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
