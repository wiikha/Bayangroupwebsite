"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Image from "next/image";

type Job = { title: string; body: string; href: string };
export default function Vacancies() {
  const t = useTranslations("vacancies");

  // Jobs from i18n
  const jobs: Job[] = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => {
        const idx = i + 1;
        return {
          title: t(`jobs.${idx}.title`),
          body: t(`jobs.${idx}.body`),
          href: t(`jobs.${idx}.href`) || `/vacancies/${idx}`
        };
      }),
    [t]
  );

  // Pagination (UI demo like your mock)
  const totalPages = 31;
  const [page, setPage] = useState(2);

  return (
    <main>
      {/* HERO */}
           <section className="relative">
             <div className="relative overflow-hidden rounded-b-[32px] md:rounded-b-[40px]">
               {/* Background photo */}
               <Image
                 src="/all/hero-bg.png" // ← bu yerga rasm nomini qo‘yasiz
                 alt="Hero background"
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
           <section className="bg-[#EDF3FF]">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8 py-12 md:py-16">
        {/* Header */}
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

        {/* Roles list */}
        <ul className="divide-y divide-slate-200/80">
          {jobs.map((job, i) => (
            <li key={i}>
              <Link
                href={job.href}
                className="group grid grid-cols-[1fr_28px] sm:grid-cols-[1fr_36px] gap-3 sm:gap-4 py-4 sm:py-5"
              >
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                    {job.title}
                  </h3>
                  <p className="mt-1 text-sm sm:text-base text-slate-600">
                    {job.body}
                  </p>
                </div>
                <span className="ml-auto inline-flex items-center justify-center text-[#143C99] group-hover:translate-x-0.5 transition">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth="2">
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

        {/* CV Contact Card */}
        <div className="mt-10 sm:mt-12 md:mt-14 rounded-3xl bg-white ring-1 ring-black/5 p-5 sm:p-6 md:p-8 grid gap-6 md:grid-cols-[220px_1fr]">
          {/* Left visual */}
          <div className="relative overflow-hidden rounded-2xl bg-[#EDF3FF] ring-1 ring-slate-200/80 min-h-[160px] md:min-h-[200px] grid place-items-center">
            <span className="text-6xl font-extrabold text-[#143C99]/20">CV</span>
          </div>

          {/* Right text */}
          <div className="self-center">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#143C99]">
              {t("contact.title")}
            </h3>

            <div className="mt-4 grid gap-2 text-slate-800">
              <Line label={t("contact.website")}  value={t("contact.websiteValue")} />
              <Line label={t("contact.company")}  value={t("contact.companyValue")} />
              <Line label={t("contact.email")}    value={t("contact.emailValue")} link={`mailto:${t("contact.emailValue")}`} />
              <Line label={t("contact.telegram")} value={t("contact.telegramValue")} />
            </div>
          </div>
        </div>
      </div>
    </section>
    </main>
  );
}
function Line({ label, value, link }: { label: string; value: string; link?: string }) {
  const Content = () =>
    <span className="font-medium text-slate-900">{value}</span>;

  return (
    <p className="text-sm sm:text-base text-slate-600">
      <span className="text-slate-500">({label})</span>{" "}
      {link ? (
        <a href={link} className="underline decoration-[#143C99]/30 underline-offset-2 hover:text-[#143C99]">
          <Content />
        </a>
      ) : (
        <Content />
      )}
    </p>
  );
}
