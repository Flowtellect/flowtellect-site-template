"use client";

// ─── CTABanner (Showcase Tier 1) ─────────────────────────────────────────────
//
// Accent gradient bg + glassmorphism card + inverted CTA (on-accent -> accent).
// Trust reducer pod CTA. Mesh overlay + blur backdrop dla premium glasu.
// Content keys: cta (cta_1 schema), cta_primary (hero schema) — oba obslugiwane.

import { FadeIn, Eyebrow, pickStr, pickCta } from "./shared";
import { useDesign } from "./DesignContext";
import { getButtonRadius } from "./designStyles";

interface Props {
  content: Record<string, unknown>;
}

export default function CTABanner({ content }: Props) {
  const c = content;
  const dd = useDesign();
  const btnRadius = getButtonRadius(dd);
  // cardStyle=glass -> wzmocniony backdrop-blur (20px), cardStyle=flat -> brak
  // blur (solid white overlay). Dla pozostalych -> default 16px glass.
  const blur =
    dd.cardStyle === "glass"
      ? "blur(20px)"
      : dd.cardStyle === "flat"
      ? "none"
      : "blur(16px)";
  const cardBg =
    dd.cardStyle === "flat"
      ? "rgba(255, 255, 255, 0.15)"
      : "rgba(255, 255, 255, 0.08)";

  const heading = pickStr(c, "headline", "heading", "title");
  const sub = pickStr(c, "subheadline", "subtitle", "description", "body");
  const eyebrow = pickStr(c, "eyebrow", "badge", "label");
  const cta = pickCta(c, "cta") ?? pickCta(c, "cta_primary") ?? {
    label: "Skontaktuj się",
    href: "#contact",
  };
  const cta2 = pickCta(c, "cta_secondary");
  const trustText = pickStr(c, "trust_text", "note");

  return (
    <section
      className="relative overflow-hidden"
      style={{ padding: "var(--space-section, 96px) 0" }}
    >
      {/* Accent gradient background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg,
              rgb(var(--color-accent)) 0%,
              rgb(var(--color-accent-dark)) 50%,
              rgb(var(--color-accent)) 100%
            )`,
          }}
        />
        {/* Decorative mesh overlay */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 40%)
            `,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        {/* Card — glass/elevated/flat driven by dd.cardStyle */}
        <div
          className="max-w-3xl mx-auto text-center"
          style={{
            background: cardBg,
            backdropFilter: blur,
            WebkitBackdropFilter: blur,
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "var(--radius-xl, 20px)",
            padding: "clamp(32px, 5vw, 64px) clamp(24px, 4vw, 48px)",
          }}
        >
          {eyebrow && (
            <FadeIn delay={0}>
              <Eyebrow text={eyebrow} className="mb-4 !text-on-accent/70" />
            </FadeIn>
          )}

          <FadeIn delay={100}>
            <h2
              className="font-display font-bold text-on-accent"
              style={{
                fontSize:
                  "var(--text-3xl, clamp(1.875rem, 1.5rem + 1.5vw, 3rem))",
                lineHeight: "var(--leading-tight, 1.2)",
                letterSpacing: "var(--tracking-tight, -0.02em)",
              }}
            >
              {heading}
            </h2>
          </FadeIn>

          {sub && (
            <FadeIn delay={200}>
              <p
                className="font-body mt-4 mx-auto"
                style={{
                  fontSize: "var(--text-lg, 1.125rem)",
                  lineHeight: "var(--leading-normal, 1.6)",
                  color: "rgb(var(--color-on-accent) / 0.75)",
                  maxWidth: "48ch",
                }}
              >
                {sub}
              </p>
            </FadeIn>
          )}

          <FadeIn delay={300}>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              {/* Primary CTA — inverted (on-accent bg, accent text) */}
              <a
                href={cta.href}
                className="inline-flex items-center justify-center font-body font-semibold transition-all duration-normal hover:-translate-y-0.5"
                style={{
                  padding: "var(--space-md, 16px) var(--space-xl, 32px)",
                  borderRadius: btnRadius,
                  background: "rgb(var(--color-on-accent))",
                  color: "rgb(var(--color-accent))",
                  fontSize: "var(--text-sm, 0.9375rem)",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                }}
              >
                {cta.label}
              </a>

              {cta2 && (
                <a
                  href={cta2.href}
                  className="inline-flex items-center justify-center font-body font-semibold transition-all duration-normal hover:-translate-y-0.5"
                  style={{
                    padding: "var(--space-md, 16px) var(--space-xl, 32px)",
                    borderRadius: "var(--radius-md, 10px)",
                    background: "transparent",
                    color: "rgb(var(--color-on-accent))",
                    border: "1px solid rgb(var(--color-on-accent) / 0.3)",
                    fontSize: "var(--text-sm, 0.9375rem)",
                  }}
                >
                  {cta2.label}
                </a>
              )}
            </div>
          </FadeIn>

          {trustText && (
            <FadeIn delay={400}>
              <p
                className="font-body mt-5"
                style={{
                  fontSize: "var(--text-xs, 0.75rem)",
                  color: "rgb(var(--color-on-accent) / 0.5)",
                }}
              >
                {trustText}
              </p>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}
