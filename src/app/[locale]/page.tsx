"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import WhyUs from "@/components/whyus";
import AskQuestionSection from "@/components/ask";

type APINews = {
  slug: string;
  title: string;
  excerpt: string;
  photo: string;     // API dan keladi
  header?: string;   // bo‘lsa — tashqi post havolasi (mas: Instagram)
};

export default function Home() {
  const t = useTranslations("home");
  const locale = useLocale() as "uz" | "ru" | "en";

  // --- Stats (o‘zgarmagan) ---
  const stats = [
    { value: 10, label: t("statistic1") },
    { value: 120, label: t("statistic2") },
    { value: 1050, label: t("statistic3") },
    { value: 8, label: t("statistic4") },
  ];

  // --- NEWS: API dan oxirgi 3 ta ---
  const [news, setNews] = useState<APINews[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      setNewsLoading(true);
      const r = await fetch(`/api/news?lang=${locale}&limit=3`, { cache: "no-store" });
      const j = await r.json().catch(() => ({ items: [] }));
      if (alive) setNews(j.items ?? []);
      setNewsLoading(false);
    })();
    return () => { alive = false; };
  }, [locale]);

  return (
    <main>
      {/* HERO */}
      <section className="relative top-0 bg-[#EDF3FF]">
  {/* Ota konteynerga BALANDLIK bering */}
  <div className="relative h-[70vh] md:h-[80vh] overflow-hidden rounded-b-[32px] md:rounded-b-[40px]">
    {/* Desktop */}
    <Image
      src="/homephoto/hero-bg-desktop.png"
      alt="Bayan Group background"
      fill
      priority
      fetchPriority="high"
      sizes="100vw"
      className="hidden md:block"
    />

    {/* Mobile */}
    <Image
      src="/homephoto/hero-bg-mobile.png"
      alt="Bayan Group background"
      fill
      priority
      fetchPriority="high"
      sizes="100vw"
      className="block md:hidden object-cover"
    />

    {/* Content */}
    <div className="absolute inset-0 flex items-center">
      <div className="max-w-7xl mx-auto ml-auto px-4 md:px-8">
        <div className="max-w-2xl">
          <h1 className="text-white font-extrabold leading-tight tracking-tight text-4xl sm:text-5xl md:text-[80px]">
            {t("heroTitleLine1")}
            <span className="block">{t("heroTitleLine2")}</span>
            <span className="block">{t("heroTitleLine3")}</span>
          </h1>
          <p className="mt-6 text-white/85 text-base sm:text-lg md:text-xl max-w-[46ch]">
            {t("heroSubtitle")}
          </p>
          <div className="mt-8">
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-xl bg-white text-[#143C99] font-bold h-11 px-5 hover:bg-slate-100 transition"
            >
              {t("heroCta")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



      {/* ABOUT + STATS (sizdagi dizayn) */}
      <section className="bg-[#EEF3FF] pb-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
          <div className="max-w-2xl ml-auto">
            <div className="mb-2 sm:mb-4 text-[18px] font-medium text-[#2F4FA0]/80 tracking-wide flex items-center gap-2">
              <Image src="/about/logo_mini.png" alt="logo" width={50} height={50} className="inline-block h-4 w-4" />
              {t("abouteyebrow")}
            </div>
            <h1 className="text-[32px] leading-tight sm:text-4xl md:text-5xl font-extrabold text-[#2F4FA0]">
              {t("abouttitle")}
            </h1>
            <p className="mt-4 text-slate-700 leading-7">{t("aboutsubtitle")}</p>
            <Link href="/aboutus" className="mt-6 inline-flex items-center gap-2 font-semibold text-[#143C99] hover:opacity-80">
              {t("more")}
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <div className="mt-6 sm:mt-8">
              <Image
                src="/homephoto/about.png"
                alt="Bayan Group about"
                width={1600}
                height={900}
                priority
                className="w-full h-auto rounded-2xl shadow-sm object-cover aspect-[16/9] md:aspect-[21/11]"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8 py-10 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-12">
            {stats.map((it, i) => (
              <div key={i} className="relative text-center">
                <div className="mx-auto mb-5 md:mb-6 h-px w-[68%] max-w-[280px] bg-[#D7E3FF]" />
                <div className="flex items-baseline justify-center gap-2">
                  <span className="leading-none text-[42px] sm:text-[48px] md:text-[56px] font-extrabold text-slate-900">
                    {it.value}
                  </span>
                  <span className="leading-none text-[24px] sm:text-[28px] md:text-[32px] font-bold text-[#2A55C5]">+</span>
                </div>
                <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-600">{it.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

  
      <section className="bg-white md:pt-20 md:pb-20 pb-10 pt-10">
        <div className="max-w-6xl mx-auto px-4" >
           {/* Eyebrow */}
                <div className="mb-2 sm:mb-4 text-[18px] font-medium text-[#2F4FA0]/80 tracking-wide flex items-center justify-center gap-2">
                         <Image src="/about/logo_mini.png" alt="logo" width={50} height={50} className="inline-block h-4 w-4  " />
                         {t("techeyebrow")}
                       </div>
        
                {/* Title */}
                <h2 className="text-center text-[28px] sm:text-[36px] md:text-[44px] font-extrabold text-[#2F4FA0]">
                  {t("techtitle")}
                </h2>
                <p className="text-center mt-2 text-sm sm:text-base text-[#1B2337]/80">
                  {t("techsubtitle")}
                </p>
        <div className="mt-8 grid md:grid-cols-2 md:auto-cols-max md:justify-center md:items-center gap-6">
                    <div>
                    <Image
                        src="/homephoto/tech2.png"
                        alt="SEEM line 1"
                        width={1400}
                        height={900}
                        className="rounded-2xl w-full object-cover"
                      />
                    </div>
                    <div >
                    <p className="text-sm text-[#1B2337]/80"> {t("techtext1")} </p>
                    <Link href="/tech" className="mt-6 inline-flex items-center gap-2 font-semibold text-[#143C99] hover:opacity-80" > {t("more")} 
         <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
        </Link>
                    </div>
                    <div >
                    <p className="text-sm text-[#1B2337]/80"> {t("techtext2")} </p>
                    <Link href="/tech" className="mt-6 inline-flex items-center gap-2 font-semibold text-[#143C99] hover:opacity-80" > {t("more")} 
         <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
        </Link>
                    </div>            
                    <div>
                    <Image
                        src="/homephoto/tech1.png"
                        alt="SEEM line 2"
                        width={1400}
                        height={900}
                        className="rounded-2xl w-full object-cover"
                      />
                      
                    </div>
                  </div>
        </div>
       
      </section>

      {/* Why us */}
      <WhyUs />

      {/* --- KICHIK YANGILIKLAR (API: oxirgi 3 ta) --- */}
      <section className="bg-white md:pt-20 md:pb-20 pb-10 pt-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-2 sm:mb-4 text-[18px] font-medium text-[#2F4FA0]/80 tracking-wide flex items-center justify-center gap-2">
            <Image src="/about/logo_mini.png" alt="logo" width={50} height={50} className="inline-block h-4 w-4" />
            {t("newseyebrow")}
          </div>
          <h2 className="text-center text-[28px] sm:text-[36px] md:text-[44px] font-extrabold text-[#2F4FA0]">
            {t("newstitle")}
          </h2>

          <ul className="divide-y divide-slate-200/70 md:mt-20 mt-10 rounded-3xl p-2 sm:p-3">
            {newsLoading && <li className="p-4 text-center text-slate-500">Yuklanmoqda…</li>}
            {!newsLoading && news.length === 0 && <li className="p-4 text-center">Hozircha yangilik yo‘q</li>}

            {news.map((item) => (
              <li key={item.slug}>
                <Link
                  // Agar admin "header"ga IG post havolasini bergan bo‘lsa — shu yerga ochiladi
                  href={item.header || `/news/${item.slug}`}
                  target={item.header ? "_blank" : undefined}
                  rel={item.header ? "noopener noreferrer" : undefined}
                  className="grid grid-cols-[96px_1fr_28px] sm:grid-cols-[124px_1fr_36px] gap-4 sm:gap-6 items-center p-3 sm:p-4 rounded-2xl hover:bg-slate-50 transition"
                >
                  <div className="relative h-20 w-24 sm:h-24 sm:w-32 overflow-hidden rounded-2xl ring-1 ring-slate-200/70">
                    <Image
                      src={item.photo || "/placeholder-news.png"}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 96px, 124px"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm sm:text-base text-slate-600 line-clamp-2">{item.excerpt}</p>
                  </div>
                  <span className="ml-auto inline-flex justify-center items-center">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6 text-[#143C99]" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* “Barchasi” tugmasi */}
          <div className="mt-6 text-center">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 font-semibold text-[#143C99] hover:opacity-80"
            >
              {t("more")}
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <AskQuestionSection />
    </main>
  );
}
