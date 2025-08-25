export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { readDB, writeDB } from "../_lib/fsdb";
import { requireAdmin } from "../_lib/auth";

/* ==== Types ==== */
type Lang = "uz" | "ru" | "en";
type T = { title: string; excerpt: string; description: string; header: string };
type News = {
  id: string;
  slug: string;
  date: string; // YYYY-MM-DD
  photo: string; // "/uploads/news/...."
  translations: Record<Lang, Partial<T>>;
};
type DB = { items: News[] };

/* ==== Const ==== */
const MAX = 10 * 1024 * 1024; // 10 MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif"];

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
} as const;

/* ==== Helpers ==== */
function pickLang<TMap extends Record<string, any>>(
  map: Record<Lang, Partial<TMap>>,
  lang: Lang
): Partial<TMap> {
  return map[lang] ?? {};
}

function hasAnyTranslation(trs: Record<Lang, Partial<T>>): boolean {
  return (["uz", "ru", "en"] as Lang[]).some((l) => {
    const t = trs[l] || {};
    return Boolean(t.title || t.excerpt || t.description || t.header);
  });
}

/* ==== CORS preflight ==== */
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

/* ==== GET /api/news ==== */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const lang = ((url.searchParams.get("lang") as Lang) || "uz") as Lang;
  const q = (url.searchParams.get("q") || "").toLowerCase();
  const headerFilter = (url.searchParams.get("header") || "").toLowerCase();
  const from = url.searchParams.get("from") || "";
  const to = url.searchParams.get("to") || "";
  const limit = parseInt(url.searchParams.get("limit") || "20", 10);
  const offset = parseInt(url.searchParams.get("offset") || "0", 10);
  const slugFilter = (url.searchParams.get("slug") || "").trim();

  const db = await readDB<DB>("news", { items: [] });

  let items = db.items.map((n) => {
    const tr = pickLang<T>(n.translations, lang);
    return {
      id: n.id,
      slug: n.slug,
      date: n.date,
      photo: n.photo, // front aynan shu nomni kutadi
      title: tr.title || "",
      excerpt: tr.excerpt || "",
      description: tr.description || "",
      header: tr.header || "",
    };
  });

  if (slugFilter) items = items.filter((i) => i.slug === slugFilter);
  if (q) {
    const needle = q.trim();
    items = items.filter((i) =>
      (i.title + " " + i.excerpt + " " + i.description + " " + i.header)
        .toLowerCase()
        .includes(needle)
    );
  }
  if (headerFilter) items = items.filter((i) => i.header.toLowerCase() === headerFilter);
  if (from) items = items.filter((i) => i.date >= from);
  if (to) items = items.filter((i) => i.date <= to);

  // so'nggi yangiliklar birinchi
  items.sort((a, b) =>
    a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)
  );

  const total = items.length;
  const page = items.slice(offset, offset + limit);

  return NextResponse.json({ total, limit, offset, items: page }, { headers: CORS_HEADERS });
}

/* ==== POST /api/news  (create/update + quick delete) ==== */
export async function POST(req: Request) {
  // auth
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const fd = await req.formData();

  /* ---- Quick DELETE ----
     POST body:
       action=delete
       slug=...
       lang=uz|ru|en  (ixtiyoriy)
       all=1          (ixtiyoriy, bo‘lsa butun yozuv o‘chadi)
  */
  if (String(fd.get("action") || "") === "delete") {
    const slug = String(fd.get("slug") || "").trim();
    const lang = (String(fd.get("lang") || "") as Lang) || undefined;
    const allFlag = String(fd.get("all") || "");
    const deleteAll = allFlag === "1" || allFlag.toLowerCase() === "true";
    if (!slug) {
      return NextResponse.json({ error: "slug required" }, { status: 400, headers: CORS_HEADERS });
    }

    const db = await readDB<DB>("news", { items: [] });
    const idx = db.items.findIndex((x) => x.slug === slug);
    if (idx === -1) {
      return NextResponse.json({ error: "Not found" }, { status: 404, headers: CORS_HEADERS });
    }

    if (deleteAll || !lang) {
      const removed = db.items.splice(idx, 1)[0];
      if (removed?.photo) {
        try {
          await fs.unlink(path.join(process.cwd(), "public", removed.photo.replace(/^\//, "")));
        } catch { /* ignore */ }
      }
      await writeDB("news", db);
      return NextResponse.json({ ok: true, deleted: "all" }, { headers: CORS_HEADERS });
    } else {
      const item = db.items[idx];
      item.translations[lang] = {};
      if (!hasAnyTranslation(item.translations)) {
        // endi hech bir tilda matn qolmadi – yozuvni butunlay o‘chiramiz
        db.items.splice(idx, 1);
        if (item.photo) {
          try {
            await fs.unlink(path.join(process.cwd(), "public", item.photo.replace(/^\//, "")));
          } catch { /* ignore */ }
        }
      }
      await writeDB("news", db);
      return NextResponse.json({ ok: true, deleted: lang }, { headers: CORS_HEADERS });
    }
  }

  /* ---- CREATE / UPDATE ---- */
  const lang = (String(fd.get("lang") || "uz") as Lang);
  const slug = String(fd.get("slug") || "").trim();
  const date = String(fd.get("date") || "").trim();
  if (!slug || !date) {
    return NextResponse.json({ error: "slug va date majburiy" }, { status: 400, headers: CORS_HEADERS });
  }

  const title = String(fd.get("title") || "");
  const excerpt = String(fd.get("excerpt") || "");
  const description = String(fd.get("description") || "");
  const header = String(fd.get("header") || "");
  const file = fd.get("photo") as File | null;

  const db = await readDB<DB>("news", { items: [] });

  // top yoki create by slug
  let item = db.items.find((x) => x.slug === slug);
  if (!item) {
    item = { id: randomUUID(), slug, date, photo: "", translations: { uz: {}, ru: {}, en: {} } };
    db.items.unshift(item);
  } else {
    item.date = date;
  }

  // tarjimani yangilash
  item.translations[lang] = { title, excerpt, description, header };

  // rasm saqlash (bo‘lsa)
  if (file && file.size > 0) {
    if (file.size > MAX) {
      return NextResponse.json({ error: "File too large" }, { status: 413, headers: CORS_HEADERS });
    }
    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json({ error: "Faqat JPG/PNG/WebP/AVIF rasm bo‘lsin" }, { status: 415, headers: CORS_HEADERS });
    }

    const prev = item.photo;

    const buf = Buffer.from(await file.arrayBuffer());
    let ext = (file.type.split("/")[1] || "jpg").toLowerCase();
    if (ext === "jpeg") ext = "jpg";

    const fname = `${randomUUID()}.${ext}`;
    // rel yo‘l boshida "/" bo‘lmasin!
    const relNoSlash = path.posix.join("uploads/news", fname); // uploads/news/abc.jpg
    const abs = path.join(process.cwd(), "public", relNoSlash);
    await fs.mkdir(path.dirname(abs), { recursive: true });
    await fs.writeFile(abs, buf);

    const newUrl = "/" + relNoSlash;
    item.photo = newUrl;

    // eski rasmni tozalash
    if (prev && prev !== newUrl) {
      try {
        await fs.unlink(path.join(process.cwd(), "public", prev.replace(/^\//, "")));
      } catch { /* ignore */ }
    }
  }

  await writeDB<DB>("news", db);

  return NextResponse.json(
    { ok: true, id: item.id, slug: item.slug, photo: item.photo },
    { headers: CORS_HEADERS }
  );
}
