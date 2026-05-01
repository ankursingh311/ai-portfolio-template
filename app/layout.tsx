import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import heroData from "@/content/hero.json";
import contactData from "@/content/contact.json";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const viewport: Viewport = {
  viewportFit: "cover",
};

// TODO: replace with your actual domain once deployed
const BASE_URL = "https://yourname.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: `${heroData.name} — ${heroData.title}`,
  description: heroData.headline,
  openGraph: {
    title: `${heroData.name} — ${heroData.title}`,
    description: heroData.headline,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${heroData.name} — ${heroData.title}`,
    description: heroData.headline,
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: heroData.name,
  jobTitle: heroData.title,
  description: heroData.headline,
  url: BASE_URL,
  sameAs: [contactData.linkedin],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
