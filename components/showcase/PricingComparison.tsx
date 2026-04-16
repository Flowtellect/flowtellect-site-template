"use client";

// ─── PricingComparison (Showcase Tier 1) ─────────────────────────────────────
//
// Pricing grid z featured plan (scale 1.02 + accent border + shadow-xl), monthly/
// yearly toggle gdy plany maja price_yearly/price_monthly, checkmark features list.
// Content schema aligned z pricing_1 (tiers → .name/.price/.features/.highlighted)
// + pricing_2 (toggle).

import { useState } from "react";
import { FadeIn, Eyebrow, pickStr } from "./shared";

interface PlanItem {
  name?: string;
  title?: string;
  label?: string;
  price?: string;
  price_monthly?: string;
  price_yearly?: string;
  price_label?: string;
  period?: string;
  description?: string;
  body?: string;
  features?: Array<string | { label?: string }>;
  items?: Array<string | { label?: string }>;
  is_featured?: boolean;
  featured?: boolean;
  highlighted?: boolean;
  popular?: boolean;
  cta_label?: string;
  cta_text?: string;
  cta_href?: string;
  cta_link?: string;
  badge?: string;
}

interface Props {
  content: Record<string, unknown>;
}

export default function PricingComparison({ content }: Props) {
  const c = content;
  const heading = pickStr(c, "headline", "heading", "title");
  const sub = pickStr(c, "subheadline", "subtitle", "description");
  const eyebrow = pickStr(c, "eyebrow", "badge", "label");

  const rawPlans = (c.items ?? c.plans ?? c.tiers ?? c.packages ?? []) as PlanItem[];
  const plans = Array.isArray(rawPlans) ? rawPlans.slice(0, 4) : [];

  const hasToggle = plans.some((p) => p.price_yearly || p.price_monthly);
  const [yearly, setYearly] = useState(false);

  if (plans.length === 0) return null;

  return (
    <section
      className="relative bg-bg overflow-hidden"
      style={{ padding: "var(--space-section, 96px) 0" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          {eyebrow && (
            <FadeIn>
              <Eyebrow text={eyebrow} className="mb-4" />
            </FadeIn>
          )}
          {heading && (
            <FadeIn delay={100}>
              <h2
                className="font-display font-bold text-primary"
                style={{
                  fontSize: "var(--text-3xl)",
                  lineHeight: "var(--leading-tight)",
                  letterSpacing: "var(--tracking-tight)",
                }}
              >
                {heading}
              </h2>
            </FadeIn>
          )}
          {sub && (
            <FadeIn delay={200}>
              <p
                className="font-body text-muted mt-4"
                style={{ fontSize: "var(--text-lg)" }}
              >
                {sub}
              </p>
            </FadeIn>
          )}

          {hasToggle && (
            <FadeIn delay={250}>
              <div className="flex items-center justify-center gap-3 mt-8">
                <span
                  className={`font-body ${
                    !yearly
                      ? "text-primary font-semibold"
                      : "text-muted"
                  }`}
                  style={{ fontSize: "var(--text-sm)" }}
                >
                  Miesięcznie
                </span>
                <button
                  type="button"
                  onClick={() => setYearly((v) => !v)}
                  className="relative"
                  style={{
                    width: "48px",
                    height: "26px",
                    borderRadius: "var(--radius-full)",
                    background: yearly
                      ? "rgb(var(--color-accent))"
                      : "rgb(var(--color-border))",
                    border: "none",
                    cursor: "pointer",
                    transition: "background var(--duration-fast)",
                  }}
                  aria-label={
                    yearly
                      ? "Przełącz na miesięcznie"
                      : "Przełącz na rocznie"
                  }
                >
                  <div
                    className="absolute top-1"
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "var(--radius-full)",
                      background: "white",
                      left: yearly ? "26px" : "2px",
                      transition: "left var(--duration-fast)",
                    }}
                  />
                </button>
                <span
                  className={`font-body ${
                    yearly
                      ? "text-primary font-semibold"
                      : "text-muted"
                  }`}
                  style={{ fontSize: "var(--text-sm)" }}
                >
                  Rocznie
                  <span
                    className="ml-1 text-accent"
                    style={{ fontSize: "var(--text-xs)" }}
                  >
                    -20%
                  </span>
                </span>
              </div>
            </FadeIn>
          )}
        </div>

        <div
          className="grid gap-6 lg:gap-8 items-stretch"
          style={{
            gridTemplateColumns: `repeat(${Math.min(plans.length, 3)}, 1fr)`,
          }}
        >
          {plans.map((plan, i) => {
            const name = plan.name ?? plan.title ?? plan.label ?? "";
            const desc = plan.description ?? plan.body ?? "";
            const isFeatured =
              plan.is_featured ??
              plan.featured ??
              plan.highlighted ??
              plan.popular ??
              false;
            const rawFeatures = plan.features ?? plan.items ?? [];
            const features = rawFeatures.map((f) =>
              typeof f === "string" ? f : f?.label ?? String(f)
            );
            const badge =
              plan.badge ?? (isFeatured ? "Najpopularniejszy" : "");
            const ctaLabel =
              plan.cta_label ??
              plan.cta_text ??
              (isFeatured ? "Wybierz plan" : "Rozpocznij");
            const ctaHref =
              plan.cta_href ?? plan.cta_link ?? "#contact";

            let price = plan.price ?? plan.price_label ?? "";
            if (hasToggle) {
              price = yearly
                ? plan.price_yearly ?? plan.price ?? ""
                : plan.price_monthly ?? plan.price ?? "";
            }
            const period = plan.period ?? "";

            return (
              <FadeIn key={i} delay={100 + i * 100}>
                <div
                  className="relative h-full flex flex-col"
                  style={{
                    background: "rgb(var(--color-bg))",
                    border: isFeatured
                      ? "2px solid rgb(var(--color-accent))"
                      : "1px solid rgb(var(--color-border-soft))",
                    borderRadius: "var(--radius-xl, 20px)",
                    padding: "clamp(28px, 4vw, 40px)",
                    boxShadow: isFeatured
                      ? "var(--shadow-xl)"
                      : "var(--shadow-sm)",
                    transform: isFeatured ? "scale(1.02)" : "none",
                  }}
                >
                  {badge && isFeatured && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2"
                      style={{
                        padding: "4px 16px",
                        borderRadius: "var(--radius-full)",
                        background: "rgb(var(--color-accent))",
                        color: "rgb(var(--color-on-accent))",
                        fontSize: "var(--text-xs)",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {badge}
                    </div>
                  )}

                  <h3
                    className="font-display font-semibold text-primary"
                    style={{ fontSize: "var(--text-xl)" }}
                  >
                    {name}
                  </h3>

                  {desc && (
                    <p
                      className="font-body text-muted mt-2"
                      style={{
                        fontSize: "var(--text-sm)",
                        lineHeight: "var(--leading-normal)",
                      }}
                    >
                      {desc}
                    </p>
                  )}

                  {price && (
                    <div className="mt-6 mb-6">
                      <span
                        className="font-display font-bold text-primary"
                        style={{
                          fontSize: "var(--text-4xl)",
                          lineHeight: 1,
                        }}
                      >
                        {price}
                      </span>
                      {period && (
                        <span
                          className="font-body text-muted ml-1"
                          style={{ fontSize: "var(--text-sm)" }}
                        >
                          / {period}
                        </span>
                      )}
                    </div>
                  )}

                  {features.length > 0 && (
                    <ul className="flex-1 flex flex-col gap-3 mb-8">
                      {features.map((featureText, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span
                            className="flex-shrink-0 mt-0.5"
                            style={{
                              color: "rgb(var(--color-accent))",
                              fontSize: "16px",
                            }}
                          >
                            ✓
                          </span>
                          <span
                            className="font-body text-muted"
                            style={{ fontSize: "var(--text-sm)" }}
                          >
                            {featureText}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-auto">
                    <a
                      href={ctaHref}
                      className="block text-center font-body font-semibold w-full"
                      style={{
                        padding: "var(--space-md, 16px)",
                        borderRadius: "var(--radius-md, 10px)",
                        background: isFeatured
                          ? "rgb(var(--color-accent))"
                          : "transparent",
                        color: isFeatured
                          ? "rgb(var(--color-on-accent))"
                          : "rgb(var(--color-accent))",
                        border: isFeatured
                          ? "none"
                          : "1px solid rgb(var(--color-accent))",
                        fontSize: "var(--text-sm)",
                        textDecoration: "none",
                        boxShadow: isFeatured
                          ? "var(--shadow-accent)"
                          : "none",
                        transition:
                          "transform var(--duration-fast), box-shadow var(--duration-fast)",
                      }}
                    >
                      {ctaLabel}
                    </a>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
