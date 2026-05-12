import { ArrowRight, FileText } from "lucide-react";

import { SectionIntro } from "@/components/section-intro";

const PROJECT_TYPES = [
  "Carpet Installation",
  "Stair Installation",
  "On-Site Fabrication",
  "Site Measure",
  "Template",
  "Receiving & Storage",
  "Delivery & Spread",
  "Other",
];

const FINISH_OPTIONS = [
  "Binding",
  "Serging",
  "Hand Serging",
  "Hemming",
  "Border Work",
  "Stair Rods",
];

const HIGHLIGHTS = [
  "Replies within 24 hours, often sooner.",
  "Sent direct to quotes@celebritycarpet.com.",
  "Free, no-obligation pricing for trade & retail.",
];

export function QuoteSection() {
  return (
    <section id="quote" className="bg-surface py-20 sm:py-24">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="space-y-8">
          <SectionIntro title="Request a Quote" eyebrow="Quote Order Box" />
          <p className="text-base leading-7 text-muted-foreground sm:text-lg">
            Tell us about your project and we&apos;ll email a written quote back fast.
            Include the city, finishes, rip-up &amp; disposal, or furniture
            relocation needs — anything that helps us scope it accurately.
          </p>
          <ul className="space-y-4">
            {HIGHLIGHTS.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-base leading-7 text-foreground/88"
              >
                <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent-strong">
                  <FileText className="h-4 w-4" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="surface-panel p-6 text-sm leading-6 text-muted-foreground">
            <p className="font-semibold uppercase tracking-[0.18em] text-accent-strong">
              Prefer email?
            </p>
            <p className="mt-2">
              Send your scope straight to{" "}
              <a
                href="mailto:quotes@celebritycarpet.com"
                className="font-semibold text-foreground underline-offset-4 hover:underline"
              >
                quotes@celebritycarpet.com
              </a>
              .
            </p>
          </div>
        </div>

        <div className="surface-panel p-8 sm:p-10">
          <form
            action="mailto:quotes@celebritycarpet.com"
            method="post"
            encType="text/plain"
            className="space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <FieldText label="Full Name" name="name" required />
              <FieldText label="Company / Showroom" name="company" />
              <FieldText label="Email" name="email" type="email" required />
              <FieldText label="Phone" name="phone" type="tel" />
              <FieldText label="Project City" name="city" />
              <FieldText label="Estimated Yardage" name="yardage" />
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Project Type
              </span>
              <select
                name="project-type"
                defaultValue=""
                className="w-full rounded-full border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-accent"
              >
                <option value="" disabled>
                  Select a project type
                </option>
                {PROJECT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <fieldset>
              <legend className="mb-2 block text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Finishes Needed
              </legend>
              <div className="flex flex-wrap gap-2">
                {FINISH_OPTIONS.map((finish) => (
                  <label
                    key={finish}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground/88 transition-colors hover:border-accent has-[:checked]:border-accent has-[:checked]:bg-accent-soft has-[:checked]:text-accent-strong"
                  >
                    <input
                      type="checkbox"
                      name="finishes"
                      value={finish}
                      className="h-4 w-4 accent-[var(--accent)]"
                    />
                    {finish}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="mb-2 block text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Additional Services
              </legend>
              <div className="grid gap-2 sm:grid-cols-2">
                <label className="inline-flex items-center gap-2 text-sm text-foreground/88">
                  <input
                    type="checkbox"
                    name="extras"
                    value="Rip-up & Disposal"
                    className="h-4 w-4 accent-[var(--accent)]"
                  />
                  Rip-up &amp; disposal of old carpet
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-foreground/88">
                  <input
                    type="checkbox"
                    name="extras"
                    value="Furniture Relocation"
                    className="h-4 w-4 accent-[var(--accent)]"
                  />
                  Furniture relocation
                </label>
              </div>
            </fieldset>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Project Description
              </span>
              <textarea
                name="description"
                rows={6}
                placeholder="Rooms, stair counts, carpet style, deadline, anything else worth knowing."
                className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent"
              />
            </label>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-4 text-base font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
            >
              Send Quote Request
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

type FieldTextProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
};

function FieldText({ label, name, type = "text", required }: FieldTextProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
        {required ? <span className="text-accent-strong"> *</span> : null}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-full border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent"
      />
    </label>
  );
}
