import type { Metadata } from "next";
import { AboutView } from "./about-view";

export const metadata: Metadata = {
  title: "About Jabura",
  description:
    "Jabura Home Furniture is a Juja showroom on Thika Road — sofas, desks, reception counters and custom orders you can see before you buy.",
  openGraph: {
    title: "About Jabura | Jabura Home Furniture",
    description: "Meet the Juja team behind the furniture on the showroom floor.",
  },
};

export default function AboutPage() {
  return <AboutView />;
}
