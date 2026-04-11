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

// Google Font ID -> CSS font-family stack
// Fonts are loaded via Google Fonts CDN <link> in layout.tsx (only active 3).
const FONT_ID_TO_FAMILY: Record<string, string> = {
  "Cormorant_Garamond": "'Cormorant Garamond', serif",
  "Inter": "'Inter', sans-serif",
  "Jost": "'Jost', sans-serif",
  "Sora": "'Sora', sans-serif",
  "DM_Serif_Display": "'DM Serif Display', serif",
  "Lora": "'Lora', serif",
  "Space_Grotesk": "'Space Grotesk', sans-serif",
  "Outfit": "'Outfit', sans-serif",
  "JetBrains_Mono": "'JetBrains Mono', monospace",
  "Playfair_Display": "'Playfair Display', serif",
  "Caveat": "'Caveat', cursive",
  "Fraunces": "'Fraunces', serif",
  "Manrope": "'Manrope', sans-serif",
  "Bebas_Neue": "'Bebas Neue', sans-serif",
  "Montserrat": "'Montserrat', sans-serif",
  "IBM_Plex_Sans": "'IBM Plex Sans', sans-serif",
  "Cardo": "'Cardo', serif",
  "Oswald": "'Oswald', sans-serif",
  "Work_Sans": "'Work Sans', sans-serif",
  "Quicksand": "'Quicksand', sans-serif",
  "Poppins": "'Poppins', sans-serif",
  "Nunito": "'Nunito', sans-serif",
  "Marcellus": "'Marcellus', serif",
  "Roboto_Slab": "'Roboto Slab', serif",
  "Italiana": "'Italiana', serif",
  "Bodoni_Moda": "'Bodoni Moda', serif",
  "Libre_Bodoni": "'Bodoni Moda', serif",
  "Cinzel": "'Cinzel', serif",
  "Abril_Fatface": "'Abril Fatface', serif",
  "Raleway": "'Raleway', sans-serif",
  "Crimson_Pro": "'Crimson Pro', serif",
  "Archivo_Black": "'Archivo Black', sans-serif",
  "Josefin_Sans": "'Josefin Sans', sans-serif",
  "Source_Serif_4": "'Source Serif 4', serif",
  "Bitter": "'Bitter', serif",
  "Tenor_Sans": "'Tenor Sans', sans-serif",
  "Vollkorn": "'Vollkorn', serif",
  "Rubik": "'Rubik', sans-serif",
  "Spectral": "'Spectral', serif",
  "Libre_Franklin": "'Libre Franklin', sans-serif",
  "Merriweather": "'Merriweather', serif",
  "Barlow": "'Barlow', sans-serif",
  "Barlow_Condensed": "'Barlow Condensed', sans-serif",
  "Righteous": "'Righteous', sans-serif",
  "Comfortaa": "'Comfortaa', sans-serif",
  "Sacramento": "'Sacramento', cursive",
  "Archivo": "'Archivo', sans-serif",
  "Exo_2": "'Exo 2', sans-serif",
  "Urbanist": "'Urbanist', sans-serif",
  "Figtree": "'Figtree', sans-serif",
  "Plus_Jakarta_Sans": "'Plus Jakarta Sans', sans-serif",
  "Red_Hat_Display": "'Red Hat Display', sans-serif",
  "Instrument_Serif": "'Instrument Serif', serif",
  "DM_Sans": "'DM Sans', sans-serif",
  "Noto_Serif_Display": "'Noto Serif Display', serif",
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
    const family = FONT_ID_TO_FAMILY[googleId];
    if (family) {
      styles[`--font-${role}`] = family;
    }
  }

  return styles as React.CSSProperties;
}

export function getThemeDataAttributes(): Record<string, string> {
  const theme = getActiveTheme();
  return { "data-theme-id": theme.id, "data-theme-name": theme.name };
}
