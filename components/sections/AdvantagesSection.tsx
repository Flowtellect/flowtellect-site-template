// ─── AdvantagesSection ───────────────────────────────────────────────────────
// 10 variants: icon grid, horizontal cards, timeline, trust badges, image cards

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
  Section,
} from "./shared";

interface AdvantagesProps {
  content: Record<string, unknown>;
  vn: number;
}

export default function AdvantagesSection({ content, vn }: AdvantagesProps) {
  const eyebrow = str(content.eyebrow);
  const headline = str(content.headline) || str(content.heading);
  const body = str(content.body);
  const items = arr(content.items);

  // ── vn 1-3: Icon grid ──────────────────────────────────────────────────
  if (vn <= 3) {
    return (
      <Section bg="bg-bg-alt">
        <div className="text-center mb-12">
          <ScrollReveal delay={0}>
            <Eyebrow text={eyebrow} center />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <Headline text={headline} center />
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <Body text={body} center />
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={300 + i * 80}>
              <div className="bg-surface border border-border rounded-2xl p-6 text-center hover:shadow-md hover:border-accent/30 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
                  <span className="text-3xl">
                    {resolveIcon(item.icon)}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-primary mb-2">
                  {str(item.name) || str(item.title) || str(item.label)}
                </h3>
                <p className="font-body text-sm text-muted leading-relaxed">
                  {str(item.desc) || str(item.description)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>
    );
  }

  // ── vn 4-6: Horizontal cards ────────────────────────────────────────────
  if (vn <= 6) {
    return (
      <Section bg="bg-bg-alt">
        <div className="text-center mb-12">
          <ScrollReveal delay={0}>
            <Eyebrow text={eyebrow} center />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <Headline text={headline} center />
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <Body text={body} center />
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={300 + i * 80}>
              <div className="flex items-start gap-5 p-6 bg-surface border border-border rounded-xl">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <span className="text-2xl">
                    {resolveIcon(item.icon)}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-primary mb-1">
                    {str(item.name) || str(item.title) || str(item.label)}
                  </h3>
                  <p className="font-body text-sm text-muted leading-relaxed">
                    {str(item.desc) || str(item.description)}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>
    );
  }

  // ── vn 7-8: Timeline ───────────────────────────────────────────────────
  if (vn <= 8) {
    return (
      <Section bg="bg-bg-alt">
        <div className="mb-12">
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

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-0">
            {items.map((item, i) => {
              const isLast = i === items.length - 1;
              return (
                <ScrollReveal key={i} delay={300 + i * 100}>
                  <div className={`relative flex items-start gap-0 ${isLast ? "" : "pb-10"}`}>
                    {/* Circle on line */}
                    <div className="relative z-10 w-10 h-10 rounded-full bg-accent/10 border-2 border-accent/30 flex items-center justify-center shrink-0">
                      <span className="text-base">
                        {resolveIcon(item.icon)}
                      </span>
                    </div>

                    {/* Text */}
                    <div className="pl-4">
                      <h3 className="font-display text-base font-semibold text-primary mb-1">
                        {str(item.name) || str(item.title) || str(item.label)}
                      </h3>
                      <p className="font-body text-sm text-muted leading-relaxed">
                        {str(item.desc) || str(item.description)}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </Section>
    );
  }

  // ── vn 9: Trust logos / badges ──────────────────────────────────────────
  if (vn === 9) {
    return (
      <Section bg="bg-bg-alt">
        <div className="text-center mb-12">
          <ScrollReveal delay={0}>
            <Eyebrow text={eyebrow || "Zaufali nam"} center />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <Headline text={headline || "Zaufali nam"} center />
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <Body text={body} center />
          </ScrollReveal>
        </div>

        <ScrollReveal delay={300}>
          <div className="flex flex-wrap justify-center gap-4">
            {items.map((item, i) => (
              <div
                key={i}
                className="px-6 py-3 bg-surface border border-border rounded-xl text-sm font-body text-muted"
              >
                {str(item.name) || str(item.title) || str(item.label)}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Section>
    );
  }

  // ── vn 10: Cards with images ────────────────────────────────────────────
  return (
    <Section bg="bg-bg-alt">
      <div className="text-center mb-12">
        <ScrollReveal delay={0}>
          <Eyebrow text={eyebrow} center />
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <Headline text={headline} center />
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <Body text={body} center />
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => {
          const imgSrc = resolveImage(item.image);
          return (
            <ScrollReveal key={i} delay={300 + i * 80}>
              <div className="rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300">
                {imgSrc ? (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={imgSrc}
                      alt={str(item.name) || str(item.title) || ""}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-accent/10 via-surface to-accent/5" />
                )}
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-primary mb-2">
                    {str(item.name) || str(item.title) || str(item.label)}
                  </h3>
                  <p className="font-body text-sm text-muted leading-relaxed">
                    {str(item.desc) || str(item.description)}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </Section>
  );
}
