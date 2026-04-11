"use client";

// ─── StatsSection ────────────────────────────────────────────────────────────
// 12 variants: accent bar, cards, large centered

import {
  ScrollReveal,
  CountUp,
  resolveIcon,
  str,
  arr,
  Eyebrow,
  Headline,
  Section,
} from "./shared";

interface StatsProps {
  content: Record<string, unknown>;
  vn: number;
}

function parseStatValue(item: Record<string, unknown>) {
  const n =
    typeof item.value === "number"
      ? item.value
      : parseInt(String(item.value).replace(/[^0-9]/g, ""), 10) || 0;
  const suf =
    str(item.suffix) || String(item.value ?? "").replace(/[0-9.,\s]/g, "");
  return { n, suf };
}

export default function StatsSection({ content, vn }: StatsProps) {
  const headline = str(content.headline);
  const eyebrow = str(content.eyebrow);
  const items = arr(content.items);

  // ── vn 1-4: Accent bar ─────────────────────────────────────────────────
  if (vn <= 4) {
    return (
      <section className="py-16 md:py-20 bg-accent">
        <ScrollReveal>
          <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
            {headline && (
              <ScrollReveal delay={0}>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-on-accent text-center mb-12">
                  {headline}
                </h2>
              </ScrollReveal>
            )}

            <div className="flex flex-wrap justify-center gap-12 md:gap-16">
              {items.map((item, i) => {
                const { n, suf } = parseStatValue(item);
                return (
                  <ScrollReveal key={i} delay={100 + i * 100}>
                    <div className="text-center">
                      {n > 0 ? (
                        <CountUp
                          value={n}
                          suffix={suf}
                          className="font-display text-4xl md:text-5xl font-bold text-on-accent"
                        />
                      ) : (
                        <span className="font-display text-4xl md:text-5xl font-bold text-on-accent">
                          {str(item.value)}
                        </span>
                      )}
                      <p className="font-body text-sm text-on-accent opacity-80 mt-2">
                        {str(item.label)}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </section>
    );
  }

  // ── vn 5-8: Cards ──────────────────────────────────────────────────────
  if (vn <= 8) {
    return (
      <Section bg="bg-bg-alt">
        {(eyebrow || headline) && (
          <div className="text-center mb-12">
            {eyebrow && (
              <ScrollReveal delay={0}>
                <Eyebrow text={eyebrow} center />
              </ScrollReveal>
            )}
            {headline && (
              <ScrollReveal delay={100}>
                <Headline text={headline} center />
              </ScrollReveal>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => {
            const { n, suf } = parseStatValue(item);
            const icon = str(item.icon);
            return (
              <ScrollReveal key={i} delay={200 + i * 80}>
                <div className="bg-surface rounded-xl p-6 text-center border border-border">
                  {icon && (
                    <span className="text-2xl mb-3 block">
                      {resolveIcon(icon)}
                    </span>
                  )}
                  {n > 0 ? (
                    <CountUp
                      value={n}
                      suffix={suf}
                      className="font-display text-3xl font-bold text-accent"
                    />
                  ) : (
                    <span className="font-display text-3xl font-bold text-accent">
                      {str(item.value)}
                    </span>
                  )}
                  <p className="font-body text-sm text-muted mt-2">
                    {str(item.label)}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </Section>
    );
  }

  // ── vn 9-12: Large centered ────────────────────────────────────────────
  return (
    <Section bg="bg-bg">
      {(eyebrow || headline) && (
        <div className="text-center mb-16">
          {eyebrow && (
            <ScrollReveal delay={0}>
              <Eyebrow text={eyebrow} center />
            </ScrollReveal>
          )}
          {headline && (
            <ScrollReveal delay={100}>
              <Headline text={headline} center />
            </ScrollReveal>
          )}
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-16">
        {items.map((item, i) => {
          const { n, suf } = parseStatValue(item);
          return (
            <ScrollReveal key={i} delay={200 + i * 100}>
              <div className="text-center">
                {n > 0 ? (
                  <CountUp
                    value={n}
                    suffix={suf}
                    className="font-display text-5xl md:text-6xl font-bold text-accent"
                  />
                ) : (
                  <span className="font-display text-5xl md:text-6xl font-bold text-accent">
                    {str(item.value)}
                  </span>
                )}
                <p className="font-body text-sm text-muted mt-3">
                  {str(item.label)}
                </p>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </Section>
  );
}
