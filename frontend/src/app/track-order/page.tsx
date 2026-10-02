import type { Metadata } from "next";
import { TrackOrderView } from "./track-order-view";

export const metadata: Metadata = {
  title: "Ask about your order",
  description: "Ask the Juja showroom about an order by invoice name or number on WhatsApp.",
};

export default function TrackOrderPage() {
  return <TrackOrderView />;
}
