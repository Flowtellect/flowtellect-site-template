"use client";

// ─── NavbarSection ──────────────────────────────────────────────────────────
//
// 10 variant navbar - sticky, responsive, scroll-aware.
// vn 1-3: Classic (logo left, links right, CTA)
// vn 4:   Topbar (two rows - info bar + nav)
// vn 5:   Transparent (absolute over hero, solidifies on scroll)
// vn 6-7: Floating (pill-shaped bar with margin + shadow)
// vn 8-10: Split (logo left, links center, CTA + icons right)

/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, useCallback } from "react";
import { str, arr, resolveImage, CtaButton } from "./shared";

interface NavbarProps {
  content: Record<string, unknown>;
  vn: number;
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function getLinks(content: Record<string, unknown>) {
  return arr(content.links).map((l) => ({
    label: str(l.label),
    href: str(l.href) || "#",
  }));
}

function getCta(content: Record<string, unknown>): Record<string, unknown> | null {
  const cta = content.cta;
  if (!cta || typeof cta !== "object") return null;
  return cta as Record<string, unknown>;
}

function Logo({ content, className = "" }: { content: Record<string, unknown>; className?: string }) {
  const logo = resolveImage(content.logo);
  const brandName = str(content.brand_name);

  if (logo) {
    return <img src={logo} alt={brandName || "Logo"} className={`h-9 w-auto ${className}`} />;
  }
  if (brandName) {
    return <span className={`font-display text-xl text-primary ${className}`}>{brandName}</span>;
  }
  return null;
}

function NavLinks({
  links,
  className = "",
  linkClassName = "",
}: {
  links: { label: string; href: string }[];
  className?: string;
  linkClassName?: string;
}) {
  return (
    <nav className={`hidden md:flex items-center ${className}`}>
      {links.map((link, i) => (
        <a
          key={i}
          href={link.href}
          className={`text-sm font-body text-muted hover:text-primary transition-colors duration-200 ${linkClassName}`}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}

// ── Mobile menu ─────────────────────────────────────────────────────────────

function MobileMenu({
  open,
  onClose,
  links,
  cta,
}: {
  open: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
  cta: Record<string, unknown> | null;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] md:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      {/* Panel */}
      <div
        className="absolute top-0 right-0 w-72 h-full bg-bg shadow-2xl p-6 flex flex-col"
        style={{
          animation: "slideInRight 0.3s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <button
          onClick={onClose}
          className="self-end mb-8 p-2 text-muted hover:text-primary transition-colors"
          aria-label="Close menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <nav className="flex flex-col gap-1">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              onClick={onClose}
              className="text-base font-body text-muted hover:text-primary hover:bg-surface px-4 py-3 rounded-xl transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>
        {cta && (
          <div className="mt-8 px-4">
            <CtaButton cta={cta} />
          </div>
        )}
      </div>
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

function HamburgerButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="md:hidden p-2 text-muted hover:text-primary transition-colors"
      aria-label="Open menu"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

export default function NavbarSection({ content, vn }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const links = getLinks(content);
  const cta = getCta(content);
  const phone = str(content.phone);
  const email = str(content.email);
  const hours = str(content.hours);

  // ── vn 1-3: Classic ─────────────────────────────────────────────────────

  if (vn >= 1 && vn <= 3) {
    return (
      <>
        <header
          className={`sticky top-0 z-50 transition-all duration-300 ${
            scrolled
              ? "bg-bg/90 backdrop-blur-xl border-b border-border shadow-sm"
              : "bg-bg border-b border-transparent"
          }`}
        >
          <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto flex items-center justify-between h-16 md:h-18">
            <Logo content={content} />
            <NavLinks links={links} className="gap-8" />
            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <CtaButton cta={cta} />
              </div>
              <HamburgerButton onClick={() => setMenuOpen(true)} />
            </div>
          </div>
        </header>
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} cta={cta} />
      </>
    );
  }

  // ── vn 4: Topbar ──────────────────────────────────────────────────────

  if (vn === 4) {
    return (
      <>
        <header className="sticky top-0 z-50">
          {/* Top info bar */}
          <div
            className={`transition-all duration-300 overflow-hidden ${
              scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
            }`}
          >
            <div className="bg-surface border-b border-border">
              <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto flex items-center justify-between h-10">
                <div className="flex items-center gap-6 text-xs font-body text-muted">
                  {phone && (
                    <a href={`tel:${phone}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                      </svg>
                      <span className="hidden sm:inline">{phone}</span>
                    </a>
                  )}
                  {email && (
                    <a href={`mailto:${email}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="M22 7l-10 6L2 7" />
                      </svg>
                      <span className="hidden sm:inline">{email}</span>
                    </a>
                  )}
                </div>
                {hours && (
                  <span className="text-xs font-body text-muted hidden md:flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12,6 12,12 16,14" />
                    </svg>
                    {hours}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Main nav */}
          <div
            className={`transition-all duration-300 ${
              scrolled
                ? "bg-bg/90 backdrop-blur-xl shadow-sm"
                : "bg-bg"
            } border-b border-border`}
          >
            <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto flex items-center justify-between h-16">
              <Logo content={content} />
              <NavLinks links={links} className="gap-8" />
              <div className="flex items-center gap-4">
                <div className="hidden md:block">
                  <CtaButton cta={cta} />
                </div>
                <HamburgerButton onClick={() => setMenuOpen(true)} />
              </div>
            </div>
          </div>
        </header>
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} cta={cta} />
      </>
    );
  }

  // ── vn 5: Transparent ─────────────────────────────────────────────────

  if (vn === 5) {
    // Transparent navbar - uses theme colors with subtle backdrop blur.
    // Previous version used white text which was invisible on light themes.
    return (
      <>
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled
              ? "bg-bg/95 backdrop-blur-xl shadow-lg"
              : "bg-bg/30 backdrop-blur-sm"
          }`}
        >
          <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto flex items-center justify-between h-18 md:h-20">
            <Logo content={content} />
            <nav className="hidden md:flex items-center gap-8">
              {links.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="text-sm font-body text-primary/80 hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              {cta && (
                <div className="hidden md:block">
                  <CtaButton cta={cta} />
                </div>
              )}
              <HamburgerButton onClick={() => setMenuOpen(true)} />
            </div>
          </div>
        </header>
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} cta={cta} />
      </>
    );
  }

  // ── vn 6-7: Floating ──────────────────────────────────────────────────

  if (vn >= 6 && vn <= 7) {
    return (
      <>
        <div className="sticky top-0 z-50 mx-4 md:mx-8 mt-4">
          <header
            className={`rounded-2xl transition-all duration-300 ${
              scrolled
                ? "bg-bg/90 backdrop-blur-xl shadow-xl shadow-black/5 border border-border"
                : "bg-bg/70 backdrop-blur-lg shadow-lg shadow-black/5 border border-border/50"
            }`}
          >
            <div className="px-6 md:px-8 flex items-center justify-between h-14 md:h-16">
              <Logo content={content} />
              <NavLinks links={links} className="gap-6 lg:gap-8" />
              <div className="flex items-center gap-4">
                <div className="hidden md:block">
                  <CtaButton cta={cta} />
                </div>
                <HamburgerButton onClick={() => setMenuOpen(true)} />
              </div>
            </div>
          </header>
        </div>
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} cta={cta} />
      </>
    );
  }

  // ── vn 8-10: Split ────────────────────────────────────────────────────

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-bg/90 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-bg border-b border-transparent"
        }`}
      >
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto flex items-center justify-between h-16 md:h-18">
          {/* Left - Logo */}
          <div className="flex-shrink-0">
            <Logo content={content} />
          </div>

          {/* Center - Links */}
          <NavLinks links={links} className="gap-8 absolute left-1/2 -translate-x-1/2" />

          {/* Right - CTA + contact icons */}
          <div className="flex items-center gap-3">
            {phone && (
              <a
                href={`tel:${phone}`}
                className="hidden lg:flex items-center justify-center w-9 h-9 rounded-lg text-muted hover:text-primary hover:bg-surface transition-all duration-200"
                aria-label="Phone"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="hidden lg:flex items-center justify-center w-9 h-9 rounded-lg text-muted hover:text-primary hover:bg-surface transition-all duration-200"
                aria-label="Email"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 6L2 7" />
                </svg>
              </a>
            )}
            <div className="hidden md:block">
              <CtaButton cta={cta} />
            </div>
            <HamburgerButton onClick={() => setMenuOpen(true)} />
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} cta={cta} />
    </>
  );
}
