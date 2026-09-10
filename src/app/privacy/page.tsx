import type { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Política de Privacidad y Tratamiento de Datos Personales | CONSTRUVIDAS",
  description:
    "Política oficial de privacidad y tratamiento de datos personales de la Iglesia Cristiana CONSTRUVIDAS. Cumplimiento de la Ley 1581 de 2012 de Colombia, RGPD/GDPR, CCPA y directrices de seguridad de datos para Apple App Store y Google Play Store.",
  keywords: [
    "Privacidad",
    "Tratamiento de Datos",
    "Ley 1581 de 2012",
    "Habeas Data",
    "Construvidas",
    "Iglesia Cristiana",
    "Google Play Data Safety",
    "Apple App Store Privacy",
    "Eliminación de Cuenta",
    "Wompi Bancolombia",
    "Sincelejo",
  ],
  alternates: {
    canonical: "https://construvidas.org/privacy",
  },
  openGraph: {
    title: "Política de Privacidad y Tratamiento de Datos | CONSTRUVIDAS",
    description:
      "Conoce cómo protegemos tus datos personales en nuestra plataforma web y aplicaciones móviles oficiales para iOS y Android.",
    url: "https://construvidas.org/privacy",
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
    title: "Política de Privacidad y Tratamiento de Datos | CONSTRUVIDAS",
    description:
      "Cumplimiento legal de protección de datos para la web y aplicaciones móviles de la Iglesia Cristiana CONSTRUVIDAS.",
    images: ["/construvidastransparente.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
