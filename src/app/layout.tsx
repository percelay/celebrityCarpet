import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  IBM_Plex_Mono,
  Manrope,
  Space_Grotesk,
} from "next/font/google";
import type { ReactNode } from "react";

import "@/styles/globals.css";
import { deriveBrandTone } from "@/lib/brand-theme";
import { getSiteContent } from "@/lib/site-content";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

const content = getSiteContent();
const tone = deriveBrandTone(content);

export const metadata: Metadata = {
  title: content.brand,
  description: content.hero.subheadline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        data-tone={tone}
        className={`${manrope.variable} ${cormorantGaramond.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} bg-background text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
