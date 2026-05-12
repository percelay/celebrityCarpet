import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { NavItem } from "@/lib/utils";

type SiteHeaderProps = {
  brand: string;
  navigation: NavItem[];
  ctaLabel: string;
  ctaHref: string;
  logoSrc: string | null;
};

export function SiteHeader({
  brand,
  navigation,
  ctaLabel,
  ctaHref,
  logoSrc,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-xl">
      <div className="section-shell flex items-center justify-between gap-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-90"
          aria-label={`${brand} home`}
        >
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt={brand}
              width={320}
              height={110}
              priority
              className="h-16 w-auto sm:h-20"
            />
          ) : (
            <span className="font-display text-2xl tracking-[-0.04em] text-foreground sm:text-3xl">
              {brand}
            </span>
          )}
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <nav className="section-shell flex gap-5 overflow-x-auto pb-4 text-sm text-muted-foreground lg:hidden">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="whitespace-nowrap transition-colors hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
