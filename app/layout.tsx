import type { Metadata } from "next";
import { getThemeStyleObject, getThemeFontStyleObject, getThemeDataAttributes, getActiveTheme } from "@/lib/applyTheme";
import PreviewListener from "@/components/PreviewListener";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

// Dynamiczny tytul z flowtellect.config.json lub homepage meta
function getSiteTitle(): string {
  try {
    const fs = require("fs");
    const path = require("path");
    const configPath = path.join(process.cwd(), "flowtellect.config.json");
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
      if (config.siteName) return config.siteName;
    }
    const homePath = path.join(process.cwd(), "content", "homepage.json");
    if (fs.existsSync(homePath)) {
      const home = JSON.parse(fs.readFileSync(homePath, "utf-8"));
      if (home.meta?.title && home.meta.title !== "Strona glowna") return home.meta.title;
    }
  } catch { /* fallback */ }
  return "Strona";
}

export const metadata: Metadata = {
  title: getSiteTitle(),
  description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = getActiveTheme();
  const themeStyle = { ...getThemeStyleObject(), ...getThemeFontStyleObject() };
  const themeDataAttrs = getThemeDataAttributes();

  // Build Google Fonts <link> URL - only the 3 fonts this theme actually uses
  const fontFamilies = new Set<string>();
  for (const role of ["display", "body", "accent"] as const) {
    const family = theme.fonts[role]?.family;
    if (family) fontFamilies.add(family);
  }
  const googleFontsUrl = fontFamilies.size > 0
    ? `https://fonts.googleapis.com/css2?${Array.from(fontFamilies)
        .map((f) => `family=${f.replace(/ /g, "+")}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700`)
        .join("&")}&display=swap`
    : null;

  return (
    <html lang="pl" style={themeStyle} {...themeDataAttrs}>
      <head>
        {googleFontsUrl && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            <link href={googleFontsUrl} rel="stylesheet" />
          </>
        )}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="bg-bg text-primary font-body antialiased">
        <PreviewListener />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
