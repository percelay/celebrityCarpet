import { ArrowUpRight, Scissors, ShieldCheck, Sparkles } from "lucide-react";

import { SectionIntro } from "@/components/section-intro";
import type { Service } from "@/lib/site-content";

type ServicesSectionProps = {
  title: string;
  services: Service[];
};

const SERVICE_ICONS = [Sparkles, Scissors, ShieldCheck];

export function ServicesSection({
  title,
  services,
}: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 sm:py-24">
      <div className="section-shell">
        <SectionIntro title={title} />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = SERVICE_ICONS[index] ?? Sparkles;

            return (
              <article
                key={service.title}
                className="surface-panel group flex h-full flex-col justify-between p-8 sm:p-10"
              >
                <div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent-strong">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-muted-foreground text-pretty">
                    {service.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-accent transition-transform group-hover:translate-x-1">
                  <span>{service.title}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
