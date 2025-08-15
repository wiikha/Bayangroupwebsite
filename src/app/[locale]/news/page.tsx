"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
};

export default function News() {
  const t = useTranslations("news");

  // ---- Mock data (replace with API later) ----
  const allItems: NewsItem[] = useMemo(
    () => [
      {
        slug: "new-antibiotics-line",
        title: t("items.antibiotics.title"),
        excerpt: t("items.antibiotics.excerpt"),
        image: "/news/img1.png"
      },
      {
        slug: "gmp-certificate",
        title: t("items.gmp.title"),
        excerpt: t("items.gmp.excerpt"),
        image: "/news/img2.png"
      },
      {
        slug: "iso-certificate",
        title: t("items.iso.title"),
        excerpt: t("items.iso.excerpt"),
        image: "/news/img3.png"
      },
      {
        slug: "new-production-line",
        title: t("items.newline.title"),
        excerpt: t("items.newline.excerpt"),
        image: "/news/img1.png"
      },
      {
        slug: "r-and-d-department",
        title: t("items.randd.title"),
        excerpt: t("items.randd.excerpt"),
        image: "/news/img3.png"
      },
      {
        slug: "partnership-agreement",
        title: t("items.partnership.title"),
        excerpt: t("items.partnership.excerpt"),
        image: "/news/img2.png"
      },
      {
        slug: "new-product-registered",
        title: t("items.registration.title"),
        excerpt: t("items.registration.excerpt"),
        image: "/news/img1.png"
      },
      {
        slug: "first-export",
        title: t("items.export.title"),
        excerpt: t("items.export.excerpt"),
        image: "/news/img3.png"
      }
    ],
    [t]
  );

  // ---- Pagination (client-side demo) ----
  const pageSize = 8;
  const totalPages = 31; // as in your screenshot
  const [page, setPage] = useState(2); // screenshot shows page 2 active

  const items = allItems.slice(0, pageSize); // show current page items (mock)

  return (
    <main>
      {/* HERO */}
                 <section className="relative">
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
                         {t("title")}
                       </h1>
           
                       <p
                         className="mt-4 text-white/85 max-w-2xl
                                    text-sm sm:text-base md:text-lg"
                       >
                         {t("subtitle")}
                       </p>
                     </div>
                   </div>
                 </section>
      {/* NEWS LIST SECTION */}
      <section className="bg-[#EDF3FF]">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8 py-12 md:py-16">
          {/* Section header */}
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

          {/* List */}
          <ul className="divide-y divide-slate-200/70 md:mt-20 mt-10 rounded-3xl  p-2 sm:p-3 ">
            {items.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/news/${item.slug}`}
                  className="grid grid-cols-[96px_1fr_28px] sm:grid-cols-[124px_1fr_36px] gap-4 sm:gap-6 items-center p-3 sm:p-4 rounded-2xl hover:bg-slate-50 transition"
                >
                  {/* Thumb */}
                  <div className="relative h-20 w-24 sm:h-24 sm:w-32 overflow-hidden rounded-2xl ring-1 ring-slate-200/70">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 96px, 124px"
                    />
                  </div>

                  {/* Texts */}
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm sm:text-base text-slate-600 line-clamp-2">
                      {item.excerpt}
                    </p>
                  </div>

                  {/* Arrow */}
                  <span className="ml-auto inline-flex justify-center items-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 sm:h-6 sm:w-6 text-[#143C99]"
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

          {/* Pagination */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="h-9 w-9 rounded-full bg-white text-slate-700 ring-1 ring-black/5 hover:bg-slate-50"
              aria-label={t("pagination.prev")}
            >
              ‹
            </button>

            <button
              onClick={() => setPage(1)}
              className="h-9 w-9 rounded-full bg-white text-slate-700 ring-1 ring-black/5 hover:bg-slate-50"
            >
              1
            </button>

            <button
              onClick={() => setPage(2)}
              className={`h-9 w-9 rounded-full font-semibold ring-1 ring-black/5 ${
                page === 2
                  ? "bg-[#143C99] text-white shadow"
                  : "bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              2
            </button>

            <button className="h-9 w-9 rounded-full bg-white text-slate-700 ring-1 ring-black/5 hover:bg-slate-50">
              …
            </button>

            <button className="h-9 w-9 rounded-full bg-white text-slate-700 ring-1 ring-black/5 hover:bg-slate-50">
              30
            </button>
            <button className="h-9 w-9 rounded-full bg-white text-slate-700 ring-1 ring-black/5 hover:bg-slate-50">
              31
            </button>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="h-9 w-9 rounded-full bg-white text-slate-700 ring-1 ring-black/5 hover:bg-slate-50"
              aria-label={t("pagination.next")}
            >
              ›
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
