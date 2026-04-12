// ─── SectionRenderer ─────────────────────────────────────────────────────────
// Universal section renderer. Uses GenericSection for ALL variants.
// No hardcoded components - everything is rendered dynamically.

import GenericSection from "./sections/GenericSection";

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
  const rendered = <GenericSection variant={section.variant} content={section.content} />;

  // Wrap in div with anchor ID for smooth scroll navigation
  if (overrideStyle || anchorId) {
    return <div id={anchorId} style={overrideStyle}>{rendered}</div>;
  }

  return rendered;
}
