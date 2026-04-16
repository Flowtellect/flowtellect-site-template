"use client";

// ─── TestimonialsCarousel (Showcase Tier 1) ──────────────────────────────────
//
// Single-testimonial focus z auto-rotate (5s), dot navigation, pause on hover.
// Avatar + name + role + company. Star rating. Decorative quote mark.
// Content schema aligned z testimonials_1 (items → .quote + .author + .role).

import { useState, useEffect, useCallback } from "react";
import { FadeIn, Eyebrow, pickStr } from "./shared";
import { useDesign } from "./DesignContext";
import { getCardStyle } from "./designStyles";

interface Testimonial {
  quote?: string;
  body?: string;
  text?: string;
  name?: string;
  author?: string;
  role?: string;
  title?: string;
  position?: string;
  company?: string;
  avatar?: string;
  image?: string;
  photo?: string;
  rating?: number;
}

interface Props {
  content: Record<string, unknown>;
}

export default function TestimonialsCarousel({ content }: Props) {
  const c = content;
  const dd = useDesign();
  const cardBase = getCardStyle(dd);

  const heading = pickStr(c, "headline", "heading", "title");
  const eyebrow = pickStr(c, "eyebrow", "badge", "label");

  const rawItems = (c.items ??
    c.testimonials ??
    c.reviews ??
    c.quotes ??
    []) as Testimonial[];
  const items = Array.isArray(rawItems) ? rawItems.slice(0, 6) : [];

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1 || paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [items.length, paused, next]);

  if (items.length === 0) return null;

  const current = items[active];
  const quote = current.quote ?? current.body ?? current.text ?? "";
  const name = current.name ?? current.author ?? "";
  const role =
    current.role ?? current.title ?? current.position ?? "";
  const company = current.company ?? "";
  const avatar =
    current.avatar ?? current.image ?? current.photo ?? "";
  const hasAvatar =
    !!avatar &&
    avatar !== "AUTO" &&
    (avatar.startsWith("/") || avatar.startsWith("http"));
  const rating =
    typeof current.rating === "number" ? current.rating : null;

  return (
    <section
      className="relative bg-bg-alt overflow-hidden"
      style={{ padding: "var(--space-section, 96px) 0" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
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
        </div>

        {/* Testimonial card */}
        <div
          className="max-w-2xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <FadeIn>
            <div
              className="text-center"
              style={{
                ...cardBase,
                borderRadius: "var(--radius-xl, 20px)",
                padding: "clamp(32px, 5vw, 56px)",
              }}
            >
              {/* Decorative quote mark */}
              <div
                style={{
                  fontSize: "4rem",
                  lineHeight: 1,
                  color: "rgba(var(--color-accent), 0.15)",
                  fontFamily: "Georgia, serif",
                  marginBottom: "-12px",
                }}
              >
                &ldquo;
              </div>

              {/* Rating stars */}
              {rating !== null && rating > 0 && (
                <div className="flex justify-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      style={{
                        color:
                          i < rating
                            ? "#f59e0b"
                            : "rgb(var(--color-border))",
                        fontSize: "18px",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              )}

              {/* Quote text */}
              <blockquote
                className="font-body text-primary"
                style={{
                  fontSize: "var(--text-lg)",
                  lineHeight: "var(--leading-relaxed)",
                  fontStyle: "italic",
                  maxWidth: "48ch",
                  margin: "0 auto",
                }}
              >
                {quote}
              </blockquote>

              {/* Author info */}
              <div className="mt-8 flex items-center justify-center gap-3">
                {hasAvatar && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatar}
                    alt={name}
                    className="rounded-full object-cover"
                    style={{ width: "44px", height: "44px" }}
                  />
                )}
                <div className="text-left">
                  {name && (
                    <p
                      className="font-body font-semibold text-primary"
                      style={{ fontSize: "var(--text-sm)" }}
                    >
                      {name}
                    </p>
                  )}
                  {(role || company) && (
                    <p
                      className="font-body text-muted"
                      style={{ fontSize: "var(--text-xs)" }}
                    >
                      {[role, company].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Dot navigation */}
          {items.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Opinia ${i + 1}`}
                  className="transition-all duration-fast"
                  style={{
                    width: active === i ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "var(--radius-full)",
                    border: "none",
                    background:
                      active === i
                        ? "rgb(var(--color-accent))"
                        : "rgb(var(--color-border))",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
