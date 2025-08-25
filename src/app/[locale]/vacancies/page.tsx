"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";

type Job = { title: string; body: string; href: string };

export default function Vacancies() {
  const t = useTranslations("vacancies");
  const locale = useLocale() as "uz" | "ru" | "en";
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      const r = await fetch(`/api/vacancies?lang=${locale}`, { cache: "no-store" });
      const j = await r.json();
      if (alive) setJobs(j.items || []);
      setLoading(false);
    })();
    return () => { alive = false; };
  }, [locale]);

  return (
    <main>
      {/* (HERO va headerlaringiz o‘z joyida qoladi) */}
      <section className="relative bg-[#EDF3FF]">
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
          {/* Header (o'zingizdagidek) */}

          <ul className="divide-y divide-slate-200/80">
            {loading && <li className="p-4">Yuklanmoqda…</li>}
            {!loading && jobs.length === 0 && <li className="p-4">Hozircha vakant joy yo‘q</li>}

            {jobs.map((job, i) => (
              <li key={i}>
                <Link href={job.href || "#"} className="group grid grid-cols-[1fr_28px] sm:grid-cols-[1fr_36px] gap-3 sm:gap-4 py-4 sm:py-5">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900">{job.title}</h3>
                    <p className="mt-1 text-sm sm:text-base text-slate-600">{job.body}</p>
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
        </div>
      </section>
    </main>
  );
}
