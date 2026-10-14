import type { Metadata, Viewport } from "next";
import { Caveat, Fraunces, Instrument_Sans } from "next/font/google";
import { PawCursor } from "@/components/ui/PawCursor";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

/** URL base do site para Open Graph. Aceita o domínio com ou sem "https://"; na Vercel, cai no domínio de produção. */
function siteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (!raw) return new URL("http://localhost:3000");
  return new URL(/^https?:\/\//.test(raw) ? raw : `https://${raw}`);
}

const title = "Focinho Feliz - banho, tosa e paciência infinita";
const description =
  "Seu cachorro rolou na lama de novo? A gente resolve. Pet shop fictício criado como site demonstrativo: simule um banho, folheie as fichas de serviço e conheça os clientes de 4 patas.";

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: { default: title, template: "%s · Focinho Feliz" },
  description,
  applicationName: "Focinho Feliz",
  authors: [{ name: "Lunia Sites (empresa fictícia)" }],
  keywords: ["pet shop", "banho e tosa", "site demonstrativo", "portfólio", "Next.js"],
  icons: { icon: "/images/favicon.svg" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Focinho Feliz",
    title,
    description,
    url: "/",
    images: [{ url: "/images/og.png", width: 1200, height: 630, alt: "Focinho Feliz - pet shop fictício" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#4b5a2a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${caveat.variable} ${instrument.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <PawCursor />
      </body>
    </html>
  );
}
