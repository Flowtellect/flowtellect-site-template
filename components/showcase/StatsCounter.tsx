"use client";

// ─── StatsCounter (Showcase Tier 1) ──────────────────────────────────────────
//
// Animated CountUp numbers triggered by IntersectionObserver. Grid layout
// z auto columns (max 4). Accent bg variant opcjonalnie. parseNumeric parsuje
// "500+", "1 000", "15 lat" → { value: number, prefix, suffix }.
// Content schema aligned z stats_1 (items → .value + .label + .suffix).

import { FadeIn, CountUp, Eyebrow, pickStr } from "./shared";
import { useDesign } from "./DesignContext";

interface StatItem {
  value?: number | string;
  number?: number | string;
  count?: number | string;
  label?: string;
  title?: string;
  name?: string;
  prefix?: string;
  suffix?: string;
  icon?: string;
}

interface Props {
  content: Record<string, unknown>;
}

function parseNumeric(item: StatItem): {
  value: number;
  prefix: string;
  suffix: string;
} {
  const raw = item.value ?? item.number ?? item.count ?? 0;
  const prefix = item.prefix ?? "";
  let suffix = item.suffix ?? "";

  if (typeof raw === "number") return { value: raw, prefix, suffix };

  const str = String(raw);
  const match = str.match(/^([+-]?)(\d[\d\s.,]*)(.*)$/);
  if (match) {
    const numStr = match[2].replace(/[\s.,]/g, "");
    if (!suffix && match[3]) suffix = match[3].trim();
    if (match[1] === "+" || match[3]?.includes("+")) suffix = suffix || "+";
    return {
      value: parseInt(numStr) || 0,
      prefix: match[1] === "-" ? "-" : prefix,
      suffix,
    };
  }

  return { value: 0, prefix, suffix };
}

export default function StatsCounter({ content }: Props) {
  const c = content;
  const dd = useDesign();
  // animationLevel: minimal -> natychmiast (duration 0), subtle -> 2000ms,
  // expressive -> 3000ms (dlugi, dramatyczny count-up)
  const baseCountDuration =
    dd.animationLevel === "minimal"
      ? 0
      : dd.animationLevel === "expressive"
      ? 3000
      : 2000;
  // Glass icon chip dla luxurious/premium (backdrop-blur) — pozostale zostaja solid.
  const useGlassIconChip = dd.cardStyle === "glass";

  const heading = pickStr(c, "headline", "heading", "title");
  const sub = pickStr(c, "subheadline", "subtitle", "description", "body");
  const eyebrow = pickStr(c, "eyebrow", "badge", "label");

  const rawItems = (c.items ??
    c.stats ??
    c.numbers ??
    c.metrics ??
    []) as StatItem[];
  const items = Array.isArray(rawItems) ? rawItems.slice(0, 6) : [];

  if (items.length === 0) return null;

  const isAccentBg = pickStr(c, "bg_variant", "bg") === "accent";

  return (
    <section
      className={`relative overflow-hidden ${isAccentBg ? "" : "bg-bg"}`}
      style={{
        padding: "var(--space-section, 96px) 0",
        ...(isAccentBg
          ? {
              background: `linear-gradient(135deg, rgb(var(--color-accent)), rgb(var(--color-accent-dark)))`,
            }
          : {}),
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        {(heading || eyebrow) && (
          <div className="text-center max-w-2xl mx-auto mb-12">
            {eyebrow && (
              <FadeIn>
                <Eyebrow
                  text={eyebrow}
                  className={isAccentBg ? "!text-on-accent/60" : ""}
                />
              </FadeIn>
            )}
            {heading && (
              <FadeIn delay={100}>
                <h2
                  className={`font-display font-bold ${
                    isAccentBg ? "text-on-accent" : "text-primary"
                  }`}
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
                  className={`font-body mt-4 ${
                    isAccentBg ? "text-on-accent/70" : "text-muted"
                  }`}
                  style={{
                    fontSize: "var(--text-lg)",
                    lineHeight: "var(--leading-normal)",
                  }}
                >
                  {sub}
                </p>
              </FadeIn>
            )}
          </div>
        )}

        {/* Stats grid — max 4 cols, centered */}
        <div
          className="grid gap-8 md:gap-12"
          style={{
            gridTemplateColumns: `repeat(${Math.min(items.length, 4)}, 1fr)`,
          }}
        >
          {items.map((item, i) => {
            const { value, prefix, suffix } = parseNumeric(item);
            const label = item.label ?? item.title ?? item.name ?? "";
            const icon = item.icon ?? "";

            return (
              <FadeIn key={i} delay={100 + i * 100}>
                <div className="text-center">
                  {icon && (
                    <div
                      className="mx-auto mb-3 flex items-center justify-center"
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "var(--radius-md)",
                        background: isAccentBg
                          ? "rgba(var(--color-on-accent), 0.1)"
                          : "rgba(var(--color-accent), 0.08)",
                        fontSize: "22px",
                        ...(useGlassIconChip
                          ? {
                              backdropFilter: "blur(10px)",
                              WebkitBackdropFilter: "blur(10px)",
                              border:
                                "1px solid rgba(var(--color-accent), 0.15)",
                            }
                          : {}),
                      }}
                    >
                      {icon}
                    </div>
                  )}

                  <div
                    className={`font-display font-bold ${
                      isAccentBg ? "text-on-accent" : "text-primary"
                    }`}
                    style={{
                      fontSize:
                        "var(--text-4xl, clamp(2.5rem, 2rem + 2vw, 3.75rem))",
                      lineHeight: 1.1,
                      letterSpacing: "var(--tracking-tight)",
                    }}
                  >
                    <CountUp
                      end={value}
                      prefix={prefix}
                      suffix={suffix}
                      duration={baseCountDuration + i * 200}
                    />
                  </div>

                  {label && (
                    <p
                      className={`font-body mt-2 ${
                        isAccentBg ? "text-on-accent/70" : "text-muted"
                      }`}
                      style={{ fontSize: "var(--text-sm)" }}
                    >
                      {label}
                    </p>
                  )}
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
