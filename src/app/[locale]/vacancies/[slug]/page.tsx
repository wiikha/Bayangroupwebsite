// app/[locale]/vacancies/[slug]/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Image from "next/image";

type Lang = "uz" | "ru" | "en";
type Job = { id: string; slug: string; title: string; body: string; href?: string };

export default function VacancyDetail() {
  const locale = useLocale() as Lang;
  const t = useTranslations("vacancies.detail");
  const { slug } = useParams<{ slug: string }>();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const r = await fetch(`/api/vacancies?lang=${locale}&slug=${slug}`, { cache: "no-store" });
        const j = await r.json();
        if (!alive) return;
        setJob((j.items?.[0] as Job | undefined) ?? null);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [locale, slug]);

  // i18n Fallback helper (kalit bo'lmasa yiqilmasin)
  const tr = (key: string, def: string) => t(key as any, { fallback: def });

  const mailto = useMemo(() => {
    if (!job) return "#";
    const title = job.title || job.slug;
    const subject = encodeURIComponent(`Application: ${title}`);
    const body = encodeURIComponent(
      `${tr("mailIntro", "Hello,\nI would like to apply for this position.\nPosition:")} ${title}\nID: ${job.id}\nSlug: ${job.slug}\n\n---\n${tr("mailFooter", "(Please attach your resume/CV)")}`
    );
    return `mailto:bayanmedical@gmail.com?subject=${subject}&body=${body}`;
  }, [job, t]);

  // Loading
  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#1740a0] text-white">
        <span className="text-sm opacity-90">Loading</span>
      </main>
    );
  }

  // Not found
  if (!job) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#1740a0] text-white">
        <p>{tr("notFound", "Vacancy not found")}</p>
      </main>
    );
  }

  return (
    <main className="bg-[#EDF3FF]" >
      <section className="relative bg-[#EDF3FF]">
              <div className="relative overflow-hidden rounded-b-[32px] md:rounded-b-[40px]">
                <Image
                  src="/all/hero-bg.png"
                  alt="Hero background"
                  width={2880}
                  height={1200}
                  priority
                  className="w-full h-[48vh] sm:h-[54vh] md:h-[56vh] object-cover"
                />
                <div className="absolute inset-0 bg-[#143C99]/50" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-8">
                  <h1 className="text-white font-extrabold leading-[1.05] tracking-tight text-4xl sm:text-5xl md:text-[80px]">
                    {t("title")}
                  </h1>
                </div>
              </div>
            </section>
      {/* White card */}
      <section className="mx-auto bg-[#EDF3FF] w-full   max-w-4xl px-4 md:px-8 pt-20 pb-12 md:pb-16">
        <div className="overflow-hidden rounded-2xl  border border-black/5 bg-white shadow-2xl shadow-black/10">
          {/* Header */}
          <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5 md:px-8 md:py-6">
            <div>
              <h1 className="text-2xl font-semibold leading-tight text-slate-900 md:text-3xl">
                {job.title || job.slug}
              </h1>
              <p className="mt-1 text-xs text-slate-500">
                <span className="inline-block rounded-full bg-slate-100 px-2 py-0.5">
                  ID: {job.id.slice(0, 8)}…
                </span>
                <span className="mx-2">•</span>
                <span className="inline-block rounded-full bg-slate-100 px-2 py-0.5">
                  Slug: {job.slug}
                </span>
              </p>
            </div>

            <Link
              href={`/${locale}/vacancies`}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              {tr("back", "Back to list")}
            </Link>
          </header>

          {/* Body + CTA */}
          <div className="px-6 py-6 md:px-8 md:py-8">
            <article className="whitespace-pre-wrap text-[0.95rem] leading-relaxed text-slate-700">
              {job.body}
            </article>

            <div className="mt-8">
              <a
                href={mailto}
                className="inline-flex items-center gap-2 rounded-xl bg-[#2F4FA0] px-5 py-3 text-sm font-medium text-white ring-1 ring-[#2F4FA0]/10 shadow-sm transition hover:brightness-110 active:scale-[0.99]"
              >
                {tr("apply", "Apply")}
                <svg className="-mr-0.5 h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
