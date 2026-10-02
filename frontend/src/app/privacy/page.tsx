import type { Metadata } from "next";
import { LegalDoc } from "@/components/site/LegalDoc";
import { getSettings } from "@/lib/catalogue-server";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Jabura Home Furniture collects and uses personal information.",
};

export default async function PrivacyPage() {
  const settings = await getSettings();
  const email = settings.business_email ?? "";
  const phone = settings.business_phone ?? "";

  return (
    <LegalDoc eyebrow="Legal" title="Privacy Policy" updated="Last updated: 18 August 2026">
      <p>
        Jabura Home Furniture (“we”) is the data controller for this site and the Juja showroom. We handle personal
        data under the Kenya Data Protection Act, 2019.
      </p>
      <section>
        <h2 className="font-serif text-lg text-foreground">What we collect</h2>
        <p className="mt-2">
          Name, phone, email, delivery address, and messages you send via the contact form or WhatsApp. If you
          create an account later, we will also store login details. Payment processors handle card and M-Pesa
          data; we do not store full card numbers.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-foreground">Why we use it</h2>
        <p className="mt-2">
          To answer inquiries, quote, deliver, and support orders; to improve the site; and to meet legal
          bookkeeping duties. We do not sell your data.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-foreground">Sharing</h2>
        <p className="mt-2">
          We share details only with delivery partners, payment providers, and advisers who need them to do their
          job, or if the law requires it.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-foreground">Your rights</h2>
        <p className="mt-2">
          You may ask to access, correct, or delete your data, or to object to marketing. Write to {email} or call{" "}
          {phone}. You may also complain to the Office of the Data Protection Commissioner in Kenya.
        </p>
      </section>
    </LegalDoc>
  );
}
