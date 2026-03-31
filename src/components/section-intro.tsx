import { cx } from "@/lib/utils";

type SectionIntroProps = {
  title: string;
  description?: string;
  invert?: boolean;
};

export function SectionIntro({
  title,
  description,
  invert = false,
}: SectionIntroProps) {
  return (
    <div className="max-w-3xl">
      <h2
        className={cx(
          "font-display text-4xl leading-none tracking-[-0.04em] text-balance sm:text-5xl",
          invert ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cx(
            "mt-4 text-base leading-7 text-pretty sm:text-lg",
            invert ? "text-white/80" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
