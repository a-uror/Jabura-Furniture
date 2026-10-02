"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { useSite } from "@/components/site/SiteProvider";
import { whatsappHref } from "@/lib/catalogue";
import { openWhatsApp } from "@/lib/leads";

const shop = [
  { label: "Shop All", href: "/products" },
  { label: "Offers", href: "/products" },
  { label: "New Arrivals", href: "/products" },
  { label: "Collections", href: "/products" },
];

const help = [
  { label: "Ask about your order", href: "/track-order" },
  { label: "FAQs", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

const legal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Settings", href: "/cookies" },
];

const socials = [
  {
    label: "WhatsApp",
    href: "#whatsapp",
    path: "M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.13-.42-2.15-1.33-.8-.71-1.34-1.59-1.5-1.89-.15-.3-.02-.46.13-.61.15-.15.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.09 3.34 5.08 4.55 2.99 1.21 2.99.81 3.53.76.54-.05 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35ZM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.44 9.44 0 0 1-1.45-5.03c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.98 6.67 2.77a9.38 9.38 0 0 1 2.76 6.68c0 5.21-4.24 9.44-9.44 9.44ZM20.11 3.9A11.36 11.36 0 0 0 12.05.55C5.77.55.66 5.66.66 11.95c0 2 .52 3.96 1.52 5.68L.5 23.45l5.96-1.56a11.35 11.35 0 0 0 5.59 1.42h.01c6.28 0 11.39-5.11 11.4-11.4a11.33 11.33 0 0 0-3.35-8.01Z",
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    path: "M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1Z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm10 1.5H7A2.5 2.5 0 0 0 4.5 7v10A2.5 2.5 0 0 0 7 19.5h10a2.5 2.5 0 0 0 2.5-2.5V7A2.5 2.5 0 0 0 17 4.5ZM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 1.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm4.75-2.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z",
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    path: "M19.6 8.2a6.7 6.7 0 0 1-3.9-1.2v7.1a6.1 6.1 0 1 1-6.1-6.1c.3 0 .6 0 .9.1v3.1a3.1 3.1 0 1 0 2.2 3v-11h2.9a6.7 6.7 0 0 0 4 3.9v3.1Z",
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  const { settings } = useSite();
  const phone = settings.business_phone ?? "";
  const whatsappMessage = "Hello Jabura Home Furniture, I would like to inquire about a piece.";

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-[1500px] gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <span className="font-serif text-base font-bold tracking-[0.18em] text-primary uppercase">
            Jabura Furniture
          </span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Furniture for the home and office, on the floor at Cabanas, Mombasa Road. Sit on it first. We deliver across Nairobi and
            nearby towns.
          </p>
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="mt-6 flex items-center gap-2.5 text-sm text-foreground hover:text-primary"
          >
            <Phone className="size-4 shrink-0 text-primary" aria-hidden />
            {phone}
          </a>
          <div className="mt-6 flex gap-2">
            {socials.map(({ label, href, path }) => (
              <a
                key={label}
                href={label === "WhatsApp" ? whatsappHref(settings.whatsapp_number, whatsappMessage) : href}
                target="_blank"
                rel="noreferrer"
                onClick={
                  label === "WhatsApp"
                    ? (event) => {
                        event.preventDefault();
                        void openWhatsApp(settings.whatsapp_number, whatsappMessage, {
                          message: whatsappMessage,
                          channel: "whatsapp",
                          source: "footer",
                        });
                      }
                    : undefined
                }
                aria-label={label}
                className="grid size-10 place-items-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Shop">
          {shop.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {item.label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Help">
          {help.map((item) => (
            <li key={item.label}>
              <Link href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {item.label}
              </Link>
            </li>
          ))}
        </FooterColumn>
      </div>

      <div className="bg-utility">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-3 px-6 py-4 text-[11px] tracking-[0.12em] text-subtle-foreground uppercase sm:flex-row sm:items-center sm:justify-between">
          <p className="normal-case tracking-normal">
            © {year} Jabura Home Furniture. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
            {legal.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-primary">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="text-[0.68rem] font-semibold tracking-[0.22em] text-muted-foreground uppercase">{title}</h3>
      <div className="mt-2 h-px w-full bg-border" aria-hidden />
      <ul className="mt-5 flex flex-col gap-3">{children}</ul>
    </div>
  );
}
