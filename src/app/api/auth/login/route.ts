export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { ADMIN_PASS, ADMIN_USER, loginResponse } from "../../_lib/auth";

export async function POST(req: Request) {
  const ct = req.headers.get("content-type") || "";
  let username = "", password = "";
  if (ct.includes("application/json")) {
    const b = await req.json();
    username = b.username || "";
    password = b.password || "";
  } else {
    const fd = await req.formData();
    username = String(fd.get("username") || "");
    password = String(fd.get("password") || "");
  }
  if (username === ADMIN_USER && password === ADMIN_PASS) return loginResponse();
  return NextResponse.json({ error: "Bad credentials" }, { status: 401 });
}
