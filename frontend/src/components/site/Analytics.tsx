"use client";

import { useEffect } from "react";
import { useSite } from "@/components/site/SiteProvider";
import { rememberUtm } from "@/lib/leads";

export function Analytics() {
  const { settings } = useSite();

  useEffect(() => {
    rememberUtm();
  }, []);

  useEffect(() => {
    const pixel = settings.meta_pixel_id ?? "";
    if (/^\d+$/.test(pixel) && !document.getElementById("jabura-meta-pixel")) {
      const script = document.createElement("script");
      script.id = "jabura-meta-pixel";
      script.text = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixel}');fbq('track','PageView');`;
      document.head.appendChild(script);
    }

    const ga = settings.ga4_id ?? "";
    if (/^G-[A-Z0-9]+$/i.test(ga) && !document.getElementById("jabura-ga4")) {
      const loader = document.createElement("script");
      loader.id = "jabura-ga4";
      loader.async = true;
      loader.src = `https://www.googletagmanager.com/gtag/js?id=${ga}`;
      document.head.appendChild(loader);
      const inline = document.createElement("script");
      inline.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`;
      document.head.appendChild(inline);
    }
  }, [settings.ga4_id, settings.meta_pixel_id]);

  return null;
}
