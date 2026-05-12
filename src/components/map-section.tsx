import { MapPin, Navigation } from "lucide-react";

import { SectionIntro } from "@/components/section-intro";

const ADDRESS = "223 Gates Road, Suite D, Little Ferry, NJ 07643";
const MAP_QUERY = encodeURIComponent(ADDRESS);
const EMBED_URL = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`;

export function MapSection() {
  return (
    <section id="visit" className="bg-surface py-20 sm:py-24">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="space-y-6">
          <SectionIntro title="Visit the Warehouse" eyebrow="Find Us" />
          <p className="text-base leading-7 text-muted-foreground sm:text-lg">
            Our 19,000 sq. ft. warehouse in Little Ferry, NJ houses our
            fabrication floor, six loading docks, and barcoded inventory
            system — receiving, storage, and shipping all under one roof.
          </p>
          <div className="surface-panel p-6">
            <div className="flex items-start gap-4">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-soft text-accent-strong">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Address
                </p>
                <p className="mt-2 text-base leading-7 text-foreground/88">
                  223 Gates Road, Suite D<br />
                  Little Ferry, NJ 07643
                </p>
              </div>
            </div>
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-accent-strong"
            >
              Get Directions
              <Navigation className="h-4 w-4" />
            </a>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            <strong className="font-semibold text-foreground">
              Storage for partners:
            </strong>{" "}
            we receive and store carpet on behalf of showrooms, designers, and
            other installation companies — barcoded, photographed on arrival,
            and ready to ship when you call for it.
          </p>
        </div>

        <div className="overflow-hidden rounded-shell border border-border bg-surface shadow-soft">
          <iframe
            src={EMBED_URL}
            title="Celebrity Carpet Installations location map"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="h-full min-h-[24rem] w-full"
          />
        </div>
      </div>
    </section>
  );
}
