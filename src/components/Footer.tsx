"use client";

import {
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaYoutube,
} from "react-icons/fa";
import { FiScissors } from "react-icons/fi";
import { useTranslations } from "use-intl";

export default function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="bg-white rounded-lg m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8 flex flex-col items-center text-center">
        
        {/* Top links */}
        <ul className="flex flex-wrap justify-center mb-6 text-sm font-medium" style={{ color: "#495062" }}>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              {t("about")}
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              {t("companies")}
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              {t("tech")}
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              {t("news")}
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              {t("vacancies")}
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              {t("contacts")}
            </a>
          </li>
        </ul>

        {/* Social icons */}
        <div className="flex space-x-6 mb-6" style={{ color: "#495062" }}>
          <a href="#" className="hover:text-gray-900">
            <FaFacebook size={20} />
          </a>
          <a href="#" className="hover:text-gray-900">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="hover:text-gray-900">
            <FiScissors size={20} />
          </a>
          <a href="#" className="hover:text-gray-900">
            <FaGithub size={20} />
          </a>
          <a href="#" className="hover:text-gray-900">
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
