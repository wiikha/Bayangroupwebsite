"use client";

import { FaFacebook, FaInstagram, FaGithub, FaYoutube, FaTelegram } from "react-icons/fa";
import { FiLinkedin, FiScissors } from "react-icons/fi";
import { useTranslations } from "next-intl"; // ← use next-intl for consistency
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-white rounded-lg m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 flex flex-col items-center text-center">

        {/* Top links (INTERNAL) */}
        <ul className="flex flex-wrap justify-center mb-6 text-sm font-medium" style={{ color: "#495062" }}>
          <li>
            <Link href="/aboutus" className="mr-4 hover:underline md:mr-6">
              {t("about")}
            </Link>
          </li>
          <li>
            <Link href="/companies" className="mr-4 hover:underline md:mr-6">
              {t("companies")}
            </Link>
          </li>
          <li>
            <Link href="/tech" className="mr-4 hover:underline md:mr-6">
              {t("tech")}
            </Link>
          </li>
          <li>
            <Link href="/news" className="mr-4 hover:underline md:mr-6">
              {t("news")}
            </Link>
          </li>
          <li>
            <Link href="/vacancies" className="mr-4 hover:underline md:mr-6">
              {t("vacancies")}
            </Link>
          </li>
          <li>
            <Link href="/contacts" className="hover:underline">
              {t("contacts")}
            </Link>
          </li>
        </ul>

        {/* Social icons (EXTERNAL) — keep <a>, add target/rel if real links */}
        <div className="flex space-x-6 mb-6" style={{ color: "#495062" }}>
          <a href="#" className="hover:text-gray-900" aria-label="Facebook">
            <FaFacebook size={20} />
          </a>
          <a href="#" className="hover:text-gray-900" aria-label="Instagram">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="hover:text-gray-900" aria-label="Website">
            <FiLinkedin size={20} />
          </a>
          <a href="#" className="hover:text-gray-900" aria-label="GitHub">
            <FaTelegram size={20} />
          </a>
          <a href="#" className="hover:text-gray-900" aria-label="YouTube">
            <FaYoutube size={20} />
          </a>
        </div>

        {/* Copyright */}
        <span className="block text-sm" style={{ color: "#495062" }}>
          {t("copy", { year: new Date().getFullYear() })}
        </span>
      </div>
    </footer>
  );
}
