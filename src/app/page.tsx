import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { HeroSection } from "@/components/hero-section";
import { SectionIntro } from "@/components/section-intro";
import { ServicesSection } from "@/components/services-section";
import { getSiteAssets, getSiteContent } from "@/lib/site-content";

export default function HomePage() {
  const content = getSiteContent();
  const assets = getSiteAssets();
  const featuredProjects = assets.projects.slice(0, 3);

  return (
    <>
      <HeroSection
        brand={content.brand}
        headline={content.hero.headline}
        subheadline={content.hero.subheadline}
        primaryCta={{ label: "Request a Quote", href: "/quote" }}
        secondaryCta={{ label: "View Projects", href: "/projects" }}
        imageSrc={assets.heroImage}
      />

      <section className="py-20 sm:py-24">
        <div className="section-shell grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <div>
            <SectionIntro
              title="Quality workmanship since 1995"
              eyebrow="About"
            />
            <p className="mt-6 text-base leading-8 text-foreground/88 text-pretty sm:text-lg">
              {content.about.split(". ").slice(0, 3).join(". ")}.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Learn more about us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {assets.aboutImage ? (
            <div className="surface-panel relative aspect-[4/3] overflow-hidden">
              <Image
                src={assets.aboutImage}
                alt="Celebrity Carpet installation detail"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ) : null}
        </div>
      </section>

      <ServicesSection title="What we do" services={content.services} />

      {featuredProjects.length > 0 ? (
        <section className="bg-surface py-20 sm:py-24">
          <div className="section-shell">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <SectionIntro title="Featured Projects" eyebrow="Recent Work" />
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent-strong hover:underline"
              >
                See all projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <Link
                  key={project.slug}
                  href="/projects"
                  className="group relative aspect-[4/3] overflow-hidden rounded-shell border border-border bg-surface shadow-soft"
                >
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/72 via-foreground/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <p className="font-mono text-xs uppercase tracking-[0.28em] text-white/72">
                      Project
                    </p>
                    <p className="mt-2 text-xl font-semibold">{project.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-20 sm:py-24">
        <div className="section-shell">
          <div className="rounded-shell border border-border bg-foreground px-6 py-10 text-center text-white shadow-panel sm:px-12 sm:py-14">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-white/70">
              Ready to start?
            </p>
            <h2 className="mt-4 font-display text-4xl tracking-[-0.04em] text-white sm:text-5xl">
              Get a written quote in 24 hours.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/80 sm:text-lg">
              Send your project scope, finishes, and location — we&apos;ll reply
              with pricing fast.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 text-base font-semibold text-foreground transition-transform hover:-translate-y-0.5"
              >
                Request a Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
