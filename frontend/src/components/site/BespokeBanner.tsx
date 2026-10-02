"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Hammer, CreditCard, ArrowRight, Ruler, Images, Building2 } from "lucide-react";

const bespokePoints = [
  { Icon: Ruler, label: "Built to your exact dimensions" },
  { Icon: Images, label: "Upload photo inspiration" },
  { Icon: Building2, label: "Hotel, Airbnb & B2B contracts" },
];

export function BespokeBanner() {
  return (
    <section className="mx-auto max-w-[1500px] px-6 py-16">
      <div className="grid gap-6 lg:grid-cols-2">
        <motion.article
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.35 }}
          className="relative overflow-hidden rounded-2xl border border-primary/25"
        >
          <Image
            src="/categories/bespoke.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            aria-hidden
          />
          <div className="veil absolute inset-0" aria-hidden />
          <div className="on-photo relative flex h-full min-h-[420px] flex-col justify-end p-8 sm:p-10">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 px-3 py-1 text-[0.6rem] tracking-[0.24em] text-primary uppercase">
              <Hammer className="size-3" aria-hidden /> The Bespoke Studio
            </span>
            <h2 className="mt-4 font-serif text-2xl text-foreground sm:text-3xl">Commission Your Own Design</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Sit with our master joiners in Juja, choose your hardwood, fabric and finish, and we build a one-of-one
              piece to the millimetre.
            </p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {bespokePoints.map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <Icon className="size-4 shrink-0 text-primary" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
            <Link
              href="/bespoke"
              className="mt-7 inline-flex w-fit items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-[0.7rem] tracking-[0.14em] text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Start a commission <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.35 }}
          className="relative overflow-hidden rounded-2xl border border-primary/25 bg-emerald p-8 sm:p-10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 -right-14 size-56 rounded-full bg-primary/25 blur-3xl"
          />
          <div className="relative">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/50 px-3 py-1 text-[0.6rem] tracking-[0.24em] text-primary uppercase">
              <CreditCard className="size-3" aria-hidden /> Flexible payments
            </span>
            <h2 className="mt-4 font-serif text-2xl text-foreground sm:text-3xl">Lipa Pole Pole</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-emerald-foreground">
              Reserve your furniture with a 30% deposit and settle the balance in zero-interest monthly installments.
              Your pieces are held in our Juja warehouse until the final payment clears.
            </p>
            <dl className="mt-7 grid grid-cols-3 gap-4">
              {[
                { k: "30%", v: "Deposit to reserve" },
                { k: "0%", v: "Interest charged" },
                { k: "6 mo", v: "Maximum plan" },
              ].map((s) => (
                <div key={s.k} className="rounded-lg border border-primary/25 bg-background/25 p-4">
                  <dt className="font-serif text-xl text-primary">{s.k}</dt>
                  <dd className="mt-1 text-[0.68rem] tracking-[0.12em] text-emerald-foreground uppercase">{s.v}</dd>
                </div>
              ))}
            </dl>
            <Link
              href="/contact"
              className="mt-7 inline-flex w-fit items-center gap-3 rounded-full border border-primary px-6 py-3.5 text-[0.7rem] tracking-[0.14em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Apply for a plan <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
