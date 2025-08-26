"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedin, FaTelegramPlane } from "react-icons/fa";

export default function Contact() {
  const t = useTranslations("contact");

  return (
    <main>
      {/* HERO (yours) */}
      <section className="relative bg-[#EEF3FF]">
        <div className="relative overflow-hidden rounded-b-[32px] md:rounded-b-[40px]">
          <Image
            src="/all/hero-bg.png"
            alt="Bizning kompaniyalarimiz"
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
            <p className="mt-4 text-white/85 max-w-2xl text-sm sm:text-base md:text-lg">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT DETAILS SECTION */}
      <section className="bg-[#EEF3FF]">
        <div className="mx-auto max-w-6xl  px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
          {/* Card with large rounded corner (like screenshot) */}
          
            {/* Left column content */}
            <div className="max-w-2xl ml-auto">
              {/* Eyebrow */}
          
               {/* Breadcrumb/eyebrow */}
                 <div className="mb-2 sm:mb-4 text-[18px] font-medium text-[#2F4FA0]/80 tracking-wide flex items-center gap-2">
                  <Image src="/about/logo_mini.png" alt="logo" width={50} height={50} className="inline-block h-4 w-4  " />
                   {t("eyebrow")}
                  </div>

              {/* Big title (2 lines) */}
              <h2 className="text-[32px] leading-tight sm:text-4xl md:text-5xl font-extrabold text-[#2F4FA0]">
                {t("bigTitle.line1")} <br className="hidden sm:block" />
                {t("bigTitle.line2")}
              </h2>

              {/* Phone */}
              <div className="mt-8">
                <div className="md:text-[18px] text-[15px] text-[#6C7483]">{t("labels.phone")}</div>
                <Link
                  href={`tel:${t("phone.raw")}`}
                  className="mt-2 block md:text-[32px] text-[20px] font-semibold tracking-wide text-[#0C1B3A]"
                >
                  {t("phone.display")}
                </Link>
              </div>

              {/* Email */}
              <div className="mt-6">
                <div className="md:text-[18px] text-[15px] text-[#6C7483]">{t("labels.email")}</div>
                <Link
                  href={`mailto:${t("email.value")}`}
                  className="mt-2 block md:text-[32px] text-[20px] font-medium text-[#0C1B3A]"
                >
                  {t("email.value")}
                </Link>
              </div>

              {/* Socials */}
              <div className="mt-6">
                <div className="md:text-[18px] text-[15px] text-[#6C7483]">{t("labels.socials")}</div>
                <div className="mt-3 flex items-center gap-4">
                  {/* Telegram */}
                  <Link
                    href={t("social.telegram")}
                    target="_blank"
                    className="inline-flex  items-center justify-center  transition"
                    aria-label="Telegram"
                  >
                    <FaTelegramPlane width={20} height={20} className="h-8 w-8" />
                  </Link>
                  {/* Instagram */}
                  <Link
                    href={t("social.instagram")}
                    target="_blank"
                    className="inline-flex  items-center justify-center  transition"
                    aria-label="WhatsApp"
                  >
                    <AiFillInstagram width={20} height={20} className="h-8 w-8" />
                    
                  </Link>
                  {/* LinkedIn */}
                  <Link
                    href={t("social.linkedin")}
                    target="_blank"
                    className="inline-flex  items-center justify-center  transition"
                    aria-label="LinkedIn"
                  >
                   <FaLinkedin width={20} height={20} className="h-8 w-8" />
                  </Link>
                </div>
              </div>

              {/* Map */}
              <div className="mt-8 sm:mt-10">
                <div className="overflow-hidden rounded-2xl border border-black/10">
                  {/* OpenStreetMap embed; replace coords if needed */}
                  <iframe
                    title={t("map.title")}
                    src={t("map.embedSrc")}
                    className="w-full h-[220px] sm:h-[260px] md:h-[300px]"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

        </div>
      </section>
    </main>
  );
}
