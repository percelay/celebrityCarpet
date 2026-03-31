import Image from "next/image";

import { SectionIntro } from "@/components/section-intro";

type AboutSectionProps = {
  title: string;
  body: string;
  imageSrc: string | null;
};

export function AboutSection({ title, body, imageSrc }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="section-shell">
        <SectionIntro title={title} />

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
      </div>
    </section>
  );
}
