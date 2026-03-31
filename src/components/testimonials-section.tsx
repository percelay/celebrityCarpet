import { Quote } from "lucide-react";

import { SectionIntro } from "@/components/section-intro";
import type { Testimonial } from "@/lib/site-content";

type TestimonialsSectionProps = {
  title: string;
  testimonials: Testimonial[];
};

export function TestimonialsSection({
  title,
  testimonials,
}: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="py-20 sm:py-24">
      <div className="section-shell">
        <SectionIntro title={title} />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <article
              key={`${testimonial.author}-${testimonial.quote.slice(0, 24)}`}
              className="surface-panel p-8 sm:p-10"
            >
              <Quote className="h-8 w-8 text-accent" />
              <blockquote className="mt-6 text-lg leading-8 text-foreground/88 text-pretty">
                {testimonial.quote}
              </blockquote>
              {testimonial.author ? (
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {testimonial.author}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
