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

export type NavItem = { label: string; href: string };

export const SITE_NAV: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Quote", href: "/quote" },
  { label: "Contact", href: "/contact" },
];

export function hrefFromLabel(label: string) {
  const normalized = label.toLowerCase();

  if (normalized.includes("about")) return "/about";
  if (normalized.includes("contact")) return "/contact";
  if (normalized.includes("quote")) return "/quote";

  return `/${slugify(label)}`;
}
