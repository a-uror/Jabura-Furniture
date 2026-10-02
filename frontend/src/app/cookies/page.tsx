import type { Metadata } from "next";
import { LegalDoc } from "@/components/site/LegalDoc";

export const metadata: Metadata = {
  title: "Cookie Settings",
  description: "How Jabura Home Furniture uses cookies on jaburahome.com.",
};

export default function CookiesPage() {
  return (
    <LegalDoc eyebrow="Legal" title="Cookie Settings" updated="Last updated: 18 August 2026">
      <p>
        This site uses cookies and similar storage so pages load, your session works, and we can understand traffic.
      </p>
      <section>
        <h2 className="font-serif text-lg text-foreground">Types we use</h2>
        <p className="mt-2">
          Strictly necessary cookies keep the site working (for example, security and load balancing). We may later
          add analytics or advertising cookies. Those will only run if you allow them.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-foreground">How to control them</h2>
        <p className="mt-2">
          Use your browser settings to block or delete cookies. Blocking necessary cookies can stop login or forms
          from working. On this site there is no third-party ad network running on product pages.
        </p>
      </section>
      <section>
        <h2 className="font-serif text-lg text-foreground">Changes</h2>
        <p className="mt-2">
          If we add a consent banner or Meta Pixel, this page will be updated so you can review and change your
          choice.
        </p>
      </section>
    </LegalDoc>
  );
}
