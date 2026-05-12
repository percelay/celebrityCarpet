import { AboutSection } from "@/components/about-section";
import { PageHero } from "@/components/page-hero";
import { TestimonialsSection } from "@/components/testimonials-section";
import { getSiteAssets, getSiteContent } from "@/lib/site-content";

export const metadata = { title: "About — Celebrity Carpet Installations" };

export default function AboutPage() {
  const content = getSiteContent();
  const assets = getSiteAssets();

  return (
    <>
      <PageHero
        eyebrow="Family-owned since 1995"
        title="About Celebrity Carpet"
        description="Three decades of carpet installation, fabrication, and white-glove service across NY, NJ, CT, and PA."
      />
      <AboutSection
        title="Our story"
        body={content.about}
        imageSrc={assets.aboutImage}
      />
      <TestimonialsSection
        title="What clients say"
        testimonials={content.testimonials}
      />
    </>
  );
}
