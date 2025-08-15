"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

type Slide = { id: number; title: string; desc: string };

// Polar → Cartesian
const polar = (cx: number, cy: number, r: number, deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

// Burchaklar (faqat yuqori yarim doira): -180° (chap past) → 0° (o‘ng past)
const angleFor = (id: number, total: number) =>
  -180 + ((id - 1) * 180) / (total - 1);

// Qo‘shni raqamlar joylashuvi (markaz bilan to‘qnashmasligi uchun fiks)
const NEIGHBOR_LEFT_DEG = -135;  // chap yon
const NEIGHBOR_RIGHT_DEG = -45;  // o‘ng yon

export default function WhyUsSection() {
  const t = useTranslations("whyus");
  const slides: Slide[] = useMemo(
    () => [
      { id: 1, title: t("s1.title"), desc: t("s1.desc") },
      { id: 2, title: t("s2.title"), desc: t("s2.desc") },
      { id: 3, title: t("s3.title"), desc: t("s3.desc") },
      { id: 4, title: t("s4.title"), desc: t("s4.desc") },
      { id: 5, title: t("s5.title"), desc: t("s5.desc") }
    ],
    [t]
  );

  const total = slides.length;
  const [index, setIndex] = useState(3); // 4-chi slayddan boshlaymiz (0-based)
  const active = slides[index];

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  // SVG o‘lchamlar
  const VB_W = 1000;
  const VB_H = 500;
  const CX = 500;
  const CY = 500;
  const R = 460;

  // Aktiv ko‘rsatkich koordinatasi
  const aDeg = angleFor(active.id, total);
  const { x: AX, y: AY } = polar(CX, CY, R, aDeg);

  // Qo‘shni raqamlar (faqat raqam — joylashuvi fiks)
  const leftId = active.id > 1 ? active.id - 1 : total;
  const rightId = active.id < total ? active.id + 1 : 1;
  const { x: LX, y: LY } = polar(CX, CY, R, NEIGHBOR_LEFT_DEG);
  const { x: RX, y: RY } = polar(CX, CY, R, NEIGHBOR_RIGHT_DEG);

  return (
    <section className="bg-[#EDF3FF] py-14 sm:py-16 md:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="text-center">
                            <div className="mb-2 sm:mb-4 text-[18px] font-medium text-[#2F4FA0]/80 tracking-wide flex items-center justify-center gap-2">
                                                <Image src="/about/logo_mini.png" alt="logo" width={50} height={50} className="inline-block h-4 w-4  " />
                                                {t("eyebrow")}
                                              </div>
                            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#143C99]">
                              {t("title")}
                            </h2>
                          </div>
        {/* Karta */}
        <div className="relative mt-8 overflow-hidden rounded-[28px] md:rounded-[36px] bg-[#143C99]">
          {/* Fon + overlay */}
          <div className="absolute inset-0">
            <Image
              src="/all/bg-whyus.jpg"
              alt=""
              fill
              priority
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-[#143C99]/72" />
          </div>

          {/* Kontent */}
          <div className="relative px-5 sm:px-8 pt-10 pb-14 sm:pb-16">
            {/* Strelkalar */}
            <button
              onClick={prev}
              aria-label="Prev"
              className="absolute left-6 sm:left-8 top-10 text-white/90 hover:text-white transition"
            >
              <svg width="64" height="20" viewBox="0 0 64 20" fill="none">
                <path d="M63 10H3" stroke="currentColor" strokeWidth="2" />
                <path d="M14 3L3 10l11 7" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="absolute right-6 sm:right-8 top-10 text-white/90 hover:text-white transition"
            >
              <svg width="64" height="20" viewBox="0 0 64 20" fill="none">
                <path d="M1 10h60" stroke="currentColor" strokeWidth="2" />
                <path d="M50 3l11 7-11 7" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>

            {/* Markaziy badge (faqat aktiv raqam) */}
            <div className="absolute left-1/2 top-[84px] -translate-x-1/2 z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/12 text-white font-bold ring-1 ring-white/25 backdrop-blur-[1px]">
                {active.id}
              </div>
            </div>

            {/* SVG yarim doira */}
            <div className="relative mx-auto mt-16 w-full max-w-[980px]">
              <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full h-auto">
                {/* Arc */}
                <circle
                  cx={CX}
                  cy={CY}
                  r={R}
                  fill="none"
                  stroke="rgba(255,255,255,0.34)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />

                {/* Waypoint nuqtalar (ixtiyoriy bezak) */}
                {slides.map((s) => {
                  const { x, y } = polar(CX, CY, R, angleFor(s.id, total));
                  return (
                    <circle key={s.id} cx={x} cy={y} r={4} fill="rgba(255,255,255,0.6)" />
                  );
                })}

                {/* Qo‘shni raqamlar: fiks burchaklarda → markaz bilan to‘qnashmaydi */}
                <g transform={`translate(${LX},${LY})`}>
                  <circle r={20} fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" />
                  <text x="0" y="5" textAnchor="middle" fontSize="14" fontWeight={700} fill="rgba(255,255,255,0.95)">
                    {leftId}
                  </text>
                </g>
                <g transform={`translate(${RX},${RY})`}>
                  <circle r={20} fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" />
                  <text x="0" y="5" textAnchor="middle" fontSize="14" fontWeight={700} fill="rgba(255,255,255,0.95)">
                    {rightId}
                  </text>
                </g>

                {/* Aktiv ko‘rsatkich nuqtasi */}
                <motion.circle
                  r={7}
                  fill="#fff"
                  stroke="rgba(255,255,255,0.45)"
                  strokeWidth="6"
                  animate={{ cx: AX, cy: AY }}
                  transition={{ type: "spring", stiffness: 140, damping: 20 }}
                />
              </svg>

              {/* Matn (markazda) */}
              <div className="pointer-events-none absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 w-[92%] text-center text-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28 }}
                  >
                    <h3 className="text-xl sm:text-2xl md:text-[28px] font-semibold">
                      {active.title}
                    </h3>
                    <p className="mx-auto mt-3 max-w-2xl text-[13px] sm:text-sm md:text-base leading-relaxed text-white/90">
                      {active.desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Pastdagi pager (ixtiyoriy) */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === index ? "bg-[#143C99]" : "bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to ${s.id}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
