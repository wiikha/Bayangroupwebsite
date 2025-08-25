import { NextResponse } from "next/server";

export const ADMIN_USER = "admin1_bayangroup";
export const ADMIN_PASS = "b1a2y3a4n5";
const COOKIE = "bg_admin";

export function isAdmin(req: Request): boolean {
  const c = req.headers.get("cookie") || "";
  return c.includes(`${COOKIE}=1`);
}

export function requireAdmin(req: Request) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export function loginResponse() {
  const res = NextResponse.json({ ok: true });
  res.headers.set(
    "Set-Cookie",
    `${COOKIE}=1; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`
  );
  return res;
}

export function logoutResponse() {
  const res = NextResponse.json({ ok: true });
  res.headers.set(
    "Set-Cookie",
    `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`
  );
  return res;
}
