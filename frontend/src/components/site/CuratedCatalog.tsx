"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { CatalogueCategory, CatalogueProduct } from "@/lib/catalogue";
import { ProductCard } from "./ProductCard";

export function CuratedCatalog({
  products,
  categories,
}: {
  products: CatalogueProduct[];
  categories: CatalogueCategory[];
}) {
  const [tab, setTab] = useState("all");
  const tabs = [{ slug: "all", label: "Best Sellers" }, ...categories.map((c) => ({ slug: c.slug, label: c.name }))];

  const items = useMemo(
    () =>
      (tab === "all" ? products : products.filter((product) => product.category_slug === tab)).slice(0, 8),
    [products, tab],
  );

  return (
    <section className="mx-auto max-w-[1500px] px-6 py-16">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Curated catalog</p>
          <h2 className="mt-2 font-serif text-2xl text-foreground sm:text-3xl">The Jabura Showcase</h2>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.2em] text-primary uppercase hover:gap-3"
        >
          View all products <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>

      <div role="tablist" aria-label="Catalog categories" className="no-scrollbar mt-7 flex gap-2 overflow-x-auto pb-2">
        {tabs.map((t) => (
          <button
            key={t.slug}
            type="button"
            role="tab"
            aria-selected={tab === t.slug}
            onClick={() => setTab(t.slug)}
            className={`shrink-0 rounded-full border px-5 py-2.5 text-[0.68rem] tracking-[0.16em] uppercase transition-colors ${
              tab === t.slug
                ? "border-primary bg-primary text-primary-foreground"
                : "border-rail text-muted-foreground hover:border-primary hover:text-primary"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <motion.div
        key={tab}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {items.length === 0 ? (
          <p className="col-span-full py-12 text-center text-sm text-muted-foreground">
            New pieces for this room land in the showroom shortly.
          </p>
        ) : (
          items.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)
        )}
      </motion.div>
    </section>
  );
}
