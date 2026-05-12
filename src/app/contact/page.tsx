import { ContactSection } from "@/components/contact-section";
import { MapSection } from "@/components/map-section";
import { NewsletterSection } from "@/components/newsletter-section";
import { PageHero } from "@/components/page-hero";
import { getSiteContent } from "@/lib/site-content";

export const metadata = { title: "Contact — Celebrity Carpet Installations" };

export default function ContactPage() {
  const content = getSiteContent();

  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Contact"
        description="Reach the right team directly — quotes, scheduling, fabrications, or receiving."
      />
      <ContactSection
        title="Send a message"
        contact={content.contact}
        ctaLabel="Send Message"
      />
      <MapSection />
      <NewsletterSection />
    </>
  );
}
