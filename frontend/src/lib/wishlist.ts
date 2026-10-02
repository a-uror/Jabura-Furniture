import { useSyncExternalStore } from "react";

const STORAGE_KEY = "jabura-wishlist";
const EMPTY: string[] = [];

let ids: string[] = [];
let loaded = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) ids = JSON.parse(stored) as string[];
  } catch {
    ids = [];
  }
}

function persist() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

function subscribe(l: () => void) {
  listeners.add(l);
  load();
  emit();
  return () => listeners.delete(l);
}

export function toggleWishlist(id: string) {
  load();
  ids = ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id];
  persist();
  emit();
  return ids.includes(id);
}

export function useWishlist() {
  const list = useSyncExternalStore(subscribe, () => ids, () => EMPTY);
  return { ids: list, count: list.length, has: (id: string) => list.includes(id) };
}
