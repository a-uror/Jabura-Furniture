import type { Metadata } from "next";
import { ContactView } from "./contact-view";

export const metadata: Metadata = {
  title: "Contact & Juja Showroom",
  description:
    "Call +254 700 000 000, email info@jaburahome.com or visit the Jabura Home Furniture showroom on Thika Road, Juja.",
  openGraph: {
    title: "Contact & Juja Showroom | Jabura Home Furniture",
    description: "Reach the Jabura team by phone, email, WhatsApp or at the Juja showroom.",
  },
};

export default function ContactPage() {
  return <ContactView />;
}
