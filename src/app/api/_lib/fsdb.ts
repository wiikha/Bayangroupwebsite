import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
async function ensureDir() { await fs.mkdir(DATA_DIR, { recursive: true }); }
async function filePath(name: string) {
  await ensureDir();
  return path.join(DATA_DIR, `${name}.json`);
}

export async function readDB<T>(name: string, fallback: T): Promise<T> {
  const p = await filePath(name);
  try {
    const s = await fs.readFile(p, "utf8");
    return JSON.parse(s) as T;
  } catch {
    await writeDB(name, fallback);
    return fallback;
  }
}
export async function writeDB<T>(name: string, data: T) {
  const p = await filePath(name);
  await fs.writeFile(p, JSON.stringify(data, null, 2), "utf8");
}
