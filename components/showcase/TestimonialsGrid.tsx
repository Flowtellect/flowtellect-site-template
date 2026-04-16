"use client";

// ─── TestimonialsGrid (Showcase Tier 1) ──────────────────────────────────────
//
// Masonry columns z round-robin distribution (vs TestimonialsCarousel single-
// focus). Various card lengths (naturalne bo quote dlugosci sie roznia). Hover:
// shadow-md + lift. Mobile: simple stacked layout.

import { FadeIn, Eyebrow, pickStr } from "./shared";

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

function TestimonialCard({
  t,
  delay,
}: {
  t: Testimonial;
  delay: number;
}) {
  const quote = t.quote ?? t.body ?? t.text ?? "";
  const name = t.name ?? t.author ?? "";
  const role = t.role ?? t.title ?? t.position ?? "";
  const company = t.company ?? "";
  const avatar = t.avatar ?? t.image ?? t.photo ?? "";
  const rating = typeof t.rating === "number" ? t.rating : null;
  const hasAvatar =
    !!avatar &&
    avatar !== "AUTO" &&
    (avatar.startsWith("/") || avatar.startsWith("http"));

  return (
    <FadeIn delay={delay}>
      <div
        className="transition-all"
        style={{
          background: "rgb(var(--color-bg))",
          border: "1px solid rgb(var(--color-border-soft))",
          borderRadius: "var(--radius-lg, 14px)",
          padding: "clamp(20px, 3vw, 28px)",
          boxShadow: "var(--shadow-xs)",
          transitionDuration: "var(--duration-normal)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "var(--shadow-md)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "var(--shadow-xs)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {rating !== null && rating > 0 && (
          <div className="flex gap-0.5 mb-3">
            {Array.from({ length: 5 }).map((_, si) => (
              <span
                key={si}
                style={{
                  color:
                    si < rating ? "#f59e0b" : "rgb(var(--color-border))",
                  fontSize: "14px",
                }}
              >
                ★
              </span>
            ))}
          </div>
        )}

        <p
          className="font-body text-primary"
          style={{
            fontSize: "var(--text-sm)",
            lineHeight: "var(--leading-relaxed)",
          }}
        >
          &ldquo;{quote}&rdquo;
        </p>

        <div
          className="flex items-center gap-3 mt-4 pt-4"
          style={{
            borderTop: "1px solid rgb(var(--color-border-soft))",
          }}
        >
          {hasAvatar && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatar}
              alt={name}
              className="rounded-full object-cover flex-shrink-0"
              style={{ width: "36px", height: "36px" }}
            />
          )}
          <div>
            {name && (
              <p
                className="font-body font-semibold text-primary"
                style={{ fontSize: "var(--text-xs)" }}
              >
                {name}
              </p>
            )}
            {(role || company) && (
              <p
                className="font-body text-dim"
                style={{ fontSize: "var(--text-xs)" }}
              >
                {[role, company].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export default function TestimonialsGrid({ content }: Props) {
  const c = content;
  const heading = pickStr(c, "headline", "heading", "title");
  const eyebrow = pickStr(c, "eyebrow", "badge");

  const rawItems = (c.items ??
    c.testimonials ??
    c.reviews ??
    c.quotes ??
    []) as Testimonial[];
  const items = Array.isArray(rawItems) ? rawItems.slice(0, 6) : [];

  if (items.length === 0) return null;

  // Masonry: distribute into columns (max 3)
  const colCount = Math.min(items.length, 3);
  const cols: { t: Testimonial; globalIdx: number }[][] = Array.from(
    { length: colCount },
    () => []
  );
  items.forEach((t, i) => cols[i % colCount].push({ t, globalIdx: i }));

  return (
    <section
      className="relative bg-bg-alt overflow-hidden"
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
        </div>

        {/* Desktop: masonry columns */}
        <div
          className="hidden md:grid gap-6"
          style={{ gridTemplateColumns: `repeat(${colCount}, 1fr)` }}
        >
          {cols.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-6">
              {col.map(({ t, globalIdx }) => (
                <TestimonialCard
                  key={globalIdx}
                  t={t}
                  delay={80 + globalIdx * 60}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Mobile: stack */}
        <div className="flex flex-col gap-4 md:hidden">
          {items.map((t, i) => (
            <TestimonialCard key={i} t={t} delay={60 + i * 40} />
          ))}
        </div>
      </div>
    </section>
  );
}
