import Image from "next/image";

import { SectionIntro } from "@/components/section-intro";

type AboutSectionProps = {
  title: string;
  body: string;
  imageSrc: string | null;
};

const MILESTONES = [
  { year: "1995", label: "Founded in Brooklyn by Bill Gerlich" },
  { year: "1996", label: "First 3,000 sq. ft. warehouse" },
  { year: "2002", label: "Expanded to 10,000 sq. ft." },
  { year: "2006", label: "Expanded to 15,000 sq. ft." },
  { year: "2017", label: "Now in 19,000 sq. ft. Little Ferry HQ" },
];

const CAPABILITIES = [
  "Site Measures & AutoCAD Plans",
  "Templates from on-site or architectural plans",
  "On-site fabrication: binding, serging, borders",
  "Stair installations — custom, waterfall, bordered, curved",
  "Receiving, barcoded storage & delivery",
  "One-year labor warranty",
];

export function AboutSection({ title, body, imageSrc }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="section-shell">
        <SectionIntro title={title} eyebrow="Family-owned since 1995" />

        <div
          className={
            imageSrc
              ? "mt-10 grid gap-6 lg:grid-cols-2 lg:items-stretch"
              : "mt-10"
          }
        >
          {imageSrc ? (
            <figure className="surface-panel relative h-full min-h-[20rem] overflow-hidden sm:min-h-[24rem] lg:min-h-0">
              <Image
                src={imageSrc}
                alt="Celebrity Carpet installation detail"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </figure>
          ) : null}

          <div className="surface-panel flex h-full p-8 sm:p-10 lg:p-12">
            <p className="text-lg leading-8 text-foreground/88 text-pretty sm:text-xl">
              {body}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="surface-panel p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-strong">
              30 years of growth
            </p>
            <ul className="mt-6 space-y-4">
              {MILESTONES.map(({ year, label }) => (
                <li key={year} className="flex gap-4">
                  <span className="w-16 shrink-0 font-mono text-sm font-semibold text-foreground">
                    {year}
                  </span>
                  <span className="text-base leading-7 text-foreground/88">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="surface-panel p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-strong">
              Full-service capabilities
            </p>
            <ul className="mt-6 grid gap-3">
              {CAPABILITIES.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-base leading-7 text-foreground/88"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
