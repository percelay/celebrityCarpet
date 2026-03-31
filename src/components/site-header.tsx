import { ArrowRight } from "lucide-react";

import { hrefFromLabel, slugify } from "@/lib/utils";

type SiteHeaderProps = {
  brand: string;
  navigation: string[];
  ctaLabel: string;
};

export function SiteHeader({
  brand,
  navigation,
  ctaLabel,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-xl">
      <div className="section-shell flex items-center justify-between gap-4 py-4">
        <a
          href="#top"
          className="font-display text-2xl tracking-[-0.04em] text-foreground transition-opacity hover:opacity-80"
        >
          {brand}
        </a>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground lg:flex">
          {navigation.map((item) => (
            <a
              key={item}
              href={`#${slugify(item)}`}
              className="transition-colors hover:text-foreground"
            >
              {item}
            </a>
          ))}
        </nav>

        <a
          href={hrefFromLabel(ctaLabel)}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <nav className="section-shell flex gap-5 overflow-x-auto pb-4 text-sm text-muted-foreground lg:hidden">
        {navigation.map((item) => (
          <a
            key={item}
            href={`#${slugify(item)}`}
            className="whitespace-nowrap transition-colors hover:text-foreground"
          >
            {item}
          </a>
        ))}
      </nav>
    </header>
  );
}
