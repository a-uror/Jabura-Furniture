"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, ArrowUpRight } from "lucide-react";
import { useSite } from "@/components/site/SiteProvider";
import { publicApiUrl, type CatalogueProduct } from "@/lib/catalogue";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const suggestions = ["Recliner", "Sofa set", "Reception desk", "Office chair", "Coffee table"];

export function SearchModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CatalogueProduct[]>([]);
  const { categories } = useSite();

  useEffect(() => {
    const term = query.trim();
    if (!term) {
      setResults([]);
      return;
    }
    const timer = window.setTimeout(() => {
      fetch(`${publicApiUrl()}/api/products?q=${encodeURIComponent(term)}`)
        .then((response) => (response.ok ? response.json() : { data: [] }))
        .then((json: { data: CatalogueProduct[] }) => setResults(json.data ?? []))
        .catch(() => setResults([]));
    }, 200);
    return () => window.clearTimeout(timer);
  }, [query]);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) setQuery("");
        onOpenChange(next);
      }}
    >
      <DialogContent className="glass-panel border-primary/22 bg-transparent p-5 sm:p-7">
        <DialogHeader>
          <DialogTitle className="sr-only">Search products</DialogTitle>
          <DialogDescription className="sr-only">
            Search the Jabura catalogue by piece name, room or material.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-3 border-b border-border pb-4">
          <Search className="size-5 text-primary" aria-hidden />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sofas, desks, chairs…"
            className="h-auto border-0 bg-transparent px-0 py-0 shadow-none focus-visible:ring-0"
            autoFocus
          />
        </div>

        <div className="max-h-[55vh] overflow-y-auto">
          {query.trim() === "" ? (
            <div className="flex flex-col gap-6">
              <div>
                <p className="eyebrow">Popular searches</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setQuery(s)}
                      className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="eyebrow">Browse collections</p>
                <div className="mt-3 grid gap-1 sm:grid-cols-2">
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/category/${c.slug}`}
                      onClick={() => onOpenChange(false)}
                      className="group flex items-center justify-between rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
                    >
                      {c.name}
                      <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No pieces match “{query}”. Try “sofa”, “desk” or “chair”.
            </p>
          ) : (
            <ul className="flex flex-col gap-1">
              {results.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    onClick={() => onOpenChange(false)}
                    className="flex items-center gap-4 rounded-md p-2 transition-colors hover:bg-secondary"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image ?? ""} alt={p.name} className="size-14 rounded-sm object-cover" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm text-foreground">{p.name}</span>
                      <span className="block text-xs text-muted-foreground">{p.subcategory}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
