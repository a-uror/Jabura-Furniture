"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import { publicApiUrl, type CatalogueProduct } from "@/lib/catalogue";

export function SearchBar({ autoFocus = false }: { autoFocus?: boolean }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<CatalogueProduct[]>([]);
  const wrap = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const term = q.trim();
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
  }, [q]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={wrap} className="relative w-full">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          setOpen(false);
          router.push("/products");
        }}
        className="flex items-center gap-2 rounded-full border border-primary/30 bg-surface/80 px-4 py-2.5 backdrop-blur-md transition-colors focus-within:border-primary"
      >
        <Search className="size-4 shrink-0 text-primary" aria-hidden />
        <input
          value={q}
          autoFocus={autoFocus}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          aria-label="Search products"
          placeholder="Search sofas, desks, chairs…"
          className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-subtle-foreground focus:outline-none"
        />
        {q ? (
          <button type="button" onClick={() => setQ("")} aria-label="Clear search" className="shrink-0">
            <X className="size-4 text-subtle-foreground hover:text-primary" />
          </button>
        ) : null}
      </form>

      <AnimatePresence>
        {open && q.trim().length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass-panel absolute top-[calc(100%+0.5rem)] left-0 z-60 max-h-[70vh] w-full overflow-auto rounded-lg p-2"
          >
            {results.length === 0 ? (
              <p className="px-3 py-4 text-sm text-subtle-foreground">
                No matches for “{q}”. Try “sofa”, “desk” or “chair”.
              </p>
            ) : (
              <ul>
                {results.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/products/${p.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-surface-2"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.image ?? ""} alt="" className="size-12 rounded-sm object-cover" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm text-foreground">{p.name}</span>
                        <span className="block text-[11px] tracking-widest text-subtle-foreground uppercase">
                          {p.subcategory}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
