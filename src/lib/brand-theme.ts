import type { SiteContent } from "@/lib/site-content";

export type BrandTone = "premium" | "corporate" | "technical";

const KEYWORDS: Record<BrandTone, string[]> = {
  premium: [
    "premier",
    "luxury",
    "exquisite",
    "craftsmanship",
    "celebrities",
    "a-list",
    "high-end",
    "well-known",
    "quality workmanship",
    "top interior designers",
  ],
  corporate: [
    "reliable",
    "service",
    "dependability",
    "customer satisfaction",
    "committed",
    "professional",
    "organized",
    "expert",
    "support",
    "partnership",
  ],
  technical: [
    "installation",
    "fabrication",
    "detailing",
    "floor prep",
    "repair",
    "re-stretching",
    "re-binding",
    "re-seaming",
    "stair work",
    "insert work",
  ],
};

function scoreTone(corpus: string, keywords: string[]) {
  return keywords.reduce((score, keyword) => {
    return score + (corpus.includes(keyword) ? 1 : 0);
  }, 0);
}

export function deriveBrandTone(content: SiteContent): BrandTone {
  const corpus = [
    content.brand,
    content.hero.headline,
    content.hero.subheadline,
    content.about,
    ...content.services.flatMap((service) => [service.title, service.description]),
    content.gallery.commercial.title,
    content.gallery.commercial.description,
    content.gallery.residential.title,
    content.gallery.residential.description,
    content.tradeBenefits.title,
    content.tradeBenefits.description,
    ...content.testimonials.flatMap((testimonial) => [
      testimonial.quote,
      testimonial.author,
    ]),
  ]
    .join(" ")
    .toLowerCase();

  const premiumScore = scoreTone(corpus, KEYWORDS.premium);
  const corporateScore = scoreTone(corpus, KEYWORDS.corporate);
  const technicalScore = scoreTone(corpus, KEYWORDS.technical);

  if (premiumScore >= corporateScore && premiumScore >= technicalScore) {
    return "premium";
  }

  if (corporateScore >= technicalScore) {
    return "corporate";
  }

  return "technical";
}
