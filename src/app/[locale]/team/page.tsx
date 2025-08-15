"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function OurTeam() {
  const t = useTranslations("team");

  const members = Array.from({ length: 8 }, (_, i) => {
    const idx = i + 1;
    return {
      name: t(`members.${idx}.name`),
      role: t(`members.${idx}.role`),
      // your requested filenames:
      src: `/team/colleague${idx}.jpg`
    };
  });

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
    <section className="bg-[#EDF3FF] py-12 sm:py-16 md:py-20">
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

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-1 md:gap-1">
          {members.map((m, idx) => (
            <div key={m.name + idx} className="rounded-3xl  p-3 sm:p-4">
              <div className="relative overflow-hidden rounded-2xl b aspect-[3/4]">
                <Image
                  src={m.src}
                  alt={m.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  priority={idx < 4}
                />
              </div>
              <div className="mt-3 sm:mt-4 text-center">
                <p className="font-semibold text-slate-900">{m.name}</p>
                <p className="mt-1 text-sm text-slate-600">{m.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-10 sm:mt-12 md:mt-14 border-t border-slate-200/80" />

        {/* Text + group photo */}
        <div className="mt-10 grid md:auto-cols-max md:justify-center gap-6 md:grid-cols-2 md:items-center">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">
              {t("story.heading")}
            </h3>
            <p className="mt-3 text-slate-700 leading-7">
              {t("story.body")}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl ring-1 ring-black/5">
            <Image
              src="/team/teamphoto.jpg"
              alt={t("story.photoAlt")}
              width={1600}
              height={1000}
              className="w-full h-[220px] sm:h-[280px] md:h-[360px] lg:h-[420px] object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      </div>
    </section>
    </main>
  );
}
