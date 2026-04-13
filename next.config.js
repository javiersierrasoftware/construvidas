/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  // output: "standalone",
  images: {
    unoptimized: true, // ⬅ DESACTIVA OPTIMIZACIÓN (evita crash en Heroku)
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "s3.licitacionesefectivas.com" },
      { protocol: "https", hostname: "minio.licitacionesefectivas.com" },
    ],
  },

  turbopack: {
    root: __dirname,
  },
};

module.exports = nextConfig;
