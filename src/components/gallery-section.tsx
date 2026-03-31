import Image from "next/image";
import { Building2, Home } from "lucide-react";

import { SectionIntro } from "@/components/section-intro";
import { cx } from "@/lib/utils";

type GalleryCategory = {
  title: string;
  description: string;
  images: string[];
};

type GallerySectionProps = {
  title: string;
  categories: GalleryCategory[];
};

const GALLERY_ICONS = [Building2, Home];

export function GallerySection({
  title,
  categories,
}: GallerySectionProps) {
  return (
    <section id="gallery" className="py-20 sm:py-24">
      <div className="section-shell">
        <SectionIntro title={title} />

        <div className="mt-12 space-y-14">
          {categories.map((category, categoryIndex) => {
            const Icon = GALLERY_ICONS[categoryIndex] ?? Building2;

            return (
              <div key={category.title} className="space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-3xl">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent-strong">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
                      {category.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-muted-foreground sm:text-lg">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {category.images.map((imageSrc, imageIndex) => (
                    <figure
                      key={imageSrc}
                      className={cx(
                        "group relative overflow-hidden rounded-shell border border-border bg-surface shadow-soft",
                        imageIndex === 0
                          ? "min-h-[18rem] sm:col-span-2 sm:min-h-[24rem] lg:row-span-2 lg:min-h-[32rem]"
                          : "min-h-[16rem] lg:min-h-[15rem]",
                      )}
                    >
                      <Image
                        src={imageSrc}
                        alt={category.title}
                        fill
                        sizes={
                          imageIndex === 0
                            ? "(max-width: 1024px) 100vw, 50vw"
                            : "(max-width: 1024px) 100vw, 25vw"
                        }
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/45 via-transparent to-transparent" />
                    </figure>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
