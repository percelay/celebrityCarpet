import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { SectionIntro } from "@/components/section-intro";
import type { ContactInfo } from "@/lib/site-content";
import { slugify } from "@/lib/utils";

type ContactSectionProps = {
  title: string;
  contact: ContactInfo;
  ctaLabel: string;
};

function getFieldType(label: string) {
  const normalized = label.toLowerCase();

  if (normalized.includes("email")) {
    return "email";
  }

  if (normalized.includes("phone")) {
    return "tel";
  }

  return "text";
}

function getDetailHref(label: string, value: string) {
  switch (label) {
    case "E-mail":
      return `mailto:${value}`;
    case "Telephone":
      return `tel:${value.replace(/[^\d+]/g, "")}`;
    default:
      return null;
  }
}

function getDetailIcon(label: string) {
  switch (label) {
    case "Address":
      return MapPin;
    case "E-mail":
      return Mail;
    default:
      return Phone;
  }
}

export function ContactSection({
  title,
  contact,
  ctaLabel,
}: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
        <div className="space-y-8">
          <SectionIntro title={title} />

          <div className="surface-panel p-8 sm:p-10">
            <div className="space-y-6">
              {contact.details.map((detail) => {
                const Icon = getDetailIcon(detail.label);
                const href = getDetailHref(detail.label, detail.value);
                const content = href ? (
                  <a
                    href={href}
                    className="transition-colors hover:text-foreground"
                  >
                    {detail.value}
                  </a>
                ) : (
                  detail.value
                );

                return (
                  <div
                    key={detail.label}
                    className="flex items-start gap-4 border-b border-border/70 pb-6 last:border-none last:pb-0"
                  >
                    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-soft text-accent-strong">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        {detail.label}
                      </p>
                      <p className="mt-2 text-base leading-7 text-foreground/88">
                        {content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="surface-panel p-8 sm:p-10">
          <form
            action={`mailto:${contact.email}`}
            method="post"
            encType="text/plain"
            className="space-y-5"
          >
            {contact.formFields.map((field) =>
              field === "General Comments" ? (
                <label key={field} className="block">
                  <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {field}
                  </span>
                  <textarea
                    name={slugify(field)}
                    rows={6}
                    className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent"
                  />
                </label>
              ) : (
                <label key={field} className="block">
                  <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {field}
                  </span>
                  <input
                    type={getFieldType(field)}
                    name={slugify(field)}
                    className="w-full rounded-full border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent"
                  />
                </label>
              ),
            )}

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-4 text-base font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
