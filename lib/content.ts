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
  /** Utility pages (polityka prywatnosci, regulamin) maja type='utility'
   *  i body_content (markdown) zamiast sections. */
  type?: "content" | "utility";
  body_content?: string;
}

export interface PageManifestEntry {
  slug: string;
  title: string;
  type?: "content" | "utility";
}

/** Read a page JSON. Returns null if file doesn't exist (graceful).
 *  Fallbacks sections to [] for utility pages (they don't have any). */
export function readPage(slug: string): PageData | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.json`);
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const parsed = JSON.parse(raw) as PageData;
    if (!Array.isArray(parsed.sections)) parsed.sections = [];
    return parsed;
  } catch {
    return null;
  }
}

/** Non-throwing alias; `readPage` already doesn't throw. */
export function tryReadPage(slug: string): PageData | null {
  return readPage(slug);
}

export interface BusinessData {
  brandName: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  openingHours: string | null;
}

/** Extract contact/brand details from page sections for JSON-LD LocalBusiness
 *  schema. Returns null fields when not present - caller decides whether to
 *  render JsonLd at all. */
export function extractBusinessData(page: PageData): BusinessData {
  const str = (v: unknown): string | null => {
    if (typeof v !== "string") return null;
    const t = v.trim();
    return t.length > 0 ? t : null;
  };

  const nav = page.sections.find((s) => s.variant.startsWith("navbar"));
  const footer = page.sections.find((s) => s.variant.startsWith("footer"));
  const contact = page.sections.find((s) => s.variant.startsWith("contact"));

  const nc = (nav?.content ?? {}) as Record<string, unknown>;
  const fc = (footer?.content ?? {}) as Record<string, unknown>;
  const cc = (contact?.content ?? {}) as Record<string, unknown>;

  return {
    brandName: str(nc.brand_name) ?? str(fc.brand_name) ?? str(nc.company_name),
    phone: str(cc.phone) ?? str(fc.phone),
    email: str(cc.email) ?? str(fc.email),
    address: str(cc.address) ?? str(fc.address),
    openingHours: str(cc.hours) ?? str(cc.opening_hours) ?? str(cc.opening_hours_text) ?? str(fc.hours),
  };
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
