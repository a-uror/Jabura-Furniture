"use client";

import { motion } from "motion/react";
import { Truck, ShieldCheck, CreditCard, Hammer } from "lucide-react";

const pillars = [
  {
    Icon: Truck,
    title: "Free delivery",
    copy: "We deliver and assemble in Nairobi and nearby towns. Ask us about your area on WhatsApp.",
  },
  {
    Icon: ShieldCheck,
    title: "See it first",
    copy: "Everything on the site is in the Cabanas showroom on Mombasa Road. Sit on it, open drawers, check the finish.",
  },
  {
    Icon: CreditCard,
    title: "Lipa pole pole",
    copy: "Start with a deposit and pay the balance in instalments. We hold your pieces until you are done.",
  },
  {
    Icon: Hammer,
    title: "Custom orders",
    copy: "Need a different size, colour or layout? We build in Juja for homes, offices and hotels.",
  },
];

export function TrustBar() {
  return (
    <section aria-label="Why buy from Jabura" className="border-y border-rail bg-surface/70">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-6 px-6 py-7 md:grid-cols-4">
        {pillars.map(({ Icon, title, copy }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="flex items-start gap-3"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-full border border-primary/30 bg-background/50 text-primary">
              <Icon className="size-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <h3 className="font-serif text-[0.82rem] tracking-[0.1em] text-foreground uppercase">{title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-subtle-foreground">{copy}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
