"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { PencilRuler, Hammer, Truck, Building2 } from "lucide-react";
import { useSite } from "@/components/site/SiteProvider";
import { whatsappHref } from "@/lib/catalogue";
import { openWhatsApp } from "@/lib/leads";

const steps = [
  {
    Icon: PencilRuler,
    title: "01 · Consultation",
    copy: "We measure, sketch and agree materials, finishes and a fixed price.",
  },
  {
    Icon: Hammer,
    title: "02 · Making",
    copy: "Your piece is cut, joined, upholstered and finished by a named craftsperson.",
  },
  {
    Icon: Truck,
    title: "03 · Delivery",
    copy: "We deliver and assemble in Nairobi and nearby towns.",
  },
];

export function BespokeView() {
  const { settings } = useSite();
  const message = "Hello Jabura, I'd like to discuss a bespoke / B2B furniture project.";
  return (
    <div>
      <section className="relative h-[44vh] min-h-[300px] overflow-hidden">
        <Image
          src="/categories/bespoke.jpg"
          alt="Bespoke furniture workshop"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="veil absolute inset-0" aria-hidden />
        <div className="on-photo relative mx-auto flex h-full max-w-[1500px] flex-col justify-end px-6 pb-12">
          <p className="eyebrow">One-of-one commissions</p>
          <h1 className="mt-3 font-serif text-3xl tracking-wide text-foreground sm:text-5xl">BESPOKE &amp; B2B</h1>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 py-20">
        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map(({ Icon, title, copy }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.3 }}
              className="border border-border bg-surface p-7"
            >
              <Icon className="size-6 text-primary" aria-hidden />
              <h3 className="mt-4 font-serif text-lg text-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 border border-primary/30 bg-surface p-8 sm:p-12">
          <Building2 className="size-6 text-primary" aria-hidden />
          <h2 className="mt-4 font-serif text-2xl text-foreground sm:text-3xl">Hotels, offices &amp; developers</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            We supply contract-grade furniture for hospitality and commercial projects — from 40-room refurbishments to
            full office fit-outs. Volume pricing, technical drawings, FF&amp;E schedules and phased delivery are all
            handled in-house.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappHref(settings.whatsapp_number, message)}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => {
                event.preventDefault();
                void openWhatsApp(settings.whatsapp_number, message, {
                  message,
                  channel: "whatsapp",
                  source: "bespoke_page",
                });
              }}
              className="rounded-full bg-primary px-7 py-4 text-center text-[0.72rem] font-semibold tracking-[0.08em] text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              Start a project
            </a>
            <Link
              href="/contact"
              className="rounded-full border border-border px-7 py-4 text-center text-[0.72rem] font-semibold tracking-[0.08em] text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Book a showroom visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
