"use client";

// ─── HeroSplit (Showcase Tier 1) ─────────────────────────────────────────────
//
// 50/50 grid — text po lewej, image po prawej z accent blur halo. Asymmetric
// staggered fade-in (text z prawej, image z lewej). Inspiracja: Apple product
// pages. Bez obrazka → text zajmuje pelna szerokosc (graceful fallback).

import {
  FadeIn,
  CTAButton,
  Eyebrow,
  ShowcaseImage,
  SocialProofBadge,
  pickStr,
  pickCta,
  pickHeadline,
  isValidImage,
} from "./shared";
import { useDesign } from "./DesignContext";
import { getImageTreatment } from "./designStyles";

interface Props {
  content: Record<string, unknown>;
}

export default function HeroSplit({ content }: Props) {
  const dd = useDesign();
  const imgStyle = getImageTreatment(dd);

  const heading = pickHeadline(content);
  const sub = pickStr(content, "subheadline", "subtitle", "description");
  const eyebrow = pickStr(content, "eyebrow", "badge");
  const ctaPrimary = pickCta(content, "cta_primary") ?? {
    label: pickStr(content, "cta_label") || "Dowiedz się więcej",
    href: pickStr(content, "cta_href") || "#contact",
  };
  const ctaSecondary = pickCta(content, "cta_secondary");
  const heroImage = pickStr(content, "hero_image", "image");
  const hasImage = isValidImage(heroImage);

  return (
    <section
      className="relative bg-bg overflow-hidden"
      style={{ padding: "var(--space-section, 96px) 0" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div
          className={`grid gap-12 lg:gap-20 items-center min-h-[70vh] ${
            hasImage ? "lg:grid-cols-2" : "lg:grid-cols-1"
          }`}
        >
          {/* Text side */}
          <div className="relative z-10">
            {eyebrow && (
              <FadeIn delay={0} direction="right">
                <Eyebrow text={eyebrow} className="mb-5" />
              </FadeIn>
            )}

            <FadeIn delay={100} direction="right">
              <h1
                className="font-display font-bold tracking-tight text-primary"
                style={{
                  fontSize:
                    "var(--text-4xl, clamp(2.5rem, 1.9rem + 2vw, 3.75rem))",
                  lineHeight: "var(--leading-tight, 1.2)",
                }}
              >
                {heading}
              </h1>
            </FadeIn>

            <FadeIn delay={200} direction="right">
              <div
                className="my-6"
                style={{
                  width: "clamp(48px, 6vw, 80px)",
                  height: "3px",
                  background:
                    "linear-gradient(90deg, rgb(var(--color-accent)), rgba(var(--color-accent), 0.2))",
                  borderRadius: "var(--radius-full, 9999px)",
                }}
              />
            </FadeIn>

            {sub && (
              <FadeIn delay={250} direction="right">
                <p
                  className="font-body text-muted max-w-md"
                  style={{
                    fontSize: "var(--text-lg, 1.125rem)",
                    lineHeight: "var(--leading-normal, 1.6)",
                  }}
                >
                  {sub}
                </p>
              </FadeIn>
            )}

            {content.social_proof !== undefined && (
              <FadeIn delay={350} direction="right">
                <div className="mt-6">
                  <SocialProofBadge data={content.social_proof} />
                </div>
              </FadeIn>
            )}

            <FadeIn delay={400} direction="right">
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

          {/* Image side — z accent halo glow w tle */}
          {hasImage && (
            <FadeIn delay={200} direction="left">
              <div className="relative">
                <div
                  className="absolute -inset-8 -z-10"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(var(--color-accent), 0.08) 0%, transparent 70%)",
                    filter: "blur(40px)",
                  }}
                />
                <ShowcaseImage
                  src={heroImage}
                  alt={heading}
                  className="shadow-xl"
                  style={imgStyle}
                  priority
                  aspectRatio="4/3"
                />
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}
