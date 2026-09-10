import type { Metadata } from "next";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Términos y Condiciones de Uso | CONSTRUVIDAS",
  description:
    "Términos y condiciones de uso de la plataforma web y aplicaciones móviles oficiales (iOS y Android) de la Iglesia Cristiana CONSTRUVIDAS. Normas de convivencia comunitaria, cursos, eventos, donaciones y tienda.",
  keywords: [
    "Términos y Condiciones",
    "Términos de Uso",
    "CONSTRUVIDAS",
    "Iglesia Cristiana",
    "EULA",
    "Apple App Store Terms",
    "Google Play Terms",
    "Ley 1480 de 2011",
    "Sincelejo",
  ],
  alternates: {
    canonical: "https://construvidas.org/terms",
  },
  openGraph: {
    title: "Términos y Condiciones de Uso | CONSTRUVIDAS",
    description:
      "Conoce los términos y condiciones de uso de nuestra plataforma web y aplicaciones móviles oficiales para iOS y Android.",
    url: "https://construvidas.org/terms",
    siteName: "CONSTRUVIDAS",
    locale: "es_CO",
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
    title: "Términos y Condiciones de Uso | CONSTRUVIDAS",
    description:
      "Términos y condiciones aplicables a la web y aplicaciones móviles oficiales de la Iglesia Cristiana CONSTRUVIDAS.",
    images: ["/construvidastransparente.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return <TermsClient />;
}
