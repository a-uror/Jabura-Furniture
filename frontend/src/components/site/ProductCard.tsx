"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useSite } from "@/components/site/SiteProvider";
import { productEnquiryMessage, type CatalogueProduct } from "@/lib/catalogue";
import { openWhatsApp } from "@/lib/leads";
import { Badge } from "@/components/ui/badge";

export function ProductCard({ product, index = 0 }: { product: CatalogueProduct; index?: number }) {
  const { settings } = useSite();
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.2) }}
      className="group relative flex flex-col border border-border bg-surface transition-colors hover:border-primary/50"
    >
      <div className="relative overflow-hidden">
        <Link href={`/products/${product.slug}`} aria-label={product.name} className="block">
          <Image
            src={product.image || "/categories/living-room.jpg"}
            alt={product.image_alt || product.name}
            width={720}
            height={900}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="aspect-4/5 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>
        {product.tag ? (
          <div className="absolute top-3 left-3">
            <Badge variant="terracotta">{product.tag}</Badge>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="eyebrow">{product.subcategory}</p>
        <h3 className="mt-2 font-serif text-base leading-snug text-foreground">
          <Link href={`/products/${product.slug}`} className="hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <button
          type="button"
          onClick={() => {
            toast.success("Opening WhatsApp to inquire");
            void openWhatsApp(settings.whatsapp_number, productEnquiryMessage(product), {
              message: productEnquiryMessage(product),
              channel: "whatsapp",
              source: "product_card",
              product_slug: product.slug,
              category_slug: product.category_slug ?? undefined,
            });
          }}
          className="mt-4 w-full rounded-full border border-primary/60 py-3 text-center text-[0.72rem] tracking-[0.14em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Inquire
        </button>
      </div>
    </motion.article>
  );
}
