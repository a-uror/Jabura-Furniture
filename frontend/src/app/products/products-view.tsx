"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import type { CatalogueCategory, CatalogueProduct } from "@/lib/catalogue";

export function ProductsView({
  products,
  categories,
}: {
  products: CatalogueProduct[];
  categories: CatalogueCategory[];
}) {
  const [cat, setCat] = useState<string | null>(null);
  const items = useMemo(
    () => (cat ? products.filter((product) => product.category_slug === cat) : products),
    [cat, products],
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <p className="eyebrow">The full catalogue</p>
      <h1 className="mt-3 font-serif text-3xl text-foreground sm:text-5xl">ALL PRODUCTS</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
        {products.length} pieces currently on the floor, with new drops every month from the Juja workshop.
      </p>

      <div className="no-scrollbar mt-10 flex gap-3 overflow-x-auto border-b border-border pb-6">
        <Pill label="All" active={cat === null} onClick={() => setCat(null)} />
        {categories.map((category) => (
          <Pill
            key={category.slug}
            label={category.name}
            active={cat === category.slug}
            onClick={() => setCat(category.slug)}
          />
        ))}
      </div>

      <p className="py-6 text-sm text-muted-foreground">
        Showing 1-{items.length} of {items.length} results
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((product, index) => (
          <ProductCard key={product.slug} product={product} index={index} />
        ))}
      </div>
    </div>
  );
}

function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 rounded-full border px-5 py-2.5 text-[0.7rem] tracking-[0.16em] uppercase transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-muted-foreground hover:border-primary hover:text-primary"
      }`}
    >
      {label}
    </button>
  );
}
