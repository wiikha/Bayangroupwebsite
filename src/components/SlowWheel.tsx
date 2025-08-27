"use client";

import { useEffect } from "react";

export default function SlowWheel({ factor = 0.4 }: { factor?: number }) {
  useEffect(() => {
    // accessibility: reduce motion bo'lsa ishlatma
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // faqat wheel bo'lgan qurilmalarda (basic deteksiya)
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const handler = (e: WheelEvent) => {
      // ichki scrollli bloklarga tegmang
      const el = e.target as HTMLElement | null;
      if (el?.closest?.("[data-native-scroll]")) return;

      // ctrl/alt bilan zoom/gesture bo'lsa tegmang
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      e.preventDefault();

      // deltaMode normalization: 0=pixels, 1=lines, 2=pages
      let dy = e.deltaY;
      if (e.deltaMode === 1) dy *= 16; // taxminan 1 line ≈ 16px
      else if (e.deltaMode === 2) dy *= window.innerHeight;

      window.scrollBy({
        top: dy * factor,
        behavior: "smooth",
      });
    };

    window.addEventListener("wheel", handler, { passive: false });
    return () => window.removeEventListener("wheel", handler);
  }, [factor]);

  return null;
}
