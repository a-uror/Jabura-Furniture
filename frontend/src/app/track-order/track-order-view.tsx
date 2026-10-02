"use client";

import { toast } from "sonner";
import { LegalDoc } from "@/components/site/LegalDoc";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSite } from "@/components/site/SiteProvider";
import { openWhatsApp } from "@/lib/leads";

export function TrackOrderView() {
  const { settings } = useSite();

  return (
    <LegalDoc eyebrow="Help" title="Ask about your order" updated="We confirm status by phone or WhatsApp.">
      <p>
        Enter the name or number on your invoice. We will open WhatsApp so the showroom can check it with you. This
        does not look up an order automatically.
      </p>
      <form
        className="mt-2 max-w-md"
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          const ref = String(data.get("ref") ?? "").trim();
          const message = `Hello Jabura, I would like to ask about my order: ${ref || "(no reference yet)"}.`;
          toast.success("Opening WhatsApp");
          void openWhatsApp(settings.whatsapp_number, message, {
            message,
            channel: "whatsapp",
            source: "track_order",
          });
        }}
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="order-ref">Order name or invoice number</FieldLabel>
            <Input id="order-ref" name="ref" required />
          </Field>
        </FieldGroup>
        <button
          type="submit"
          className="mt-6 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground"
        >
          Ask on WhatsApp
        </button>
      </form>
    </LegalDoc>
  );
}
