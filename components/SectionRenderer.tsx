// ─── SectionRenderer ─────────────────────────────────────────────────────────
// Two-tier renderer:
//   Tier 1 (Showcase): dedykowany pixel-perfect komponent z components/showcase/.
//     Wybierany przez variant_id w SHOWCASE_MAP. Code-split przez next/dynamic —
//     KB nie laduje sie na strony ktore tego wariantu nie uzywaja.
//   Tier 2/3 (Generic): GenericSection renderuje wszystkie pozostale warianty
//     z section-registry przez schema-driven layout.
//
// Showcase komponenty maja wlasne <section>, FadeIn animacje, accent decorations
// — wiec dla nich pomijamy ScrollReveal wrapper. Anchor id (do scroll-to + global
// [id="hero"]::before stylizacji) ustawiamy zawsze, bo dotyczy obu tierow.

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import GenericSection from "./sections/GenericSection";
import { ScrollReveal } from "./sections/ClientComponents";

// ─── Tier 1 routing — Showcase components ────────────────────────────────────
// Mapuje variant_id -> dynamic component. Brak wpisu = fallback na GenericSection.
type ShowcaseProps = { content: Record<string, unknown> };
const SHOWCASE_MAP: Record<string, ComponentType<ShowcaseProps>> = {
  // Heroes
  hero_immersive: dynamic(() => import("./showcase/HeroImmersive")),
  hero_split:     dynamic(() => import("./showcase/HeroSplit")),
  hero_minimal:   dynamic(() => import("./showcase/HeroMinimal")),
  // CTA
  cta_banner:     dynamic(() => import("./showcase/CTABanner")),
  // Services
  services_feature_grid: dynamic(() => import("./showcase/ServicesFeatureGrid")),
  // Testimonials
  testimonials_carousel: dynamic(() => import("./showcase/TestimonialsCarousel")),
  // Stats
  stats_counter:  dynamic(() => import("./showcase/StatsCounter")),
  // About
  about_story:    dynamic(() => import("./showcase/AboutStory")),
  // Gallery
  gallery_masonry: dynamic(() => import("./showcase/GalleryMasonry")),
  // Footer
  footer_mega:    dynamic(() => import("./showcase/FooterMega")),
  // Navbar
  navbar_smart:   dynamic(() => import("./showcase/NavbarSmart")),
};

interface ThemeOverrides {
  bg?: string | null;
  accent?: string | null;
  text?: string | null;
}

const OVERRIDE_TO_CSS_VARS: Record<keyof ThemeOverrides, string[]> = {
  bg: ["--color-bg", "--color-bg-alt"],
  accent: ["--color-accent", "--color-accent-light", "--color-accent-dark"],
  text: ["--color-text-primary"],
};

function buildOverrideStyle(overrides: ThemeOverrides | null | undefined): React.CSSProperties | undefined {
  if (!overrides) return undefined;
  const style: Record<string, string> = {};
  let hasAny = false;
  for (const [key, cssVars] of Object.entries(OVERRIDE_TO_CSS_VARS)) {
    const value = overrides[key as keyof ThemeOverrides];
    if (value) {
      for (const cssVar of cssVars) {
        style[cssVar] = value;
      }
      hasAny = true;
    }
  }
  return hasAny ? (style as React.CSSProperties) : undefined;
}

// Map variant category to section anchor ID for smooth scroll
function getSectionAnchorId(variant: string): string | undefined {
  const category = variant.replace(/_\d+$/, "");
  // Navbar and footer don't need anchors
  if (category === "navbar" || category === "footer") return undefined;
  return category;
}

export default function SectionRenderer({
  section,
}: {
  section: {
    id: string;
    variant: string;
    visible: boolean;
    content: Record<string, unknown>;
    theme_overrides?: ThemeOverrides | null;
  };
}) {
  if (!section.visible) return null;

  const overrideStyle = buildOverrideStyle(section.theme_overrides);
  const anchorId = getSectionAnchorId(section.variant);
  const category = section.variant.replace(/_\d+$/, "");

  // Tier 1: Showcase — wlasne <section>, wlasne FadeIn, wlasny padding.
  // Pomijamy ScrollReveal (duplikat animacji), ale anchor + override stosuje.
  const ShowcaseComponent = SHOWCASE_MAP[section.variant];
  if (ShowcaseComponent) {
    const showcase = <ShowcaseComponent content={section.content} />;
    if (overrideStyle || anchorId) {
      return <div id={anchorId} style={overrideStyle}>{showcase}</div>;
    }
    return showcase;
  }

  // Tier 2/3: Generic — schema-driven, owinieta ScrollReveal (poza navbar/footer).
  const rendered = <GenericSection variant={section.variant} content={section.content} />;
  const skipAnimation = category === "navbar" || category === "footer";
  const content = skipAnimation ? rendered : (
    <ScrollReveal duration={0.7} distance={20}>
      {rendered}
    </ScrollReveal>
  );

  if (overrideStyle || anchorId) {
    return <div id={anchorId} style={overrideStyle}>{content}</div>;
  }

  return content;
}
