"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Truck, ShieldCheck } from "lucide-react";
import { useSite } from "@/components/site/SiteProvider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { productEnquiryMessage, type CatalogueProduct } from "@/lib/catalogue";
import { openWhatsApp, recordEnquiry, trackBrowserEvent } from "@/lib/leads";

export function ProductView({ product, related }: { product: CatalogueProduct; related: CatalogueProduct[] }) {
  const [active, setActive] = useState(0);
  const { settings } = useSite();
  const gallery = product.gallery.filter((image) => image.url);
  const current = gallery[active]?.url ?? product.image ?? "";
  const message = productEnquiryMessage(product);

  useEffect(() => {
    trackBrowserEvent("ViewContent", { content_name: product.name, content_ids: product.slug });
  }, [product.name, product.slug]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-8 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/category/${product.category_slug}`} className="hover:text-primary">
          {product.category_name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <motion.div
            key={current}
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="relative aspect-4/5 w-full overflow-hidden border border-border"
          >
            {current ? (
              <Image
                src={current}
                alt={gallery[active]?.alt || product.name}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            ) : null}
          </motion.div>
          <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto">
            {gallery.map((image, index) => (
              <button
                key={image.url}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`View image ${index + 1}`}
                aria-current={index === active}
                className={`relative size-20 shrink-0 overflow-hidden border transition-colors sm:size-24 ${
                  index === active ? "border-primary" : "border-border hover:border-primary/60"
                }`}
              >
                <Image src={image.url ?? ""} alt={image.alt} fill sizes="96px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow">{product.subcategory}</p>
          <h1 className="mt-3 font-serif text-3xl leading-tight text-foreground sm:text-4xl">{product.name}</h1>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
          <p className="mt-3 text-sm text-primary">
            {product.price_label ?? "Price on request — we will confirm when you inquire."}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() =>
                void openWhatsApp(settings.whatsapp_number, message, {
                  message,
                  channel: "whatsapp",
                  source: "product_detail",
                  product_slug: product.slug,
                  category_slug: product.category_slug ?? undefined,
                })
              }
              className="flex-1 rounded-full bg-primary py-4 text-center text-[0.72rem] tracking-[0.14em] text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              Order on WhatsApp
            </button>
            <a
              href={`mailto:${settings.business_email ?? ""}?subject=${encodeURIComponent(product.name)}&body=${encodeURIComponent(message)}`}
              onClick={() =>
                void recordEnquiry({
                  message,
                  channel: "email",
                  source: "product_detail",
                  product_slug: product.slug,
                  category_slug: product.category_slug ?? undefined,
                })
              }
              className="flex-1 rounded-full border border-primary/50 py-4 text-center text-[0.72rem] tracking-[0.14em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Email this product
            </a>
          </div>

          <ul className="mt-6 grid gap-3 text-xs text-muted-foreground sm:grid-cols-2">
            <li className="flex items-center gap-2">
              <Truck className="size-4 text-primary" aria-hidden /> Free delivery in Nairobi and nearby towns
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" aria-hidden /> Come sit on it at the Cabanas showroom
            </li>
          </ul>

          <Accordion type="multiple" defaultValue={["description"]} className="mt-8 border-t border-border">
            <AccordionItem value="description">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                <p className="leading-relaxed text-muted-foreground">{product.description}</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="details">
              <AccordionTrigger>What you are looking at</AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-2 text-muted-foreground">
                  {product.details.map((detail) => (
                    <li key={detail} className="flex gap-2">
                      <span className="text-primary">—</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="font-serif text-2xl text-foreground sm:text-3xl">You may also like</h2>
        <div className="no-scrollbar mt-8 flex gap-5 overflow-x-auto pb-4">
          {related.map((item) => (
            <Link
              key={item.slug}
              href={`/products/${item.slug}`}
              className="group w-64 shrink-0 border border-border bg-surface transition-colors hover:border-primary/60"
            >
              <div className="relative aspect-4/5 overflow-hidden">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.image_alt || item.name}
                    fill
                    sizes="256px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : null}
              </div>
              <div className="p-4">
                <p className="eyebrow">{item.subcategory}</p>
                <h3 className="mt-2 font-serif text-sm text-foreground">{item.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
