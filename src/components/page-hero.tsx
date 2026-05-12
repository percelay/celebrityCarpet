type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="border-b border-border/70 bg-surface py-16 sm:py-20">
      <div className="section-shell">
        {eyebrow ? (
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent-strong">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-[-0.04em] text-balance text-foreground sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
