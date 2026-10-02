import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getCollections } from "@/lib/catalogue-server";

export const metadata: Metadata = {
  title: "Explore products",
  description: "Browse Jabura product types — sofas, recliners, desks, chairs and more — then open each type to see the varieties on the floor.",
};

export default async function ExplorePage() {
  const collections = await getCollections().catch(() => []);

  return (
    <div className="mx-auto max-w-[1500px] px-6 py-16">
      <p className="eyebrow">Explore more</p>
      <h1 className="mt-3 font-serif text-3xl text-foreground sm:text-5xl">Products we have</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
        These are the product names on the floor. Open one to see the varieties of that piece.
      </p>

      <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((type) => (
          <li key={type.slug}>
            <Link
              href={`/explore/${type.slug}`}
              className="group flex items-center gap-4 border border-border bg-surface p-3 transition-colors hover:border-primary/60"
            >
              <span className="relative size-16 shrink-0 overflow-hidden rounded-full border border-primary/30">
                {type.image ? <Image src={type.image} alt="" fill sizes="64px" className="object-cover" /> : null}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-serif text-lg text-foreground group-hover:text-primary">{type.name}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {type.result_count} {type.result_count === 1 ? "variety" : "varieties"}
                </span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
