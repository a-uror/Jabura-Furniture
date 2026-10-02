"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/lib/content";

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const t = setInterval(() => go(1), 6500);
    return () => clearInterval(t);
  }, [go]);

  const slide = heroSlides[index] ?? heroSlides[0]!;

  return (
    <section className="mx-auto max-w-[1500px] px-4 pt-6 pb-2 sm:px-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-primary/25 shadow-[var(--shadow-luxe)] sm:rounded-[3rem]">
        <div className="relative h-[70vh] min-h-[460px] w-full">
          <AnimatePresence mode="sync">
            <motion.div
              key={slide.image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                fetchPriority={index === 0 ? "high" : undefined}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <div className="veil absolute inset-0" aria-hidden />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-primary/20 ring-inset sm:rounded-[3rem]"
          />

          <div className="on-photo relative flex h-full flex-col justify-end px-6 pb-12 sm:px-12 lg:px-16">
            <AnimatePresence mode="sync">
              <motion.div
                key={slide.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="max-w-2xl"
              >
                <p className="eyebrow text-champagne">{slide.eyebrow}</p>
                <h1 className="mt-4 font-display text-4xl leading-tight text-foreground italic sm:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {slide.copy}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href={slide.slug === "bespoke-studio" ? "/bespoke" : `/category/${slide.slug}`}
                    className="inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 text-[0.72rem] tracking-[0.14em] text-primary-foreground transition-transform hover:scale-[1.03]"
                  >
                    {slide.cta}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                  <Link
                    href="/bespoke"
                    className="inline-flex items-center gap-3 rounded-full border border-primary/50 px-7 py-4 text-[0.72rem] tracking-[0.14em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    Custom order
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex gap-2" role="tablist" aria-label="Hero slides">
                {heroSlides.map((s, i) => (
                  <button
                    key={s.title}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Show slide ${i + 1}: ${s.title}`}
                    onClick={() => setIndex(i)}
                    className={`h-0.5 transition-all ${i === index ? "w-12 bg-primary" : "w-6 bg-foreground/35 hover:bg-foreground/60"}`}
                  />
                ))}
              </div>
              <div className="ml-auto flex gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous slide"
                  className="rounded-full border border-foreground/30 p-2.5 text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next slide"
                  className="rounded-full border border-foreground/30 p-2.5 text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
