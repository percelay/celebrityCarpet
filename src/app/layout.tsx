import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  IBM_Plex_Mono,
  Manrope,
  Space_Grotesk,
} from "next/font/google";
import type { ReactNode } from "react";

import "@/styles/globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { deriveBrandTone } from "@/lib/brand-theme";
import { getSiteAssets, getSiteContent } from "@/lib/site-content";
import { SITE_NAV } from "@/lib/utils";

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
  const assets = getSiteAssets();
  const ctaLabel = content.hero.secondaryCta;
  const ctaHref = "/contact";

  return (
    <html lang="en" className="scroll-smooth">
      <body
        data-tone={tone}
        className={`${manrope.variable} ${cormorantGaramond.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} bg-background text-foreground antialiased`}
      >
        <SiteHeader
          brand={content.brand}
          navigation={SITE_NAV}
          ctaLabel={ctaLabel}
          ctaHref={ctaHref}
          logoSrc={assets.logoImage}
        />
        <main>{children}</main>
        <SiteFooter
          brand={content.brand}
          headline={content.hero.headline}
          navigation={SITE_NAV}
          contact={content.contact}
          ctaLabel={ctaLabel}
          ctaHref={ctaHref}
          logoSrc={assets.logoImage}
        />
      </body>
    </html>
  );
}
