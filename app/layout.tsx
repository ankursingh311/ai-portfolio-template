import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Ankur Singh — Strategy & AI Transformation",
  description:
    "IIT Gandhinagar · IIM Bangalore. Not a data scientist. Not a strategy consultant. The person who makes both work — with AI.",
  openGraph: {
    title: "Ankur Singh — Strategy & AI Transformation",
    description: "Where strategy meets AI execution.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
