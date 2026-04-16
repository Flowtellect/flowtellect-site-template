"use client";

// ─── HeroImmersive (Showcase Tier 1) ─────────────────────────────────────────
//
// Fullscreen hero — animated mesh gradient bg, oversized typography, dwa CTA,
// scroll indicator. Inspiracja: Stripe / Webflow landing pages. Z hero_image
// → fullscreen image z dark gradient overlay (cinematic). Bez obrazka → mesh
// gradient z accent + noise texture. Wszystkie style przez tokeny CSS.

import {
  FadeIn,
  CTAButton,
  Eyebrow,
  SocialProofBadge,
  pickStr,
  pickCta,
  pickHeadline,
  isValidImage,
} from "./shared";
import { useDesign } from "./DesignContext";
import { getAnimationDelay } from "./designStyles";
import TextReveal from "./TextReveal";

interface Props {
  content: Record<string, unknown>;
}

export default function HeroImmersive({ content }: Props) {
  const dd = useDesign();
  // animationLevel skaluje delay staggera: expressive 1.5x, subtle 1x, minimal 0.
  const d = (base: number) => getAnimationDelay(dd, base);

  const heading = pickHeadline(content);
  const sub = pickStr(content, "subheadline", "subtitle", "description");
  const eyebrow = pickStr(content, "eyebrow", "badge");
  const ctaPrimary = pickCta(content, "cta_primary") ?? {
    label: pickStr(content, "cta_label") || "Dowiedz się więcej",
    href: pickStr(content, "cta_href") || "#contact",
  };
  const ctaSecondary = pickCta(content, "cta_secondary");
  const heroImage = pickStr(content, "hero_image", "image", "background_image");
  const hasImage = isValidImage(heroImage);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-bg"
      style={{ padding: "var(--space-section, 96px) 0" }}
    >
      <div className="absolute inset-0 z-0">
        {hasImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={heroImage}
              alt=""
              className={`absolute inset-0 w-full h-full object-cover ${
                dd.animationLevel === "expressive" ? "anim-parallax-slow" : ""
              }`}
              style={{ filter: "brightness(0.4)" }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
              }}
            />
          </>
        ) : (
          <>
            {/* Mesh gradient — pure CSS, accent-colored */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse 80% 60% at 20% 40%, rgba(var(--color-accent), 0.12) 0%, transparent 70%),
                  radial-gradient(ellipse 60% 80% at 80% 60%, rgba(var(--color-accent-light), 0.08) 0%, transparent 70%),
                  radial-gradient(ellipse 50% 50% at 50% 50%, rgba(var(--color-accent-dark), 0.05) 0%, transparent 70%),
                  rgb(var(--color-bg))
                `,
              }}
            />
            {/* Subtle noise — breaks gradient banding */}
            <div
              className="absolute inset-0 opacity-[0.015]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10 w-full">
        <div className="max-w-3xl">
          {eyebrow && (
            <FadeIn delay={d(0)}>
              <Eyebrow text={eyebrow} className="mb-6" />
            </FadeIn>
          )}

          <FadeIn delay={d(100)}>
            {dd.animationLevel === "expressive" ? (
              <TextReveal
                as="h1"
                text={heading}
                stagger={40}
                className="font-display font-bold tracking-tight"
                style={{
                  fontSize: "var(--text-hero, clamp(3rem, 2.2rem + 3vw, 5rem))",
                  lineHeight: "var(--leading-tight, 1.2)",
                  color: hasImage ? "white" : "rgb(var(--color-text-primary))",
                }}
              />
            ) : (
              <h1
                className="font-display font-bold tracking-tight"
                style={{
                  fontSize: "var(--text-hero, clamp(3rem, 2.2rem + 3vw, 5rem))",
                  lineHeight: "var(--leading-tight, 1.2)",
                  color: hasImage ? "white" : "rgb(var(--color-text-primary))",
                }}
              >
                {heading}
              </h1>
            )}
          </FadeIn>

          <FadeIn delay={d(200)}>
            <div
              className="mt-6 mb-8"
              style={{
                width: "clamp(60px, 8vw, 100px)",
                height: "3px",
                background:
                  "linear-gradient(90deg, rgb(var(--color-accent)), rgba(var(--color-accent), 0.3))",
                borderRadius: "var(--radius-full, 9999px)",
              }}
            />
          </FadeIn>

          {sub && (
            <FadeIn delay={d(250)}>
              <p
                className="font-body max-w-xl"
                style={{
                  fontSize: "var(--text-lg, 1.125rem)",
                  lineHeight: "var(--leading-normal, 1.6)",
                  color: hasImage
                    ? "rgba(255,255,255,0.8)"
                    : "rgb(var(--color-text-muted))",
                }}
              >
                {sub}
              </p>
            </FadeIn>
          )}

          {content.social_proof !== undefined && (
            <FadeIn delay={d(350)}>
              <div className="mt-6">
                <SocialProofBadge data={content.social_proof} />
              </div>
            </FadeIn>
          )}

          <FadeIn delay={d(400)}>
            <div className="flex flex-wrap gap-4 mt-10">
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
                  variant="secondary"
                  size="lg"
                />
              )}
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <FadeIn delay={d(800)}>
          <div
            className="w-6 h-10 rounded-full border-2 flex justify-center pt-2"
            style={{
              borderColor: hasImage
                ? "rgba(255,255,255,0.3)"
                : "rgb(var(--color-border))",
            }}
          >
            <div
              className="w-1 h-2 rounded-full animate-bounce"
              style={{
                background: hasImage
                  ? "rgba(255,255,255,0.6)"
                  : "rgb(var(--color-accent))",
              }}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
