"use client";

// ─── HeroMinimal (Showcase Tier 1) ───────────────────────────────────────────
//
// Center-aligned, max whitespace, subtle gradient orb. Inspiracja: Notion /
// Linear landing — siła w typografii, brak ozdób. Bez obrazka (zamierzony
// design choice — minimalizm). Idealny dla tech / SaaS / creative agencies.

import {
  FadeIn,
  CTAButton,
  Eyebrow,
  SocialProofBadge,
  pickStr,
  pickCta,
  pickHeadline,
} from "./shared";

interface Props {
  content: Record<string, unknown>;
}

export default function HeroMinimal({ content }: Props) {
  const heading = pickHeadline(content);
  const sub = pickStr(content, "subheadline", "subtitle", "description");
  const eyebrow = pickStr(content, "eyebrow", "badge");
  const ctaPrimary = pickCta(content, "cta_primary") ?? {
    label: pickStr(content, "cta_label") || "Dowiedz się więcej",
    href: pickStr(content, "cta_href") || "#contact",
  };
  const ctaSecondary = pickCta(content, "cta_secondary");

  return (
    <section
      className="relative bg-bg overflow-hidden flex items-center justify-center text-center"
      style={{
        padding: "var(--space-section, 96px) 0",
        minHeight: "80vh",
      }}
    >
      {/* Subtle gradient orb — single decorative element */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
        style={{
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(var(--color-accent), 0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-2xl mx-auto px-6 relative z-10">
        {eyebrow && (
          <FadeIn delay={0}>
            <Eyebrow text={eyebrow} className="mb-6" />
          </FadeIn>
        )}

        <FadeIn delay={150}>
          <h1
            className="font-display font-bold tracking-tight text-primary mx-auto"
            style={{
              fontSize:
                "var(--text-4xl, clamp(2.5rem, 1.9rem + 2vw, 3.75rem))",
              lineHeight: "var(--leading-tight, 1.2)",
              maxWidth: "18ch",
            }}
          >
            {heading}
          </h1>
        </FadeIn>

        <FadeIn delay={250}>
          <div className="flex justify-center my-6">
            <div
              style={{
                width: "clamp(40px, 5vw, 60px)",
                height: "3px",
                background:
                  "linear-gradient(90deg, rgba(var(--color-accent), 0.3), rgb(var(--color-accent)), rgba(var(--color-accent), 0.3))",
                borderRadius: "var(--radius-full, 9999px)",
              }}
            />
          </div>
        </FadeIn>

        {sub && (
          <FadeIn delay={300}>
            <p
              className="font-body text-muted mx-auto"
              style={{
                fontSize: "var(--text-lg, 1.125rem)",
                lineHeight: "var(--leading-relaxed, 1.75)",
                maxWidth: "52ch",
              }}
            >
              {sub}
            </p>
          </FadeIn>
        )}

        {content.social_proof !== undefined && (
          <FadeIn delay={400}>
            <div className="mt-6 flex justify-center">
              <SocialProofBadge data={content.social_proof} />
            </div>
          </FadeIn>
        )}

        <FadeIn delay={450}>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <CTAButton
              label={ctaPrimary.label}
              href={ctaPrimary.href}
              variant="primary"
              size="lg"
            />
            {ctaSecondary && (
              <CTAButton
                label={ctaSecondary.label}
                href={ctaSecondary.href}
                variant="ghost"
                size="lg"
              />
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
