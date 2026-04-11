// ─── FaqSection ──────────────────────────────────────────────────────────────
// 15 variants: accordion, grid cards, numbered list

import {
  ScrollReveal,
  str,
  arr,
  Headline,
  Section,
} from "./shared";

interface FaqProps {
  content: Record<string, unknown>;
  vn: number;
}

export default function FaqSection({ content, vn }: FaqProps) {
  const headline = str(content.heading) || str(content.headline);
  const items = arr(content.items);

  // ── vn 1-5: Accordion ────────────────────────────────────────────────────

  if (vn <= 5) {
    return (
      <Section bg="bg-bg-alt">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal delay={0}>
            <Headline text={headline} center />
          </ScrollReveal>

          <div className="mt-10">
            {items.map((item, i) => (
              <ScrollReveal key={i} delay={100 + i * 50}>
                <details className="group border-b border-border">
                  <summary className="flex items-center justify-between py-5 cursor-pointer list-none font-display font-semibold text-primary">
                    <span>{str(item.question)}</span>
                    <span className="text-accent text-xl ml-4 shrink-0 transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div
                    className="pb-5 font-body text-sm md:text-base text-muted leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: str(item.answer) }}
                  />
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>
    );
  }

  // ── vn 6-10: Grid cards ──────────────────────────────────────────────────

  if (vn <= 10) {
    return (
      <Section bg="bg-bg-alt">
        <ScrollReveal delay={0}>
          <Headline text={headline} center />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={100 + i * 80}>
              <div className="bg-surface rounded-xl p-6 border border-border h-full">
                <h3 className="font-display font-semibold text-primary mb-3">
                  {str(item.question)}
                </h3>
                <div
                  className="font-body text-sm text-muted leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: str(item.answer) }}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>
    );
  }

  // ── vn 11-15: Numbered list ──────────────────────────────────────────────

  return (
    <Section bg="bg-bg-alt">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal delay={0}>
          <Headline text={headline} center />
        </ScrollReveal>

        <div className="mt-10 space-y-8">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={100 + i * 80}>
              <div className="flex gap-5">
                <div className="w-8 h-8 rounded-full bg-accent text-on-accent flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-primary mb-2">
                    {str(item.question)}
                  </h3>
                  <div
                    className="font-body text-sm text-muted leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: str(item.answer) }}
                  />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
