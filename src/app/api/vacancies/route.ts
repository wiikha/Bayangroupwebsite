// app/[locale]/api/vacancies/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { readDB, writeDB } from "../_lib/fsdb";
import { requireAdmin } from "../_lib/auth";
import { randomUUID } from "crypto";

type Lang = "uz" | "ru" | "en";
type V = { title: string; subtitle?: string; body: string; href?: string };
type Vacancy = { id: string; slug: string; translations: Record<Lang, Partial<V>> };
type DB = { items: Vacancy[] };

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
} as const;

/* ---------- small type-safe helpers ---------- */
function hasAnyTranslation(trs: Record<Lang, Partial<V>>): boolean {
  const langs: Lang[] = ["uz", "ru", "en"];
  return langs.some((l) => {
    const t = trs[l] || {};
    return Boolean(t.title || t.subtitle || t.body || t.href);
  });
}
function isRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object";
}
function str(v: unknown): string {
  return typeof v === "string" ? v : "";
}
function boolish(v: unknown): boolean {
  if (typeof v === "boolean") return v;
  const s = str(v).toLowerCase().trim();
  return s === "1" || s === "true" || s === "yes";
}

/* ---------- handlers ---------- */
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const lang = (url.searchParams.get("lang") as Lang) || "uz";
  const q = (url.searchParams.get("q") || "").toLowerCase();
  const limit = parseInt(url.searchParams.get("limit") || "20", 10);
  const offset = parseInt(url.searchParams.get("offset") || "0", 10);
  const slugFilter = (url.searchParams.get("slug") || "").trim();

  const db = await readDB<DB>("vacancies", { items: [] });

  let items = db.items.map((v) => {
    const tr = v.translations[lang] || {};
    return {
      id: v.id,
      slug: v.slug,
      title: tr.title || "",
      subtitle: tr.subtitle || "",
      body: tr.body || "",
      href: tr.href || `/vacancies/${v.slug}`,
    };
  });

  if (slugFilter) items = items.filter((i) => i.slug === slugFilter);

  if (q) {
    const needle = q.toLowerCase();
    items = items.filter((i) =>
      (i.title + " " + i.subtitle + " " + i.body).toLowerCase().includes(needle)
    );
  }

  items.sort((a, b) => a.slug.localeCompare(b.slug));

  const total = items.length;
  const page = items.slice(offset, offset + limit);

  return NextResponse.json({ total, limit, offset, items: page }, { headers: CORS_HEADERS });
}

export async function POST(req: Request) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const ct = (req.headers.get("content-type") || "").toLowerCase();

  // JSON body
  if (ct.includes("application/json")) {
    const raw = (await req.json().catch(() => null)) as unknown;
    const b = isRecord(raw) ? raw : {};

    const action = str(b.action);
    if (action === "delete") {
      return handleDelete({
        slug: str(b.slug).trim(),
        lang: (str(b.lang) as Lang) || undefined,
        all: boolish(b.all),
      });
    }

    // upsert
    return handleUpsert({
      lang: (str(b.lang) as Lang) || "uz",
      slug: str(b.slug).trim(),
      title: str(b.title),
      subtitle: str(b.subtitle),
      body: str(b.body),
      href: str(b.href),
    });
  }

  // FormData body
  const fd = await req.formData();
  const action = String(fd.get("action") || "");
  if (action === "delete") {
    return handleDelete({
      slug: String(fd.get("slug") || "").trim(),
      lang: (String(fd.get("lang") || "") as Lang) || undefined,
      all: boolish(fd.get("all")),
    });
  }

  return handleUpsert({
    lang: (String(fd.get("lang") || "uz") as Lang),
    slug: String(fd.get("slug") || "").trim(),
    title: String(fd.get("title") || ""),
    subtitle: String(fd.get("subtitle") || ""),
    body: String(fd.get("body") || ""),
    href: String(fd.get("href") || ""),
  });
}

/* ---------- helpers ---------- */
async function handleUpsert(params: {
  lang: Lang;
  slug: string;
  title: string;
  subtitle?: string;
  body: string;
  href?: string;
}) {
  const { lang, slug, title, subtitle, body, href } = params;

  if (!slug || !title) {
    return NextResponse.json(
      { error: "slug va title majburiy" },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  const db = await readDB<DB>("vacancies", { items: [] });
  let item = db.items.find((x) => x.slug === slug);

  if (!item) {
    item = { id: randomUUID(), slug, translations: { uz: {}, ru: {}, en: {} } };
    db.items.unshift(item);
  }

  item.translations[lang] = {
    ...(item.translations[lang] || {}),
    title,
    subtitle,
    body,
    href,
  };

  await writeDB("vacancies", db);
  return NextResponse.json({ ok: true, id: item.id, slug: item.slug }, { headers: CORS_HEADERS });
}

async function handleDelete(params: { slug: string; lang?: Lang; all?: boolean }) {
  const { slug, lang, all } = params;
  if (!slug) {
    return NextResponse.json({ error: "slug required" }, { status: 400, headers: CORS_HEADERS });
  }

  const db = await readDB<DB>("vacancies", { items: [] });
  const idx = db.items.findIndex((x) => x.slug === slug);
  if (idx === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404, headers: CORS_HEADERS });
  }

  if (all || !lang) {
    db.items.splice(idx, 1);
    await writeDB("vacancies", db);
    return NextResponse.json({ ok: true, deleted: "all" }, { headers: CORS_HEADERS });
  }

  const item = db.items[idx];
  if (item.translations[lang]) {
    item.translations[lang] = {};
  }
  if (!hasAnyTranslation(item.translations)) {
    db.items.splice(idx, 1);
  } else {
    db.items[idx] = item;
  }
  await writeDB("vacancies", db);
  return NextResponse.json({ ok: true, deleted: lang }, { headers: CORS_HEADERS });
}
