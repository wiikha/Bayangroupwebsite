"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function OurCompanies() {
  const t = useTranslations("companies");
  const [active, setActive] = useState<"bayan" | "seem" | "inso">("bayan");

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
    <section className="py-14 sm:py-16 md:py-20 bg-[#EDF3FF]">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8">
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

        {/* Tabs */}
        <div className="mt-8 flex items-center justify-center">
          <div className="flex gap-2 rounded-full  p-1 ">
            <button
              onClick={() => setActive("bayan")}
              className={`px-5 py-2 md:w-[220px] w-[140px] rounded-lg text-sm sm:text-base transition ${
                active === "bayan"
                ? "bg-[#BCD0FF]  shadow"
                : " hover:bg-[#143C99]/10"
            }`}
            >
              {t("bayan.tab")}
            </button>
            <button
              onClick={() => setActive("seem")}
              className={`px-5 py-2 md:w-[220px]  w-[140px]  rounded-lg text-sm sm:text-base transition ${
                active === "seem"
                ? "bg-[#BCD0FF]  shadow"
                : " hover:bg-[#143C99]/10"
            }`}
            >
              {t("seem.tab")}
            </button>
            <button
              onClick={() => setActive("inso")}
              className={`px-5 py-2 md:w-[220px]  w-[140px]  rounded-lg text-sm sm:text-base transition ${
                active === "inso"
                  ? "bg-[#BCD0FF] ] shadow"
                  : "hover:bg-[#143C99]/10"
              }`}
            >
              {t("inso.tab")}
            </button>
          </div>
        </div>

        {/* Brand contents (always in DOM) */}
        <div className="mt-8">
          {/* Bayan Medical */}
          <div
            className={`brand-container ${
              active === "bayan" ? "block" : "hidden"
            }`}
          >
            <BrandCard
              logo="/companies/bmed.png"
              title={t("bayan.title")}
              body={t("bayan.body")}
              href="/bayan-medical"
              photo="/companies/bmedteam.png"
              cta={t("cta")}
            />
          </div>

          {/* SEEM */}
          <div
            className={`brand-container ${
              active === "seem" ? "block" : "hidden"
            }`}
          >
            <BrandCard
              logo="/companies/seem.png"
              title={t("seem.title")}
              body={t("seem.body")}
              href="/seem"
              photo="/companies/seemteam.png"
              cta={t("cta")}
            />
          </div>

          {/* INSO pharm */}
          <div
            className={`brand-container ${
              active === "inso" ? "block" : "hidden"
            }`}
          >
            <BrandCard
              logo="/companies/inso.png"
              title={t("inso.title")}
              body={t("inso.body")}
              href="/inso-pharm"
              photo="/companies/insoteam.png"
              cta={t("cta")}
            />
          </div>
        </div>
      </div>
    </section>
    </main>
  );
}

function BrandCard({
  logo,
  title,
  body,
  href,
  photo,
  cta,
}: {
  logo: string;
  title: string;
  body: string;
  href: string;
  photo: string;
  cta: string;
}) {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Logo card */}
        <div className=" bg-white rounded-3xl p-6 sm:p-8 ring-1 ring-black/5">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={logo}
              alt={title}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
        {/* Text card */}
        <div className=" rounded-3xl p-6 sm:p-8 ">
          <h3 className="text-2xl sm:text-3xl font-bold">
            {title}
          </h3>
          <p className="mt-4 text-slate-700 leading-7">{body}</p>
          <Link
            href={href}
            className="mt-6 inline-flex items-center gap-2 font-semibold text-[#143C99] hover:opacity-80"
          >
            {cta}
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
      </div>
      {/* Large photo */}
      <div className="mt-8">
        <div className="relative w-full overflow-hidden rounded-3xl shadow-lg">
          <Image
            src={photo}
            alt={`${title} team`}
            width={1920}
            height={1080}
            className="w-full h-[220px] sm:h-[280px] md:h-[360px] lg:h-[420px] object-cover"
            sizes="100vw"
          />
        </div>
      </div>
    </>
  );
}
