import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc } from "@/components/site/LegalDoc";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Common questions about Jabura Home Furniture — delivery, payments, and the Juja showroom.",
};

const faqs = [
  {
    q: "Where is the showroom?",
    a: "Juja Showroom Hub, Thika Superhighway, Kiambu County. Monday to Saturday, 8am – 7pm. Sunday by appointment.",
  },
  {
    q: "Do you deliver?",
    a: "Yes. Free delivery in Nairobi and nearby towns. Ask on WhatsApp for other locations.",
  },
  {
    q: "Can I pay in instalments?",
    a: "Yes. Lipa pole pole from a deposit. We hold your pieces until the balance is cleared.",
  },
  {
    q: "Why are prices not on the site?",
    a: "We confirm price when you inquire so we can check stock, fabric, and size. WhatsApp or visit Juja.",
  },
  {
    q: "Can you make a custom piece?",
    a: "Yes. Bring a photo or measurement. See Bespoke for homes, offices, and hotels.",
  },
];

export default function FaqPage() {
  return (
    <LegalDoc eyebrow="Help" title="FAQs" updated="Jabura Home Furniture">
      {faqs.map((item) => (
        <section key={item.q}>
          <h2 className="font-serif text-lg text-foreground">{item.q}</h2>
          <p className="mt-2">{item.a}</p>
        </section>
      ))}
      <p>
        Still stuck?{" "}
        <Link href="/contact" className="text-primary hover:underline">
          Contact us
        </Link>
        .
      </p>
    </LegalDoc>
  );
}
