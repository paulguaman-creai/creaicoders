import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración más estable
  experimental: {
    // Deshabilitar características experimentales que pueden causar problemas
  },
  // Configuración de TypeScript
  typescript: {
    // Ignorar errores de TypeScript durante el build para desarrollo
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  // Configuración de ESLint
  eslint: {
    // Ignorar errores de ESLint durante el build para desarrollo
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },
  // Configuración de imágenes
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
