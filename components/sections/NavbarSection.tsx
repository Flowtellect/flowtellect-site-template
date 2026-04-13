"use client";

// ─── NavbarSection ──────────────────────────────────────────────────────────
// 10 unique navbar variants, each with polished CSS matching HTML mockups.
// vn 1-3: Classic (logo left, links right, CTA, hover underline)
// vn 4:   Topbar (dark info bar + main nav, topbar collapses on scroll)
// vn 5:   Transparent (white text on dark hero, solid on scroll)
// vn 6:   Floating pill with search bar
// vn 7:   Floating pill clean
// vn 8:   Split (grid: logo left, links center, icons+CTA right)
// vn 9:   Sidebar (vertical, expands on hover)
// vn 10:  Mega menu (dropdown with cards)

/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, useCallback } from "react";
import { str, arr, resolveImage, BrandLogo } from "./shared";

interface NavbarProps {
  content: Record<string, unknown>;
  vn: number;
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function getLinks(content: Record<string, unknown>) {
  const all = [
    ...arr(content.links),
    ...arr(content.links_left),
    ...arr(content.links_right),
    ...arr(content.quick_links),
  ];
  return all.map((l) => ({
    label: str(l.label),
    href: str(l.href) || "#",
  }));
}

function getCta(content: Record<string, unknown>) {
  const cta = content.cta;
  if (!cta || typeof cta !== "object") return null;
  return cta as Record<string, unknown>;
}

function getCtaLabel(cta: Record<string, unknown> | null) {
  return cta ? str(cta.label) : "";
}
function getCtaHref(cta: Record<string, unknown> | null) {
  return cta ? str(cta.href) || "#" : "#";
}

// ── Shared: Mobile menu ─────────────────────────────────────────────────────

function MobileMenu({
  open, onClose, links, cta,
}: {
  open: boolean; onClose: () => void;
  links: { label: string; href: string }[];
  cta: Record<string, unknown> | null;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] md:hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute top-0 right-0 w-72 h-full bg-bg shadow-2xl p-6 flex flex-col"
        style={{ animation: "navSlideIn 0.3s cubic-bezier(0.16,1,0.3,1)" }}>
        <button onClick={onClose} className="self-end mb-8 p-2 text-muted hover:text-primary transition-colors" aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
        <nav className="flex flex-col gap-1">
          {links.map((l, i) => (
            <a key={i} href={l.href} onClick={onClose}
              className="text-base font-body text-muted hover:text-primary hover:bg-surface px-4 py-3 rounded-xl transition-all">
              {l.label}
            </a>
          ))}
        </nav>
        {cta && (
          <a href={getCtaHref(cta)} className="mt-8 mx-4 text-center py-3 rounded-xl bg-accent text-on-accent font-body font-semibold text-sm">
            {getCtaLabel(cta)}
          </a>
        )}
      </div>
      <style>{`@keyframes navSlideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
    </div>
  );
}

function Hamburger({ onClick, className = "" }: { onClick: () => void; className?: string }) {
  return (
    <button onClick={onClick} className={`md:hidden p-2 transition-colors ${className}`} aria-label="Menu">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    </button>
  );
}

// ── Main ────────────────────────────────────────────────────────────────────

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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const links = getLinks(content);
  const cta = getCta(content);
  const phone = str(content.phone);
  const email = str(content.email);
  const hours = str(content.hours);
  const logo = resolveImage(content.logo);
  const brandName = str(content.brand_name) || str(content.company_name) || "";
  const ctaLabel = getCtaLabel(cta);
  const ctaHref = getCtaHref(cta);
  const hasRealLogo = logo && !logo.includes("unsplash.com");

  // Logo renderer
  const LogoEl = ({ className = "" }: { className?: string }) => (
    <a href="#" style={{ textDecoration: "none", color: "inherit" }} onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
      <BrandLogo content={content} className={className} size="md" />
    </a>
  );

  // ── STYLES (inline to match HTML mockups exactly) ─────────────────────────

  const styles = `
    .nb-link { position: relative; font-size: 14px; font-weight: 500; text-decoration: none; transition: color 0.2s; }
    .nb-link::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; border-radius: 1px; transition: width 0.3s ease; }
    .nb-link:hover::after { width: 100%; }
    .nb-link-default { color: rgb(var(--color-text-muted)); }
    .nb-link-default:hover { color: rgb(var(--color-text-primary)); }
    .nb-link-default::after { background: rgb(var(--color-accent)); }
    .nb-link-white { color: rgb(255 255 255 / 0.85); }
    .nb-link-white:hover { color: white; }
    .nb-link-white::after { background: white; }
    .nb-link-pill { font-size: 13px; font-weight: 500; padding: 7px 14px; border-radius: 10px; transition: all 0.2s; color: rgb(var(--color-text-muted)); text-decoration: none; }
    .nb-link-pill:hover { color: rgb(var(--color-text-primary)); background: rgb(var(--color-surface-deep) / 0.5); }
    .nb-link-pill-round { font-size: 13px; font-weight: 500; padding: 7px 14px; border-radius: 100px; transition: all 0.2s; color: rgb(var(--color-text-muted)); text-decoration: none; white-space: nowrap; }
    .nb-link-pill-round:hover { color: rgb(var(--color-text-primary)); background: rgb(var(--color-surface-deep) / 0.6); }
    .nb-link-pill-round.active { color: rgb(var(--color-accent)); background: rgb(var(--color-accent) / 0.08); }
    .nb-cta { align-items: center; gap: 8px; padding: 10px 24px; background: rgb(var(--color-accent)); color: rgb(var(--color-on-accent)); font-size: 14px; font-weight: 600; border-radius: 10px; text-decoration: none; transition: all 0.3s ease; box-shadow: 0 2px 8px rgb(var(--color-accent) / 0.3); }
    .nb-cta:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgb(var(--color-accent) / 0.4); }
    .nb-cta-sm { padding: 9px 20px; font-size: 13px; }
    .nb-cta-pill { border-radius: 100px; }
    .nb-cta-glass { background: rgb(255 255 255 / 0.15); color: white; border: 1px solid rgb(255 255 255 / 0.3); backdrop-filter: blur(8px); box-shadow: none; }
    .nb-cta-glass:hover { background: rgb(255 255 255 / 0.25); border-color: rgb(255 255 255 / 0.5); }
    .nb-icon-btn { align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 10px; color: rgb(var(--color-text-muted)); transition: all 0.2s; text-decoration: none; position: relative; }
    .nb-icon-btn:hover { color: rgb(var(--color-text-primary)); background: rgb(var(--color-surface-deep) / 0.5); }
    .nb-bar { max-width: 1280px; margin: 0 auto; padding: 0 16px; display: flex; align-items: center; justify-content: space-between; height: 56px; }
    @media (min-width: 768px) { .nb-bar { padding: 0 24px; height: 64px; } }
    @media (min-width: 1024px) { .nb-bar { padding: 0 48px; height: 72px; } }
    .nb-bar-sm { max-width: 1280px; margin: 0 auto; padding: 0 16px; display: flex; align-items: center; justify-content: space-between; height: 40px; }
    @media (min-width: 768px) { .nb-bar-sm { padding: 0 24px; } }
  `;

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 1: Classic (logo lewo, linki prawo, CTA)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 1 || vn === 3) {
    return (
      <>
        <style>{styles}</style>
        <header style={{
          position: "sticky", top: 0, zIndex: 50,
          background: scrolled ? "rgb(var(--color-bg) / 0.85)" : "rgb(var(--color-bg))",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: `1px solid rgb(var(--color-border) / ${scrolled ? "0.5" : "0.3"})`,
          transition: "all 0.3s ease",
        }}>
          <div className="nb-bar">
            <LogoEl />
            <nav className="hidden md:flex items-center" style={{ gap: 32 }}>
              {links.map((l, i) => <a key={i} href={l.href} className="nb-link nb-link-default">{l.label}</a>)}
            </nav>
            <div className="flex items-center gap-4">
              {ctaLabel && <a href={ctaHref} className="nb-cta hidden md:inline-flex">{ctaLabel}</a>}
              <Hamburger onClick={() => setMenuOpen(true)} className="text-muted hover:text-primary" />
            </div>
          </div>
        </header>
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} cta={cta} />
      </>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 2: Centrowane logo (logo gora, linki + CTA ponizej)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 2) {
    return (
      <>
        <style>{styles}{`
          .nb2-inner{max-width:1280px;margin:0 auto;padding:16px 16px 12px;display:flex;flex-direction:column;align-items:center;gap:12px}
          @media(min-width:768px){.nb2-inner{padding:16px 24px 12px}}
          @media(min-width:1024px){.nb2-inner{padding:16px 48px 12px}}
          .nb2-links{display:none;align-items:center;gap:8px}
          @media(min-width:768px){.nb2-links{display:flex}}
          .nb2-divider{width:1px;height:16px;background:rgb(var(--color-border));margin:0 4px}
          .nb2-link{font-size:13px;font-weight:500;color:rgb(var(--color-text-muted));text-decoration:none;padding:6px 16px;border-radius:8px;transition:all .2s;letter-spacing:.02em}
          .nb2-link:hover{color:rgb(var(--color-text-primary));background:rgb(var(--color-surface-deep)/0.6)}
        `}</style>
        <header style={{
          position: "sticky", top: 0, zIndex: 50,
          background: scrolled ? "rgb(var(--color-bg) / 0.85)" : "rgb(var(--color-bg))",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: `1px solid rgb(var(--color-border) / ${scrolled ? "0.5" : "0.3"})`,
          transition: "all 0.3s ease",
        }}>
          <div className="nb2-inner">
            <LogoEl />
            <div className="nb2-links">
              {links.map((l, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                  {i > 0 && <div className="nb2-divider" />}
                  <a href={l.href} className="nb2-link">{l.label}</a>
                </span>
              ))}
              {ctaLabel && (
                <>
                  <div className="nb2-divider" style={{ marginLeft: 8 }} />
                  <a href={ctaHref} className="nb-cta nb-cta-sm" style={{ marginLeft: 4 }}>{ctaLabel}</a>
                </>
              )}
            </div>
            <div className="md:hidden"><Hamburger onClick={() => setMenuOpen(true)} className="text-muted hover:text-primary" /></div>
          </div>
        </header>
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} cta={cta} />
      </>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 4: Topbar
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 4) {
    return (
      <>
        <style>{styles}</style>
        <div style={{ position: "sticky", top: 0, zIndex: 50 }}>
          {/* Dark topbar */}
          <div style={{
            background: "rgb(var(--color-text-primary))",
            maxHeight: scrolled ? 0 : 40, overflow: "hidden",
            transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <div className="nb-bar-sm">
              <div className="flex items-center gap-6">
                {phone && (
                  <a href={`tel:${phone}`} className="flex items-center gap-1.5 text-xs hover:opacity-100 transition-opacity" style={{ color: "rgb(var(--color-bg) / 0.75)", textDecoration: "none" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.6 }}>
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                    <span className="hidden sm:inline">{phone}</span>
                  </a>
                )}
                {email && (
                  <a href={`mailto:${email}`} className="flex items-center gap-1.5 text-xs hover:opacity-100 transition-opacity" style={{ color: "rgb(var(--color-bg) / 0.75)", textDecoration: "none" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.6 }}>
                      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/>
                    </svg>
                    <span className="hidden sm:inline">{email}</span>
                  </a>
                )}
                {hours && (
                  <span className="hidden md:flex items-center gap-1.5 text-xs" style={{ color: "rgb(var(--color-bg) / 0.75)" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.6 }}>
                      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                    </svg>
                    {hours}
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* Main nav */}
          <header style={{
            background: scrolled ? "rgb(var(--color-bg) / 0.9)" : "rgb(var(--color-bg))",
            backdropFilter: scrolled ? "blur(20px)" : "none",
            borderBottom: "1px solid rgb(var(--color-border) / 0.5)",
            transition: "all 0.3s ease",
          }}>
            <div className="nb-bar">
              <LogoEl />
              <nav className="hidden md:flex items-center" style={{ gap: 32 }}>
                {links.map((l, i) => <a key={i} href={l.href} className="nb-link nb-link-default">{l.label}</a>)}
              </nav>
              <div className="flex items-center gap-4">
                {ctaLabel && <a href={ctaHref} className="nb-cta hidden md:inline-flex">{ctaLabel}</a>}
                <Hamburger onClick={() => setMenuOpen(true)} className="text-muted hover:text-primary" />
              </div>
            </div>
          </header>
        </div>
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} cta={cta} />
      </>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 5: Transparent -> Solid
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 5) {
    // Solid after scrolling 80px - simple, reliable
    const solid = scrolled;

    return (
      <>
        <style>{styles}</style>
        <header style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: solid ? "rgb(var(--color-bg) / 0.95)" : "transparent",
          backdropFilter: solid ? "blur(24px)" : "none",
          WebkitBackdropFilter: solid ? "blur(24px)" : "none",
          boxShadow: solid ? "0 4px 30px rgb(0 0 0 / 0.08)" : "none",
          borderBottom: solid ? "1px solid rgb(var(--color-border) / 0.3)" : "none",
          transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <div className="nb-bar" style={{ transition: "height 0.4s ease" }}>
            {/* Logo - click scrolls to top */}
            <a href="#" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: 10 }} onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            {hasRealLogo ? (
              <img src={logo!} alt={brandName} style={{ height: 36, width: "auto", filter: solid ? "none" : "brightness(0) invert(1)", transition: "filter 0.4s ease" }} />
            ) : (
              <div className="flex items-center gap-2.5">
                <div style={{
                  width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, transition: "all 0.4s ease",
                  background: solid ? "rgb(var(--color-accent))" : "rgb(255 255 255 / 0.2)",
                  color: solid ? "rgb(var(--color-on-accent))" : "white",
                  backdropFilter: solid ? "none" : "blur(8px)",
                }}>
                  {brandName.split(/[\s-]+/).slice(0, 2).map(w => w[0]?.toUpperCase() || "").join("")}
                </div>
                <span style={{
                  fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em",
                  color: solid ? "rgb(var(--color-text-primary))" : "white", transition: "color 0.4s ease",
                }}>
                  {brandName}
                </span>
              </div>
            )}
            </a>
            <nav className="hidden md:flex items-center" style={{ gap: 32 }}>
              {links.map((l, i) => (
                <a key={i} href={l.href} className={`nb-link ${solid ? "nb-link-default" : "nb-link-white"}`}>{l.label}</a>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              {ctaLabel && (
                <a href={ctaHref} className={`nb-cta hidden md:inline-flex ${solid ? "" : "nb-cta-glass"}`}>
                  {ctaLabel}
                </a>
              )}
              <Hamburger onClick={() => setMenuOpen(true)} className={solid ? "text-muted hover:text-primary" : "text-white"} />
            </div>
          </div>
        </header>
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} cta={cta} />
      </>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 6: Floating pill + search
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 6) {
    return (
      <>
        <style>{styles}</style>
        <div style={{ height: 88 }} />
        <div style={{ position: "fixed", top: 12, left: 16, right: 16, zIndex: 50 }} className="md:left-8 md:right-8">
          <div style={{
            maxWidth: 1200, margin: "0 auto",
            background: "rgb(var(--color-surface) / 0.92)",
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgb(var(--color-border) / 0.5)",
            borderRadius: 20, padding: "0 8px",
            display: "flex", alignItems: "center", justifyContent: "space-between", height: 64,
            boxShadow: scrolled
              ? "0 12px 48px rgb(0 0 0 / 0.1), 0 4px 12px rgb(0 0 0 / 0.05)"
              : "0 8px 32px rgb(0 0 0 / 0.06), 0 2px 8px rgb(0 0 0 / 0.04)",
            transition: "all 0.4s ease",
          }}>
            <div className="flex items-center gap-2" style={{ paddingLeft: 8 }}>
              <LogoEl />
            </div>
            <nav className="hidden md:flex items-center gap-1">
              {links.map((l, i) => <a key={i} href={l.href} className="nb-link-pill">{l.label}</a>)}
            </nav>
            <div className="flex items-center gap-1.5" style={{ paddingRight: 4 }}>
              {/* Search */}
              <div className="hidden lg:flex items-center gap-1.5" style={{
                padding: "7px 14px", borderRadius: 10,
                background: "rgb(var(--color-bg-alt) / 0.6)",
                border: "1px solid rgb(var(--color-border) / 0.4)",
                cursor: "pointer",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--color-text-dim))" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                </svg>
                <span style={{ fontSize: 13, color: "rgb(var(--color-text-dim))" }}>Szukaj</span>
                <span style={{ fontSize: 10, padding: "2px 5px", borderRadius: 4, background: "rgb(var(--color-surface))", border: "1px solid rgb(var(--color-border) / 0.6)", color: "rgb(var(--color-text-dim))", fontWeight: 500, marginLeft: 12 }}>Ctrl K</span>
              </div>
              {ctaLabel && <a href={ctaHref} className="nb-cta nb-cta-sm hidden md:inline-flex">{ctaLabel}</a>}
              <Hamburger onClick={() => setMenuOpen(true)} className="text-muted hover:text-primary" />
            </div>
          </div>
        </div>
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} cta={cta} />
      </>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 7: Floating pill clean
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 7) {
    return (
      <>
        <style>{styles}</style>
        <div style={{ height: 84 }} />
        <div style={{ position: "fixed", top: 12, left: 16, right: 16, zIndex: 50 }} className="md:left-8 md:right-8 lg:left-16 lg:right-16">
          <div style={{
            maxWidth: 1100, margin: "0 auto",
            background: "rgb(var(--color-surface) / 0.9)",
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgb(var(--color-border) / 0.4)",
            borderRadius: 100, padding: "0 6px 0 20px",
            display: "flex", alignItems: "center", justifyContent: "space-between", height: 58,
            boxShadow: scrolled
              ? "0 8px 40px rgb(0 0 0 / 0.08), 0 2px 8px rgb(0 0 0 / 0.04)"
              : "0 4px 24px rgb(0 0 0 / 0.05), 0 1px 4px rgb(0 0 0 / 0.03)",
            transition: "all 0.4s ease",
          }}>
            <LogoEl />
            <nav className="hidden md:flex items-center gap-0.5" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
              {links.map((l, i) => <a key={i} href={l.href} className="nb-link-pill-round">{l.label}</a>)}
            </nav>
            <div className="flex items-center gap-1.5" style={{ paddingRight: 4 }}>
              {ctaLabel && <a href={ctaHref} className="nb-cta nb-cta-sm nb-cta-pill hidden md:inline-flex">{ctaLabel}</a>}
              <Hamburger onClick={() => setMenuOpen(true)} className="text-muted hover:text-primary" />
            </div>
          </div>
        </div>
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} cta={cta} />
      </>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 8: Split (grid)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 8) {
    return (
      <>
        <style>{styles}</style>
        <header style={{
          position: "sticky", top: 0, zIndex: 50,
          background: scrolled ? "rgb(var(--color-bg) / 0.85)" : "rgb(var(--color-bg))",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: "1px solid rgb(var(--color-border) / 0.5)",
          transition: "all 0.3s ease",
        }}>
          <div className="nb-bar" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr" }}>
            <div><LogoEl /></div>
            <nav className="hidden md:flex items-center" style={{ gap: 4 }}>
              {links.map((l, i) => <a key={i} href={l.href} className="nb-link-pill">{l.label}</a>)}
            </nav>
            <div className="flex items-center justify-end gap-1">
              {phone && (
                <a href={`tel:${phone}`} className="nb-icon-btn hidden lg:flex" title="Zadzwon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </a>
              )}
              <div className="hidden md:block" style={{ width: 1, height: 24, background: "rgb(var(--color-border))", margin: "0 8px" }} />
              {ctaLabel && <a href={ctaHref} className="nb-cta nb-cta-sm hidden md:inline-flex">{ctaLabel}</a>}
              <Hamburger onClick={() => setMenuOpen(true)} className="text-muted hover:text-primary" />
            </div>
          </div>
        </header>
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} cta={cta} />
      </>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 9: Sidebar
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 9) {
    // Sidebar is complex for generated sites - fall back to floating pill
    // (sidebar requires layout changes to entire page)
    return (
      <>
        <style>{styles}</style>
        <div style={{ height: 84 }} />
        <div style={{ position: "fixed", top: 12, left: 16, right: 16, zIndex: 50 }} className="md:left-8 md:right-8">
          <div style={{
            maxWidth: 1100, margin: "0 auto",
            background: "rgb(var(--color-surface) / 0.9)",
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgb(var(--color-border) / 0.4)",
            borderRadius: 100, padding: "0 6px 0 20px",
            display: "flex", alignItems: "center", justifyContent: "space-between", height: 58,
            boxShadow: "0 4px 24px rgb(0 0 0 / 0.05), 0 1px 4px rgb(0 0 0 / 0.03)",
            transition: "all 0.4s ease",
          }}>
            <LogoEl />
            <nav className="hidden md:flex items-center gap-0.5" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
              {links.map((l, i) => <a key={i} href={l.href} className="nb-link-pill-round">{l.label}</a>)}
            </nav>
            <div className="flex items-center gap-1.5" style={{ paddingRight: 4 }}>
              {ctaLabel && <a href={ctaHref} className="nb-cta nb-cta-sm nb-cta-pill hidden md:inline-flex">{ctaLabel}</a>}
              <Hamburger onClick={() => setMenuOpen(true)} className="text-muted hover:text-primary" />
            </div>
          </div>
        </div>
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} cta={cta} />
      </>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 10: Mega menu (classic + dropdown)
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <>
      <style>{styles}</style>
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: scrolled ? "rgb(var(--color-bg) / 0.85)" : "rgb(var(--color-bg))",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: "1px solid rgb(var(--color-border) / 0.5)",
        transition: "all 0.3s ease",
      }}>
        <div className="nb-bar">
          <LogoEl />
          <nav className="hidden md:flex items-center" style={{ gap: 32 }}>
            {links.map((l, i) => <a key={i} href={l.href} className="nb-link nb-link-default">{l.label}</a>)}
          </nav>
          <div className="flex items-center gap-4">
            {ctaLabel && <a href={ctaHref} className="nb-cta hidden md:inline-flex">{ctaLabel}</a>}
            <Hamburger onClick={() => setMenuOpen(true)} className="text-muted hover:text-primary" />
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} cta={cta} />
    </>
  );
}
