import { cache } from "react";
import {
  emptySettings,
  type CatalogueCategory,
  type CatalogueCollection,
  type CatalogueProduct,
  type SiteSettings,
} from "@/lib/catalogue";

// HTTP cache is off in dev, so every navigation would wait on PHP.
// Keep a response for 20 seconds. A Filament edit shows up after that.
const TTL_MS = 20_000;
const memory = new Map<string, { at: number; status: number; body: unknown }>();

function apiUrl() {
  return process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";
}

const load = cache(async (path: string) => {
  const hit = memory.get(path);
  if (hit && Date.now() - hit.at < TTL_MS) return hit;

  const response = await fetch(`${apiUrl()}${path}`, { cache: "no-store" });
  const body = response.status === 204 ? null : await response.json().catch(() => null);
  const entry = { at: Date.now(), status: response.status, body };
  if (response.ok || response.status === 404) memory.set(path, entry);
  return entry;
});

async function getJson<T>(path: string): Promise<T> {
  const entry = await load(path);
  if (entry.status < 200 || entry.status >= 300) {
    throw new Error(`Catalogue request failed: ${path}`);
  }
  return entry.body as T;
}

export async function getProducts(query?: { q?: string; category?: string }) {
  const params = new URLSearchParams();
  if (query?.q) params.set("q", query.q);
  if (query?.category) params.set("category", query.category);
  const suffix = params.size ? `?${params}` : "";
  const json = await getJson<{ data: CatalogueProduct[] }>(`/api/products${suffix}`);
  return json.data;
}

export async function getProduct(slug: string) {
  const entry = await load(`/api/products/${slug}`);
  if (entry.status === 404) return null;
  if (entry.status < 200 || entry.status >= 300) throw new Error("Product request failed");
  return entry.body as { data: CatalogueProduct; related: CatalogueProduct[] };
}

export async function getCategories() {
  const json = await getJson<{ data: CatalogueCategory[] }>("/api/categories");
  return json.data;
}

export async function getCategory(slug: string) {
  const entry = await load(`/api/categories/${slug}`);
  if (entry.status === 404) return null;
  if (entry.status < 200 || entry.status >= 300) throw new Error("Category request failed");
  return (entry.body as { data: CatalogueCategory }).data;
}

export async function getCollections() {
  const json = await getJson<{ data: CatalogueCollection[] }>("/api/collections");
  return json.data;
}

export async function getCollection(slug: string) {
  const entry = await load(`/api/collections/${slug}`);
  if (entry.status === 404) return null;
  if (entry.status < 200 || entry.status >= 300) throw new Error("Collection request failed");
  return (entry.body as { data: CatalogueCollection }).data;
}

export async function getSettings(): Promise<SiteSettings> {
  try {
    const json = await getJson<{ data: SiteSettings }>("/api/site-settings");
    return { ...emptySettings, ...json.data };
  } catch {
    return emptySettings;
  }
}
