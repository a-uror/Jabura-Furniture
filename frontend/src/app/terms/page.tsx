import type { Metadata } from "next";
import { LegalDoc } from "@/components/site/LegalDoc";
import { getSettings } from "@/lib/catalogue-server";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for buying furniture from Jabura Home Furniture in Juja, Kenya.",
};

export default async function TermsPage() {
  const settings = await getSettings();

  return (
    <LegalDoc eyebrow="Legal" title="Terms of Service" updated="Last updated: 18 August 2026">
      <p>
        These terms govern visits to jaburahome.com and purchases or commissions from Jabura Home Furniture, Juja
        Showroom Hub, Thika Superhighway, Kiambu County, Kenya.
      </p>
      <section>
        <h2 className="font-serif text-lg text-foreground">Orders and payment</h2>
        <p className="mt-2">
          Prices are confirmed when you inquire. An order is accepted when we confirm it in writing or on WhatsApp
          and you pay the agreed deposit. We accept M-Pesa, card, and agreed instalment plans. Title in the goods
          stays with Jabura until the balance is paid in full.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-foreground">Delivery and collection</h2>
        <p className="mt-2">
          We deliver in Nairobi and nearby towns. Delivery times are estimates. Risk passes on delivery or when you
          collect from the showroom. Inspect the piece on arrival and tell us the same day if anything is damaged.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-foreground">Returns</h2>
        <p className="mt-2">
          Made-to-order and custom pieces cannot be returned unless they are defective. Stock pieces may be returned
          within seven days if unused, in original condition, and you cover reasonable return transport. Refunds
          exclude delivery charges already incurred.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-foreground">Website</h2>
        <p className="mt-2">
          Photos are of pieces on our floor. Colours can look different on screens. We may update the catalogue
          without notice. You may not scrape, copy, or resell our content without written permission.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-foreground">Contact</h2>
        <p className="mt-2">
          Questions: {settings.business_phone} or {settings.business_email}.
        </p>
      </section>
    </LegalDoc>
  );
}
