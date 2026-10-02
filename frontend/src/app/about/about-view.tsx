"use client";

import Image from "next/image";
import { motion } from "motion/react";

const pillars = [
  {
    title: "Solid frames",
    copy: "We work in hardwood and steel frames that hold up to daily use in Kenyan homes and offices.",
  },
  {
    title: "Honest finishing",
    copy: "Leatherette, velvet, lacquer and laminate — chosen for how they look in real light, not in a brochure.",
  },
  {
    title: "Built here",
    copy: "Most of what you see on the floor is made or finished in Juja. Custom sizes usually take a few weeks.",
  },
];

export function AboutView() {
  return (
    <div>
      <section className="relative h-[44vh] min-h-[300px] overflow-hidden">
        <Image
          src="/hero/hero-1.jpg"
          alt="Jabura showroom interior"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="veil absolute inset-0" aria-hidden />
        <div className="on-photo relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-12 lg:px-8">
          <p className="eyebrow">Since 2014 · Juja, Kenya</p>
          <h1 className="mt-3 font-serif text-3xl tracking-wide text-foreground sm:text-5xl">About Jabura</h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="font-serif text-2xl text-foreground sm:text-3xl">Furniture you can try before you buy</h2>
          <div className="gold-rule mt-6 max-w-24" />
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
            ex ea commodo consequat.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.35 }}
          className="relative aspect-4/5 w-full overflow-hidden border border-border"
        >
          <Image
            src="/categories/bespoke.jpg"
            alt="Workshop bench in the Juja showroom"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-3">
          {pillars.map((p) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.3 }}
              className="border border-border bg-surface p-7"
            >
              <h3 className="font-serif text-lg text-primary">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
