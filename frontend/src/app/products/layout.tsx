import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Browse every Jabura Home Furniture piece — sofas, beds, dining tables, executive desks, outdoor lounges and bespoke commissions.",
};

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return children;
}
