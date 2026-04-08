import "./globals.css";
import type { Metadata } from "next";
import { Oswald, Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import CartSidebar from "@/components/store/CartSidebar";
import Footer from "@/components/Footer";
import Providers from "./providers"; // Import the new Providers component

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-gobold",
  weight: ["400", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-caviar",
  weight: ["300", "400", "600"],
});

export const metadata: Metadata = {
  title: "CONSTRUVIDAS | Iglesia Cristiana",
  description: "Plataforma oficial del Iglesia Cristiana CONSTRUVIDAS. Portal oficial de la Iglesia Cristiana ConstruVidas.",
  keywords: ["CONSTRUVIDAS", "Iglesia Cristiana", "Comunidad", "Entrenamiento", "Crecimiento Espiritual", "Ministerio", "ConstruVidas Web", "Eventos y Comunidad", "Iglesia Cristiana"],
  authors: [{ name: "CONSTRUVIDAS Club" }],
  openGraph: {
    title: "CONSTRUVIDAS | Iglesia Cristiana",
    description: "Únete al Iglesia Cristiana CONSTRUVIDAS. Excelencia en comunidad y entrenamiento deportivo.",
    url: "https://construvidasweb.vercel.app",
    siteName: "CONSTRUVIDAS Club",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/construvidastransparente.png",
        width: 800,
        height: 600,
        alt: "Logo CONSTRUVIDAS Iglesia Cristiana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CONSTRUVIDAS | Iglesia Cristiana",
    description: "Entrenamiento de alto rendimiento y comunidad deportiva.",
    images: ["/construvidastransparente.png"],
  },
  icons: {
    icon: "/construvidastransparente.png",
    shortcut: "/construvidastransparente.png",
    apple: "/construvidastransparente.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${oswald.variable} ${montserrat.variable} font-caviar bg-[#f8f9fa] text-slate-900`}>
        <Providers> {/* Use the new Providers component */}
          <Navbar />

          {/* Contenido de la página */}
          <div className="pt-20">{children}</div>

          {/* 🔥 CARRITO GLOBAL: aparece en TODA LA APP */}
          <CartSidebar />
          <Footer />
        </Providers> {/* Close Providers */}
      </body>
    </html>
  );
}