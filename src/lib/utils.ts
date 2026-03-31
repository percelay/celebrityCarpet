export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function hrefFromLabel(label: string) {
  const normalized = label.toLowerCase();

  if (normalized.includes("about")) {
    return "#about";
  }

  if (normalized.includes("contact")) {
    return "#contact";
  }

  return `#${slugify(label)}`;
}
