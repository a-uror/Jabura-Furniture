import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductCard } from "@/components/site/ProductCard";
import { getCollection } from "@/lib/catalogue-server";

type Props = {
  params: Promise<{ type: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type: slug } = await params;
  const type = await getCollection(slug);
  if (!type) return { title: "Product type unavailable", robots: { index: false } };
  return {
    title: type.seo_title || type.name,
    description: type.seo_description || `${type.result_count} ${type.name.toLowerCase()} varieties at the Jabura Juja showroom.`,
    alternates: { canonical: `/explore/${type.slug}` },
  };
}

export default async function ExploreTypePage({ params }: Props) {
  const { type: slug } = await params;
  const type = await getCollection(slug);
  if (!type) notFound();
  const items = type.products ?? [];

  return (
    <div className="mx-auto max-w-[1500px] px-6 py-16">
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <Link href="/explore" className="hover:text-primary">
          Explore more
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{type.name}</span>
      </nav>
      <h1 className="mt-4 font-serif text-3xl text-foreground sm:text-5xl">{type.name}</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        {items.length} {items.length === 1 ? "variety" : "varieties"} on the floor. Open a piece for photos and to
        inquire.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((product, index) => (
          <ProductCard key={product.slug} product={product} index={index} />
        ))}
      </div>
    </div>
  );
}
