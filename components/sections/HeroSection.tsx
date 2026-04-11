// ─── HeroSection ────────────────────────────────────────────────────────────
//
// 15 variant hero section - the most impactful visual on the page.
// vn 1-3:   Classic split (text left, image right)
// vn 4-6:   Reversed split (image left, text right)
// vn 7-9:   Centered overlay (full bg image, dark gradient, white text)
// vn 10-12: Fullscreen bottom-aligned (cinematic, text at bottom-left)
// vn 13-15: Minimal centered (no image, pure typography)

/* eslint-disable @next/next/no-img-element */

import {
  ScrollReveal,
  str,
  strArr,
  resolveImage,
  Eyebrow,
  CtaButton,
} from "./shared";

interface HeroProps {
  content: Record<string, unknown>;
  vn: number;
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function getHeadlineText(content: Record<string, unknown>): string {
  const raw = content.headline;
  if (typeof raw === "string") return raw;
  const parts = strArr(raw);
  if (parts.length) return parts.join(" ");
  return "";
}

function getHeadlineLines(content: Record<string, unknown>): string[] {
  const raw = content.headline;
  if (Array.isArray(raw)) {
    const lines = strArr(raw);
    if (lines.length) return lines;
  }
  if (typeof raw === "string" && raw) return [raw];
  return [];
}

function getCta(
  content: Record<string, unknown>,
  key: string
): Record<string, unknown> | null {
  const cta = content[key];
  if (!cta || typeof cta !== "object") return null;
  const c = cta as Record<string, unknown>;
  if (!str(c.label)) return null;
  return c;
}

// ── Main component ──────────────────────────────────────────────────────────

export default function HeroSection({ content, vn }: HeroProps) {
  const eyebrow = str(content.eyebrow);
  const headline = getHeadlineText(content);
  const headlineLines = getHeadlineLines(content);
  const subheadline = str(content.subheadline);
  const heroImage = resolveImage(content.hero_image);
  const ctaPrimary = getCta(content, "cta_primary");
  const ctaSecondary = getCta(content, "cta_secondary");

  // ── vn 1-3: Classic split (text left, image right) ──────────────────

  if (vn >= 1 && vn <= 3) {
    return (
      <section className="py-20 md:py-28 lg:py-36 bg-bg overflow-hidden">
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
            {/* Text column */}
            <ScrollReveal delay={0}>
              <div className="max-w-xl">
                <Eyebrow text={eyebrow} />
                {headlineLines.length > 0 && (
                  <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-primary mb-6">
                    {headlineLines.map((line, i) => (
                      <span key={i} className="block">
                        {i === headlineLines.length - 1 ? (
                          <span className="text-accent">{line}</span>
                        ) : (
                          line
                        )}
                      </span>
                    ))}
                  </h1>
                )}
                {subheadline && (
                  <p className="font-body text-base md:text-lg text-muted leading-relaxed mb-8 max-w-md">
                    {subheadline}
                  </p>
                )}
                {(ctaPrimary || ctaSecondary) && (
                  <div className="flex flex-wrap items-center gap-4">
                    <CtaButton cta={ctaPrimary} />
                    <CtaButton cta={ctaSecondary} outline />
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* Image column */}
            <ScrollReveal delay={200}>
              <div className="relative">
                {heroImage ? (
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={heroImage}
                      alt={headline}
                      className="w-full h-auto object-cover"
                      loading="eager"
                    />
                  </div>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-surface to-accent/5" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,var(--accent)_0%,transparent_50%)] opacity-10" />
                  </div>
                )}
                {/* Decorative element */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-accent/10 -z-10" />
                <div className="absolute -top-4 -left-4 w-16 h-16 rounded-xl bg-surface -z-10" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    );
  }

  // ── vn 4-6: Reversed split (image left, text right) ─────────────────

  if (vn >= 4 && vn <= 6) {
    return (
      <section className="py-20 md:py-28 lg:py-36 bg-bg overflow-hidden">
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
            {/* Image column (left) */}
            <ScrollReveal delay={0}>
              <div className="relative order-2 md:order-1">
                {heroImage ? (
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={heroImage}
                      alt={headline}
                      className="w-full h-auto object-cover"
                      loading="eager"
                    />
                  </div>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                    <div className="absolute inset-0 bg-gradient-to-tl from-accent/15 via-surface to-accent/5" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,var(--accent)_0%,transparent_50%)] opacity-10" />
                  </div>
                )}
                {/* Decorative elements */}
                <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-2xl bg-accent/10 -z-10" />
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-xl bg-surface -z-10" />
              </div>
            </ScrollReveal>

            {/* Text column (right) */}
            <ScrollReveal delay={200}>
              <div className="max-w-xl order-1 md:order-2">
                <Eyebrow text={eyebrow} />
                {headlineLines.length > 0 && (
                  <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-primary mb-6">
                    {headlineLines.map((line, i) => (
                      <span key={i} className="block">
                        {i === 0 ? (
                          <span className="text-accent">{line}</span>
                        ) : (
                          line
                        )}
                      </span>
                    ))}
                  </h1>
                )}
                {subheadline && (
                  <p className="font-body text-base md:text-lg text-muted leading-relaxed mb-8 max-w-md">
                    {subheadline}
                  </p>
                )}
                {(ctaPrimary || ctaSecondary) && (
                  <div className="flex flex-wrap items-center gap-4">
                    <CtaButton cta={ctaPrimary} />
                    <CtaButton cta={ctaSecondary} outline />
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    );
  }

  // ── vn 7-9: Centered overlay (full bg image, dark gradient) ─────────

  if (vn >= 7 && vn <= 9) {
    return (
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        {heroImage ? (
          <img
            src={heroImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Content */}
        <div className="relative z-10 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto text-center py-20">
          <ScrollReveal delay={0}>
            {eyebrow && (
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-8 h-px bg-white/40" />
                <span className="text-xs uppercase tracking-[0.3em] text-white/70 font-accent">
                  {eyebrow}
                </span>
                <div className="w-8 h-px bg-white/40" />
              </div>
            )}
          </ScrollReveal>

          <ScrollReveal delay={100}>
            {headlineLines.length > 0 && (
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.08] text-white mb-6">
                {headlineLines.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h1>
            )}
          </ScrollReveal>

          <ScrollReveal delay={200}>
            {subheadline && (
              <p className="font-body text-base md:text-lg lg:text-xl text-white/75 leading-relaxed mb-10 max-w-2xl mx-auto">
                {subheadline}
              </p>
            )}
          </ScrollReveal>

          <ScrollReveal delay={300}>
            {(ctaPrimary || ctaSecondary) && (
              <div className="flex flex-wrap items-center justify-center gap-4">
                {ctaPrimary && (
                  <a
                    href={str(ctaPrimary.href) || "#"}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-gray-900 font-body font-semibold text-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                  >
                    {str(ctaPrimary.label)}
                  </a>
                )}
                {ctaSecondary && (
                  <a
                    href={str(ctaSecondary.href) || "#"}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/30 text-white font-body font-semibold text-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                  >
                    {str(ctaSecondary.label)}
                  </a>
                )}
              </div>
            )}
          </ScrollReveal>
        </div>

        {/* Bottom fade for smooth transition */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg to-transparent" />
      </section>
    );
  }

  // ── vn 10-12: Fullscreen bottom-aligned (cinematic) ─────────────────

  if (vn >= 10 && vn <= 12) {
    return (
      <section className="relative min-h-screen flex items-end overflow-hidden">
        {/* Background image */}
        {heroImage ? (
          <img
            src={heroImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
        )}

        {/* Gradient overlay - heavier at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Content pinned to bottom-left */}
        <div className="relative z-10 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full pb-16 md:pb-24 lg:pb-32 pt-20">
          <div className="max-w-3xl">
            <ScrollReveal delay={0}>
              {eyebrow && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-px bg-accent" />
                  <span className="text-xs uppercase tracking-[0.3em] text-accent font-accent">
                    {eyebrow}
                  </span>
                </div>
              )}
            </ScrollReveal>

            <ScrollReveal delay={100}>
              {headlineLines.length > 0 && (
                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] text-white mb-6">
                  {headlineLines.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </h1>
              )}
            </ScrollReveal>

            <ScrollReveal delay={200}>
              {subheadline && (
                <p className="font-body text-base md:text-lg text-white/65 leading-relaxed mb-10 max-w-xl">
                  {subheadline}
                </p>
              )}
            </ScrollReveal>

            <ScrollReveal delay={300}>
              {(ctaPrimary || ctaSecondary) && (
                <div className="flex flex-wrap items-center gap-4">
                  {ctaPrimary && (
                    <a
                      href={str(ctaPrimary.href) || "#"}
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent text-on-accent font-body font-semibold text-sm hover:shadow-2xl hover:brightness-110 transition-all duration-300"
                    >
                      {str(ctaPrimary.label)}
                    </a>
                  )}
                  {ctaSecondary && (
                    <a
                      href={str(ctaSecondary.href) || "#"}
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/25 text-white font-body font-semibold text-sm hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                    >
                      {str(ctaSecondary.label)}
                    </a>
                  )}
                </div>
              )}
            </ScrollReveal>
          </div>
        </div>

        {/* Bottom fade for smooth transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-bg to-transparent" />
      </section>
    );
  }

  // ── vn 13-15: Minimal centered (no image, pure typography) ──────────

  return (
    <section className="py-32 md:py-44 bg-bg overflow-hidden">
      <div className="px-6 md:px-12 lg:px-24 max-w-5xl mx-auto text-center">
        {/* Decorative eyebrow with lines on both sides */}
        <ScrollReveal delay={0}>
          {eyebrow && (
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-accent/50" />
              <span className="text-xs uppercase tracking-[0.4em] text-accent font-accent">
                {eyebrow}
              </span>
              <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-accent/50" />
            </div>
          )}
        </ScrollReveal>

        <ScrollReveal delay={100}>
          {headlineLines.length > 0 && (
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] text-primary mb-8">
              {headlineLines.map((line, i) => (
                <span key={i} className="block">
                  {i === Math.floor(headlineLines.length / 2) ? (
                    <span className="relative inline-block">
                      <span className="text-accent">{line}</span>
                      <span className="absolute -bottom-1 left-0 right-0 h-px bg-accent/30" />
                    </span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>
          )}
        </ScrollReveal>

        <ScrollReveal delay={200}>
          {subheadline && (
            <p className="font-body text-lg md:text-xl text-muted leading-relaxed mb-12 max-w-2xl mx-auto">
              {subheadline}
            </p>
          )}
        </ScrollReveal>

        <ScrollReveal delay={300}>
          {(ctaPrimary || ctaSecondary) && (
            <div className="flex flex-wrap items-center justify-center gap-4">
              <CtaButton cta={ctaPrimary} />
              <CtaButton cta={ctaSecondary} outline />
            </div>
          )}
        </ScrollReveal>

        {/* Decorative bottom element */}
        <ScrollReveal delay={400}>
          <div className="mt-16 flex justify-center">
            <div className="w-px h-16 bg-gradient-to-b from-accent/40 to-transparent" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
