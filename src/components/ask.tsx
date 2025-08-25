"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AskQuestionSection() {
  const t = useTranslations("ask");
  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "", honey: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  const topics = [
    { value: "products", label: t("topics.products") },
    { value: "partnership", label: t("topics.partnership") },
    { value: "careers", label: t("topics.careers") }
  ];

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const emailOk = !form.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.honey) return; // honeypot
    if (!form.name || !form.email || !form.message || !emailOk) return;

    setStatus("loading");
    try {
      // TODO: send to your API route (/api/contact) or service
      // await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) });
      await new Promise((r) => setTimeout(r, 700));
      setStatus("ok");
      setForm({ name: "", email: "", topic: "", message: "", honey: "" });
    } catch {
      setStatus("err");
    }
  }

  return (
    <section className="bg-[#EDF3FF]">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8 py-12 md:py-16">
        {/* Header */}
        <div className="text-center">
          <div className="mb-2 sm:mb-4 text-[18px] font-medium text-[#2F4FA0]/80 tracking-wide flex items-center justify-center gap-2">
                                                  <Image src="/about/logo_mini.png" alt="logo" width={50} height={50} className="inline-block h-4 w-4  " />
                                                  {t("eyebrow")}
                                                </div>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#143C99]">
            {t("title")}
          </h2>
          <p className="mt-2 text-slate-600 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* Card */}
        <div className="mt-8 rounded-3xl bg-white ring-1 ring-black/5 p-5 sm:p-8">
          {/* Quick topics */}
          <div className="flex flex-wrap gap-2">
            {topics.map((x) => (
              <button
                key={x.value}
                type="button"
                onClick={() => setForm((p) => ({ ...p, topic: x.value }))}
                className={`rounded-full px-3.5 py-1.5 text-sm font-semibold ring-1 transition
                  ${form.topic === x.value ? "bg-[#143C99] text-white ring-transparent" : "bg-white text-[#143C99] ring-[#143C99]/20 hover:bg-[#143C99]/10"}`}
              >
                {x.label}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
            {/* Honeypot */}
            <input
              name="honey"
              value={form.honey}
              onChange={onChange}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-slate-700">{t("name")}</label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                required
                placeholder={t("ph.name")}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 outline-none ring-0 focus:border-[#143C99]"
              />
            </div>

            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-slate-700">{t("email")}</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                required
                placeholder={t("ph.email")}
                className={`mt-1 w-full rounded-xl border px-3.5 py-2.5 outline-none ring-0 focus:border-[#143C99]
                  ${emailOk ? "border-slate-200 bg-white" : "border-red-400 bg-red-50"}`}
              />
              {!emailOk && (
                <p className="mt-1 text-xs text-red-600">{t("emailErr")}</p>
              )}
            </div>


            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-slate-700">{t("message")}</label>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                required
                rows={5}
                placeholder={t("ph.message")}
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-3.5 py-3 outline-none ring-0 focus:border-[#143C99] resize-y"
              />
            </div>

            <div className="sm:col-span-2 flex items-center justify-between gap-4">
              <p className="text-sm text-slate-600">{t("hint")}</p>
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center rounded-xl bg-[#143C99] px-5 py-2.5 font-semibold text-white hover:opacity-90 disabled:opacity-60"
              >
                {status === "loading" ? t("sending") : t("send")}
              </button>
            </div>

            {status === "ok" && (
              <div className="sm:col-span-2 rounded-xl bg-green-50 px-4 py-3 text-green-700 ring-1 ring-green-200">
                {t("ok")}
              </div>
            )}
            {status === "err" && (
              <div className="sm:col-span-2 rounded-xl bg-red-50 px-4 py-3 text-red-700 ring-1 ring-red-200">
                {t("err")}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
