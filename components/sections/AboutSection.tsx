// ─── AboutSection ────────────────────────────────────────────────────────────
// 6 variants: image+text, text+image, full-width stacked, with numbers

/* eslint-disable @next/next/no-img-element */

import {
  ScrollReveal,
  resolveIcon,
  str,
  arr,
  resolveImage,
  Eyebrow,
  Headline,
  Body,
  ImageBlock,
  Section,
} from "./shared";

interface AboutProps {
  content: Record<string, unknown>;
  vn: number;
}

export default function AboutSection({ content, vn }: AboutProps) {
  const eyebrow = str(content.eyebrow);
  const headline = str(content.headline);
  const body = str(content.body);
  const image = resolveImage(content.image) || resolveImage(content.hero_image);
  const highlights = arr(content.highlights);
  const pillars = arr(content.pillars);
  const stats = arr(content.stats);

  // ── vn 1-2: Image left, text right ──────────────────────────────────────
  if (vn <= 2) {
    return (
      <Section bg="bg-bg-alt">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ScrollReveal delay={0}>
            <ImageBlock
              src={image}
              alt={headline}
              className="aspect-[4/3] shadow-xl"
            />
          </ScrollReveal>

          <div>
            <ScrollReveal delay={100}>
              <Eyebrow text={eyebrow} />
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <Headline text={headline} />
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <Body text={body} />
            </ScrollReveal>

            {highlights.length > 0 && (
              <ScrollReveal delay={400}>
                <ul className="space-y-4 mt-6">
                  {highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="text-2xl mt-0.5 shrink-0">
                        {resolveIcon(h.icon)}
                      </span>
                      <div>
                        <p className="font-display text-sm font-semibold text-primary">
                          {str(h.label) || str(h.title)}
                        </p>
                        {str(h.desc) && (
                          <p className="font-body text-sm text-muted mt-1">
                            {str(h.desc)}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            )}

            {stats.length > 0 && (
              <ScrollReveal delay={500}>
                <div className="flex flex-wrap gap-8 mt-8 pt-8 border-t border-border">
                  {stats.map((s, i) => (
                    <div key={i} className="text-center">
                      <p className="font-display text-2xl md:text-3xl font-bold text-accent">
                        {str(s.value)}
                      </p>
                      <p className="font-body text-xs text-muted mt-1 uppercase tracking-wider">
                        {str(s.label)}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </Section>
    );
  }

  // ── vn 3-4: Text left, image right ──────────────────────────────────────
  if (vn <= 4) {
    return (
      <Section bg="bg-bg-alt">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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

            {highlights.length > 0 && (
              <ScrollReveal delay={300}>
                <ul className="space-y-4 mt-6">
                  {highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="text-2xl mt-0.5 shrink-0">
                        {resolveIcon(h.icon)}
                      </span>
                      <div>
                        <p className="font-display text-sm font-semibold text-primary">
                          {str(h.label) || str(h.title)}
                        </p>
                        {str(h.desc) && (
                          <p className="font-body text-sm text-muted mt-1">
                            {str(h.desc)}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            )}

            {stats.length > 0 && (
              <ScrollReveal delay={400}>
                <div className="flex flex-wrap gap-8 mt-8 pt-8 border-t border-border">
                  {stats.map((s, i) => (
                    <div key={i} className="text-center">
                      <p className="font-display text-2xl md:text-3xl font-bold text-accent">
                        {str(s.value)}
                      </p>
                      <p className="font-body text-xs text-muted mt-1 uppercase tracking-wider">
                        {str(s.label)}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            )}
          </div>

          <ScrollReveal delay={200}>
            <ImageBlock
              src={image}
              alt={headline}
              className="aspect-[4/3] shadow-xl"
            />
          </ScrollReveal>
        </div>
      </Section>
    );
  }

  // ── vn 5: Full-width stacked ────────────────────────────────────────────
  if (vn === 5) {
    return (
      <Section bg="bg-bg-alt">
        <ScrollReveal delay={0}>
          <ImageBlock
            src={image}
            alt={headline}
            className="aspect-video shadow-xl mb-12"
          />
        </ScrollReveal>

        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal delay={100}>
            <Eyebrow text={eyebrow} center />
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <Headline text={headline} center />
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <Body text={body} center />
          </ScrollReveal>
        </div>

        {pillars.length > 0 && (
          <ScrollReveal delay={400}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {pillars.map((p, i) => (
                <ScrollReveal key={i} delay={450 + i * 100} className="text-center">
                  <span className="text-3xl mb-4 block">
                    {resolveIcon(p.icon)}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-primary mb-2">
                    {str(p.title)}
                  </h3>
                  <p className="font-body text-sm text-muted leading-relaxed">
                    {str(p.body)}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        )}
      </Section>
    );
  }

  // ── vn 6: With numbers (no image) ───────────────────────────────────────
  return (
    <Section bg="bg-bg-alt">
      <div className="max-w-3xl">
        <ScrollReveal delay={0}>
          <Eyebrow text={eyebrow} />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <Headline text={headline} />
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <Body text={body} />
        </ScrollReveal>
      </div>

      {stats.length > 0 && (
        <ScrollReveal delay={300}>
          <div className="flex flex-wrap gap-12 mt-12">
            {stats.map((s, i) => (
              <div key={i}>
                <p className="font-display text-4xl md:text-5xl font-bold text-accent">
                  {str(s.value)}
                </p>
                <p className="font-body text-sm text-muted mt-2">
                  {str(s.label)}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      )}
    </Section>
  );
}
