"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useSite } from "@/components/site/SiteProvider";

const navLabels: Record<string, string> = {
  "living-room": "Living Room",
  bedroom: "Bedroom",
  dining: "Dining",
  kitchen: "Kitchen",
  office: "Office",
  "home-decor": "Home Decor",
  "bespoke-studio": "Bespoke",
};

export function CategoryNav() {
  const { categories } = useSite();

  return (
    <nav aria-label="Categories" className="hidden border-b border-rail bg-nav lg:block">
      <ul className="mx-auto flex max-w-[1500px] items-center gap-1 px-6 py-1">
        <li>
          <Link
            href="/products"
            className="block px-3 py-2 text-[0.72rem] font-semibold tracking-[0.12em] text-foreground/85 uppercase transition-colors hover:text-primary"
          >
            All Products
          </Link>
        </li>
        {categories.map((c) => {
          const href = c.slug === "bespoke-studio" ? "/bespoke" : `/category/${c.slug}`;
          return (
            <li key={c.slug} className="group relative">
              <Link
                href={href}
                className="flex items-center gap-1 px-3 py-2 text-[0.72rem] font-semibold tracking-[0.12em] text-foreground/85 uppercase transition-colors group-hover:text-primary"
              >
                {navLabels[c.slug] ?? c.name}
                {c.subcategories.length > 0 ? (
                  <ChevronDown className="size-3 transition-transform group-hover:rotate-180" aria-hidden />
                ) : null}
              </Link>
              {c.subcategories.length > 0 ? (
                <div className="pointer-events-none absolute top-full left-0 z-60 w-64 translate-y-1 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="glass-panel rounded-md p-2">
                    {c.subcategories.map((s) => (
                      <Link
                        key={s}
                        href={`/category/${c.slug}?sub=${encodeURIComponent(s)}`}
                        className="block rounded-sm px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-surface-2 hover:text-primary"
                      >
                        {s}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
