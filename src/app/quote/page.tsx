import { PageHero } from "@/components/page-hero";
import { QuoteSection } from "@/components/quote-section";

export const metadata = { title: "Request a Quote — Celebrity Carpet Installations" };

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Quote Order Box"
        title="Request a Quote"
        description="Tell us about your project. We reply with written pricing within 24 hours — often sooner."
      />
      <QuoteSection />
    </>
  );
}
