"use client";

// ─── ServicesFeatureGrid (Showcase Tier 1) ───────────────────────────────────
//
// Bento-like responsive grid z hover-lift + accent border reveal. Price/duration
// badges per karta. Icon slot (emoji/string). Content schema aligned z services_1
// (items → .title + .desc) ale tez obsluguje .name/.description/.price/.duration.

import { FadeIn, Eyebrow, CTAButton, pickStr, pickCta } from "./shared";
import { useDesign } from "./DesignContext";
import { getCardStyle, getCardHoverStyle } from "./designStyles";

interface ServiceItem {
  name?: string;
  title?: string;
  label?: string;
  desc?: string;
  description?: string;
  body?: string;
  price?: string;
  price_label?: string;
  duration?: string;
  duration_minutes?: number;
  icon?: string;
  href?: string;
}

interface Props {
  content: Record<string, unknown>;
}

export default function ServicesFeatureGrid({ content }: Props) {
  const c = content;
  const dd = useDesign();
  const cardBase = getCardStyle(dd);
  const cardHover = getCardHoverStyle(dd);

  const heading = pickStr(c, "headline", "heading", "title");
  const sub = pickStr(c, "subheadline", "subtitle", "description", "body");
  const eyebrow = pickStr(c, "eyebrow", "badge", "label");
  const cta = pickCta(c, "cta") ?? pickCta(c, "cta_primary");

  const rawItems = (c.items ?? c.services ?? c.features ?? c.list ?? []) as ServiceItem[];
  const items = Array.isArray(rawItems) ? rawItems.slice(0, 8) : [];

  return (
    <section
      className="relative bg-bg overflow-hidden"
      style={{ padding: "var(--space-section, 96px) 0" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
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
                className="font-body text-muted mt-4 mx-auto"
                style={{
                  fontSize: "var(--text-lg)",
                  lineHeight: "var(--leading-normal)",
                  maxWidth: "52ch",
                }}
              >
                {sub}
              </p>
            </FadeIn>
          )}
        </div>

        {/* Grid */}
        <div
          className="grid gap-6 md:gap-8"
          style={{
            gridTemplateColumns:
              items.length <= 3
                ? "repeat(auto-fit, minmax(280px, 1fr))"
                : "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >
          {items.map((item, i) => {
            const name = item.name ?? item.title ?? item.label ?? "";
            const desc = item.desc ?? item.description ?? item.body ?? "";
            const price = item.price ?? item.price_label ?? "";
            const duration =
              item.duration ??
              (item.duration_minutes ? `${item.duration_minutes} min` : "");
            const icon = item.icon ?? "";

            return (
              <FadeIn key={i} delay={100 + i * 80}>
                <div
                  className={`group relative h-full cursor-default ${
                    dd.animationLevel !== "minimal" ? "anim-card-lift" : ""
                  }`}
                  style={{
                    ...cardBase,
                    borderRadius: "var(--radius-lg, 14px)",
                    padding: "clamp(24px, 3vw, 36px)",
                    transition:
                      "all var(--duration-normal) var(--ease-default)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.boxShadow = cardHover.boxShadow;
                    el.style.borderColor = cardHover.borderColor;
                    el.style.transform = cardHover.transform;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.boxShadow = cardBase.boxShadow as string;
                    el.style.borderColor =
                      (cardBase.border as string)?.split(" ").slice(2).join(" ") ||
                      "rgb(var(--color-border-soft))";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  {icon && (
                    <div
                      className="mb-4 flex items-center justify-center"
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "var(--radius-md, 10px)",
                        background: "rgba(var(--color-accent), 0.08)",
                        fontSize: "24px",
                      }}
                    >
                      {icon}
                    </div>
                  )}

                  <h3
                    className="font-display font-semibold text-primary"
                    style={{
                      fontSize: "var(--text-xl)",
                      lineHeight: "var(--leading-tight)",
                    }}
                  >
                    {name}
                  </h3>

                  {(price || duration) && (
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      {price && (
                        <span
                          className="font-body font-semibold text-accent"
                          style={{ fontSize: "var(--text-sm)" }}
                        >
                          {price}
                        </span>
                      )}
                      {duration && (
                        <span
                          className="font-body text-muted"
                          style={{ fontSize: "var(--text-xs)" }}
                        >
                          · {duration}
                        </span>
                      )}
                    </div>
                  )}

                  {desc && (
                    <p
                      className="font-body text-muted mt-3"
                      style={{
                        fontSize: "var(--text-sm)",
                        lineHeight: "var(--leading-normal)",
                      }}
                    >
                      {desc}
                    </p>
                  )}
                </div>
              </FadeIn>
            );
          })}
        </div>

        {cta && (
          <FadeIn delay={400}>
            <div className="text-center mt-12">
              <CTAButton
                label={cta.label}
                href={cta.href}
                variant="primary"
                size="md"
              />
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
