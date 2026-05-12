import { ArrowRight, Mail } from "lucide-react";

export function NewsletterSection() {
  return (
    <section id="newsletter" className="py-16 sm:py-20">
      <div className="section-shell">
        <div className="surface-panel relative overflow-hidden p-8 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent-strong">
                <Mail className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-display text-3xl tracking-[-0.04em] text-foreground sm:text-4xl">
                Stay on the runner
              </h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                Project features, trade pricing alerts, and a peek at recent
                fabrications. One short email a month — no spam, unsubscribe
                anytime.
              </p>
            </div>

            <form
              action="mailto:info@celebritycarpet.com"
              method="post"
              encType="text/plain"
              className="flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="you@studio.com"
                aria-label="Email address"
                className="w-full flex-1 rounded-full border border-border bg-background px-5 py-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-base font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
              >
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
