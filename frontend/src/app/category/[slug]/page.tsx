import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CategoryView } from "./category-view";
import { getCategory } from "@/lib/catalogue-server";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return { title: "Collection unavailable", robots: { index: false } };

  return {
    title: category.seo_title || `${category.name} Furniture`,
    description: category.seo_description || category.description || undefined,
    alternates: { canonical: `/category/${category.slug}` },
    openGraph: {
      title: `${category.name} Furniture | Jabura Home Furniture`,
      description: category.seo_description || category.description || undefined,
      images: category.image ? [{ url: category.image, alt: category.name }] : undefined,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: category.description,
    url: `https://jaburahome.com/category/${category.slug}`,
  };

  return (
    <Suspense fallback={<div className="min-h-[46vh] bg-surface" />}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CategoryView category={category} />
    </Suspense>
  );
}
