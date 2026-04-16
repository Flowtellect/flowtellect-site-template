// ─── designStyles ────────────────────────────────────────────────────────────
//
// Mapping funkcji z DesignDecisions -> React.CSSProperties. Uzywane w Showcase
// components (useDesign() -> spread do style={}). Zero tailwind classes — czysty
// inline style, bo wartosci zaleza od runtime config (cardStyle, buttonStyle).
//
// Wszystkie wartosci korzystaja z design token CSS vars (rgba(var(--color-X)),
// var(--shadow-Y), var(--radius-Z)) — spojne z Fazy 1 token system.

import type { CSSProperties } from "react";
import type { DesignDecisions } from "@/lib/designDecisions";

// ─── Card ───────────────────────────────────────────────────────────────────

export function getCardStyle(dd: DesignDecisions): CSSProperties {
  switch (dd.cardStyle) {
    case "flat":
      return {
        background: "rgb(var(--color-bg))",
        border: "none",
        boxShadow: "none",
      };
    case "elevated":
      return {
        background: "rgb(var(--color-bg))",
        border: "1px solid rgb(var(--color-border-soft))",
        boxShadow: "var(--shadow-md)",
      };
    case "outlined":
      return {
        background: "rgb(var(--color-bg))",
        border: "2px solid rgb(var(--color-border))",
        boxShadow: "none",
      };
    case "glass":
      return {
        background: "rgba(var(--color-bg), 0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(var(--color-border-soft), 0.5)",
        boxShadow: "var(--shadow-lg)",
      };
    case "gradient":
      return {
        background:
          "linear-gradient(135deg, rgb(var(--color-bg)), rgb(var(--color-bg-alt)))",
        border: "1px solid rgb(var(--color-border-soft))",
        boxShadow: "var(--shadow-md)",
      };
  }
}

/** Hover state delta for card — add on mouse enter. Returns boxShadow + border. */
export function getCardHoverStyle(dd: DesignDecisions): {
  boxShadow: string;
  borderColor: string;
  transform: string;
} {
  const lift =
    dd.animationLevel === "minimal"
      ? "translateY(0)"
      : dd.animationLevel === "expressive"
      ? "translateY(-4px)"
      : "translateY(-2px)";
  return {
    boxShadow: dd.cardStyle === "glass" ? "var(--shadow-xl)" : "var(--shadow-lg)",
    borderColor: "rgb(var(--color-accent))",
    transform: lift,
  };
}

// ─── Button ─────────────────────────────────────────────────────────────────

export function getButtonRadius(dd: DesignDecisions): string {
  if (dd.buttonStyle === "pill") return "var(--radius-full)";
  if (dd.buttonStyle === "sharp") return "0";
  return "var(--radius-md)";
}

export function getButtonStyle(
  dd: DesignDecisions,
  variant: "primary" | "secondary" | "ghost" = "primary",
): CSSProperties {
  const base: CSSProperties = {
    padding: "var(--space-md, 16px) var(--space-xl, 32px)",
    fontSize: "var(--text-sm)",
    fontWeight: 600,
    fontFamily: "var(--font-body)",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: getButtonRadius(dd),
    transition: "all var(--duration-fast) var(--ease-default)",
  };

  if (variant === "ghost") {
    return {
      ...base,
      background: "transparent",
      color: "rgb(var(--color-accent))",
      border: "none",
    };
  }

  if (variant === "secondary") {
    return {
      ...base,
      background: "transparent",
      color: "rgb(var(--color-text-primary))",
      border: "1px solid rgb(var(--color-border))",
    };
  }

  // Primary — buttonStyle decyduje o wypelnieniu
  if (dd.buttonStyle === "outline") {
    return {
      ...base,
      background: "transparent",
      color: "rgb(var(--color-accent))",
      border: "2px solid rgb(var(--color-accent))",
    };
  }
  if (dd.buttonStyle === "ghost") {
    return {
      ...base,
      background: "rgba(var(--color-accent), 0.1)",
      color: "rgb(var(--color-accent))",
      border: "none",
    };
  }
  // solid / pill / sharp — filled with accent
  return {
    ...base,
    background: "rgb(var(--color-accent))",
    color: "rgb(var(--color-on-accent))",
    border: "none",
    boxShadow:
      dd.animationLevel !== "minimal" ? "var(--shadow-accent)" : "none",
  };
}

// ─── Image ──────────────────────────────────────────────────────────────────

export function getImageTreatment(dd: DesignDecisions): CSSProperties {
  switch (dd.imageTreatment) {
    case "raw":
      return { borderRadius: "0" };
    case "rounded":
      return { borderRadius: "var(--radius-lg)" };
    case "framed":
      return {
        borderRadius: "var(--radius-md)",
        padding: "8px",
        background: "rgb(var(--color-bg-alt))",
      };
    case "duotone":
      return {
        borderRadius: "var(--radius-lg)",
        filter: "grayscale(0.3) sepia(0.1)",
      };
    case "overlay":
      return { borderRadius: "var(--radius-lg)" };
  }
}

// ─── Section ────────────────────────────────────────────────────────────────

export function getSectionPadding(dd: DesignDecisions): string {
  switch (dd.visualDensity) {
    case "airy":
      return "var(--space-section, 120px) 0";
    case "balanced":
      return "var(--space-section, 96px) 0";
    case "compact":
      return "var(--space-section, 72px) 0";
  }
}

/** Bg gradient for nth section based on rhythm preference. index 0-based. */
export function getSectionBg(
  dd: DesignDecisions,
  index: number,
  isFirst = false,
): string {
  if (isFirst) return "rgb(var(--color-bg))";

  switch (dd.sectionRhythm) {
    case "monotone":
      return "rgb(var(--color-bg))";
    case "alternating":
      return index % 2 === 0
        ? "rgb(var(--color-bg))"
        : "rgb(var(--color-bg-alt))";
    case "accented":
      if (index % 3 === 2) {
        return "linear-gradient(135deg, rgb(var(--color-accent)), rgb(var(--color-accent-dark)))";
      }
      return index % 2 === 0
        ? "rgb(var(--color-bg))"
        : "rgb(var(--color-bg-alt))";
    case "gradient":
      return "linear-gradient(180deg, rgb(var(--color-bg)) 0%, rgb(var(--color-bg-alt)) 100%)";
  }
}

// ─── Animation ──────────────────────────────────────────────────────────────

export function getAnimationDelay(
  dd: DesignDecisions,
  baseDelay: number,
): number {
  switch (dd.animationLevel) {
    case "minimal":
      return 0;
    case "subtle":
      return baseDelay;
    case "expressive":
      return Math.round(baseDelay * 1.5);
  }
}

export function shouldAnimate(dd: DesignDecisions): boolean {
  return dd.animationLevel !== "minimal";
}

// ─── Typography ─────────────────────────────────────────────────────────────

export function getTypographyStyle(
  dd: DesignDecisions,
  variant: "hero" | "heading" | "body",
): CSSProperties {
  const base: CSSProperties = {};

  if (variant === "hero" || variant === "heading") {
    if (
      dd.typographyPairing === "editorial" ||
      dd.typographyPairing === "bold"
    ) {
      base.letterSpacing = "var(--tracking-tight)";
      base.fontWeight = 700;
    }
    if (dd.typographyPairing === "classic") {
      base.fontWeight = 600;
      base.letterSpacing = "-0.01em";
    }
    if (dd.typographyPairing === "playful") {
      base.fontWeight = 800;
    }
    if (dd.typographyPairing === "modern") {
      base.fontWeight = 600;
      base.letterSpacing = "var(--tracking-tight)";
    }
  }

  return base;
}
