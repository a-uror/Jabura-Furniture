"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { quickCircles } from "@/lib/content";
import { cn } from "@/lib/utils";

export function CircleExplorer({ active }: { active?: string }) {
  return (
    <section className="mx-auto max-w-[1500px] px-6 py-12">
      <p className="eyebrow">Quick explorer</p>
      <h2 className="mt-2 font-serif text-2xl text-foreground sm:text-3xl">Shop by product</h2>

      <ul className="no-scrollbar mt-8 flex items-center gap-6 overflow-x-auto pb-2">
        {quickCircles.map((c, i) => {
          const href = `/category/${c.slug}?sub=${encodeURIComponent(c.sub)}`;
          const isActive = active === c.label;
          return (
            <motion.li
              key={c.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.2) }}
              className="shrink-0"
            >
              <Link href={href} className="group flex w-28 flex-col items-center gap-3 text-center">
                <span
                  className={cn(
                    "relative grid size-24 place-items-center overflow-hidden rounded-full border-2 transition-all sm:size-28",
                    isActive
                      ? "border-primary shadow-[0_10px_30px_color-mix(in_oklab,var(--primary)_28%,transparent)]"
                      : "border-primary/30 group-hover:border-primary",
                  )}
                >
                  <Image
                    src={c.image}
                    alt=""
                    fill
                    sizes="112px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </span>
                <span
                  className={cn(
                    "text-[0.68rem] tracking-[0.14em] uppercase",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary",
                  )}
                >
                  {c.label}
                </span>
              </Link>
            </motion.li>
          );
        })}
        <li className="flex h-24 shrink-0 items-center sm:h-28">
          <Link
            href="/explore"
            className="group inline-flex items-center gap-2 rounded-full bg-primary py-2.5 pr-4 pl-3 text-[0.7rem] font-semibold text-primary-foreground shadow-[0_8px_24px_color-mix(in_oklab,var(--primary)_35%,transparent)] transition-transform hover:scale-105"
          >
            <span className="grid size-6 place-items-center rounded-full bg-primary-foreground/15">
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
            Explore more
          </Link>
        </li>
      </ul>
    </section>
  );
}
