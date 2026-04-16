import Link from "next/link";
import { getDesignDecisions } from "@/lib/applyTheme";

// ─── 404 — archetype-personalized + auto-reload fallback ─────────────────────
//
// Server component czyta brandPersonality z theme.json (faza visual_intelligence)
// i dobiera komunikat dopasowany do tonu marki. Inline script utrzymuje
// historyczne zachowanie: podczas Netlify build (pierwsze ~60-90s po publish)
// KAZDY URL to 404 — refresh co 15s upewnia ze klient trafi na gotowa strone
// bez manualnego F5.

interface Variant {
  emoji: string;
  title: string;
  body: string;
}

// Mapowanie brandPersonality → komunikat. Spojne z tonem marki z brand_voice phase.
const MESSAGES: Record<string, Variant> = {
  luxurious: {
    emoji: "✦",
    title: "Ta strona nie istnieje",
    body: "Zapraszamy do odkrycia naszej pełnej oferty.",
  },
  formal: {
    emoji: "⚠",
    title: "Strona nie została znaleziona",
    body: "Prosimy skorzystać z nawigacji lub wrócić na stronę główną.",
  },
  casual: {
    emoji: "🧭",
    title: "Ups, zgubiliśmy tę stronę",
    body: "Ale wszystko inne czeka na Ciebie — wróć na główną.",
  },
  playful: {
    emoji: "🎨",
    title: "Ta kartka jest jeszcze pusta",
    body: "Ale mamy kupę innych ciekawych rzeczy do pokazania!",
  },
  minimal: {
    emoji: "·",
    title: "404",
    body: "Strony nie ma.",
  },
  default: {
    emoji: "✦",
    title: "Strony nie znaleziono",
    body: "Strona mogła zostać przeniesiona lub usunięta.",
  },
};

function pickVariant(): Variant {
  try {
    const dd = getDesignDecisions();
    return MESSAGES[dd.brandPersonality] ?? MESSAGES.default;
  } catch {
    return MESSAGES.default;
  }
}

export default function NotFound() {
  const msg = pickVariant();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgb(var(--color-bg, 255 255 255))",
        color: "rgb(var(--color-text-primary, 15 15 20))",
        fontFamily: "var(--font-body, system-ui)",
        padding: "var(--space-section, 96px) var(--space-lg, 24px)",
        textAlign: "center",
      }}
    >
      {/* Auto-reload przez pierwsze minuty po publish (Netlify build in-flight).
          Inline script zeby server component nie musial importowac useEffect. */}
      <script
        dangerouslySetInnerHTML={{
          __html: "setInterval(function(){location.reload()},15000);",
        }}
      />

      <div
        style={{
          fontSize: "4rem",
          marginBottom: "var(--space-lg, 24px)",
          lineHeight: 1,
        }}
      >
        {msg.emoji}
      </div>

      <h1
        style={{
          fontSize: "var(--text-3xl, clamp(1.75rem, 3vw, 2.5rem))",
          fontWeight: 700,
          fontFamily: "var(--font-display, system-ui)",
          marginBottom: "var(--space-md, 16px)",
          letterSpacing: "var(--tracking-tight, -0.02em)",
          lineHeight: "var(--leading-tight, 1.2)",
        }}
      >
        {msg.title}
      </h1>

      {msg.body && (
        <p
          style={{
            fontSize: "var(--text-lg, 1.125rem)",
            color: "rgba(var(--color-text-primary, 15 15 20), 0.65)",
            maxWidth: "48ch",
            lineHeight: "var(--leading-normal, 1.6)",
            margin: 0,
          }}
        >
          {msg.body}
        </p>
      )}

      <Link
        href="/"
        style={{
          marginTop: "var(--space-2xl, 48px)",
          display: "inline-flex",
          alignItems: "center",
          padding: "var(--space-md, 16px) var(--space-xl, 32px)",
          borderRadius: "var(--radius-md, 10px)",
          background: "rgb(var(--color-accent))",
          color: "rgb(var(--color-on-accent))",
          fontSize: "var(--text-sm, 0.9375rem)",
          fontWeight: 600,
          textDecoration: "none",
          boxShadow: "var(--shadow-accent)",
        }}
      >
        Wróć na stronę główną
      </Link>
    </div>
  );
}
