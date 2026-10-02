import type { Metadata } from "next";
import { HeroCarousel } from "@/components/site/HeroCarousel";
import { TrustBar } from "@/components/site/TrustBar";
import { CircleExplorer } from "@/components/site/CircleExplorer";
import { CuratedCatalog } from "@/components/site/CuratedCatalog";
import { BespokeBanner } from "@/components/site/BespokeBanner";
import { ShowroomLocator } from "@/components/site/ShowroomLocator";
import { getCategories, getProducts } from "@/lib/catalogue-server";

export const metadata: Metadata = {
  title: "Where Elegance Meets Rest",
  description:
    "Sofas, recliners, desks and reception counters on the floor at Jabura Home Furniture — visit the Cabanas showroom on Mombasa Road.",
  openGraph: {
    title: "Jabura Home Furniture | Where Elegance Meets Rest",
    description: "Furniture you can try at Cabanas on Mombasa Road before delivery across Nairobi and nearby towns.",
  },
};

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts().catch(() => []),
    getCategories().catch(() => []),
  ]);

  return (
    <div>
      <HeroCarousel />
      <TrustBar />
      <CircleExplorer />
      <CuratedCatalog products={products} categories={categories} />
      <BespokeBanner />
      <ShowroomLocator />
    </div>
  );
}
