"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

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
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/10 hover:border-black/20 transition"
                    aria-label="Telegram"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                      <path d="M9.04 15.36 8.9 19.1c.34 0 .48-.14.65-.31l1.56-1.53 3.23 2.37c.59.33 1.01.16 1.17-.55l2.12-9.96v-.01c.19-.89-.32-1.24-.9-1.02L4.6 10.1c-.87.33-.86.81-.15 1.02l3.31 1.03 7.69-4.85c.36-.22.7-.1.43.12l-6.84 6.94Z" />
                    </svg>
                  </Link>
                  {/* WhatsApp */}
                  <Link
                    href={t("social.whatsapp")}
                    target="_blank"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/10 hover:border-black/20 transition"
                    aria-label="WhatsApp"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                      <path d="M20.52 3.48A11.5 11.5 0 0 0 2.4 17.58L1 23l5.53-1.45A11.46 11.46 0 0 0 12 22.5h.01A11.5 11.5 0 0 0 20.52 3.48ZM12 20.4a8.37 8.37 0 0 1-4.26-1.16l-.3-.18-3.28.86.88-3.2-.2-.33A8.4 8.4 0 1 1 12 20.39Zm4.85-6.17c-.26-.13-1.55-.77-1.79-.86s-.42-.13-.6.13-.69.86-.85 1.03-.31.2-.57.07a6.86 6.86 0 0 1-2.02-1.24 7.57 7.57 0 0 1-1.4-1.74c-.15-.26 0-.4.11-.53.11-.11.26-.31.39-.46s.17-.26.26-.42.04-.31-.02-.44c-.07-.13-.6-1.45-.82-1.99-.22-.52-.44-.45-.6-.46h-.52c-.17 0-.44.06-.67.31s-.88.86-.88 2.1 1 .2 1.14.46 1.8 3 4.36 4.09c.61.26 1.07.41 1.43.52.6.19 1.15.16 1.58.1.48-.07 1.55-.64 1.77-1.25.22-.61.22-1.13.15-1.25-.07-.1-.24-.16-.5-.29Z" />
                    </svg>
                  </Link>
                  {/* LinkedIn */}
                  <Link
                    href={t("social.linkedin")}
                    target="_blank"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/10 hover:border-black/20 transition"
                    aria-label="LinkedIn"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.04 0 4.78 2.66 4.78 6.12V23h-4v-6.66c0-1.59-.03-3.63-2.21-3.63-2.21 0-2.55 1.73-2.55 3.52V23h-4V8z" />
                    </svg>
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
