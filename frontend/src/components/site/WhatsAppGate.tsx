"use client";

import { usePathname } from "next/navigation";
import { WhatsAppButton } from "./WhatsAppButton";

export function WhatsAppGate() {
  const pathname = usePathname();
  if (pathname.startsWith("/contact")) return null;
  return <WhatsAppButton />;
}
