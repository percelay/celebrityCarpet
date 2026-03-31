import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { cache } from "react";

export type SiteSection = {
  title: string;
  description: string;
};

export type Service = SiteSection;

export type Testimonial = {
  quote: string;
  author: string;
};

export type ContactDetail = {
  label: string;
  value: string;
};

export type ContactInfo = {
  details: ContactDetail[];
  formFields: string[];
  email: string;
  telephone: string;
  fax: string;
  address: string;
};

export type SiteContent = {
  brand: string;
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
  };
  about: string;
  services: Service[];
  gallery: {
    commercial: SiteSection;
    residential: SiteSection;
  };
  tradeBenefits: SiteSection;
  testimonials: Testimonial[];
  contact: ContactInfo;
};

export type SiteAssets = {
  heroImage: string | null;
  commercialImages: string[];
  residentialImages: string[];
};

const CONTENT_PATH = path.join(process.cwd(), "sourcematerial.md");
const PUBLIC_PATH = path.join(process.cwd(), "public");
const IMAGE_PATTERN = /\.(avif|gif|jpe?g|png|webp)$/i;

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getSourceMaterial() {
  return readFileSync(CONTENT_PATH, "utf8").replace(/\r\n/g, "\n").trim();
}

function extractBrand(source: string) {
  const match = source.match(/^#\s+(.+)$/m);

  if (!match?.[1]) {
    throw new Error('Missing top-level brand heading in sourcematerial.md.');
  }

  return match[1].trim();
}

function extractValue(source: string, label: string) {
  const pattern = new RegExp(`${escapeRegExp(label)}:\\s*(.+)`, "m");
  const match = source.match(pattern);

  if (!match?.[1]) {
    throw new Error(`Missing value for "${label}" in sourcematerial.md.`);
  }

  return match[1].trim();
}

function extractSection(source: string, heading: string) {
  const pattern = new RegExp(
    `## ${escapeRegExp(heading)}\\n([\\s\\S]*?)(?=\\n## |$)`,
  );
  const match = source.match(pattern);

  if (!match?.[1]) {
    throw new Error(`Missing section "${heading}" in sourcematerial.md.`);
  }

  return match[1].trim();
}

function extractHero(source: string) {
  const heroBlock = extractSection(source, "Hero");

  return {
    headline: extractValue(heroBlock, "Headline"),
    subheadline: extractValue(heroBlock, "Subheadline"),
    primaryCta: extractValue(heroBlock, "Primary CTA"),
    secondaryCta: extractValue(heroBlock, "Secondary CTA"),
  };
}

function extractServices(source: string) {
  const servicesBlock = extractSection(source, "Services");
  const matches = [
    ...servicesBlock.matchAll(
      /### Service \d+\nTitle:\s*(.+)\nDescription:\s*([\s\S]*?)(?=\n\n### Service \d+|$)/g,
    ),
  ];

  if (!matches.length) {
    throw new Error("Missing service entries in sourcematerial.md.");
  }

  return matches.map((match) => ({
    title: match[1].trim(),
    description: match[2].trim(),
  }));
}

function extractGallery(source: string) {
  const galleryBlock = extractSection(source, "Gallery");

  const categories = [
    ...galleryBlock.matchAll(
      /### [^\n]+\nTitle:\s*(.+)\nDescription:\s*([\s\S]*?)(?=\n\n### [^\n]+|$)/g,
    ),
  ].map((match) => ({
    title: match[1].trim(),
    description: match[2].trim(),
  }));

  if (categories.length < 2) {
    throw new Error("Missing gallery categories in sourcematerial.md.");
  }

  return {
    commercial: categories[0],
    residential: categories[1],
  };
}

function extractTradeBenefits(source: string) {
  const tradeBlock = extractSection(source, "Trade Benefits Program");

  return {
    title: extractValue(tradeBlock, "Title"),
    description: extractValue(tradeBlock, "Description"),
  };
}

function extractTestimonials(source: string) {
  const testimonialsBlock = extractSection(source, "Testimonials");
  const entries = testimonialsBlock
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("* "));

  if (!entries.length) {
    throw new Error("Missing testimonials in sourcematerial.md.");
  }

  return entries.map((entry) => {
    const content = entry.slice(2).trim();
    const separator = " — ";
    const dividerIndex = content.lastIndexOf(separator);

    if (dividerIndex === -1) {
      return {
        quote: content,
        author: "",
      };
    }

    return {
      quote: content.slice(0, dividerIndex).trim(),
      author: content.slice(dividerIndex + separator.length).trim(),
    };
  });
}

function extractContact(source: string): ContactInfo {
  const contactBlock = extractSection(source, "Contact");
  const formFields = extractValue(contactBlock, "Form Fields")
    .split(",")
    .map((field) => field.trim())
    .filter(Boolean);

  const details: ContactDetail[] = [
    {
      label: "Address",
      value: extractValue(contactBlock, "Address"),
    },
    {
      label: "E-mail",
      value: extractValue(contactBlock, "E-mail"),
    },
    {
      label: "Telephone",
      value: extractValue(contactBlock, "Telephone"),
    },
    {
      label: "Fax",
      value: extractValue(contactBlock, "Fax"),
    },
  ];

  return {
    details,
    formFields,
    address: details[0].value,
    email: details[1].value,
    telephone: details[2].value,
    fax: details[3].value,
  };
}

function collectImages(folderName: "commercial" | "residential") {
  const folderPath = path.join(PUBLIC_PATH, folderName);

  if (!existsSync(folderPath)) {
    return [];
  }

  return readdirSync(folderPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && IMAGE_PATTERN.test(entry.name))
    .map((entry) => entry.name)
    .sort((left, right) =>
      left.localeCompare(right, undefined, {
        numeric: true,
        sensitivity: "base",
      }),
    )
    .map((fileName) => `/${folderName}/${fileName}`);
}

function collectHeroImage() {
  if (!existsSync(PUBLIC_PATH)) {
    return null;
  }

  const heroFile = readdirSync(PUBLIC_PATH, { withFileTypes: true })
    .filter((entry) => entry.isFile() && IMAGE_PATTERN.test(entry.name))
    .map((entry) => entry.name)
    .sort((left, right) =>
      left.localeCompare(right, undefined, {
        numeric: true,
        sensitivity: "base",
      }),
    )
    .find((fileName) => fileName.toLowerCase().startsWith("wide"));

  return heroFile ? `/${heroFile}` : null;
}

export const getSiteContent = cache((): SiteContent => {
  const source = getSourceMaterial();

  return {
    brand: extractBrand(source),
    hero: extractHero(source),
    about: extractSection(source, "About"),
    services: extractServices(source),
    gallery: extractGallery(source),
    tradeBenefits: extractTradeBenefits(source),
    testimonials: extractTestimonials(source),
    contact: extractContact(source),
  };
});

export const getSiteAssets = cache((): SiteAssets => {
  const commercialImages = collectImages("commercial");
  const residentialImages = collectImages("residential");

  return {
    heroImage: collectHeroImage() ?? commercialImages[0] ?? residentialImages[0] ?? null,
    commercialImages,
    residentialImages,
  };
});
