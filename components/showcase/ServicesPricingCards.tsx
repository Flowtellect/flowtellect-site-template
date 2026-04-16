"use client";

// ─── ServicesPricingCards (Showcase Tier 1) ──────────────────────────────────
//
// Service-per-card z prominently price + duration badge + per-card CTA.
// Hover: shadow-lg + lift + accent border. 3-col grid desktop, stack mobile.
// Idealny dla salonow/gabinetow gdzie kazda usluga ma swoja cene.

import { useState } from "react";
import { FadeIn, Eyebrow, pickStr } from "./shared";
import { useDesign } from "./DesignContext";
import { getCardStyle, getCardHoverStyle } from "./designStyles";

interface ServiceItem {
  name?: string;
  title?: string;
  label?: string;
  description?: string;
  desc?: string;
  body?: string;
  price?: string;
  price_label?: string;
  duration?: string;
  duration_minutes?: number;
  icon?: string;
  cta_label?: string;
  cta_href?: string;
}

interface Props {
  content: Record<string, unknown>;
}

function ServiceCard({ item, index }: { item: ServiceItem; index: number }) {
  const [hovered, setHovered] = useState(false);
  const dd = useDesign();
  const cardBase = getCardStyle(dd);
  const cardHover = getCardHoverStyle(dd);
  const name = item.name ?? item.title ?? item.label ?? "";
  const desc = item.description ?? item.desc ?? item.body ?? "";
  const price = item.price ?? item.price_label ?? "";
  const duration =
    item.duration ??
    (item.duration_minutes ? `${item.duration_minutes} min` : "");
  const icon = item.icon ?? "";
  const ctaLabel = item.cta_label ?? "Umów wizytę";
  const ctaHref = item.cta_href ?? "#contact";

  return (
    <FadeIn delay={80 + index * 80}>
      <div
        className="h-full flex flex-col"
        style={{
          ...cardBase,
          border: hovered
            ? `1px solid ${cardHover.borderColor}`
            : (cardBase.border as string) ||
              "1px solid rgb(var(--color-border-soft))",
          borderRadius: "var(--radius-lg, 14px)",
          padding: "clamp(24px, 3vw, 32px)",
          boxShadow: hovered
            ? cardHover.boxShadow
            : (cardBase.boxShadow as string) || "var(--shadow-sm)",
          transform: hovered ? cardHover.transform : "translateY(0)",
          transition:
            "all var(--duration-normal, 250ms) var(--ease-default)",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Top row: icon + price */}
        <div className="flex items-start justify-between mb-4">
          {icon && (
            <div
              className="flex items-center justify-center"
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "var(--radius-md)",
                background: "rgba(var(--color-accent), 0.08)",
                fontSize: "22px",
              }}
            >
              {icon}
            </div>
          )}
          {price && (
            <span
              className="font-display font-bold text-accent"
              style={{ fontSize: "var(--text-xl)" }}
            >
              {price}
            </span>
          )}
        </div>

        <h3
          className="font-display font-semibold text-primary"
          style={{
            fontSize: "var(--text-lg)",
            lineHeight: "var(--leading-tight)",
          }}
        >
          {name}
        </h3>

        {duration && (
          <span
            className="inline-block mt-2 font-body text-dim"
            style={{ fontSize: "var(--text-xs)" }}
          >
            ⏱ {duration}
          </span>
        )}

        {desc && (
          <p
            className="font-body text-muted mt-3 flex-1"
            style={{
              fontSize: "var(--text-sm)",
              lineHeight: "var(--leading-normal)",
            }}
          >
            {desc}
          </p>
        )}

        <a
          href={ctaHref}
          className="block text-center font-body font-semibold mt-6"
          style={{
            padding: "var(--space-sm, 8px) var(--space-md, 16px)",
            borderRadius: "var(--radius-md)",
            border: "1px solid rgb(var(--color-accent))",
            color: hovered
              ? "rgb(var(--color-on-accent))"
              : "rgb(var(--color-accent))",
            background: hovered
              ? "rgb(var(--color-accent))"
              : "transparent",
            fontSize: "var(--text-sm)",
            textDecoration: "none",
            transition:
              "background var(--duration-fast), color var(--duration-fast)",
          }}
        >
          {ctaLabel}
        </a>
      </div>
    </FadeIn>
  );
}

export default function ServicesPricingCards({ content }: Props) {
  const c = content;
  const heading = pickStr(c, "headline", "heading", "title");
  const sub = pickStr(c, "subheadline", "subtitle", "description");
  const eyebrow = pickStr(c, "eyebrow", "badge");

  const rawItems = (c.items ?? c.services ?? c.list ?? []) as ServiceItem[];
  const items = Array.isArray(rawItems) ? rawItems.slice(0, 6) : [];

  if (items.length === 0) return null;

  return (
    <section
      className="relative bg-bg overflow-hidden"
      style={{ padding: "var(--space-section, 96px) 0" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
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
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <ServiceCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
