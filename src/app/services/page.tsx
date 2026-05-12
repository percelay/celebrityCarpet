import { PageHero } from "@/components/page-hero";
import { ServicesSection } from "@/components/services-section";
import { TradeBenefitsSection } from "@/components/trade-benefits-section";
import { getSiteContent } from "@/lib/site-content";

export const metadata = { title: "Services — Celebrity Carpet Installations" };

export default function ServicesPage() {
  const content = getSiteContent();

  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Services"
        description="Carpet installation, custom fabrication, stair work, templates, receiving & storage — all under one roof in our 19,000 sq. ft. Little Ferry warehouse."
      />
      <ServicesSection title="Core services" services={content.services} />
      <TradeBenefitsSection
        title={content.tradeBenefits.title}
        description={content.tradeBenefits.description}
        ctaLabel="Request a Quote"
        ctaHref="/quote"
      />
    </>
  );
}
