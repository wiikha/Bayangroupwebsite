"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";



export default function Home() {
  const t = useTranslations("about");

  // Timeline data — you can move this to i18n JSON for multilingual
  const timelineData = [
    { year: 2010, text: t("y2010") },
    { year: 2011, text: t("y2011") },
    { year: 2012, text: t("y2012") },
    { year: 2013, text: t("y2013") },
    { year: 2014, text: t("y2014") },
    { year: 2015, text: t("y2015") },
    { year: 2016, text: t("y2016") },
    { year: 2017, text: t("y2017") },
    { year: 2018, text: t("y2018") },
    { year: 2019, text: t("y2019") },
    { year: 2020, text: t("y2020") },
    { year: 2021, text: t("y2021") },
    { year: 2022, text: t("y2022") },
    { year: 2023, text: t("y2023") },
    { year: 2024, text: t("y2024") },
  ];

  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % timelineData.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + timelineData.length) % timelineData.length);
  };

  const current = timelineData[index];
  return (
    <main className="bg-[#EEF3FF]">
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
                   {t("hero_title")}
                 </h1>
     
                 <p
                   className="mt-4 text-white/85 max-w-2xl
                              text-sm sm:text-base md:text-lg"
                 >
                   {t("hero_subtitle")}
                 </p>
               </div>
             </div>
           </section>
      {/* Top spacing to match your site’s rhythm */}
      <section >
        <div className="mx-auto max-w-6xl  px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
        <div className="max-w-2xl ml-auto" >
        {/* Breadcrumb/eyebrow */}
        <div className="mb-2 sm:mb-4 text-[18px] font-medium text-[#2F4FA0]/80 tracking-wide flex items-center gap-2">
          <Image src="/about/logo_mini.png" alt="logo" width={50} height={50} className="inline-block h-4 w-4  " />
          {t("eyebrow")}
        </div>

        {/* H1 */}
        <h1 className="text-[32px] leading-tight sm:text-4xl md:text-5xl font-extrabold text-[#2F4FA0]">
          {t("title.line1")} <br className="hidden sm:block" />
        </h1>

        {/* Lead image */}
        <div className="mt-6  sm:mt-8">
          <Image
            src="/about/photo_1.png"     // replace with your image
            alt={t("images.lab.alt")}
            width={1600}
            height={900}
            priority
            className=" w-full h-auto  rounded-2xl shadow-sm object-cover
                       aspect-[16/9] md:aspect-[21/11]"
          />
        </div>

        {/* Info block */}
        <div className="mt-6 sm:mt-8">
          <h3 className="md:text-[32px] text-[20px] font-semibold text-[#1D2951]">
            {t("info.title")}
          </h3>

          <p className="mt-3 md:text-[18px] text-[15px] leading-relaxed text-[#1B2337]/80 max-w-3xl">
            {t("info.body")}
          </p>
        </div>
        </div>

        {/* Bottom image */}
        <div className="mt-8 sm:mt-10">
          <div className="rounded-2xl overflow-hidden shadow-sm">
            <Image
              src="/about/photo_3.png"   // replace with your image
              alt={t("images.engineer.alt")}
              width={1800}
              height={1200}
              className="w-full h-auto object-cover aspect-[16/10] sm:aspect-[16/9]"
            />
          </div>
        </div>
        <div className="max-w-2xl ml-auto" >
        <div className="mt-6 sm:mt-8">
          <h3 className="md:text-[32px] text-[20px] font-semibold text-[#1D2951]">
            {t("info2.title")}
          </h3>

          <p className="mt-3 md:text-[18px] text-[15px] leading-relaxed text-[#1B2337]/80 max-w-3xl">
            {t("info2.body")}
          </p>
        </div>
        {/* Lead image */}
        <div className="mt-6  sm:mt-8">
          <Image
            src="/about/photo_2.png"     // replace with your image
            alt={t("images.lab.alt")}
            width={1600}
            height={1600}
            priority
            className=" w-full h-auto  rounded-2xl shadow-sm 
                aspect-[16/15] md:aspect-[21/20] object-cover     "
          />
        </div>

        {/* Info block */}
        <div className="mt-6 sm:mt-8">

          <p className="mt-3 md:text-[18px] text-[15px] leading-relaxed text-[#1B2337]/80 max-w-3xl">
            {t("info3.body")}
          </p>
        </div>
        </div>
        </div>
      </section>
      {/* TIMELINE SECTION */}
      <section className="bg-[#EEF3FF] ">
      <div className="mx-auto w-full rounded-[36px]   p-6 sm:p-10 md:p-14 bg-[#FFFF] relative overflow-hidden">
        {/* Eyebrow */}
        <div className="mb-2 sm:mb-4 text-[18px] font-medium text-[#2F4FA0]/80 tracking-wide flex items-center justify-center gap-2">
          <Image src="/about/logo_mini.png" alt="logo" width={50} height={50} className="inline-block h-4 w-4  " />
          {t("eyebrow_2")}
        </div>

        {/* Title */}
        <h2 className="text-center text-[28px] sm:text-[36px] md:text-[44px] font-extrabold text-[#2F4FA0] mb-8">
          {t("title_2")}
        </h2>

        {/* Years line */}
        <div className="relative flex items-center justify-between text-sm text-gray-500 font-medium mb-6">
          <span>{timelineData[(index - 1 + timelineData.length) % timelineData.length].year}</span>
          <span className="absolute left-1/2 -translate-x-1/2 text-[#2F4FA0] font-bold text-lg sm:text-xl">
            {current.year}
          </span>
          <span>{timelineData[(index + 1) % timelineData.length].year}</span>
          <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-[#D9E1FF] -z-10" />
        </div>

        {/* Text with smooth animation */}
        <div className="min-h-[80px] flex items-center justify-center text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={current.year}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="max-w-3xl text-sm sm:text-base md:text-lg text-[#1B2337]"
            >
              {current.text}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={prev}
            className="h-10 w-10 rounded-md border border-[#2F4FA0] flex items-center justify-center text-[#2F4FA0] hover:bg-[#2F4FA0] hover:text-white transition"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="h-10 w-10 rounded-md bg-[#2F4FA0] text-white flex items-center justify-center hover:bg-[#1f3d8f] transition"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      </section>
      <section className="bg-white ">
      <div className="mx-auto w-full rounded-[36px]   p-6 sm:p-10 md:p-14  relative overflow-hidden">
        {/* Eyebrow */}
        <div className="mb-2 sm:mb-4 text-[18px] font-medium text-[#2F4FA0]/80 tracking-wide flex items-center justify-center gap-2">
          <Image src="/about/logo_mini.png" alt="logo" width={50} height={50} className="inline-block h-4 w-4  " />
          {t("partnereyebrow")}
        </div>

        {/* Title */}
        <h2 className="text-center text-[28px] sm:text-[36px] md:text-[44px] font-extrabold text-[#2F4FA0] mb-8">
          {t("partnertitle")}
        </h2>
        <div className="mt-8 sm:mt-10">
          <div className="p-8" >
            <Image
              src="/about/partners.png"   // replace with your image
              alt={t("images.engineer.alt")}
              width={900}
              height={700}
              className="w-full h-auto"
            />
          </div>
        </div>
     
      </div>
      </section>

    </main>
  );
}
