// src/app/api/team/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { readDB, writeDB } from "../_lib/fsdb";
import { requireAdmin } from "../_lib/auth";

type Lang = "uz" | "ru" | "en";
type T = { name: string; role: string };
type Member = {
  id: string;
  slug: string;            // noyob kalit (colleague1, sodiq-aka, ...)
  order: number;           // ko‘rinish tartibi (kichik — oldinda)
  photo: string;           // /uploads/team/....
  translations: Record<Lang, Partial<T>>;
};
type DB = { items: Member[] };

const MAX = 10 * 1024 * 1024; // 10 MB
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function pick<T extends Record<string, any>>(all: Record<Lang, Partial<T>>, lang: Lang) {
  return all[lang] ?? {};
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

/** GET /api/team?lang=uz&limit=20&offset=0&q=... */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const lang = (url.searchParams.get("lang") as Lang) || "uz";
  const q = (url.searchParams.get("q") || "").toLowerCase();
  const limit = parseInt(url.searchParams.get("limit") || "20", 10);
  const offset = parseInt(url.searchParams.get("offset") || "0", 10);

  const db = await readDB<DB>("team", { items: [] });

  let items = db.items
    .map((m) => {
      const tr = pick<T>(m.translations, lang);
      return {
        id: m.id,
        slug: m.slug,
        order: m.order,
        photo: m.photo,
        name: tr.name || "",
        role: tr.role || "",
      };
    })
    // order ASC, keyin slug
    .sort((a, b) => (a.order - b.order) || a.slug.localeCompare(b.slug));

  if (q) {
    const needle = q.trim();
    items = items.filter((i) =>
      (i.name + " " + i.role).toLowerCase().includes(needle)
    );
  }

  const total = items.length;
  const page = items.slice(offset, offset + limit);

  return NextResponse.json({ total, limit, offset, items: page }, { headers: CORS });
}

/** POST /api/team
 * FormData:
 * - action=delete  (optional)  -> delete flow
 * - slug (required)
 * - all=1 (optional)           -> butun yozuvni o‘chirish
 * - lang=uz/ru/en (optional)   -> faqat shu til tarjimasini o‘chirish
 *
 * CREATE/UPDATE:
 * - slug (required)
 * - order (optional number, default 1000)
 * - lang (uz/ru/en) (required)
 * - name, role  (required)
 * - photo (File) (optional)
 */
export async function POST(req: Request) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const fd = await req.formData();
  const action = String(fd.get("action") || "");

  const db = await readDB<DB>("team", { items: [] });

  // --- DELETE via POST (oddiy) ---
  if (action === "delete") {
    const slug = String(fd.get("slug") || "").trim();
    const lang = (String(fd.get("lang") || "") as Lang) || undefined;
    const deleteAll = /^(1|true)$/i.test(String(fd.get("all") || ""));

    if (!slug) {
      return NextResponse.json({ error: "slug required" }, { status: 400, headers: CORS });
    }

    const idx = db.items.findIndex((x) => x.slug === slug);
    if (idx === -1) {
      return NextResponse.json({ error: "Not found" }, { status: 404, headers: CORS });
    }

    if (deleteAll || !lang) {
      const removed = db.items.splice(idx, 1)[0];
      // ixtiyoriy: suratni o‘chirishga urinish
      if (removed?.photo) {
        try {
          const abs = path.join(process.cwd(), "public", removed.photo.replace(/^\//, ""));
          await fs.unlink(abs);
        } catch {}
      }
      await writeDB<DB>("team", db);
      return NextResponse.json({ ok: true, deleted: "all" }, { headers: CORS });
    } else {
      // faqat tarjimani bo‘shatamiz
      const item = db.items[idx];
      if (item.translations[lang]) {
        item.translations[lang] = {};
      }
      await writeDB<DB>("team", db);
      return NextResponse.json({ ok: true, deleted: lang }, { headers: CORS });
    }
  }

  // --- CREATE/UPDATE ---
  const slug = String(fd.get("slug") || "").trim();
  const lang = (String(fd.get("lang") || "uz") as Lang);
  const name = String(fd.get("name") || "").trim();
  const role = String(fd.get("role") || "").trim();
  const order = Number(fd.get("order") || 1000);
  const file = fd.get("photo") as File | null;

  if (!slug || !name) {
    return NextResponse.json({ error: "slug va name majburiy" }, { status: 400, headers: CORS });
  }

  let item = db.items.find((x) => x.slug === slug);
  if (!item) {
    item = {
      id: randomUUID(),
      slug,
      order: isFinite(order) ? order : 1000,
      photo: "",
      translations: { uz: {}, ru: {}, en: {} },
    };
    db.items.push(item);
  } else {
    if (isFinite(order)) item.order = order;
  }

  // tarjimani saqlaymiz
  item.translations[lang] = { name, role };

  // rasm bo‘lsa saqlaymiz
  if (file && file.size > 0) {
    if (file.size > MAX) {
      return NextResponse.json({ error: "File too large" }, { status: 413, headers: CORS });
    }
    const buf = Buffer.from(await file.arrayBuffer());
    let ext = (file.type && file.type.split("/")[1]) || "jpg";
    if (ext === "jpeg") ext = "jpg";
    const fname = `${randomUUID()}.${ext}`;
    const relNoSlash = path.posix.join("uploads/team", fname);
    const abs = path.join(process.cwd(), "public", relNoSlash);
    await fs.mkdir(path.dirname(abs), { recursive: true });
    await fs.writeFile(abs, buf);
    item.photo = "/" + relNoSlash;
  }

  await writeDB<DB>("team", db);
  return NextResponse.json({ ok: true, id: item.id, slug: item.slug, photo: item.photo }, { headers: CORS });
}

/** DELETE /api/team?slug=...&lang=uz|ru|en&all=1 */
export async function DELETE(req: Request) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  const url = new URL(req.url);
  const slug = String(url.searchParams.get("slug") || "").trim();
  const lang = (url.searchParams.get("lang") || "") as Lang;
  const delAll = /^(1|true)$/i.test(String(url.searchParams.get("all") || ""));

  const db = await readDB<DB>("team", { items: [] });
  const idx = db.items.findIndex((x) => x.slug === slug);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404, headers: CORS });

  if (delAll || !lang) {
    const removed = db.items.splice(idx, 1)[0];
    if (removed?.photo) {
      try {
        const abs = path.join(process.cwd(), "public", removed.photo.replace(/^\//, ""));
        await fs.unlink(abs);
      } catch {}
    }
    await writeDB<DB>("team", db);
    return NextResponse.json({ ok: true, deleted: "all" }, { headers: CORS });
  } else {
    const item = db.items[idx];
    if (item.translations[lang]) {
      item.translations[lang] = {};
    }
    await writeDB<DB>("team", db);
    return NextResponse.json({ ok: true, deleted: lang }, { headers: CORS });
  }
}
