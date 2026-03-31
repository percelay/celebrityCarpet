import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { GallerySection } from "@/components/gallery-section";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TestimonialsSection } from "@/components/testimonials-section";
import { TradeBenefitsSection } from "@/components/trade-benefits-section";
import { getSiteAssets, getSiteContent } from "@/lib/site-content";
import { hrefFromLabel } from "@/lib/utils";

export default function HomePage() {
  const content = getSiteContent();
  const assets = getSiteAssets();
  const navigation = [
    "About",
    "Services",
    "Gallery",
    content.tradeBenefits.title,
    "Testimonials",
    "Contact",
  ];

  return (
    <>
      <SiteHeader
        brand={content.brand}
        navigation={navigation}
        ctaLabel={content.hero.secondaryCta}
      />

      <main>
        <HeroSection
          brand={content.brand}
          headline={content.hero.headline}
          subheadline={content.hero.subheadline}
          primaryCta={{
            label: content.hero.primaryCta,
            href: hrefFromLabel(content.hero.primaryCta),
          }}
          secondaryCta={{
            label: content.hero.secondaryCta,
            href: hrefFromLabel(content.hero.secondaryCta),
          }}
          imageSrc={assets.heroImage}
        />

        <AboutSection
          title="About"
          body={content.about}
          imageSrc={assets.aboutImage}
        />

        <ServicesSection title="Services" services={content.services} />

        <GallerySection
          title="Gallery"
          categories={[
            {
              ...content.gallery.commercial,
              images: assets.commercialImages,
            },
            {
              ...content.gallery.residential,
              images: assets.residentialImages,
            },
          ]}
        />

        <TradeBenefitsSection
          title={content.tradeBenefits.title}
          description={content.tradeBenefits.description}
          ctaLabel={content.hero.secondaryCta}
          ctaHref={hrefFromLabel(content.hero.secondaryCta)}
        />

        <TestimonialsSection
          title="Testimonials"
          testimonials={content.testimonials}
        />

        <ContactSection
          title="Contact"
          contact={content.contact}
          ctaLabel={content.hero.secondaryCta}
        />
      </main>

      <SiteFooter
        brand={content.brand}
        headline={content.hero.headline}
        navigation={navigation}
        contact={content.contact}
        ctaLabel={content.hero.secondaryCta}
      />
    </>
  );
}
