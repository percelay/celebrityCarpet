import { SectionIntro } from "@/components/section-intro";

type AboutSectionProps = {
  title: string;
  body: string;
};

export function AboutSection({ title, body }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <SectionIntro title={title} />

        <div className="surface-panel p-8 sm:p-10 lg:p-12">
          <p className="text-lg leading-8 text-foreground/88 text-pretty sm:text-xl">
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}
