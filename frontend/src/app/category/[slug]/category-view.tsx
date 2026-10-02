"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import type { CatalogueCategory } from "@/lib/catalogue";
import { ProductCard } from "@/components/site/ProductCard";

const sorts = [
  { value: "featured", label: "Featured" },
  { value: "name", label: "Alphabetical" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
] as const;

export function CategoryView({ category }: { category: CatalogueCategory }) {
  const searchParams = useSearchParams();
  const initialSub = searchParams.get("sub");
  const [sub, setSub] = useState<string | null>(initialSub);
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    setSub(initialSub);
  }, [initialSub, category.slug]);

  const items = useMemo(() => {
    let list = [...(category.products ?? [])];
    if (sub) list = list.filter((product) => product.subcategory === sub);
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "price-asc") list.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    if (sort === "price-desc") list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    return list;
  }, [category.products, sub, sort]);

  return (
    <div>
      <section className="relative h-[46vh] min-h-[320px] w-full overflow-hidden">
        <Image
          src={category.image || "/categories/living-room.jpg"}
          alt={category.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="veil absolute inset-0" aria-hidden />
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="on-photo relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-12 lg:px-8"
        >
          <p className="eyebrow">On the floor at Cabanas</p>
          <h1 className="mt-3 font-serif text-3xl tracking-wide text-foreground sm:text-5xl">{category.headline}</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{category.description}</p>
        </motion.div>
      </section>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="no-scrollbar flex gap-3 overflow-x-auto border-b border-border py-6">
          <FilterPill label="All" active={sub === null} onClick={() => setSub(null)} />
          {category.subcategories.map((s) => (
            <FilterPill key={s} label={s} active={sub === s} onClick={() => setSub(s)} />
          ))}
        </div>

        <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            {items.length} {items.length === 1 ? "piece" : "pieces"}
          </p>
          <label className="flex items-center gap-3 text-sm">
            <span className="eyebrow">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary"
            >
              {sorts.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {items.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            Nothing in this room right now. Pieces will appear here when they land on the floor — WhatsApp us and we
            will check the store.
          </p>
        ) : (
          <div className="grid gap-5 pb-16 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
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
