// ─── PricingSection ──────────────────────────────────────────────────────────
// 5 variants: plans grid, single plan, comparison (fallback to grid)

import {
  ScrollReveal,
  str,
  arr,
  strArr,
  Headline,
  Body,
  Section,
} from "./shared";

interface PricingProps {
  content: Record<string, unknown>;
  vn: number;
}

function PlanCard({
  tier,
  delay,
}: {
  tier: Record<string, unknown>;
  delay: number;
}) {
  const name = str(tier.name);
  const price = str(tier.price);
  const period = str(tier.period);
  const features = strArr(tier.features);
  const highlighted = !!tier.highlighted;
  const ctaLabel = str(tier.cta_text) || str(tier.cta_label) || "Wybierz";
  const ctaHref = str(tier.cta_link) || str(tier.cta_href) || "#";

  return (
    <ScrollReveal delay={delay}>
      <div
        className={`relative rounded-2xl p-8 h-full flex flex-col ${
          highlighted
            ? "border-2 border-accent bg-accent/5 shadow-lg"
            : "border border-border bg-surface"
        }`}
      >
        {highlighted && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-on-accent text-xs font-bold px-4 py-1 rounded-full">
            Popularne
          </span>
        )}

        <h3 className="font-display text-lg font-semibold text-primary mb-4">
          {name}
        </h3>

        <div className="mb-6">
          <span className="font-display text-3xl text-accent font-bold">
            {price}
          </span>
          {period && (
            <span className="font-body text-sm text-muted ml-1">
              / {period}
            </span>
          )}
        </div>

        {features.length > 0 && (
          <ul className="space-y-3 mb-8 flex-1">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-3 text-sm font-body text-muted">
                <span className="text-accent mt-0.5 shrink-0">&#10003;</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        )}

        <a
          href={ctaHref}
          className={`inline-flex items-center justify-center px-6 py-3 rounded-xl font-body font-semibold text-sm transition-all duration-300 ${
            highlighted
              ? "bg-accent text-on-accent hover:shadow-lg hover:brightness-110"
              : "border-2 border-accent text-accent hover:bg-accent hover:text-on-accent"
          }`}
        >
          {ctaLabel}
        </a>
      </div>
    </ScrollReveal>
  );
}

export default function PricingSection({ content, vn }: PricingProps) {
  const headline = str(content.heading) || str(content.headline);
  const body = str(content.subtitle) || str(content.body);
  const tiers = arr(content.tiers) || arr(content.plans) || arr(content.packages);

  // ── vn 4: Single plan ────────────────────────────────────────────────────

  if (vn === 4 && tiers.length > 0) {
    const tier = tiers[0];
    const name = str(tier.name);
    const price = str(tier.price);
    const period = str(tier.period);
    const features = strArr(tier.features);
    const ctaLabel = str(tier.cta_text) || str(tier.cta_label) || "Wybierz";
    const ctaHref = str(tier.cta_link) || str(tier.cta_href) || "#";

    return (
      <Section bg="bg-bg">
        <div className="text-center">
          <ScrollReveal delay={0}>
            <Headline text={headline} center />
          </ScrollReveal>
          {body && (
            <ScrollReveal delay={100}>
              <Body text={body} center />
            </ScrollReveal>
          )}
        </div>

        <ScrollReveal delay={200}>
          <div className="max-w-lg mx-auto mt-10 rounded-2xl border-2 border-accent bg-accent/5 shadow-lg p-10 text-center">
            <h3 className="font-display text-xl font-semibold text-primary mb-4">
              {name}
            </h3>
            <div className="mb-6">
              <span className="font-display text-4xl text-accent font-bold">
                {price}
              </span>
              {period && (
                <span className="font-body text-sm text-muted ml-1">
                  / {period}
                </span>
              )}
            </div>

            {features.length > 0 && (
              <ul className="space-y-3 mb-8 text-left max-w-xs mx-auto">
                {features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-body text-muted">
                    <span className="text-accent mt-0.5 shrink-0">&#10003;</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            )}

            <a
              href={ctaHref}
              className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl bg-accent text-on-accent font-body font-semibold text-sm hover:shadow-lg hover:brightness-110 transition-all duration-300"
            >
              {ctaLabel}
            </a>
          </div>
        </ScrollReveal>
      </Section>
    );
  }

  // ── vn 1-3, 5 (fallback): Plans grid ─────────────────────────────────────

  return (
    <Section bg="bg-bg">
      <div className="text-center">
        <ScrollReveal delay={0}>
          <Headline text={headline} center />
        </ScrollReveal>
        {body && (
          <ScrollReveal delay={100}>
            <Body text={body} center />
          </ScrollReveal>
        )}
      </div>

      <div
        className={`grid grid-cols-1 gap-8 mt-12 ${
          tiers.length === 2
            ? "md:grid-cols-2 max-w-3xl mx-auto"
            : tiers.length >= 3
            ? "md:grid-cols-3"
            : "max-w-lg mx-auto"
        }`}
      >
        {tiers.map((tier, i) => (
          <PlanCard key={i} tier={tier} delay={200 + i * 100} />
        ))}
      </div>
    </Section>
  );
}
