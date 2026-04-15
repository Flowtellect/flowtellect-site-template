"use client";

// ─── Showcase Shared Utilities ────────────────────────────────────────────────
//
// Wspolne primitives dla Tier 1 Showcase components. Tylko DOM + IO observers
// (zero zewnetrznych libek). Wszystkie style przez tokeny CSS — zmiana motywu
// w panelu CMS rekonfiguruje wyglad bez rebuildu.

import { useRef, useEffect, useState, type ReactNode } from "react";

// ─── FadeIn — viewport-triggered entrance animation ──────────────────────────

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  threshold?: number;
}

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
  threshold = 0.15,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: "50px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  const transforms: Record<string, string> = {
    up:    "translateY(24px)",
    down:  "translateY(-24px)",
    left:  "translateX(24px)",
    right: "translateX(-24px)",
    none:  "none",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transforms[direction],
        transition:
          "opacity var(--duration-normal, 250ms) var(--ease-default, ease), transform var(--duration-normal, 250ms) var(--ease-default, ease)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── CountUp — animated number counter (for stats) ───────────────────────────

interface CountUpProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({
  end,
  prefix = "",
  suffix = "",
  duration = 2000,
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const increment = end / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {started ? count.toLocaleString("pl-PL") : "0"}
      {suffix}
    </span>
  );
}

// ─── ShowcaseImage — fade-in lazy image ──────────────────────────────────────

interface ShowcaseImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  aspectRatio?: string;
  objectFit?: "cover" | "contain";
}

export function ShowcaseImage({
  src,
  alt,
  className = "",
  priority = false,
  aspectRatio,
  objectFit = "cover",
}: ShowcaseImageProps) {
  const [loaded, setLoaded] = useState(false);
  const isValid =
    !!src && src !== "AUTO" && (src.startsWith("/") || src.startsWith("http"));

  if (!isValid) return null;

  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{
        aspectRatio,
        position: "relative",
        background: "rgba(var(--color-accent), 0.04)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "scale(1)" : "scale(1.02)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      />
    </div>
  );
}

// ─── CTAButton — primary/secondary/ghost variants ────────────────────────────

interface CTAButtonProps {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function CTAButton({
  label,
  href,
  variant = "primary",
  size = "md",
  className = "",
}: CTAButtonProps) {
  const sizes = {
    sm: "px-5 py-2.5 text-token-sm",
    md: "px-7 py-3.5 text-token-sm",
    lg: "px-9 py-4 text-token-base",
  };

  const variants = {
    primary:
      "bg-accent text-on-accent shadow-accent hover:shadow-lg hover:-translate-y-0.5",
    secondary:
      "bg-transparent border border-border text-primary hover:bg-bg-alt hover:shadow-sm",
    ghost:
      "bg-transparent text-accent hover:text-accent-dark underline underline-offset-4",
  };

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center font-body font-semibold rounded-md transition-all duration-normal ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {label}
    </a>
  );
}

// ─── Eyebrow — uppercase label above heading ─────────────────────────────────

export function Eyebrow({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  if (!text) return null;
  return (
    <span
      className={`inline-block text-token-xs font-accent font-semibold text-accent tracking-wide uppercase ${className}`}
    >
      {text}
    </span>
  );
}

// ─── SectionWrapper — bg variants + section spacing ──────────────────────────

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  bg?: "default" | "alt" | "accent" | "deep";
  padding?: string;
}

export function SectionWrapper({
  children,
  id,
  className = "",
  bg = "default",
  padding,
}: SectionWrapperProps) {
  const bgClasses = {
    default: "bg-bg text-primary",
    alt:     "bg-bg-alt text-primary",
    accent:  "bg-accent text-on-accent",
    deep:    "bg-surface-deep text-on-accent",
  };

  return (
    <section
      id={id}
      className={`relative overflow-hidden ${bgClasses[bg]} ${className}`}
      style={{ padding: padding ?? "var(--space-section, 96px) 0" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        {children}
      </div>
    </section>
  );
}

// ─── SocialProofBadge — rating + count badge ─────────────────────────────────

export function SocialProofBadge({ data }: { data: unknown }) {
  if (!data || typeof data !== "object") return null;
  const sp = data as Record<string, unknown>;
  const rating = typeof sp.rating === "number" ? sp.rating : null;
  if (rating === null || rating < 4.0) return null;

  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-token-sm font-body"
      style={{
        background: "rgba(var(--color-accent) / 0.08)",
        border: "1px solid rgba(var(--color-accent) / 0.15)",
      }}
    >
      <span className="text-amber-400 text-base">★</span>
      <span className="font-semibold text-primary">{rating}/5</span>
      {typeof sp.count === "number" && (
        <span className="text-muted opacity-60">({sp.count} opinii)</span>
      )}
      {typeof sp.platform === "string" && (
        <span className="text-dim text-token-xs">{sp.platform}</span>
      )}
    </div>
  );
}

// ─── Content extraction helpers ──────────────────────────────────────────────

/** Defensive string extraction from content with fallback chain. */
export function pickStr(
  content: Record<string, unknown>,
  ...keys: string[]
): string {
  for (const k of keys) {
    const v = content[k];
    if (typeof v === "string" && v.length > 0) return v;
  }
  return "";
}

/** Extract { label, href } from CTA object field with fallbacks. */
export function pickCta(
  content: Record<string, unknown>,
  key: string
): { label: string; href: string } | null {
  const cta = content[key];
  if (!cta || typeof cta !== "object") return null;
  const obj = cta as Record<string, unknown>;
  const label = typeof obj.label === "string" ? obj.label : "";
  const href = typeof obj.href === "string" ? obj.href : "";
  if (!label) return null;
  return { label, href: href || "#" };
}

/** Joins headline array (text_array CMS field) into single string. */
export function pickHeadline(content: Record<string, unknown>): string {
  const h = content.headline;
  if (Array.isArray(h)) return h.filter((s) => typeof s === "string").join(" ");
  if (typeof h === "string") return h;
  return pickStr(content, "heading", "title");
}

/** Validates image src — rejects placeholders and AUTO marker. */
export function isValidImage(src: string | undefined): src is string {
  return (
    !!src &&
    src !== "AUTO" &&
    (src.startsWith("/") || src.startsWith("http"))
  );
}
