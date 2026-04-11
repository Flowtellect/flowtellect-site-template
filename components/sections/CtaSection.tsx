// ─── CtaSection ──────────────────────────────────────────────────────────────
// 20 variants: centered accent, full-screen image, split image, card, gradient

/* eslint-disable @next/next/no-img-element */

import {
  ScrollReveal,
  str,
  resolveImage,
  Eyebrow,
  Headline,
  Body,
  CtaButton,
  ImageBlock,
  Section,
} from "./shared";

interface CtaProps {
  content: Record<string, unknown>;
  vn: number;
}

export default function CtaSection({ content, vn }: CtaProps) {
  const eyebrow = str(content.eyebrow);
  const headline = str(content.headline) || str(content.heading);
  const body = str(content.body) || str(content.text);
  const note = str(content.note);
  const image = resolveImage(content.image) || resolveImage(content.bg_image);
  const cta =
    content.cta && typeof content.cta === "object"
      ? (content.cta as Record<string, unknown>)
      : null;

  // ── vn 1-5: Centered accent ──────────────────────────────────────────────

  if (vn <= 5) {
    return (
      <section className="py-20 md:py-28 bg-accent text-on-accent">
        <ScrollReveal>
          <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto text-center">
            {eyebrow && (
              <ScrollReveal delay={0}>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-8 h-px bg-on-accent/40" />
                  <span className="text-xs uppercase tracking-[0.3em] font-accent opacity-80">
                    {eyebrow}
                  </span>
                  <div className="w-8 h-px bg-on-accent/40" />
                </div>
              </ScrollReveal>
            )}

            <ScrollReveal delay={100}>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight mb-4">
                {headline}
              </h2>
            </ScrollReveal>

            {body && (
              <ScrollReveal delay={200}>
                <p className="font-body text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto opacity-80">
                  {body}
                </p>
              </ScrollReveal>
            )}

            <ScrollReveal delay={300}>
              <CtaButton cta={cta} inverted />
            </ScrollReveal>

            {note && (
              <ScrollReveal delay={400}>
                <p className="font-body text-xs mt-6 opacity-60">{note}</p>
              </ScrollReveal>
            )}
          </div>
        </ScrollReveal>
      </section>
    );
  }

  // ── vn 6-9: Full-screen image ────────────────────────────────────────────

  if (vn <= 9) {
    return (
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        {image ? (
          <>
            <img
              src={image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent-dark" />
        )}

        {/* Content */}
        <ScrollReveal className="relative z-10">
          <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto text-center py-20 md:py-28">
            {eyebrow && (
              <ScrollReveal delay={0}>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-8 h-px bg-white/40" />
                  <span className="text-xs uppercase tracking-[0.3em] text-white/80 font-accent">
                    {eyebrow}
                  </span>
                  <div className="w-8 h-px bg-white/40" />
                </div>
              </ScrollReveal>
            )}

            <ScrollReveal delay={100}>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight text-white mb-4">
                {headline}
              </h2>
            </ScrollReveal>

            {body && (
              <ScrollReveal delay={200}>
                <p className="font-body text-sm md:text-base text-white/80 leading-relaxed mb-8 max-w-2xl mx-auto">
                  {body}
                </p>
              </ScrollReveal>
            )}

            <ScrollReveal delay={300}>
              <CtaButton cta={cta} inverted />
            </ScrollReveal>

            {note && (
              <ScrollReveal delay={400}>
                <p className="font-body text-xs text-white/60 mt-6">{note}</p>
              </ScrollReveal>
            )}
          </div>
        </ScrollReveal>
      </section>
    );
  }

  // ── vn 10-13: Split image ────────────────────────────────────────────────

  if (vn <= 13) {
    return (
      <Section bg="bg-bg-alt">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <ScrollReveal delay={0}>
              <Eyebrow text={eyebrow} />
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <Headline text={headline} />
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <Body text={body} />
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <CtaButton cta={cta} />
            </ScrollReveal>
            {note && (
              <ScrollReveal delay={400}>
                <p className="font-body text-xs text-muted mt-4">{note}</p>
              </ScrollReveal>
            )}
          </div>

          <ScrollReveal delay={200}>
            {image ? (
              <ImageBlock
                src={image}
                alt={headline}
                className="aspect-[4/3]"
              />
            ) : (
              <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                <div className="w-full h-full bg-gradient-to-br from-accent/10 via-surface to-accent/5" />
              </div>
            )}
          </ScrollReveal>
        </div>
      </Section>
    );
  }

  // ── vn 14-17: Card ───────────────────────────────────────────────────────

  if (vn <= 17) {
    return (
      <Section bg="bg-bg">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal delay={0}>
            <div className="bg-accent/5 border border-accent/20 rounded-2xl p-12 md:p-16">
              {eyebrow && (
                <Eyebrow text={eyebrow} center />
              )}
              <Headline text={headline} center />
              <Body text={body} center />
              <CtaButton cta={cta} />
              {note && (
                <p className="font-body text-xs text-muted mt-6">{note}</p>
              )}
            </div>
          </ScrollReveal>
        </div>
      </Section>
    );
  }

  // ── vn 18-20: Gradient ───────────────────────────────────────────────────

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-accent via-accent-dark to-accent overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white/5" />
      <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-white/5" />
      <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full bg-white/5" />

      <ScrollReveal className="relative z-10">
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto text-center">
          {eyebrow && (
            <ScrollReveal delay={0}>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-8 h-px bg-white/40" />
                <span className="text-xs uppercase tracking-[0.3em] text-white/80 font-accent">
                  {eyebrow}
                </span>
                <div className="w-8 h-px bg-white/40" />
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal delay={100}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight text-white mb-6">
              {headline}
            </h2>
          </ScrollReveal>

          {body && (
            <ScrollReveal delay={200}>
              <p className="font-body text-sm md:text-base text-white/80 leading-relaxed mb-8 max-w-2xl mx-auto">
                {body}
              </p>
            </ScrollReveal>
          )}

          <ScrollReveal delay={300}>
            <CtaButton cta={cta} inverted />
          </ScrollReveal>

          {note && (
            <ScrollReveal delay={400}>
              <p className="font-body text-xs text-white/60 mt-6">{note}</p>
            </ScrollReveal>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
}
