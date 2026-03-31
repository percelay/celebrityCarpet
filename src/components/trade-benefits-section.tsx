import { ArrowRight, BadgePercent } from "lucide-react";

import { SectionIntro } from "@/components/section-intro";

type TradeBenefitsSectionProps = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export function TradeBenefitsSection({
  title,
  description,
  ctaLabel,
  ctaHref,
}: TradeBenefitsSectionProps) {
  return (
    <section id="trade-benefits-program" className="py-20 sm:py-24">
      <div className="section-shell">
        <div className="rounded-shell border border-border bg-foreground px-6 py-8 text-white shadow-panel sm:px-10 sm:py-10 lg:px-14 lg:py-14">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white">
                <BadgePercent className="h-7 w-7" />
              </div>
              <div className="mt-6">
                <SectionIntro title={title} invert />
              </div>
            </div>

            <div className="flex flex-col justify-between gap-8">
              <p className="text-base leading-8 text-white/84 text-pretty sm:text-lg">
                {description}
              </p>

              <div>
                <a
                  href={ctaHref}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 text-base font-semibold text-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  {ctaLabel}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
