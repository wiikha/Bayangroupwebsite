// src/app/api/timeline/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { readDB, writeDB } from "../_lib/fsdb";
import { requireAdmin } from "../_lib/auth";
import { randomUUID } from "crypto";

type Lang = "uz" | "ru" | "en";
type TL = { id: string; year: number; translations: Record<Lang, { text?: string }> };
type DB = { items: TL[] };

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

// GET /api/timeline?lang=uz
export async function GET(req: Request) {
  const url = new URL(req.url);
  const lang = (url.searchParams.get("lang") as Lang) || "uz";

  const db = await readDB<DB>("timeline", { items: [] });
  const items = db.items
    .slice()
    .sort((a, b) => a.year - b.year)
    .map((i) => ({ year: i.year, text: i.translations[lang]?.text || "" }));

  return NextResponse.json({ items }, { headers: CORS });
}

// POST /api/timeline
// 1) Saqlash/yangilash (FormData yoki JSON):
//    - year (number, majburiy)
//    - lang: uz|ru|en (majburiy)
//    - text: string
// 2) O‘chirish (FormData yoki JSON):
//    - action=delete
//    - year (majburiy)
//    - lang (ixtiyoriy; bo‘lsa faqat shu til tarjimasini, bo‘lmasa ALL)
//    - all=1 => butun elementni o‘chirish
export async function POST(req: Request) {
  const una = requireAdmin(req);
  if (una) return una;

  const ct = req.headers.get("content-type") || "";
  let action = "", year = 0, lang: Lang = "uz", text = "", all = false;

  if (ct.includes("application/json")) {
    const b = await req.json();
    action = String(b.action || "");
    year = parseInt(String(b.year || "0"), 10);
    lang = (b.lang as Lang) || "uz";
    text = String(b.text || "");
    all = b.all === true || String(b.all || "") === "1";
  } else {
    const fd = await req.formData();
    action = String(fd.get("action") || "");
    year = parseInt(String(fd.get("year") || "0"), 10);
    lang = (String(fd.get("lang") || "uz") as Lang);
    text = String(fd.get("text") || "");
    all = String(fd.get("all") || "") === "1";
  }

  if (!Number.isFinite(year) || year < 1900 || year > 2100) {
    return NextResponse.json({ error: "year noto‘g‘ri" }, { status: 400, headers: CORS });
  }

  const db = await readDB<DB>("timeline", { items: [] });
  const idx = db.items.findIndex((x) => x.year === year);

  // ---- DELETE
  if (action === "delete") {
    if (idx === -1) return NextResponse.json({ error: "Topilmadi" }, { status: 404, headers: CORS });

    if (all || !lang) {
      db.items.splice(idx, 1);
    } else {
      db.items[idx].translations[lang] = {};
      const stillHas = (["uz", "ru", "en"] as Lang[]).some((l) => db.items[idx].translations[l]?.text);
      if (!stillHas) db.items.splice(idx, 1);
    }

    await writeDB("timeline", db);
    return NextResponse.json({ ok: true, deleted: all ? "all" : lang }, { headers: CORS });
  }

  // ---- UPSERT
  let item = db.items[idx];
  if (!item) {
    item = { id: randomUUID(), year, translations: { uz: {}, ru: {}, en: {} } };
    db.items.push(item);
  }
  item.translations[lang] = { text };
  db.items.sort((a, b) => a.year - b.year);

  await writeDB("timeline", db);
  return NextResponse.json({ ok: true, year }, { headers: CORS });
}
