"use client";

import { useState, useRef } from "react";

/** --- Types --- */
type Lang = "uz" | "ru" | "en";

/** --- Small UI primitives (tailwind) --- */
function Card(props: { title: string; desc?: string; children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white/90 shadow-sm backdrop-blur-sm">
      <header className="flex items-start justify-between gap-4 border-b border-slate-200/70 px-5 py-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{props.title}</h3>
          {props.desc && <p className="mt-0.5 text-sm text-slate-600">{props.desc}</p>}
        </div>
        {props.right}
      </header>
      <div className="p-5">{props.children}</div>
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-sm font-medium text-slate-700">{children}</label>;
}
function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={[
        "w-full rounded-xl border border-slate-300/70 bg-white px-3.5 py-2.5",
        "text-sm text-slate-900 placeholder:text-slate-400",
        "outline-none ring-0 focus:border-[#143C99] focus:ring-2 focus:ring-[#143C99]/15",
        props.className || "",
      ].join(" ")}
    />
  );
}
function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={[
        "w-full rounded-xl border border-slate-300/70 bg-white px-3.5 py-2.5",
        "text-sm text-slate-900 outline-none focus:border-[#143C99] focus:ring-2 focus:ring-[#143C99]/15",
        props.className || "",
      ].join(" ")}
    />
  );
}
function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={[
        "w-full rounded-xl border border-slate-300/70 bg-white px-3.5 py-2.5",
        "text-sm text-slate-900 placeholder:text-slate-400",
        "outline-none ring-0 focus:border-[#143C99] focus:ring-2 focus:ring-[#143C99]/15",
        props.className || "",
      ].join(" ")}
    />
  );
}
function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  const { loading, className, children, ...rest } = props;
  return (
    <button
      {...rest}
      className={[
        "inline-flex items-center justify-center rounded-xl bg-[#143C99] px-4.5 py-2.5",
        "text-sm font-semibold text-white shadow-sm",
        "hover:bg-[#0f3281] active:bg-[#0c2a6c] disabled:opacity-50 disabled:cursor-not-allowed",
        "focus:outline-none focus:ring-2 focus:ring-[#143C99]/30",
        className || "",
      ].join(" ")}
    >
      {loading && (
        <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4A4 4 0 008 12H4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
function Banner({ kind, children }: { kind: "success" | "error" | "info"; children: React.ReactNode }) {
  const styles =
    kind === "success"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : kind === "error"
      ? "bg-rose-50 text-rose-700 border-rose-200"
      : "bg-sky-50 text-sky-700 border-sky-200";
  return <div className={`rounded-xl border px-3.5 py-2.5 text-sm ${styles}`}>{children}</div>;
}

/** --- Page --- */
export default function AdminPage() {
  const [logged, setLogged] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  async function onLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/login", { method: "POST", body: fd });
    setLoading(false);
    if (res.ok) setLogged(true);
    else {
      try {
        const j = await res.json();
        setErr(j?.error || "Login xato");
      } catch {
        setErr("Login xato");
      }
    }
  }

  async function onLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setLogged(false);
  }

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#143C99] to-white">
      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8 py-8 md:py-12">
        <header className="relative mb-8">
          <div className="text-center mt-8">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Bayan Group — Admin
            </h1>
            <p className="mt-1 text-white/90 text-sm">Kontentni tez va qulay boshqarish paneli</p>
          </div>

          {logged && (
            <Button
              onClick={onLogout}
              className="absolute right-0 top-0  border border-slate-200 "
            >
              Chiqish
            </Button>
          )}
        </header>

        {!logged ? (
          <div className="mx-auto max-w-md">
            <Card
              title="Tizimga kirish"
              desc="Ma'lumotlarni boshqarish paneli"
              right={
                <span className="inline-flex items-center rounded-lg bg-[#143C99]/5 px-2.5 py-1 text-xs font-medium text-[#143C99]">
                  Secure
                </span>
              }
            >
              <form onSubmit={onLogin} className="grid gap-4">
                {err && <Banner kind="error">{err}</Banner>}

                <div className="grid gap-2">
                  <Label>Login</Label>
                  <Input name="username" defaultValue="admin1_bayangroup" placeholder="Login" autoComplete="username" />
                </div>

                <div className="grid gap-2">
                  <Label>Parol</Label>
                  <div className="relative">
                    <Input
                      name="password"
                      type={showPass ? "text" : "password"}
                      defaultValue="b1a2y3a4n5"
                      placeholder="Parol"
                      autoComplete="current-password"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((x) => !x)}
                      className="absolute inset-y-0 right-2.5 my-auto inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:text-slate-700"
                      aria-label={showPass ? "Yashirish" : "Ko‘rsatish"}
                    >
                      {showPass ? (
                        /* eye-off */
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 3l18 18" />
                          <path d="M10.58 10.58a2 2 0 102.83 2.83" />
                          <path d="M16.24 16.24A8.5 8.5 0 013 12c1.6-3.33 4.76-6 9-6 1.1 0 2.15.18 3.12.51" />
                        </svg>
                      ) : (
                        /* eye */
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="mt-1">
                  <Button type="submit" loading={loading} className="w-full">
                    Kirish
                  </Button>
                </div>

                <p className="text-center text-xs text-slate-200/90">Cookie orqali sessiya o‘rnatiladi. Xavfsiz hudud.</p>
              </form>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <NewsForm />
            <VacancyForm />
          </div>
        )}
      </main>
    </div>
  );
}

/** --- News form + Quick Delete --- */
function NewsForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ kind: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    const form = formRef.current;
    if (!form) return;

    setLoading(true);
    const fd = new FormData(form);
    const r = await fetch("/api/news", { method: "POST", body: fd });
    setLoading(false);

    if (r.ok) {
      setMsg({ kind: "success", text: "Yangilik saqlandi" });
      form.reset();
      setPreview(null);
    } else {
      const j = await r.json().catch(() => ({}));
      setMsg({ kind: "error", text: j?.error || "Xatolik yuz berdi" });
    }
  }

  return (
    <Card title="News qo‘shish" desc="Til bo‘yicha alohida tarjima yoziladi">
      <form ref={formRef} onSubmit={submit} encType="multipart/form-data" className="grid gap-4">
        {msg && <Banner kind={msg.kind}>{msg.text}</Banner>}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label>Til</Label>
            <Select name="lang" defaultValue="uz">
              <option value="uz">O‘zbekcha</option>
              <option value="ru">Русский</option>
              <option value="en">English</option>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Slug (noyob)</Label>
            <Input name="slug" placeholder="unique-slug" required />
          </div>
          <div className="grid gap-2">
            <Label>Sana</Label>
            <Input type="date" name="date" required defaultValue={new Date().toISOString().slice(0, 10)} />
          </div>
          <div className="grid gap-2">
            <Label>Link</Label>
            <Input name="header" placeholder="Link batafsil" required />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label>Title</Label>
            <Input name="title" placeholder="Asosiy sarlavha" required />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label>Qisqa tavsif (excerpt)</Label>
            <Input name="excerpt" placeholder="Bir-ikki gap" required />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label>Batafsil matn</Label>
            <Textarea name="description" rows={5} placeholder="To‘liq tavsif" required />
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Photo (jpg/png)</Label>
          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <Input
              name="photo"
              type="file"
              accept="image/*"
              onChange={(e) => setPreview(e.target.files?.[0] ? URL.createObjectURL(e.target.files![0]) : null)}
            />
            {preview && (
              <div className="rounded-xl border border-slate-200/80 p-1">
                <img src={preview} alt="preview" className="h-28 w-40 rounded-lg object-cover" />
              </div>
            )}
          </div>
        </div>

        <div className="pt-1">
          <Button type="submit" loading={loading}>
            Saqlash
          </Button>
        </div>
      </form>

      {/* --- Quick delete (News) --- */}
      <div className="mt-6 border-t border-slate-200/70 pt-5">
        <QuickDeleteNews />
      </div>
    </Card>
  );
}

function QuickDeleteNews() {
  const [res, setRes] = useState<{ kind: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function submitLang(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setRes(null);

    const form = e.currentTarget as HTMLFormElement; // ✅
    const fd = new FormData(form);
    fd.set("action", "delete");

    setLoading(true);
    const r = await fetch("/api/news", { method: "POST", body: fd });
    setLoading(false);

    if (r.ok) {
      setRes({ kind: "success", text: "O‘chirildi" });
      form.reset(); // ✅
    } else {
      const j = await r.json().catch(() => ({}));
      setRes({ kind: "error", text: j?.error || "Topilmadi yoki xatolik" });
    }
  }

  async function deleteAll(form: HTMLFormElement) {
    const fd = new FormData(form);
    fd.set("action", "delete");
    fd.set("all", "1");
    setLoading(true);
    const r = await fetch("/api/news", { method: "POST", body: fd });
    setLoading(false);
    if (r.ok) {
      setRes({ kind: "success", text: "BUTUN yozuv o‘chirildi" });
      form.reset();
    } else {
      const j = await r.json().catch(() => ({}));
      setRes({ kind: "error", text: j?.error || "Topilmadi yoki xatolik" });
    }
  }

  return (
    <div className="grid gap-3">
      <div className="text-sm font-medium text-slate-700">Quick delete (News)</div>
      {res && <Banner kind={res.kind}>{res.text}</Banner>}

      <form onSubmit={submitLang} className="grid gap-2 sm:grid-cols-3">
        <Input name="slug" required placeholder="slug (masalan, product-launch-2025)" />
        <Select name="lang" defaultValue="uz">
          <option value="uz">uz</option>
          <option value="ru">ru</option>
          <option value="en">en</option>
        </Select>
        <div className="flex gap-2">
          <Button loading={loading} className="flex-1 bg-rose-500 text-rose-600 hover:bg-rose-700" type="submit">
            Delete (lang)
          </Button>
          <button
            type="button"
            className="flex-1 rounded-xl bg-rose-600 px-4.5 py-2.5 text-sm font-semibold text-white hover:bg-rose-700"
            onClick={(ev) => deleteAll((ev.currentTarget as HTMLButtonElement).form!)}
          >
            Delete ALL
          </button>
        </div>
      </form>

      <p className="text-xs text-slate-500">
        * <b>Delete (lang)</b> — faqat tanlangan til tarjimasini o‘chiradi. <b>Delete ALL</b> — shu slug bo‘yicha butun
        yozuv o‘chadi.
      </p>
    </div>
  );
}

/** --- Vacancy form + Quick Delete --- */
function VacancyForm() {
  const [msg, setMsg] = useState<{ kind: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    const form = formRef.current;
    if (!form) return;

    setLoading(true);
    const fd = new FormData(form);
    const r = await fetch("/api/vacancies", { method: "POST", body: fd });
    setLoading(false);

    if (r.ok) {
      setMsg({ kind: "success", text: "Vakansiya saqlandi" });
      form.reset();
    } else {
      const j = await r.json().catch(() => ({}));
      setMsg({ kind: "error", text: j?.error || "Xatolik yuz berdi" });
    }
  }

  return (
    <Card title="Vacancy qo‘shish" desc="Har bir til uchun alohida sarlavha/matn yozing">
      <form ref={formRef} onSubmit={submit} className="grid gap-4">
        {msg && <Banner kind={msg.kind}>{msg.text}</Banner>}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label>Til</Label>
            <Select name="lang" defaultValue="uz">
              <option value="uz">O‘zbekcha</option>
              <option value="ru">Русский</option>
              <option value="en">English</option>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Slug (noyob)</Label>
            <Input name="slug" placeholder="unique-slug" required />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label>Title</Label>
            <Input name="title" placeholder="Lavozim sarlavhasi" required />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label>Body</Label>
            <Textarea name="body" rows={5} placeholder="Majburiyatlar, talablar..." required />
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <Label>Href (ixtiyoriy)</Label>
            <Input name="href" placeholder="/vacancies/slug yoki tashqi havola" />
          </div>
        </div>

        <div className="pt-1">
          <Button type="submit" loading={loading}>
            Saqlash
          </Button>
        </div>
      </form>

      {/* --- Quick delete (Vacancies) --- */}
      <div className="mt-6 border-t border-slate-200/70 pt-5">
        <QuickDeleteVac />
      </div>
    </Card>
  );
}

function QuickDeleteVac() {
  const [res, setRes] = useState<{ kind: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function submitLang(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setRes(null);

    const form = e.currentTarget as HTMLFormElement; // ✅
    const fd = new FormData(form);
    fd.set("action", "delete");

    setLoading(true);
    const r = await fetch("/api/vacancies", { method: "POST", body: fd });
    setLoading(false);
    if (r.ok) {
      setRes({ kind: "success", text: "O‘chirildi" });
      form.reset(); // ✅
    } else {
      const j = await r.json().catch(() => ({}));
      setRes({ kind: "error", text: j?.error || "Topilmadi yoki xatolik" });
    }
  }

  async function deleteAll(form: HTMLFormElement) {
    const fd = new FormData(form);
    fd.set("action", "delete");
    fd.set("all", "1");
    setLoading(true);
    const r = await fetch("/api/vacancies", { method: "POST", body: fd });
    setLoading(false);
    if (r.ok) {
      setRes({ kind: "success", text: "BUTUN yozuv o‘chirildi" });
      form.reset();
    } else {
      const j = await r.json().catch(() => ({}));
      setRes({ kind: "error", text: j?.error || "Topilmadi yoki xatolik" });
    }
  }

  return (
    <div className="grid gap-3">
      <div className="text-sm font-medium text-slate-700">Quick delete (Vacancies)</div>
      {res && <Banner kind={res.kind}>{res.text}</Banner>}

      <form onSubmit={submitLang} className="grid gap-2 sm:grid-cols-3">
        <Input name="slug" required placeholder="slug (masalan, frontend-dev)" />
        <Select name="lang" defaultValue="uz">
          <option value="uz">uz</option>
          <option value="ru">ru</option>
          <option value="en">en</option>
        </Select>
        <div className="flex gap-2">
          <Button loading={loading} className="flex-1 bg-rose-500 text-rose-700 hover:bg-rose-600" type="submit">
            Delete (lang)
          </Button>
          <button
            type="button"
            className="flex-1 rounded-xl bg-rose-600 px-4.5 py-2.5 text-sm font-semibold text-white hover:bg-rose-700"
            onClick={(ev) => deleteAll((ev.currentTarget as HTMLButtonElement).form!)}
          >
            Delete ALL
          </button>
        </div>
      </form>

      <p className="text-xs text-slate-500">
        * <b>Delete (lang)</b> — faqat tanlangan til tarjimasini o‘chiradi. <b>Delete ALL</b> — shu slug bo‘yicha butun yozuv o‘chadi.
      </p>
    </div>
  );
}
