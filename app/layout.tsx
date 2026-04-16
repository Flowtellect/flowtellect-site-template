import type { Metadata } from "next";
import {
  getThemeStyleObject,
  getThemeFontStyleObject,
  getThemeDataAttributes,
  getActiveTheme,
  getFaviconUrl,
  getDesignDecisions,
} from "@/lib/applyTheme";
import PreviewListener from "@/components/PreviewListener";
import ScrollToTop from "@/components/ScrollToTop";
import Preloader from "@/components/Preloader";
import CookieConsent from "@/components/CookieConsent";
import { DesignProvider } from "@/components/showcase/DesignContext";
import "./globals.css";

// Dynamiczny tytul + opis z homepage.json meta
function getSiteMeta(): { title: string; description: string } {
  try {
    const fs = require("fs");
    const path = require("path");
    let title = "Strona";
    let description = "";

    const configPath = path.join(process.cwd(), "flowtellect.config.json");
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
      if (config.siteName) title = config.siteName;
    }

    const homePath = path.join(process.cwd(), "content", "homepage.json");
    if (fs.existsSync(homePath)) {
      const home = JSON.parse(fs.readFileSync(homePath, "utf-8"));
      if (home.meta?.title && home.meta.title !== "Strona glowna") title = home.meta.title;
      if (home.meta?.description) description = home.meta.description;
    }

    return { title, description };
  } catch { /* fallback */ }
  return { title: "Strona", description: "" };
}

// Dynamic metadata: static export zastapiony generateMetadata zeby custom
// favicon z theme.json (Supabase Storage URL) + OG image byly injected w <head>.
export function generateMetadata(): Metadata {
  const siteMeta = getSiteMeta();
  const faviconUrl = getFaviconUrl();
  return {
    title: siteMeta.title,
    description: siteMeta.description,
    openGraph: {
      type: "website",
      title: siteMeta.title,
      description: siteMeta.description,
      images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: siteMeta.title,
      description: siteMeta.description,
      images: ["/og-image.svg"],
    },
    icons: faviconUrl ? { icon: faviconUrl } : { icon: "/favicon.svg" },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = getActiveTheme();
  const themeStyle = { ...getThemeStyleObject(), ...getThemeFontStyleObject() };
  const themeDataAttrs = getThemeDataAttributes();
  const designDecisions = getDesignDecisions();

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
      </head>
      <body className="bg-bg text-primary font-body antialiased">
        <DesignProvider decisions={designDecisions}>
          <a href="#main-content" className="skip-to-content">
            Przejdź do treści
          </a>
          <Preloader />
          <PreviewListener />
          {children}
          <ScrollToTop />
          <CookieConsent />
        </DesignProvider>
      </body>
    </html>
  );
}
