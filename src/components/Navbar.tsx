"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // "about" | "careers" | null
  const [langOpen, setLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();

  // close on outside click
  const navRef = useRef<HTMLElement | null>(null);

  const locales = useMemo(
    () => [
      { code: "uz", label: "Oʻz" },
      { code: "ru", label: "Ru" },
      { code: "en", label: "En" },
    ],
    []
  );

  const currentLocale =
    locales.find((l) => pathname?.startsWith(`/${l.code}`)) ?? locales[0];

  // URL-based language switcher
  const changeLanguage = (lang: string) => {
    const newPath = `/${lang}${pathname.replace(/^\/(ru|uz|en)/, "")}`;
    router.push(newPath);
  };

  const toggleMobileMenu = () => setMobileOpen((p) => !p);
  const toggleDropdown = (key: string) =>
    setOpenDropdown((p) => (p === key ? null : key));

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setLangOpen(false);
  }, [pathname]);

  // Close dropdowns when clicking outside the navbar
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const linkColor = isScrolled || mobileOpen ? "text-[#143C99]" : "text-white";
  const navBg = isScrolled || mobileOpen ? "bg-white shadow-sm" : "bg-transparent";

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 lg:px-8">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src={
              mobileOpen || isScrolled
                ? "/homephoto/Logo.png"
                : "/homephoto/logo-white.png"
            }
            alt="Bayan Group"
            width={132}
            height={40}
            priority
          />
        </Link>

        {/* Center: Links (desktop) */}
        <ul
          className={`hidden lg:flex flex-1 justify-center items-center gap-7 transition-colors duration-300 ${linkColor}`}
        >
          {/* About dropdown */}
          <li className="relative">
            <button
              onClick={() => toggleDropdown("about")}
              className="flex items-center gap-1 hover:opacity-80"
              aria-expanded={openDropdown === "about"}
              aria-controls="about-menu"
            >
              {t("aboutus")} <span>{openDropdown === "about" ? "▴" : "▾"}</span>
            </button>
            <div
              id="about-menu"
              className={[
                "absolute left-0 mt-3 w-64 rounded-xl bg-white ring-1 ring-black/5 shadow-lg transition-all duration-400 ease-out",
                openDropdown === "about"
                  ? "opacity-100 translate-y-0 scale-100 visible pointer-events-auto"
                  : "opacity-0 translate-y-2 scale-[0.98] invisible pointer-events-none",
              ].join(" ")}
            >
              <ul className="py-2 text-[#143C99]">
                <li>
                  <Link
                    href="/aboutus"
                    className="block px-4 py-2.5 hover:bg-slate-100"
                  >
                    {t("bayan")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/directors"
                    className="block px-4 py-2.5 hover:bg-slate-100"
                  >
                    {t("directors")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/values"
                    className="block px-4 py-2.5 hover:bg-slate-100"
                  >
                    {t("values")}
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <Link href="/companies" className="hover:opacity-80">
              {t("ourcompanies")}
            </Link>
          </li>

          <li>
            <Link href="/tech" className="hover:opacity-80">
              {t("technology")}
            </Link>
          </li>

          <li>
            <Link href="/news" className="hover:opacity-80">
              {t("news")}
            </Link>
          </li>

          {/* Careers dropdown (NEW) */}
          <li className="relative">
            <button
              onClick={() => toggleDropdown("careers")}
              className="flex items-center gap-1 hover:opacity-80"
              aria-expanded={openDropdown === "careers"}
              aria-controls="careers-menu"
            >
              {t("careers")}{" "}
              <span>{openDropdown === "careers" ? "▴" : "▾"}</span>
            </button>
            <div
              id="careers-menu"
              className={[
                "absolute left-0 mt-3 w-56 rounded-xl bg-white ring-1 ring-black/5 shadow-lg transition-all duration-400 ease-out",
                openDropdown === "careers"
                  ? "opacity-100 translate-y-0 scale-100 visible pointer-events-auto"
                  : "opacity-0 translate-y-2 scale-[0.98] invisible pointer-events-none",
              ].join(" ")}
            >
              <ul className="py-2 text-[#143C99]">
                <li>
                  <Link
                    href="/team" // your team page
                    className="block px-4 py-2.5 hover:bg-slate-100"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {t("ourteam") /* e.g., "Jamoamiz" */}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/vacancies" // vacancies page
                    className="block px-4 py-2.5 hover:bg-slate-100"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {t("vacancies")}
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>

        {/* Right: language (desktop) + CTA + burger */}
        <div className="flex items-center gap-3">
          {/* Language switcher (desktop) */}
          <div className="relative inline-block hidden lg:block w-20">
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              aria-expanded={langOpen}
              className={
                "w-full h-9 px-3 rounded-md flex items-center justify-between transition-colors " +
                (isScrolled
                  ? "text-[#143C99] bg-white ring-1 ring-slate-200 hover:bg-slate-50"
                  : "text-white bg-white/10 ring-1 ring-white/20 hover:bg-white/20")
              }
            >
              <span className="text-sm leading-none">{currentLocale.label}</span>
              <span className="text-xs leading-none">
                {langOpen ? "▴" : "▾"}
              </span>
            </button>

            <div
              className={[
                "absolute top-full left-0 mt-2 w-full rounded-md shadow-lg ring-1 ring-black/5",
                "transition-all duration-300 ease-out origin-top",
                langOpen
                  ? "opacity-100 scale-100 visible"
                  : "opacity-0 scale-95 invisible pointer-events-none",
                isScrolled ? "bg-white" : "bg-white/95",
              ].join(" ")}
            >
              <ul className="py-1">
                {locales.map((l) => (
                  <li key={l.code}>
                    <button
                      onClick={() => changeLanguage(l.code)}
                      className="w-full text-left px-3 py-2 text-sm text-[#143C99] hover:bg-slate-100"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA (desktop) */}
          <Link
            href="/contacts"
            className="hidden lg:inline-block px-4 py-2 rounded-md bg-slate-200 hover:bg-slate-300 text-[#143C99] font-bold"
          >
            {t("contacts")}
          </Link>

          {/* Burger */}
          <button
            className="lg:hidden p-2 -mr-1"
            aria-label="Open menu"
            onClick={toggleMobileMenu}
          >
            <Image
              src="/componentsphoto/burger.png"
              alt="Menu"
              width={28}
              height={28}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative h-full w-full bg-white">
            {/* Top row */}
            <div className="flex items-center justify-between px-4 py-4">
              <Image
                src="/homephoto/Logo.png"
                alt="Bayan Group"
                width={132}
                height={40}
                priority
              />
              <button
                className="p-2"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <Image
                  src="/componentsphoto/closemenu.png"
                  alt="Close"
                  width={28}
                  height={28}
                />
              </button>
            </div>

            {/* Links */}
            <nav className="px-6 pb-6 pt-2 text-[#143C99]">
              <ul className="flex flex-col gap-4 mb-4">
                {/* About (mobile) */}
                <li>
                  <button
                    className="flex w-full items-center justify-between py-2"
                    onClick={() => toggleDropdown("about")}
                  >
                    {t("aboutus")}
                    <span className="text-xl">
                      {openDropdown === "about" ? "−" : "＋"}
                    </span>
                  </button>
                  <ul
                    className={[
                      "pl-3 text-[15px] overflow-hidden transition-all duration-400 ease-out",
                      openDropdown === "about"
                        ? "max-h-72 opacity-100"
                        : "max-h-0 opacity-60",
                    ].join(" ")}
                  >
                    <li className="py-2">
                      <Link
                        href="/aboutus"
                        onClick={() => setMobileOpen(false)}
                      >
                        {t("bayan")}
                      </Link>
                    </li>
                    <li className="py-2">
                      <Link
                        href="/directors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {t("directors")}
                      </Link>
                    </li>
                    <li className="py-2">
                      <Link
                        href="/values"
                        onClick={() => setMobileOpen(false)}
                      >
                        {t("values")}
                      </Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link
                    href="/companies"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t("ourcompanies")}
                  </Link>
                </li>

                <li>
                  <Link href="/tech" onClick={() => setMobileOpen(false)}>
                    {t("technology")}
                  </Link>
                </li>

                <li>
                  <Link href="/news" onClick={() => setMobileOpen(false)}>
                    {t("news")}
                  </Link>
                </li>

                {/* Careers (mobile) */}
                <li>
                  <button
                    className="flex w-full items-center justify-between py-2"
                    onClick={() => toggleDropdown("careers")}
                  >
                    {t("careers")}
                    <span className="text-xl">
                      {openDropdown === "careers" ? "−" : "＋"}
                    </span>
                  </button>
                  <ul
                    className={[
                      "pl-3 text-[15px] overflow-hidden transition-all duration-400 ease-out",
                      openDropdown === "careers"
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-60",
                    ].join(" ")}
                  >
                    <li className="py-2">
                      <Link href="/team" onClick={() => setMobileOpen(false)}>
                        {t("ourteam")}
                      </Link>
                    </li>
                    <li className="py-2">
                      <Link
                        href="/vacancies"
                        onClick={() => setMobileOpen(false)}
                      >
                        {t("vacancies")}
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>

              {/* Mobile: language + CTA side-by-side */}
              <div className="flex items-center gap-2">
                <div className="relative inline-block w-24">
                  <button
                    type="button"
                    onClick={() => setLangOpen((v) => !v)}
                    className="w-full h-10 px-3 rounded-md flex items-center justify-between text-[#143C99] bg-white ring-1 ring-slate-200 hover:bg-slate-50"
                  >
                    <span className="text-sm">{currentLocale.label}</span>
                    <span className="text-xs">
                      {langOpen ? "▴" : "▾"}
                    </span>
                  </button>

                  <div
                    className={[
                      "absolute top-full left-0 mt-2 w-full rounded-md shadow-lg ring-1 ring-black/5 bg-white",
                      "transition-all duration-300 ease-out origin-top",
                      langOpen
                        ? "opacity-100 scale-100 visible"
                        : "opacity-0 scale-95 invisible pointer-events-none",
                    ].join(" ")}
                  >
                    <ul className="py-1">
                      {locales.map((l) => (
                        <li key={l.code}>
                          <button
                            onClick={() => {
                              changeLanguage(l.code);
                              setMobileOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 text-sm text-[#143C99] hover:bg-slate-100"
                          >
                            {l.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  href="/contacts"
                  onClick={() => setMobileOpen(false)}
                  className="inline-block px-4 py-2 rounded-md bg-slate-200 hover:bg-slate-300 text-[#143C99]"
                >
                  {t("contacts")}
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}
