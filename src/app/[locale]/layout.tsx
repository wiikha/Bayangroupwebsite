// app/[locale]/layout.tsx
import "../globals.css";
import {NextIntlClientProvider, hasLocale} from "next-intl";
import {getMessages} from "next-intl/server";
import {Manrope} from "next/font/google";
import {notFound} from "next/navigation";
import {routing} from "@/i18n/routing";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Bayan Group | Pharmaceutical Manufacturing in Uzbekistan",
  description:
    "Bayan Group manufactures high-quality pharmaceutical products , ampoules, and medical preparations and distribution services.",
};

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default async function LocaleLayout({
  children,
  params: {locale},
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  // Validate locale
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Load translations for this request
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={manrope.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          {children}
          <Footer/>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
