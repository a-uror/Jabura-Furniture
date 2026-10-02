"use client";

import { createContext, useContext, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { emptySettings, type CatalogueCategory, type SiteSettings } from "@/lib/catalogue";

type SiteValue = {
  categories: CatalogueCategory[];
  settings: SiteSettings;
};

const SiteContext = createContext<SiteValue>({ categories: [], settings: emptySettings });

export function SiteProvider({
  categories,
  settings,
  children,
}: SiteValue & { children: ReactNode }) {
  return (
    <SiteContext.Provider value={{ categories, settings }}>
      <MotionConfig
        reducedMotion="user"
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </MotionConfig>
    </SiteContext.Provider>
  );
}

export function useSite() {
  return useContext(SiteContext);
}
