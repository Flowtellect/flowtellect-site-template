"use client";

// ─── CTAFloating (Global Component) ──────────────────────────────────────────
//
// NIE jest sekcja w SHOWCASE_MAP. Wirowane bezposrednio w page.tsx obok <main>
// (podobnie jak CookieConsent / ScrollToTop). Mobile-only. Revealed po scroll >
// showAfterPercent (default 40%). Dismiss: ✕ = ukrywa na resztę sesji (state-only).

import { useState, useEffect } from "react";

interface Props {
  /** CTA label */
  label: string;
  /** CTA href */
  href: string;
  /** Show after scrolling this % of page (default 40) */
  showAfterPercent?: number;
}

export default function CTAFloating({
  label,
  href,
  showAfterPercent = 40,
}: Props) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    function onScroll() {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const scrollPct = (window.scrollY / maxScroll) * 100;
      setVisible(scrollPct > showAfterPercent);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfterPercent]);

  if (dismissed || !visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9990] md:hidden"
      style={{
        padding: "var(--space-sm, 8px) var(--space-md, 16px)",
        paddingBottom:
          "max(var(--space-sm, 8px), env(safe-area-inset-bottom))",
        background: "rgba(var(--color-bg), 0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(var(--color-border-soft), 0.5)",
        animation: "ctaSlideUp 0.3s var(--ease-default)",
      }}
    >
      <style>{`
        @keyframes ctaSlideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      <div className="flex items-center gap-3">
        <a
          href={href}
          className="flex-1 text-center font-body font-semibold"
          style={{
            padding: "var(--space-md, 16px)",
            borderRadius: "var(--radius-md, 10px)",
            background: "rgb(var(--color-accent))",
            color: "rgb(var(--color-on-accent))",
            fontSize: "var(--text-sm)",
            textDecoration: "none",
            boxShadow: "var(--shadow-accent)",
          }}
        >
          {label}
        </a>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Zamknij"
          className="flex-shrink-0 text-muted"
          style={{
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
