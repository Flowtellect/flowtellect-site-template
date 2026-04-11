// ─── Theme System ────────────────────────────────────────────────────────────
// Reads content/theme.json at build time and generates CSS variables + font
// mappings. Used by app/layout.tsx to apply theme to <html>.

import fs from "fs";
import path from "path";

export interface PublishedThemeJson {
  id: string;
  name: string;
  tokens: Record<string, string>;
  fonts: {
    display: { family: string; googleId: string };
    body:    { family: string; googleId: string };
    accent:  { family: string; googleId: string };
  };
  geometry: Record<string, string | number>;
}

const THEME_PATH = path.join(process.cwd(), "content", "theme.json");

// Default fallback if theme.json doesn't exist yet
const DEFAULT_THEME: PublishedThemeJson = {
  id: "default",
  name: "Default",
  tokens: {
    "color-bg": "250 250 247",
    "color-bg-alt": "240 238 230",
    "color-surface": "255 255 255",
    "color-surface-deep": "230 228 220",
    "color-text-primary": "26 26 46",
    "color-text-muted": "90 90 114",
    "color-text-dim": "136 136 160",
    "color-accent": "99 102 241",
    "color-accent-light": "136 138 248",
    "color-accent-dark": "67 70 210",
    "color-on-accent": "255 255 255",
    "color-border": "224 222 214",
    "color-border-soft": "238 236 228",
  },
  fonts: {
    display: { family: "Inter", googleId: "Inter" },
    body:    { family: "Inter", googleId: "Inter" },
    accent:  { family: "Inter", googleId: "Inter" },
  },
  geometry: { "radius-base": "12px" },
};

export function getActiveTheme(): PublishedThemeJson {
  try {
    const raw = fs.readFileSync(THEME_PATH, "utf-8");
    return JSON.parse(raw) as PublishedThemeJson;
  } catch {
    return DEFAULT_THEME;
  }
}

// Google Font ID -> CSS variable name mapping
const FONT_ID_TO_VAR: Record<string, string> = {
  "Cormorant_Garamond": "--font-cormorant",
  "Inter": "--font-inter",
  "Jost": "--font-jost",
  "Sora": "--font-sora",
  "DM_Serif_Display": "--font-dm-serif",
  "Lora": "--font-lora",
  "Space_Grotesk": "--font-space-grotesk",
  "Outfit": "--font-outfit",
  "JetBrains_Mono": "--font-jetbrains",
  "Playfair_Display": "--font-playfair",
  "Caveat": "--font-caveat",
  "Fraunces": "--font-fraunces",
  "Manrope": "--font-manrope",
  "Bebas_Neue": "--font-bebas",
  "Montserrat": "--font-montserrat",
  "IBM_Plex_Sans": "--font-ibm-plex",
  "Cardo": "--font-cardo",
  "Oswald": "--font-oswald",
  "Work_Sans": "--font-work-sans",
  "Quicksand": "--font-quicksand",
  "Poppins": "--font-poppins",
  "Nunito": "--font-nunito",
  "Marcellus": "--font-marcellus",
  "Roboto_Slab": "--font-roboto-slab",
  "Italiana": "--font-italiana",
  "Bodoni_Moda": "--font-bodoni",
  "Libre_Bodoni": "--font-bodoni",
  "Cinzel": "--font-cinzel",
  "Abril_Fatface": "--font-abril",
  "Raleway": "--font-raleway",
  "Crimson_Pro": "--font-crimson",
  "Archivo_Black": "--font-archivo-black",
  "Josefin_Sans": "--font-josefin",
  "Source_Serif_4": "--font-source-serif",
  "Bitter": "--font-bitter",
  "Tenor_Sans": "--font-tenor",
  "Vollkorn": "--font-vollkorn",
  "Rubik": "--font-rubik",
  "Spectral": "--font-spectral",
  "Libre_Franklin": "--font-libre-franklin",
  "Merriweather": "--font-merriweather",
  "Barlow": "--font-barlow",
  "Barlow_Condensed": "--font-barlow-condensed",
  "Righteous": "--font-righteous",
  "Comfortaa": "--font-comfortaa",
  "Sacramento": "--font-sacramento",
  "Archivo": "--font-archivo",
  "Exo_2": "--font-exo2",
  "Urbanist": "--font-urbanist",
  "Figtree": "--font-figtree",
  "Plus_Jakarta_Sans": "--font-jakarta",
  "Red_Hat_Display": "--font-red-hat",
  "Instrument_Serif": "--font-instrument",
  "DM_Sans": "--font-dm-sans",
  "Noto_Serif_Display": "--font-noto-serif",
};

export function getThemeStyleObject(): React.CSSProperties {
  const theme = getActiveTheme();
  const styles: Record<string, string> = {};

  // Color tokens
  for (const [name, value] of Object.entries(theme.tokens)) {
    styles[`--${name}`] = value;
  }

  // Geometry
  for (const [name, value] of Object.entries(theme.geometry)) {
    if (typeof value === "string") {
      styles[`--${name}`] = value;
    }
  }

  return styles as React.CSSProperties;
}

export function getThemeFontStyleObject(): React.CSSProperties {
  const theme = getActiveTheme();
  const styles: Record<string, string> = {};

  for (const role of ["display", "body", "accent"] as const) {
    const googleId = theme.fonts[role]?.googleId;
    if (!googleId) continue;
    const cssVar = FONT_ID_TO_VAR[googleId];
    if (cssVar) {
      styles[`--font-${role}`] = `var(${cssVar})`;
    }
  }

  return styles as React.CSSProperties;
}

export function getThemeDataAttributes(): Record<string, string> {
  const theme = getActiveTheme();
  return { "data-theme-id": theme.id, "data-theme-name": theme.name };
}
