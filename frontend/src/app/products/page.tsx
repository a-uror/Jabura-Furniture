import type { Metadata } from "next";
import { ProductsView } from "./products-view";
import { getCategories, getProducts } from "@/lib/catalogue-server";

export const metadata: Metadata = {
  title: "All products",
  description: "Sofas, recliners, desks and reception counters on the floor at Jabura Home Furniture in Juja.",
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts().catch(() => []),
    getCategories().catch(() => []),
  ]);

  return <ProductsView products={products} categories={categories} />;
}
