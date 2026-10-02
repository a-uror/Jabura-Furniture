import type { Metadata } from "next";
import { BespokeView } from "./bespoke-view";

export const metadata: Metadata = {
  title: "Bespoke & B2B Commissions",
  description:
    "Commission one-of-one furniture or fit out a hotel, restaurant or office with Jabura's bespoke and B2B studio in Juja, Kenya.",
  openGraph: {
    title: "Bespoke & B2B Commissions | Jabura Home Furniture",
    description: "Drawings, materials and fixed quotations for bespoke and contract furniture projects in Kenya.",
  },
};

export default function BespokePage() {
  return <BespokeView />;
}
