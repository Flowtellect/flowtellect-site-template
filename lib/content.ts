// ─── Content Reader ──────────────────────────────────────────────────────────
// Reads JSON files from content/ directory at build time (SSG).
// All pages are statically generated from pages-manifest.json.

import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface PageSection {
  id: string;
  variant: string;
  content: Record<string, unknown>;
  visible: boolean;
  theme_overrides?: { bg?: string | null; accent?: string | null; text?: string | null } | null;
}

export interface PageData {
  meta: { title: string; description: string };
  sections: PageSection[];
}

export interface PageManifestEntry {
  slug: string;
  title: string;
}

/** Read a page JSON. Returns null if file doesn't exist (graceful). */
export function readPage(slug: string): PageData | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.json`);
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as PageData;
  } catch {
    return null;
  }
}

/** Read pages-manifest.json. Returns empty array if missing. */
export function readPagesManifest(): PageManifestEntry[] {
  try {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, "pages-manifest.json"), "utf-8");
    const data = JSON.parse(raw) as { pages: PageManifestEntry[] };
    return data.pages ?? [];
  } catch {
    return [];
  }
}

/** Get all page slugs for static generation. */
export function getAllPageSlugs(): string[] {
  const manifest = readPagesManifest();
  return manifest.map((p) => p.slug).filter((s) => s !== "homepage");
}
