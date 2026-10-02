export type CatalogueProduct = {
  slug: string;
  name: string;
  category_slug: string | null;
  category_name: string | null;
  subcategory: string | null;
  price: number | null;
  price_label: string | null;
  is_price_visible: boolean;
  tag: string | null;
  image: string | null;
  image_alt: string;
  gallery: { url: string | null; alt: string }[];
  description: string | null;
  details: string[];
  availability_status: string;
  is_custom: boolean;
  is_featured: boolean;
  seo_title: string;
  seo_description: string | null;
  updated_at: string | null;
};

export type CatalogueCategory = {
  slug: string;
  name: string;
  headline: string;
  description: string | null;
  image: string | null;
  subcategories: string[];
  result_count: number;
  seo_title: string;
  seo_description: string | null;
  products?: CatalogueProduct[];
};

export type CatalogueCollection = {
  slug: string;
  name: string;
  description: string | null;
  image: string | null;
  result_count: number;
  seo_title: string;
  seo_description: string | null;
  products?: CatalogueProduct[];
};

export type SiteSettings = {
  business_phone: string | null;
  whatsapp_number: string | null;
  business_email: string | null;
  address: string | null;
  opening_hours: string | null;
  google_maps_url: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  meta_pixel_id: string | null;
  ga4_id: string | null;
};

export const emptySettings: SiteSettings = {
  business_phone: null,
  whatsapp_number: null,
  business_email: null,
  address: null,
  opening_hours: null,
  google_maps_url: null,
  facebook_url: null,
  instagram_url: null,
  meta_pixel_id: null,
  ga4_id: null,
};

export function publicApiUrl() {
  return process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";
}

export function whatsappHref(number: string | null | undefined, message: string) {
  const digits = (number ?? "").replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function productEnquiryMessage(product: Pick<CatalogueProduct, "name" | "price_label" | "slug">) {
  const origin = typeof window !== "undefined" ? window.location.origin : "https://jaburahome.com";
  return `Hello Jabura Home Furniture, I am interested in:\n\nProduct: ${product.name}\nPrice: ${product.price_label ?? "Price on request"}\nLink: ${origin}/products/${product.slug}\n\nCan you confirm availability and delivery to my location?`;
}
