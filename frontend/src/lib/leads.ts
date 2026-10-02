"use client";

import { publicApiUrl, whatsappHref } from "@/lib/catalogue";

type EnquiryInput = {
  message: string;
  channel: "whatsapp" | "email" | "phone" | "contact_form";
  source?: string;
  product_slug?: string;
  category_slug?: string;
  name?: string;
  phone?: string;
  email?: string;
};

type StoredUtm = {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
  meta_click_id?: string;
};

const UTM_KEY = "jabura-utm";

export function rememberUtm() {
  const params = new URLSearchParams(window.location.search);
  const next: StoredUtm = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const) {
    const value = params.get(key);
    if (value) next[key.replace("utm_", "") as keyof StoredUtm] = value;
  }
  const click = params.get("fbclid");
  if (click) next.meta_click_id = click;
  if (Object.keys(next).length > 0) {
    sessionStorage.setItem(UTM_KEY, JSON.stringify({ ...readUtm(), ...next }));
  }
}

export function readUtm(): StoredUtm {
  try {
    return JSON.parse(sessionStorage.getItem(UTM_KEY) ?? "{}") as StoredUtm;
  } catch {
    return {};
  }
}

export async function recordEnquiry(input: EnquiryInput) {
  const utm = readUtm();
  const controller = new AbortController();
  // Give up on the save quickly. The caller still opens WhatsApp if this returns false.
  const timer = window.setTimeout(() => controller.abort(), 800);
  try {
    const response = await fetch(`${publicApiUrl()}/api/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        ...input,
        page_url: window.location.href,
        referrer: document.referrer || null,
        meta_click_id: utm.meta_click_id,
        utm: {
          source: utm.source,
          medium: utm.medium,
          campaign: utm.campaign,
          content: utm.content,
          term: utm.term,
        },
      }),
    });
    return response.ok;
  } catch {
    return false;
  } finally {
    window.clearTimeout(timer);
  }
}

export function trackBrowserEvent(name: string, params?: Record<string, string>) {
  const win = window as Window & {
    fbq?: (command: string, event: string, data?: Record<string, string>) => void;
    gtag?: (command: string, event: string, data?: Record<string, string>) => void;
  };
  win.fbq?.("track", name, params);
  win.gtag?.("event", name, params);
}

export async function openWhatsApp(number: string | null | undefined, message: string, enquiry: EnquiryInput) {
  const href = whatsappHref(number, message);
  trackBrowserEvent("Contact", { source: enquiry.source ?? "whatsapp" });
  await recordEnquiry(enquiry);
  window.open(href, "_blank", "noopener,noreferrer");
}
