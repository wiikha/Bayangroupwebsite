"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useEffect, useState } from "react";

type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  photo: string;              // ← API dagi maydon
  date?: string;
  header?: string;
};

export default function NewsPage() {
  const t = useTranslations("news");
  const locale = useLocale() as "uz" | "ru" | "en";

  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      const r = await fetch(`/api/news?lang=${locale}&limit=24`, { cache: "no-store" });
      const j = await r.json().catch(() => ({ items: [] }));
      if (alive) setItems(j.items ?? []);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [locale]);

  return (
    <main>
      {/* (HERO va sarlavhalaringiz shu yerda) */}
      <section className="relative bg-[#EDF3FF]">
                   <div className="relative overflow-hidden rounded-b-[32px] md:rounded-b-[40px]">
                     {/* Background photo */}
                     <Image
                       src="/all/hero-bg.png" // ← bu yerga rasm nomini qo‘yasiz
                       alt="Bizning kompaniyalarimiz"
                       width={2880}
                       height={1200}
                       priority
                       className="w-full h-[48vh] sm:h-[54vh] md:h-[56vh] object-cover"
                     />
           
                     {/* Overlay gradient — matn o‘qilishi uchun */}
                     <div className="absolute inset-0 bg-[#143C99]/50" />
           
                     {/* Content */}
                     <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-8">
                       <h1
                         className="text-white font-extrabold leading-[1.05] tracking-tight
                                    text-4xl sm:text-5xl md:text-[80px]"
                       >
                         {t("heading")}
                       </h1>
           
                       <p
                         className="mt-4 text-white/85 max-w-2xl
                                    text-sm sm:text-base md:text-lg"
                       >
                         {t("subheading")}
                       </p>
                     </div>
                   </div>
            </section>

      {/* LIST */}
      <section className="bg-[#EDF3FF]">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 md:px-8 md:py-16">
        <div className="text-center">
                    <div className="mb-2 sm:mb-4 text-[18px] font-medium text-[#2F4FA0]/80 tracking-wide flex items-center justify-center gap-2">
                                        <Image src="/about/logo_mini.png" alt="logo" width={50} height={50} className="inline-block h-4 w-4  " />
                                        {t("eyebrow")}
                                      </div>
                    <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#143C99]">
                      {t("title")}
                    </h2>
                    <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
                      {t("subtitle")}
                    </p>
                  </div>
          <ul className="rounded-3xl p-2 sm:p-3 md:mt-20 mt-10 divide-y divide-slate-200/70">
            {loading && <li className="p-4">Yuklanmoqda…</li>}
            {!loading && items.length === 0 && <li className="p-4">Hozircha yangilik yo‘q</li>}

            {items.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`${item.header}`}
                  className="grid grid-cols-[96px_1fr_28px] items-center gap-4 rounded-2xl p-3 transition hover:bg-slate-50 sm:grid-cols-[124px_1fr_36px] sm:gap-6 sm:p-4"
                >
                  <div className="relative h-20 w-24 overflow-hidden rounded-2xl ring-1 ring-slate-200/70 sm:h-24 sm:w-32">
                    <Image
                      src={item.photo || "/placeholder-news.png"} // ← fallback rasm
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 96px, 124px"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-slate-900 sm:text-lg">{item.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-slate-600 sm:text-base">{item.excerpt}</p>
                  </div>

                  <span className="ml-auto inline-flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-[#143C99] sm:h-6 sm:w-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
