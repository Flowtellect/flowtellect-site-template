"use client";

// ─── MagneticButton (mouse-follow transform) ─────────────────────────────────
//
// Button/link ktory "przyciaga" sie do kursora w promieniu swojego bounding boxa.
// Strength 0-1 — 0.3 default (delikatne). Rendered as <a> gdy jest href, w przeciwnym
// wypadku <button>.
//
// Use gate: tylko gdy dd.animationLevel === 'expressive'. W minimal/subtle uzywamy
// zwyklego buttona z .anim-magnetic (CSS hover-only, bez JS).

import { useRef, type ReactNode, type MouseEvent } from "react";

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  /** Pull strength 0-1 (default 0.3 = subtle). 1.0 = max drag. */
  strength?: number;
  /** Optional aria-label (przydatne gdy children to ikona). */
  ariaLabel?: string;
}

export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  style,
  strength = 0.3,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  function handleMouseMove(e: MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }

  function handleMouseLeave() {
    const el = ref.current;
    if (!el) return;
    // Resetuj do pozycji — transition w .anim-magnetic zarzadza spring-back
    el.style.transform = "translate(0, 0)";
  }

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "transform",
    ...style,
  };

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        className={className}
        style={baseStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      ref={ref as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      aria-label={ariaLabel}
      className={className}
      style={baseStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}
