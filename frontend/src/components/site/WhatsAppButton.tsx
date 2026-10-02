"use client";

import { useSite } from "@/components/site/SiteProvider";
import { whatsappHref } from "@/lib/catalogue";
import { openWhatsApp } from "@/lib/leads";

export function WhatsAppButton() {
  const { settings } = useSite();
  const message = "Hello Jabura Home Furniture, I would like to inquire about a piece.";

  return (
    <div className="group fixed right-5 bottom-5 z-90 flex items-center gap-3">
      <span className="pointer-events-none hidden rounded-full border border-rail bg-surface px-3 py-2 text-[0.62rem] font-semibold tracking-[0.08em] text-muted-foreground opacity-0 transition-opacity duration-300 sm:block sm:group-hover:opacity-100">
        Chat with us
      </span>
      <a
        href={whatsappHref(settings.whatsapp_number, message)}
        target="_blank"
        rel="noreferrer"
        onClick={(event) => {
          event.preventDefault();
          void openWhatsApp(settings.whatsapp_number, message, {
            message,
            channel: "whatsapp",
            source: "floating_button",
          });
        }}
        aria-label="Chat with us on WhatsApp"
        className="relative flex size-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-[0_14px_40px_-12px_oklch(0.77_0.184_149.4/0.7)] transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <span className="pulse-ring absolute inset-0 rounded-full" aria-hidden />
        <svg viewBox="0 0 24 24" fill="currentColor" className="relative size-7" aria-hidden>
          <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.13-.42-2.15-1.33-.8-.71-1.34-1.59-1.5-1.89-.15-.3-.02-.46.13-.61.15-.15.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.09 3.34 5.08 4.55 2.99 1.21 2.99.81 3.53.76.54-.05 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35ZM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.44 9.44 0 0 1-1.45-5.03c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.98 6.67 2.77a9.38 9.38 0 0 1 2.76 6.68c0 5.21-4.24 9.44-9.44 9.44ZM20.11 3.9A11.36 11.36 0 0 0 12.05.55C5.77.55.66 5.66.66 11.95c0 2 .52 3.96 1.52 5.68L.5 23.45l5.96-1.56a11.35 11.35 0 0 0 5.59 1.42h.01c6.28 0 11.39-5.11 11.4-11.4a11.33 11.33 0 0 0-3.35-8.01Z" />
        </svg>
      </a>
    </div>
  );
}
