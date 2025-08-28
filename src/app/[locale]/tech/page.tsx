"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Technology() {
  const t = useTranslations("technology");
  const [active, setActive] = useState<"bayan" | "seem">("bayan");

  return (
    <main>
      {/* HERO */}
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
           <section className="bg-[#EEF3FF] py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Eyebrow */}
        <div className="mb-2 sm:mb-4 text-[18px] font-medium text-[#2F4FA0]/80 tracking-wide flex items-center justify-center gap-2">
                 <Image src="/about/logo_mini.png" alt="logo" width={50} height={50} className="inline-block h-4 w-4  " />
                 {t("eyebrow")}
               </div>

        {/* Title */}
        <h2 className="text-center text-[28px] sm:text-[36px] md:text-[44px] font-extrabold text-[#2F4FA0]">
          {t("heading")}
        </h2>
        <p className="text-center mt-2 text-sm sm:text-base text-[#1B2337]/80">
          {t("subheading")}
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex  rounded-xl p-1">
            <button
              onClick={() => setActive("bayan")}
              className={`px-5 py-2 md:w-[220px] w-[140px] rounded-lg text-sm sm:text-base transition ${
                active === "bayan"
                  ? "bg-[#BCD0FF] text-[#000]"
                  : "text-[#000] hover:bg-transparent"
              }`}
            >
              {t("tabs.bayan")}
            </button>
            <button
              onClick={() => setActive("seem")}
              className={`px-5 py-2 rounded-lg w-[140px] md:w-[220px] text-sm sm:text-base transition ${
                active === "seem"
                  ? "bg-[#BCD0FF] text-[#000]"
                  : "text-[#000] hover:bg-transparent"
              }`}
            >
              {t("tabs.seem")}
            </button>
          </div>
        </div>

        {/* Bayan Medical container */}
        <div className={`${active === "bayan" ? "block" : "hidden"} mt-8`}>
          <div className="justify-center flex items-center w-full" >
          <Image
            src="/technology/bayan-hero.png"
            alt="Bayan Medical"
            width={1600}
            height={900}
            className="rounded-2xl md:w-3/4 w-10/9 object-cover"
          />
          </div>
          <div className="flex justify-center items-center" >
          <div className="text-center mt-2  md:w-3/4 w-10/9 text-sm sm:text-base text-[#1B2337]/80">
          <p className="mt-4 text-sm text-[#1B2337]/80">
          {t("text_first_bayan")}
          </p>
          </div>
          </div>
         
          

          {/* Two blocks */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div>
              <Image
                src="/technology/bayan-1.png"
                alt="Line 1"
                width={1400}
                height={900}
                className="rounded-2xl w-full object-cover"
              />
            </div>
            <div >
            <h3 className="md:mt-15 mt-3 md:text-[35px] text-[20px] font-semibold"> {t("line1")} </h3>
            <p className="text-sm text-[#1B2337]/80"> {t("text_second_bayan")} </p>
            </div>
            <div >
            <h3 className="md:mt-5 mt-3 md:text-[35px] text-[20px] font-semibold"> {t("line2")} </h3>
            <p className="text-sm text-[#1B2337]/80"> {t("text_third_bayan")} </p>
            </div>            
            <div>
              <Image
                src="/technology/bayan-2.png"
                alt="Line 2"
                width={1400}
                height={900}
                className="rounded-2xl w-full object-cover"
              />
              
            </div>
          </div>
        </div>

        {/* SEEM container */}
        <div className={`${active === "seem" ? "block" : "hidden"} mt-8`}>
          <div className="justify-center flex items-center w-full" >
          <Image
            src="/technology/seem-hero.png"
            alt="SEEM"
            width={1600}
            height={900}
            className="rounded-2xl md:w-3/4 w-10/9  object-cover"
          />
          </div>
          <div className="flex justify-center items-center" >
          <div className="text-center mt-2  md:w-3/4 w-10/9 text-sm sm:text-base text-[#1B2337]/80">
          <p className="mt-4 text-sm text-[#1B2337]/80">
          {t("text_first_seem")}
          </p>
          </div>
          </div>

          {/* Two blocks */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div>
            <Image
                src="/technology/seem-1.png"
                alt="SEEM line 1"
                width={1400}
                height={900}
                className="rounded-2xl w-full object-cover"
              />
            </div>
            <div >
            <h3 className="md:mt-15 mt-3 md:text-[35px] text-[20px] font-semibold">1-LINIYA</h3>
            <p className="text-sm text-[#1B2337]/80"> {t("text_second_seem")} </p>
            </div>
            <div >
            <h3 className="md:mt-5 mt-3 md:text-[35px] text-[20px] font-semibold">2-LINIYA</h3>
            <p className="text-sm text-[#1B2337]/80"> {t("text_second_seem")} </p>
            </div>            
            <div>
            <Image
                src="/technology/seem-2.png"
                alt="SEEM line 2"
                width={1400}
                height={900}
                className="rounded-2xl w-full object-cover"
              />
              
            </div>
          </div>
        
        </div>
      </div>
    </section>
    </main>
  );
}
