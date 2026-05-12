import Image from "next/image";
import { Facebook, Instagram } from "lucide-react";

import { hrefFromLabel, slugify } from "@/lib/utils";
import type { ContactInfo } from "@/lib/site-content";

type SiteFooterProps = {
  brand: string;
  headline: string;
  navigation: string[];
  contact: ContactInfo;
  ctaLabel: string;
  logoSrc: string | null;
};

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/CelebrityCarpetInstallations",
    Icon: Facebook,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/celebritycarpetinstallations",
    Icon: Instagram,
  },
];

const DEPARTMENT_EMAILS = [
  { label: "Quotes", email: "quotes@celebritycarpet.com" },
  { label: "Scheduling", email: "schedule@celebritycarpet.com" },
  { label: "Fabrications", email: "fabrications@celebritycarpet.com" },
  { label: "Receiving", email: "receiving@celebritycarpet.com" },
];

export function SiteFooter({
  brand,
  headline,
  navigation,
  contact,
  ctaLabel,
  logoSrc,
}: SiteFooterProps) {
  return (
    <footer className="border-t border-border/80 py-12 sm:py-16">
      <div className="section-shell grid gap-12 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
        <div>
          <a
            href="#top"
            className="inline-flex items-center"
            aria-label={`${brand} home`}
          >
            {logoSrc ? (
              <Image
                src={logoSrc}
                alt={brand}
                width={320}
                height={110}
                className="h-20 w-auto"
              />
            ) : (
              <span className="font-display text-3xl tracking-[-0.04em] text-foreground">
                {brand}
              </span>
            )}
          </a>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            {headline}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
            <strong className="font-semibold text-foreground">
              Carpet storage for partners:
            </strong>{" "}
            we receive, photograph, and store carpet on behalf of showrooms,
            designers, and other installation companies in our 19,000 sq. ft.
            warehouse.
          </p>

          <div className="mt-6 flex items-center gap-3">
            {SOCIAL_LINKS.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={name}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
            <a
              href={hrefFromLabel(ctaLabel)}
              className="ml-3 inline-flex items-center rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              {ctaLabel}
            </a>
          </div>
        </div>

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

        <div className="space-y-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Departments
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-6">
              {DEPARTMENT_EMAILS.map(({ label, email }) => (
                <li key={email} className="flex flex-col">
                  <span className="font-semibold text-foreground">{label}</span>
                  <a
                    href={`mailto:${email}`}
                    className="break-all text-accent-strong hover:underline"
                  >
                    {email}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Contact
            </p>
            <div className="mt-4 space-y-2 text-base leading-7 text-foreground">
              {contact.details.map((detail) => (
                <p key={detail.label}>{detail.value}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="section-shell mt-10 border-t border-border/60 pt-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} {brand}. Family-owned & operated since 1995.
      </div>
    </footer>
  );
}
