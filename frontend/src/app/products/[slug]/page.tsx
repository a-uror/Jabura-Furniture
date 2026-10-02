import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductView } from "./product-view";
import { getProduct } from "@/lib/catalogue-server";

type Props = {
  params: Promise<{ slug: string }>;
};

const availability = {
  in_stock: "https://schema.org/InStock",
  made_to_order: "https://schema.org/PreOrder",
  custom_order: "https://schema.org/PreOrder",
  unavailable: "https://schema.org/OutOfStock",
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await getProduct(slug);
  if (!result) return { title: "Piece unavailable", robots: { index: false } };
  const product = result.data;

  return {
    title: product.seo_title || product.name,
    description: product.seo_description || product.description || undefined,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} | Jabura Home Furniture`,
      description: product.seo_description || product.description || undefined,
      images: product.image ? [{ url: product.image, alt: product.image_alt }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const result = await getProduct(slug);
  if (!result) notFound();

  const product = result.data;
  const offer: Record<string, string> = {
    "@type": "Offer",
    priceCurrency: "KES",
    availability: availability[product.availability_status as keyof typeof availability] ?? availability.in_stock,
    url: `https://jaburahome.com/products/${product.slug}`,
  };
  if (product.price !== null) offer.price = String(product.price);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.gallery.map((image) => image.url).filter(Boolean),
    description: product.description,
    brand: { "@type": "Brand", name: "Jabura Home Furniture" },
    offers: offer,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductView product={product} related={result.related} />
    </>
  );
}
