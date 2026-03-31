"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Expand,
  Home,
  X,
} from "lucide-react";

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

type ActiveImage = {
  categoryIndex: number;
  imageIndex: number;
};

type Direction = -1 | 1;

const GALLERY_ICONS = [Building2, Home];

function getGalleryAlt(title: string, imageIndex: number) {
  return `${title} installation photo ${imageIndex + 1}`;
}

export function GallerySection({
  title,
  categories,
}: GallerySectionProps) {
  const [activeImage, setActiveImage] = useState<ActiveImage | null>(null);
  const railRefs = useRef<Array<HTMLDivElement | null>>([]);
  const activeLightbox = activeImage
    ? (() => {
        const category = categories[activeImage.categoryIndex];

        if (!category) {
          return null;
        }

        return {
          category,
          categoryIndex: activeImage.categoryIndex,
          imageIndex: activeImage.imageIndex,
          imageSrc: category.images[activeImage.imageIndex] ?? null,
        };
      })()
    : null;

  function closeLightbox() {
    setActiveImage(null);
  }

  function openLightbox(categoryIndex: number, imageIndex: number) {
    setActiveImage({ categoryIndex, imageIndex });
  }

  function stepActiveImage(direction: Direction) {
    setActiveImage((current) => {
      if (!current) {
        return current;
      }

      const images = categories[current.categoryIndex]?.images ?? [];

      if (images.length <= 1) {
        return current;
      }

      return {
        ...current,
        imageIndex:
          (current.imageIndex + direction + images.length) % images.length,
      };
    });
  }

  function scrollGallery(categoryIndex: number, direction: Direction) {
    const rail = railRefs.current[categoryIndex];

    if (!rail) {
      return;
    }

    rail.scrollBy({
      left: direction * Math.max(rail.clientWidth * 0.82, 320),
      behavior: "smooth",
    });
  }

  useEffect(() => {
    if (!activeImage) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        stepActiveImage(-1);
      }

      if (event.key === "ArrowRight") {
        stepActiveImage(1);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImage, categories]);

  return (
    <>
      <section id="gallery" className="py-20 sm:py-24">
        <div className="section-shell">
          <SectionIntro title={title} />

          <div className="mt-12 space-y-14">
            {categories.map((category, categoryIndex) => {
              const Icon = GALLERY_ICONS[categoryIndex] ?? Building2;

              return (
                <div key={category.title} className="space-y-6">
                  <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
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

                    {category.images.length > 1 ? (
                      <div className="flex items-center gap-3 self-start md:self-auto">
                        <button
                          type="button"
                          onClick={() => scrollGallery(categoryIndex, -1)}
                          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-soft hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                          aria-label={`Scroll ${category.title} gallery left`}
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => scrollGallery(categoryIndex, 1)}
                          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-soft hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                          aria-label={`Scroll ${category.title} gallery right`}
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                    ) : null}
                  </div>

                  <div className="space-y-4">
                    <div
                      ref={(element) => {
                        railRefs.current[categoryIndex] = element;
                      }}
                      className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 pr-4 scroll-smooth [scrollbar-color:var(--accent)_transparent] [scrollbar-width:thin]"
                    >
                      {category.images.map((imageSrc, imageIndex) => (
                        <button
                          key={imageSrc}
                          type="button"
                          onClick={() =>
                            openLightbox(categoryIndex, imageIndex)
                          }
                          className={cx(
                            "group relative block shrink-0 snap-start overflow-hidden rounded-shell border border-border bg-surface text-left shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                            imageIndex === 0
                              ? "min-h-[20rem] w-[84vw] sm:w-[68vw] lg:w-[48rem] lg:min-h-[34rem]"
                              : "min-h-[18rem] w-[72vw] sm:w-[52vw] lg:w-[28rem] lg:min-h-[22rem]",
                          )}
                        >
                          <Image
                            src={imageSrc}
                            alt={getGalleryAlt(category.title, imageIndex)}
                            fill
                            sizes={
                              imageIndex === 0
                                ? "(max-width: 640px) 84vw, (max-width: 1024px) 68vw, 48rem"
                                : "(max-width: 640px) 72vw, (max-width: 1024px) 52vw, 28rem"
                            }
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-foreground/62 via-foreground/10 to-transparent" />
                          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white">
                            <div>
                              <p className="font-mono text-xs uppercase tracking-[0.28em] text-white/72">
                                {category.title}
                              </p>
                              <p className="mt-2 text-lg font-semibold">
                                Image {imageIndex + 1}
                              </p>
                            </div>
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-sm">
                              <Expand className="h-4 w-4" />
                              Open
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>

                    <p className="text-sm text-muted-foreground">
                      Scroll to browse and click any image to enlarge it.
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {activeLightbox?.imageSrc ? (
        <div
          className="fixed inset-0 z-50 bg-foreground/94 p-4 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeLightbox.category.title} gallery lightbox`}
          onClick={closeLightbox}
        >
          <div
            className="mx-auto flex h-full w-full max-w-6xl flex-col gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 text-white">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-white/60">
                  {activeLightbox.category.title}
                </p>
                <p className="mt-2 text-lg font-semibold sm:text-xl">
                  Image {activeLightbox.imageIndex + 1} of{" "}
                  {activeLightbox.category.images.length}
                </p>
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white hover:bg-white/14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                aria-label="Close gallery"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex-1 overflow-hidden rounded-shell border border-white/10 bg-white/6 shadow-panel">
              {activeLightbox.category.images.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => stepActiveImage(-1)}
                    className="absolute left-4 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-white/10 text-white backdrop-blur-sm hover:bg-white/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => stepActiveImage(1)}
                    className="absolute right-4 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-white/10 text-white backdrop-blur-sm hover:bg-white/16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              ) : null}

              <Image
                src={activeLightbox.imageSrc}
                alt={getGalleryAlt(
                  activeLightbox.category.title,
                  activeLightbox.imageIndex,
                )}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-color:var(--accent)_transparent] [scrollbar-width:thin]">
              {activeLightbox.category.images.map((imageSrc, imageIndex) => (
                <button
                  key={imageSrc}
                  type="button"
                  onClick={() =>
                    openLightbox(activeLightbox.categoryIndex, imageIndex)
                  }
                  className={cx(
                    "relative h-20 w-28 shrink-0 overflow-hidden rounded-2xl border border-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                    imageIndex === activeLightbox.imageIndex
                      ? "ring-2 ring-white/80"
                      : "opacity-70 hover:opacity-100",
                  )}
                  aria-label={`View ${activeLightbox.category.title} image ${
                    imageIndex + 1
                  }`}
                >
                  <Image
                    src={imageSrc}
                    alt=""
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
