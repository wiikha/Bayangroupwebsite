"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type TimelineItem = { year: number; text: string };

export default function AboutPage() {
  const t = useTranslations("about");
  const locale = (useLocale?.() as "uz" | "ru" | "en") || "uz";

  // ---- Timeline state (API-dan)
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState<"left" | "right">("right");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch(`/api/timeline?lang=${locale}&limit=1000`, { cache: "no-store" });
        const j = await r.json();
        const list: TimelineItem[] = (j?.items || []).sort((a:TimelineItem,b:TimelineItem)=>a.year-b.year);
        if (alive) {
          setItems(list);
          setIdx(0);
        }
      } catch {
        if (alive) setItems([]);
      }
    })();
    return () => { alive = false; };
  }, [locale]);

  const current = items[idx] || null;

  const variants = {
    enter: (d: "left" | "right") => ({ x: d === "right" ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: "left" | "right") => ({ x: d === "right" ? -60 : 60, opacity: 0 }),
  };

  const prevYear = useMemo(()=> items[(idx - 1 + items.length) % (items.length || 1)]?.year, [idx, items]);
  const nextYear = useMemo(()=> items[(idx + 1) % (items.length || 1)]?.year, [idx, items]);

  const goNext = () => { if (!items.length) return; setDir("right"); setIdx((p)=> (p+1) % items.length); };
  const goPrev = () => { if (!items.length) return; setDir("left"); setIdx((p)=> (p-1+items.length) % items.length); };

  return (
    <main className="bg-[#EEF3FF]">
      {/* HERO */}
      <section className="relative bg-[#EDF3FF]">
        <div className="relative h-[48vh] sm:h-[54vh] md:h-[56vh] overflow-hidden rounded-b-[32px] md:rounded-b-[40px]">
          <Image src="/all/hero-bg.png" alt="Bizning kompaniyalarimiz" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-[#143C99]/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-8">
            <h1 className="text-white font-extrabold leading-[1.05] tracking-tight text-4xl sm:text-5xl md:text-[80px]">
              {t("hero_title")}
            </h1>
            <p className="mt-4 text-white/85 max-w-2xl text-sm sm:text-base md:text-lg">
              {t("hero_subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT SECTIONS (o‘zingizdagi kontent) */}
      <section>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
          <div className="max-w-2xl ml-auto">
            <div className="mb-2 sm:mb-4 text-[18px] font-medium text-[#2F4FA0]/80 tracking-wide flex items-center gap-2">
              <Image src="/about/logo_mini.png" alt="logo" width={50} height={50} className="inline-block h-4 w-4" />
              {t("eyebrow")}
            </div>

            <h1 className="text-[32px] leading-tight sm:text-4xl md:text-5xl font-extrabold text-[#2F4FA0]">
              {t("title.line1")}
            </h1>

            <div className="mt-6 sm:mt-8">
              <Image
                src="/about/photo_1.png"
                alt={t("images.lab.alt")}
                width={1600}
                height={900}
                priority
                className="w-full h-auto rounded-2xl shadow-sm object-cover aspect-[16/9] md:aspect-[21/11]"
              />
            </div>

            <div className="mt-6 sm:mt-8">
              <h3 className="md:text-[32px] text-[20px] font-semibold text-[#1D2951]">{t("info.title")}</h3>
              <p className="mt-3 md:text-[18px] text-[15px] leading-relaxed text-[#1B2337]/80 max-w-3xl">{t("info.body")}</p>
            </div>
          </div>

          <div className="mt-8 sm:mt-10">
            <div className="rounded-2xl overflow-hidden shadow-sm">
              <Image src="/about/photo_3.png" alt={t("images.engineer.alt")} width={1800} height={1200} className="w-full h-auto object-cover aspect-[16/10] sm:aspect-[16/9]" />
            </div>
          </div>

          <div className="max-w-2xl ml-auto">
            <div className="mt-6 sm:mt-8">
              <h3 className="md:text-[32px] text-[20px] font-semibold text-[#1D2951]">{t("info2.title")}</h3>
              <p className="mt-3 md:text-[18px] text-[15px] leading-relaxed text-[#1B2337]/80 max-w-3xl">{t("info2.body")}</p>
            </div>

            <div className="mt-6 sm:mt-8">
              <Image
                src="/about/photo_2.png"
                alt={t("images.lab.alt")}
                width={1600}
                height={1600}
                priority
                className="w-full h-auto rounded-2xl shadow-sm object-cover aspect-[16/15] md:aspect-[21/20]"
              />
            </div>

            <div className="mt-6 sm:mt-8">
              <p className="mt-3 md:text-[18px] text-[15px] leading-relaxed text-[#1B2337]/80 max-w-3xl">{t("info3.body")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE SECTION (dynamic) */}
      <section className="bg-[#EEF3FF]">
        <div className="mx-auto w-full rounded-[36px] p-6 sm:p-10 md:p-14 bg-white relative overflow-hidden">
          <div className="mb-2 sm:mb-4 text-[18px] font-medium text-[#2F4FA0]/80 tracking-wide flex items-center justify-center gap-2">
            <Image src="/about/logo_mini.png" alt="logo" width={50} height={50} className="inline-block h-4 w-4" />
            {t("eyebrow_2")}
          </div>

          <h2 className="text-center text-[28px] sm:text-[36px] md:text-[44px] font-extrabold text-[#2F4FA0] mb-8">
            {t("title_2")}
          </h2>

          <div className="relative flex items-center justify-between text-sm text-gray-500 font-medium mb-6">
            <span>{items.length ? items[(idx - 1 + items.length) % items.length]?.year : "—"}</span>
            <span className="absolute left-1/2 -translate-x-1/2 text-[#2F4FA0] font-bold text-lg sm:text-xl">
              {current?.year ?? "—"}
            </span>
            <span>{items.length ? items[(idx + 1) % items.length]?.year : "—"}</span>
            <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-[#D9E1FF] -z-10" />
          </div>

          <div className="min-h-[80px] flex items-center justify-center text-center">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.p
                key={current?.year ?? "empty"}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                custom={dir}
                transition={{ duration: 0.4 }}
                className="max-w-3xl text-sm sm:text-base md:text-lg text-[#1B2337]"
              >
                {current?.text || t("timeline_empty")}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={goPrev}
              className="h-10 w-10 rounded-md border border-[#2F4FA0] flex items-center justify-center text-[#2F4FA0] hover:bg-[#2F4FA0] hover:text-white transition"
              aria-label="Previous year"
              disabled={!items.length}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goNext}
              className="h-10 w-10 rounded-md border border-[#2F4FA0] flex items-center justify-center text-[#2F4FA0] hover:bg-[#2F4FA0] hover:text-white transition"
              aria-label="Next year"
              disabled={!items.length}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="bg-[#EEF3FF]">
        <div className="mx-auto w-full rounded-[36px] p-6 sm:p-10 md:p-14 relative overflow-hidden">
          <div className="mb-2 sm:mb-4 text-[18px] font-medium text-[#2F4FA0]/80 tracking-wide flex items-center justify-center gap-2">
            <Image src="/about/logo_mini.png" alt="logo" width={50} height={50} className="inline-block h-4 w-4" />
            {t("partnereyebrow")}
          </div>

          <h2 className="text-center text-[28px] sm:text-[36px] md:text-[44px] font-extrabold text-[#2F4FA0] mb-8">
            {t("partnertitle")}
          </h2>

          <div className="mt-8 sm:mt-10 p-8">
            <Image src="/about/partners.png" alt={t("images.engineer.alt")} width={900} height={700} className="w-full h-auto" />
          </div>
        </div>
      </section>
    </main>
  );
}