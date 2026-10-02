import type { Metadata } from "next";
import { Cinzel, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@/components/site/Analytics";
import { SiteProvider } from "@/components/site/SiteProvider";
import { StorefrontShell } from "@/components/site/StorefrontShell";
import { Toaster } from "@/components/ui/sonner";
import { getCategories, getSettings } from "@/lib/catalogue-server";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
  weight: ["400", "600"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jaburahome.com"),
  title: {
    default: "Jabura Home Furniture | Where Elegance Meets Rest",
    template: "%s | Jabura Home Furniture",
  },
  description:
    "Sofas, recliners, reception desks and office furniture on the floor at Jabura Home Furniture — Cabanas showroom on Mombasa Road, Nairobi.",
  authors: [{ name: "Jabura Home Furniture" }],
  openGraph: {
    title: "Jabura Home Furniture | Luxury Furniture in Kenya",
    description: "Furniture you can see at Cabanas on Mombasa Road before you buy — delivery across Nairobi and nearby towns.",
    type: "website",
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jabura Home Furniture | Where Elegance Meets Rest",
    description: "Furniture on the floor at Cabanas, Mombasa Road — sofas, desks and custom orders.",
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [categories, settings] = await Promise.all([
    getCategories().catch(() => []),
    getSettings(),
  ]);
  const phone = settings.business_phone ?? "";
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: "Jabura Home Furniture",
    description:
      "Furniture showroom at Cabanas on Mombasa Road — sofas, recliners, reception desks, meeting tables and custom orders.",
    url: "https://jaburahome.com",
    telephone: phone.replace(/\s/g, ""),
    email: settings.business_email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Cabanas, Mombasa Road",
      addressLocality: "Nairobi",
      addressRegion: "Nairobi County",
      addressCountry: "KE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -1.3226,
      longitude: 36.8842,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "19:00",
      },
    ],
    areaServed: ["Juja", "Ruiru", "Thika", "Nairobi", "Kiambu"].map((name) => ({
      "@type": "City",
      name,
    })),
  };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`dark ${cinzel.variable} ${playfair.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <SiteProvider categories={categories} settings={settings}>
          <Analytics />
          <StorefrontShell>{children}</StorefrontShell>
        </SiteProvider>
        <Toaster />
      </body>
    </html>
  );
}
