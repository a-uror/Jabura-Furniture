"use client";

import { motion } from "motion/react";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import { useSite } from "@/components/site/SiteProvider";

export function ShowroomLocator() {
  const { settings } = useSite();
  const phone = settings.business_phone ?? "";
  return (
    <section className="mx-auto max-w-[1500px] px-6 py-16">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.35 }}
        >
          <p className="eyebrow">Showroom location</p>
          <h2 className="mt-2 font-serif text-2xl text-foreground sm:text-3xl">Visit us at Cabanas</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            The pieces on this site are on the floor at Cabanas, Mombasa Road. Pull a recliner lever, open desk
            drawers, and pick the colour you want before we arrange delivery.
          </p>
          <ul className="mt-7 flex flex-col gap-4 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              {settings.address ?? "Jabura Home Furniture, Cabanas, Mombasa Road, Nairobi"}
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              {settings.opening_hours ?? "Monday – Saturday, 8:00am – 7:00pm · Sunday by appointment"}
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-primary">
                {phone}
              </a>
            </li>
          </ul>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address ?? "Cabanas, Mombasa Road, Nairobi, Kenya")}`}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-3 rounded-full border border-primary/50 px-6 py-3.5 text-[0.7rem] tracking-[0.14em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <Navigation className="size-4" aria-hidden /> Get directions
          </a>
        </motion.div>

        <div className="overflow-hidden rounded-2xl border border-primary/25">
          <iframe
            title="Jabura Home Furniture — Cabanas, Mombasa Road"
            src={
              settings.google_maps_url ||
              "https://www.google.com/maps?q=Cabanas,+Mombasa+Road,+Nairobi,+Kenya&output=embed"
            }
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-80 w-full lg:h-full lg:min-h-96"
          />
        </div>
      </div>
    </section>
  );
}
