// ─── Design Decisions (client-safe) ──────────────────────────────────────────
//
// Typ + defaults wyekstrahowane z applyTheme.ts bo ten uzywa `fs` (server-only).
// Client components (DesignContext, Showcase components) importuja stad —
// applyTheme.ts tez reexportuje dla spojnosci API po stronie serwera.

export interface DesignDecisions {
  colorTemperature: "warm" | "cool" | "neutral" | "dark";
  typographyPairing: "editorial" | "modern" | "classic" | "playful" | "bold";
  visualDensity: "airy" | "balanced" | "compact";
  imageTreatment: "raw" | "rounded" | "duotone" | "overlay" | "framed";
  cardStyle: "flat" | "elevated" | "outlined" | "glass" | "gradient";
  buttonStyle: "solid" | "outline" | "ghost" | "pill" | "sharp";
  sectionRhythm: "monotone" | "alternating" | "accented" | "gradient";
  animationLevel: "minimal" | "subtle" | "expressive";
  layoutMode: "symmetric" | "asymmetric" | "bento" | "editorial";
  brandPersonality: "formal" | "casual" | "luxurious" | "playful" | "minimal";
}

export const DEFAULT_DESIGN_DECISIONS: DesignDecisions = {
  colorTemperature: "neutral",
  typographyPairing: "modern",
  visualDensity: "balanced",
  imageTreatment: "rounded",
  cardStyle: "elevated",
  buttonStyle: "solid",
  sectionRhythm: "alternating",
  animationLevel: "subtle",
  layoutMode: "symmetric",
  brandPersonality: "casual",
};
