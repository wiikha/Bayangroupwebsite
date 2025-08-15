"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

export default function   Directors() {
  const t = useTranslations("directors");

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
                   {t("heading")}
                 </h1>
     
                 <p
                   className="mt-4 text-white/85 max-w-2xl
                              text-sm sm:text-base md:text-lg"
                 >
                   {t("intro")}
                 </p>
               </div>
             </div>
           </section>
           <section className="bg-[#EEF3FF]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16">
        {/* Eyebrow + Title + Intro */}
        <div className="text-center max-w-3xl mx-auto">
         
           {/* Eyebrow */}
                  <div className="mb-2 sm:mb-4 text-[18px] font-medium text-[#2F4FA0]/80 tracking-wide flex items-center justify-center gap-2">
                    <Image src="/about/logo_mini.png" alt="logo" width={50} height={50} className="inline-block h-4 w-4  " />
                    {t("eyebrow")}
                  </div>
          
                  {/* Title */}
                  <h2 className="text-center text-[28px] sm:text-[36px] md:text-[44px] font-extrabold text-[#2F4FA0] mb-8">
                    {t("heading")}
                  </h2>
          <p className="mt-3 text-sm sm:text-base text-[#1B2337]/80">
            {t("intro")}
          </p>
        </div>

        {/* Top row: Chairperson large photo + name/role on right */}
        <div className="mt-8 sm:mt-10 grid md:grid-cols-2 gap-6 sm:gap-8">
          <div className=" overflow-hidden bg-transparent ">
            <Image
              src="/directors/image1.png"
              alt={t("chair.name")}
              width={1200}
              height={1200}
              className="w-full h-auto shadow-sm "
              priority
            />
          </div>

          <div className="flex items-center justify-center">
            <div className="text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold ">
                {t("chair.name")}
              </h3>
              <p className="mt-2 text-sm sm:text-base text-[#1B2337]/70">
                {t("chair.role")}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom row: two directors cards */}
        <div className="mt-8 sm:mt-10 grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* Card 1 */}
          <div className=" overflow-hidden">
            <Image
              src="/directors/image2.png"
              alt={t("member1.name")}
              width={1200}
              height={1200}
              className="w-full h-auto shadow-sm "
            />
            <div className="px-4 sm:px-6 pt-3 pb-5 text-center">
              <div className="font-semibold text-[#0C1B3A]">
                {t("member1.name")}
              </div>
              <div className="text-xs sm:text-sm text-[#6C7483] mt-1">
                {t("member1.role")}
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="overflow-hidden ">
            <Image
              src="/directors/image3.png"
              alt={t("member2.name")}
              width={1200}
              height={1200}
              className="w-full h-auto shadow-sm "
            />
            <div className="px-4 sm:px-6 pt-3 pb-5 text-center">
              <div className="font-semibold text-[#0C1B3A]">
                {t("member2.name")}
              </div>
              <div className="text-xs sm:text-sm text-[#6C7483] mt-1">
                {t("member2.role")}
              </div>
            </div>
          </div>
          {/* Card 1 */}
          <div className=" overflow-hidden">
            <Image
              src="/directors/image4.png"
              alt={t("member1.name")}
              width={1200}
              height={1200}
              className="w-full h-auto shadow-sm "
            />
            <div className="px-4 sm:px-6 pt-3 pb-5 text-center">
              <div className="font-semibold text-[#0C1B3A]">
                {t("member1.name")}
              </div>
              <div className="text-xs sm:text-sm text-[#6C7483] mt-1">
                {t("member1.role")}
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="overflow-hidden ">
            <Image
              src="/directors/image5.png"
              alt={t("member2.name")}
              width={1200}
              height={1200}
              className="w-full h-auto shadow-sm "
            />
            <div className="px-4 sm:px-6 pt-3 pb-5 text-center">
              <div className="font-semibold text-[#0C1B3A]">
                {t("member2.name")}
              </div>
              <div className="text-xs sm:text-sm text-[#6C7483] mt-1">
                {t("member2.role")}
              </div>
            </div>
          </div>
           {/* Card 1 */}
          <div className="overflow-hidden ">
            <Image
              src="/directors/image6.png"
              alt={t("member2.name")}
              width={1200}
              height={1200}
              className="w-full h-auto shadow-sm "
            />
            <div className="px-4 sm:px-6 pt-3 pb-5 text-center">
              <div className="font-semibold text-[#0C1B3A]">
                {t("member2.name")}
              </div>
              <div className="text-xs sm:text-sm text-[#6C7483] mt-1">
                {t("member2.role")}
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="overflow-hidden ">
            <Image
              src="/directors/image6.png"
              alt={t("member2.name")}
              width={1200}
              height={1200}
              className="w-full h-auto shadow-sm "
            />
            <div className="px-4 sm:px-6 pt-3 pb-5 text-center">
              <div className="font-semibold text-[#0C1B3A]">
                {t("member2.name")}
              </div>
              <div className="text-xs sm:text-sm text-[#6C7483] mt-1">
                {t("member2.role")}
              </div>
            </div>
          </div>
         
        </div>
      </div>
           </section>
    </main>
  );
}
