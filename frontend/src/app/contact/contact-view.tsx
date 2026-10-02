"use client";

import { useState, type ComponentType, type ReactNode } from "react";
import { motion } from "motion/react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
import { useSite } from "@/components/site/SiteProvider";
import { whatsappHref } from "@/lib/catalogue";
import { openWhatsApp, recordEnquiry } from "@/lib/leads";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactView() {
  const [sent, setSent] = useState(false);
  const { settings } = useSite();
  const phone = settings.business_phone ?? "";
  const email = settings.business_email ?? "";
  const whatsappMessage = "Hello Jabura, I have an inquiry.";

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <p className="eyebrow">We would love to hear from you</p>
      <h1 className="mt-3 font-serif text-3xl text-foreground sm:text-5xl">CONTACT US</h1>

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <motion.form
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            void recordEnquiry({
              name: String(data.get("name") ?? ""),
              email: String(data.get("email") ?? ""),
              phone: String(data.get("phone") ?? ""),
              message: String(data.get("message") ?? ""),
              channel: "contact_form",
              source: "contact_page",
            }).then((saved) => {
              if (!saved) {
                toast.error("We could not save that just now. Please WhatsApp the showroom.");
                return;
              }
              setSent(true);
              toast.success("Thank you — our team will reply within one business day.");
            });
          }}
          className="border border-border bg-surface p-7 sm:p-9"
        >
          <h2 className="font-serif text-xl text-foreground">Send an inquiry</h2>
          <FieldGroup className="mt-6">
            <Field>
              <FieldLabel htmlFor="name">Full name</FieldLabel>
              <Input id="name" name="name" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email address</FieldLabel>
              <Input id="email" name="email" type="email" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="phone">Phone number</FieldLabel>
              <Input id="phone" name="phone" type="tel" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="message">How can we help?</FieldLabel>
              <Textarea id="message" name="message" required rows={5} />
            </Field>
          </FieldGroup>
          <button
            type="submit"
            className="mt-7 w-full rounded-full bg-primary py-4 text-[0.72rem] tracking-[0.14em] text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            {sent ? "Inquiry sent" : "Send inquiry"}
          </button>
          <a
            href={whatsappHref(settings.whatsapp_number, whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            onClick={(event) => {
              event.preventDefault();
              void openWhatsApp(settings.whatsapp_number, whatsappMessage, {
                message: whatsappMessage,
                channel: "whatsapp",
                source: "contact_page",
              });
            }}
            className="mt-3 block rounded-full border border-whatsapp py-4 text-center text-[0.72rem] tracking-[0.14em] text-whatsapp transition-colors hover:bg-whatsapp hover:text-whatsapp-foreground"
          >
            Chat on WhatsApp
          </a>
        </motion.form>

        <div>
          <ul className="flex flex-col gap-6 text-sm">
            <Detail Icon={Phone} title="Phone">
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-muted-foreground hover:text-primary">
                {phone}
              </a>
            </Detail>
            <Detail Icon={Mail} title="Email">
              <a href={`mailto:${email}`} className="text-muted-foreground hover:text-primary">
                {email}
              </a>
            </Detail>
            <Detail Icon={MapPin} title="Showroom">
              <span className="text-muted-foreground">{settings.address}</span>
            </Detail>
            <Detail Icon={Clock} title="Opening hours">
              <span className="text-muted-foreground">{settings.opening_hours}</span>
            </Detail>
          </ul>

          <div className="mt-8 overflow-hidden border border-primary/25">
            <iframe
              title="Map to the Jabura Home Furniture showroom at Cabanas, Mombasa Road"
              src={
                settings.google_maps_url ||
                "https://www.google.com/maps?q=Cabanas,+Mombasa+Road,+Nairobi,+Kenya&output=embed"
              }
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-80 w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({
  Icon,
  title,
  children,
}: {
  Icon: ComponentType<{ className?: string }>;
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="flex gap-4 border-b border-border pb-5">
      <Icon className="mt-0.5 size-5 shrink-0 text-primary" />
      <div>
        <p className="font-serif text-sm tracking-[0.12em] text-foreground uppercase">{title}</p>
        <div className="mt-1">{children}</div>
      </div>
    </li>
  );
}
