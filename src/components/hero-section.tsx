import Image from "next/image";
import { ArrowRight } from "lucide-react";

type HeroSectionProps = {
  brand: string;
  headline: string;
  subheadline: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  imageSrc: string | null;
};

export function HeroSection({
  brand,
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  imageSrc,
}: HeroSectionProps) {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div className="absolute inset-0">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-foreground/76" />
        <div className="hero-overlay absolute inset-0" />
      </div>

      <div className="section-shell relative flex min-h-[78svh] items-end py-16 sm:py-20 lg:min-h-[84svh] lg:py-24">
        <div className="max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-white/72 sm:text-sm">
            {brand}
          </p>
          <h1 className="mt-6 font-display text-5xl leading-[0.92] tracking-[-0.05em] text-balance text-white sm:text-6xl lg:text-8xl">
            {headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/86 sm:text-xl">
            {subheadline}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={primaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-base font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              {primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={secondaryCta.href}
              className="inline-flex items-center justify-center rounded-full border border-white/24 bg-white/10 px-6 py-4 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/18 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              {secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
