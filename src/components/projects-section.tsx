"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

import { SectionIntro } from "@/components/section-intro";
import type { ProjectAlbum } from "@/lib/site-content";

type ProjectsSectionProps = {
  projects: ProjectAlbum[];
};

type Active = { projectIndex: number; imageIndex: number };

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [active, setActive] = useState<Active | null>(null);

  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);
    }

    function step(direction: -1 | 1) {
      setActive((current) => {
        if (!current) return current;
        const images = projects[current.projectIndex]?.images ?? [];
        if (images.length <= 1) return current;
        return {
          ...current,
          imageIndex:
            (current.imageIndex + direction + images.length) % images.length,
        };
      });
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, projects]);

  const activeProject =
    active !== null ? projects[active.projectIndex] ?? null : null;
  const activeImage = activeProject?.images[active?.imageIndex ?? 0] ?? null;

  return (
    <>
      <section id="projects" className="py-20 sm:py-24">
        <div className="section-shell">
          <SectionIntro
            title="Projects"
            eyebrow="Recent Work"
            description="A growing portfolio of carpet installations, stair runs, and custom fabrications from across NY, NJ, CT, and PA."
          />

          {projects.length === 0 ? (
            <div className="surface-panel mt-12 p-10 text-center">
              <p className="text-base leading-7 text-muted-foreground">
                Project photos coming soon — drop folders of images into{" "}
                <code className="rounded bg-accent-soft px-2 py-1 text-sm text-accent-strong">
                  public/projects/&lt;project-name&gt;/
                </code>{" "}
                and each folder becomes a project below.
              </p>
            </div>
          ) : (
            <div className="mt-12 space-y-16">
              {projects.map((project, projectIndex) => (
                <div key={project.slug} className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <p className="font-mono text-xs uppercase tracking-[0.28em] text-accent-strong">
                      Project
                    </p>
                    <h3 className="text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {project.images.length}{" "}
                      {project.images.length === 1 ? "photo" : "photos"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {project.images.map((src, imageIndex) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() =>
                          setActive({ projectIndex, imageIndex })
                        }
                        className="group relative aspect-square overflow-hidden rounded-shell border border-border bg-surface shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <Image
                          src={src}
                          alt={`${project.title} photo ${imageIndex + 1}`}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/10 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                          <Expand className="h-3.5 w-3.5" />
                          Open
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {active && activeProject && activeImage ? (
        <div
          className="fixed inset-0 z-50 bg-foreground/94 p-4 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <div
            className="mx-auto flex h-full w-full max-w-6xl flex-col gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 text-white">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-white/60">
                  {activeProject.title}
                </p>
                <p className="mt-2 text-lg font-semibold sm:text-xl">
                  Image {active.imageIndex + 1} of {activeProject.images.length}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white hover:bg-white/14"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative flex-1 overflow-hidden rounded-shell border border-white/10 bg-white/6">
              {activeProject.images.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActive({
                        projectIndex: active.projectIndex,
                        imageIndex:
                          (active.imageIndex - 1 + activeProject.images.length) %
                          activeProject.images.length,
                      })
                    }
                    className="absolute left-4 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-white/10 text-white backdrop-blur-sm hover:bg-white/16"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActive({
                        projectIndex: active.projectIndex,
                        imageIndex:
                          (active.imageIndex + 1) % activeProject.images.length,
                      })
                    }
                    className="absolute right-4 top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-white/10 text-white backdrop-blur-sm hover:bg-white/16"
                    aria-label="Next"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              ) : null}
              <Image
                src={activeImage}
                alt={`${activeProject.title} photo ${active.imageIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
