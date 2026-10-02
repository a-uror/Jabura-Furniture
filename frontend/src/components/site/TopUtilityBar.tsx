"use client";

import { Phone, MapPin, Clock } from "lucide-react";
import { useSite } from "@/components/site/SiteProvider";

export function TopUtilityBar() {
  const { settings } = useSite();
  const phone = settings.business_phone ?? "";

  return (
    <div className="hidden bg-utility text-[11px] text-subtle-foreground md:block">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-6 py-2">
        <div className="flex min-w-0 items-center gap-4">
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-primary">
            <Phone className="size-3 shrink-0 text-primary" aria-hidden />
            Call / WhatsApp: {phone}
          </a>
          <span className="text-rail">|</span>
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3 shrink-0 text-primary" aria-hidden />
            {settings.address ?? "Cabanas, Mombasa Road, Nairobi"}
          </span>
        </div>
        <p className="hidden font-semibold tracking-[0.04em] text-primary lg:block">
          Free delivery in Nairobi and nearby towns
        </p>
        <span className="flex shrink-0 items-center gap-1.5">
          <Clock className="size-3 text-primary" aria-hidden />
          {settings.opening_hours ?? "Mon – Sat: 8AM – 7PM"}
        </span>
      </div>
    </div>
  );
}
