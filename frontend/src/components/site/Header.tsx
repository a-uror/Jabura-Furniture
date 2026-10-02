"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, House } from "lucide-react";
import { TopUtilityBar } from "./TopUtilityBar";
import { CategoryNav } from "./CategoryNav";
import { SearchBar } from "./SearchBar";
import { SearchModal } from "./SearchModal";
import { useSite } from "@/components/site/SiteProvider";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { categories } = useSite();

  return (
    <>
      <div className="sticky top-0 z-50">
        <TopUtilityBar />

        <header className="border-b border-rail bg-surface/85 backdrop-blur-xl">
          <div className="mx-auto flex h-20 max-w-[1500px] items-center gap-3 px-6 sm:gap-4">
            <Link href="/" className="shrink-0" onClick={() => setMenuOpen(false)}>
              <span className="font-serif text-lg font-bold tracking-[0.2em] text-primary uppercase sm:text-xl">
                Jabura Furniture
              </span>
            </Link>

            <Link
              href="/"
              aria-label="Home"
              className="hidden shrink-0 rounded-full border border-rail p-2.5 text-foreground transition-colors hover:border-primary hover:text-primary sm:inline-flex"
            >
              <House className="size-4" />
            </Link>

            <div className="hidden min-w-0 flex-1 lg:block">
              <SearchBar />
            </div>

            <div className="ml-auto flex items-center gap-2 lg:gap-3">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
                className="rounded-full border border-rail p-2.5 text-foreground transition-colors hover:border-primary hover:text-primary lg:hidden"
              >
                <Search className="size-4" />
              </button>

              <Link
                href="/about"
                className={cn(
                  "hidden items-center rounded-full border border-rail px-5 py-2.5 text-[0.72rem] font-semibold tracking-[0.08em] transition-colors hover:border-primary hover:text-primary sm:inline-flex",
                  pathname === "/about" ? "text-primary" : "text-foreground/90",
                )}
              >
                About
              </Link>

              <Link
                href="/contact"
                className="hidden items-center rounded-full bg-primary px-6 py-2.5 text-[0.72rem] font-semibold tracking-[0.08em] text-primary-foreground transition-transform hover:scale-[1.03] lg:inline-flex"
              >
                Contact Us
              </Link>

              <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                <SheetTrigger
                  aria-label="Open menu"
                  className="rounded-full border border-rail p-2.5 text-foreground transition-colors hover:border-primary hover:text-primary lg:hidden"
                >
                  <Menu className="size-4" />
                </SheetTrigger>
                <SheetContent side="right" className="bg-surface">
                  <SheetHeader>
                    <SheetTitle className="font-serif tracking-[0.18em] text-primary uppercase">
                      Jabura
                    </SheetTitle>
                    <SheetDescription>
                      Find a piece or visit the Cabanas showroom.
                    </SheetDescription>
                  </SheetHeader>
                  <nav aria-label="Mobile" className="flex flex-col gap-2">
                    <Link
                      href="/"
                      onClick={() => setMenuOpen(false)}
                      className="inline-flex items-center gap-2 py-2 text-sm font-semibold text-foreground/90"
                    >
                      <House className="size-4" aria-hidden />
                      Home
                    </Link>
                    <div className="border-t border-rail pt-3">
                        <p className="eyebrow">Rooms</p>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          {categories.map((c) => (
                            <Link
                              key={c.slug}
                              href={c.slug === "bespoke-studio" ? "/bespoke" : `/category/${c.slug}`}
                              onClick={() => setMenuOpen(false)}
                              className="rounded-full border border-rail px-3 py-2 text-xs font-semibold text-muted-foreground hover:border-primary hover:text-primary"
                            >
                              {c.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    <Link
                      href="/about"
                      onClick={() => setMenuOpen(false)}
                      className="py-2 text-sm font-semibold text-foreground/90"
                    >
                      About
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setMenuOpen(false)}
                      className="inline-flex w-fit items-center rounded-full bg-primary px-6 py-2.5 text-[0.72rem] font-semibold text-primary-foreground"
                    >
                      Contact Us
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="gold-rule" />
        </header>

        <CategoryNav />
      </div>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
