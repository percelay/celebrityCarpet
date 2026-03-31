import { hrefFromLabel, slugify } from "@/lib/utils";
import type { ContactInfo } from "@/lib/site-content";

type SiteFooterProps = {
  brand: string;
  headline: string;
  navigation: string[];
  contact: ContactInfo;
  ctaLabel: string;
};

export function SiteFooter({
  brand,
  headline,
  navigation,
  contact,
  ctaLabel,
}: SiteFooterProps) {
  return (
    <footer className="border-t border-border/80 py-10 sm:py-12">
      <div className="section-shell grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <a
            href="#top"
            className="font-display text-3xl tracking-[-0.04em] text-foreground"
          >
            {brand}
          </a>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            {headline}
          </p>
          <a
            href={hrefFromLabel(ctaLabel)}
            className="mt-6 inline-flex items-center rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            {ctaLabel}
          </a>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Navigation
            </p>
            <nav className="mt-4 flex flex-col gap-3">
              {navigation.map((item) => (
                <a
                  key={item}
                  href={`#${slugify(item)}`}
                  className="text-base text-foreground transition-colors hover:text-accent"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Contact
            </p>
            <div className="mt-4 space-y-3 text-base leading-7 text-foreground">
              {contact.details.map((detail) => (
                <p key={detail.label}>{detail.value}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
