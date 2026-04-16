"use client";

// ─── TextReveal (per-word scroll-driven reveal) ──────────────────────────────
//
// Opakowuje tekst w <span> per slowo. CSS (.anim-text-reveal span w globals.css)
// odpala wordReveal keyframes z scroll-timeline view(). Stagger realizowany przez
// inline animationDelay per slowo (scroll-driven szanuje delay jako time offset
// w zakresie animation-range).
//
// Use gate: tylko gdy dd.animationLevel !== 'minimal'. Fallback (browsery bez
// scroll-timeline): tekst pokazany od razu (keyframes ignored bez timeline).

import type { CSSProperties, ElementType } from "react";

interface Props {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  style?: CSSProperties;
  /** Delay between words in ms (default 30ms) */
  stagger?: number;
}

export default function TextReveal({
  text,
  as = "h2",
  className = "",
  style,
  stagger = 30,
}: Props) {
  const words = text.split(/\s+/).filter(Boolean);
  const Tag = as as ElementType;

  return (
    <Tag className={`anim-text-reveal ${className}`} style={style}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            animationDelay: `${i * stagger}ms`,
            marginRight: "0.3em",
          }}
        >
          {word}
        </span>
      ))}
    </Tag>
  );
}
