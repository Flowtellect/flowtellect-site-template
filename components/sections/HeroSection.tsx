"use client";

// ─── HeroSection ────────────────────────────────────────────────────────────
// 15 polished hero variants matching HTML mockup quality.
// Each variant has unique layout, animations, and visual effects.

/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, useCallback, useRef } from "react";
import { str, arr, resolveImage, BrandLogo } from "./shared";

interface HeroProps {
  content: Record<string, unknown>;
  vn: number;
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function getHeadlines(content: Record<string, unknown>): string[] {
  const raw = content.headline;
  if (Array.isArray(raw)) return raw.map((x) => String(x));
  if (typeof raw === "string") return raw.split("\n").filter(Boolean);
  return [""];
}

function getCta(content: Record<string, unknown>, key: string) {
  const c = content[key];
  if (!c || typeof c !== "object") return null;
  const obj = c as Record<string, unknown>;
  return { label: str(obj.label), href: str(obj.href) || "#" };
}

// ── Styles ──────────────────────────────────────────────────────────────────

const STYLES = `
  .hero-eyebrow { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
  .hero-eyebrow-line { width: 32px; height: 1px; background: rgb(var(--color-accent)); }
  .hero-eyebrow-line-gradient { width: 40px; height: 1px; background: linear-gradient(90deg, transparent, rgb(var(--color-accent) / 0.4)); }
  .hero-eyebrow-line-gradient-r { width: 40px; height: 1px; background: linear-gradient(90deg, rgb(var(--color-accent) / 0.4), transparent); }
  .hero-eyebrow-text { font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: rgb(var(--color-accent)); }
  .hero-eyebrow-text-light { font-size: 11px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: rgb(var(--color-accent-light)); }

  .hero-h1 { font-family: var(--font-display); font-weight: 700; line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 18px; }
  .hero-h1 em { font-style: italic; color: rgb(var(--color-accent)); }
  .hero-h1-dark { color: rgb(var(--color-text-primary)); }
  .hero-h1-white { color: white; }
  .hero-h1-white em { color: rgb(var(--color-accent-light)); }
  .hero-h1-sm { font-size: 36px; }
  .hero-h1-lg { font-size: 40px; }
  @media (min-width: 768px) { .hero-h1-sm { font-size: 44px; } .hero-h1-lg { font-size: 60px; } }
  @media (min-width: 1024px) { .hero-h1-sm { font-size: 56px; } .hero-h1-lg { font-size: 76px; } }

  .hero-sub { font-family: var(--font-body); font-size: 15px; line-height: 1.7; max-width: 480px; margin-bottom: 28px; }
  .hero-sub-dark { color: rgb(var(--color-text-muted)); }
  .hero-sub-white { color: rgb(255 255 255 / 0.7); }
  @media (min-width: 1024px) { .hero-sub { font-size: 17px; } }

  .hero-cta-row { display: flex; flex-wrap: wrap; gap: 12px; }
  .hero-btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; font-family: var(--font-body); font-size: 14px; font-weight: 600; border-radius: 12px; text-decoration: none; transition: all 0.3s ease; border: none; cursor: pointer; }
  .hero-btn-accent { background: rgb(var(--color-accent)); color: rgb(var(--color-on-accent)); box-shadow: 0 4px 16px rgb(var(--color-accent) / 0.3); }
  .hero-btn-accent:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgb(var(--color-accent) / 0.4); }
  .hero-btn-outline { background: transparent; color: rgb(var(--color-accent)); border: 2px solid rgb(var(--color-accent) / 0.3); }
  .hero-btn-outline:hover { border-color: rgb(var(--color-accent)); background: rgb(var(--color-accent) / 0.05); transform: translateY(-2px); }
  .hero-btn-white { background: white; color: rgb(var(--color-text-primary)); box-shadow: 0 4px 20px rgb(0 0 0 / 0.15); }
  .hero-btn-white:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgb(0 0 0 / 0.2); }
  .hero-btn-glass { background: transparent; color: white; border: 2px solid rgb(255 255 255 / 0.3); }
  .hero-btn-glass:hover { border-color: rgb(255 255 255 / 0.6); background: rgb(255 255 255 / 0.1); transform: translateY(-2px); }

  .hero-img { width: 100%; object-fit: cover; display: block; }
  .hero-img-rounded { border-radius: 24px; box-shadow: 0 20px 60px rgb(0 0 0 / 0.1), 0 8px 24px rgb(0 0 0 / 0.06); }
  .hero-img-zoom { transition: transform 6s ease; }
  .hero-img-zoom:hover { transform: scale(1.04); }

  .hero-badge { position: absolute; background: rgb(var(--color-surface) / 0.92); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-radius: 14px; padding: 12px 16px; display: flex; align-items: center; gap: 10px; box-shadow: 0 4px 16px rgb(0 0 0 / 0.1); }
  .hero-badge-icon { width: 36px; height: 36px; border-radius: 10px; background: rgb(var(--color-accent) / 0.12); display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
  .hero-badge-value { font-size: 15px; font-weight: 700; color: rgb(var(--color-text-primary)); }
  .hero-badge-label { font-size: 11px; color: rgb(var(--color-text-muted)); }

  .hero-pill { display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; background: rgb(var(--color-surface)); border: 1px solid rgb(var(--color-border) / 0.5); border-radius: 100px; font-size: 12px; font-weight: 500; color: rgb(var(--color-text-muted)); }
  .hero-pill-icon { font-size: 14px; }

  .hero-overlay { position: absolute; inset: 0; }
  .hero-fade { position: absolute; bottom: 0; left: 0; right: 0; height: 100px; background: linear-gradient(to bottom, transparent, rgb(var(--color-bg))); z-index: 5; }

  @keyframes heroFadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes heroSlideLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes heroSlideRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
  .hero-anim-1 { opacity: 0; animation: heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s forwards; }
  .hero-anim-2 { opacity: 0; animation: heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s forwards; }
  .hero-anim-3 { opacity: 0; animation: heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s forwards; }
  .hero-anim-4 { opacity: 0; animation: heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.7s forwards; }
  .hero-anim-5 { opacity: 0; animation: heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.9s forwards; }
  .hero-anim-sl { opacity: 0; animation: heroSlideLeft 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s forwards; }
  .hero-anim-sr { opacity: 0; animation: heroSlideRight 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s forwards; }

  .hero-deco { display: none; }
  @media (min-width: 768px) { .hero-deco { display: block; position: absolute; } }

  .hero-scroll { position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%); z-index: 10; display: flex; flex-direction: column; align-items: center; gap: 8px; }
  .hero-scroll-text { font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: rgb(255 255 255 / 0.5); }
  .hero-scroll-line { width: 1px; height: 40px; background: linear-gradient(to bottom, rgb(255 255 255 / 0.4), transparent); animation: scrollPulse 2s ease-in-out infinite; }
  @keyframes scrollPulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
`;

// ── Arrow icon ──────────────────────────────────────────────────────────────
function Arrow() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
}

// ── Headline renderer ───────────────────────────────────────────────────────
function H1({ lines, className }: { lines: string[]; className: string }) {
  return (
    <h1 className={className}>
      {lines.map((line, i) => {
        // Wrap words in * with <em>
        const parts = line.split(/(\*[^*]+\*)/g);
        return (
          <span key={i}>
            {parts.map((p, j) =>
              p.startsWith("*") && p.endsWith("*")
                ? <em key={j}>{p.slice(1, -1)}</em>
                : p
            )}
            {i < lines.length - 1 && <br />}
          </span>
        );
      })}
    </h1>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═════════════════════════════════════════════════════════════════════════════

export default function HeroSection({ content, vn }: HeroProps) {
  const headlines = getHeadlines(content);
  const eyebrow = str(content.eyebrow);
  const subheadline = str(content.subheadline);
  const image = resolveImage(content.hero_image);
  const ctaPrimary = getCta(content, "cta_primary");
  const ctaSecondary = getCta(content, "cta_secondary");
  const items = arr(content.items || content.highlights || content.features);
  const stats = arr(content.stats);

  // Slider state (hero_8)
  const [slideIdx, setSlideIdx] = useState(0);
  const slideTimer = useRef<NodeJS.Timeout | null>(null);

  // Countdown state (hero_9)
  const [countdown, setCountdown] = useState({ d: 12, h: 6, m: 34, s: 52 });

  // Parallax state (hero_10)
  const [parallaxY, setParallaxY] = useState(0);

  // Rotating word state (hero_11)
  // CSS-only animation, no state needed

  useEffect(() => {
    // Slider auto-advance for hero_8
    if (vn === 8) {
      slideTimer.current = setInterval(() => setSlideIdx(p => (p + 1) % 3), 5000);
      return () => { if (slideTimer.current) clearInterval(slideTimer.current); };
    }
    // Countdown for hero_9
    if (vn === 9) {
      const target = Date.now() + 12 * 86400000;
      const tick = () => {
        const diff = Math.max(0, target - Date.now());
        setCountdown({
          d: Math.floor(diff / 86400000),
          h: Math.floor((diff % 86400000) / 3600000),
          m: Math.floor((diff % 3600000) / 60000),
          s: Math.floor((diff % 60000) / 1000),
        });
      };
      tick();
      const iv = setInterval(tick, 1000);
      return () => clearInterval(iv);
    }
    // Parallax for hero_10
    if (vn === 10) {
      const onScroll = () => setParallaxY(window.scrollY * 0.4);
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [vn]);

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 1-3: Classic split (text left, image right)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn >= 1 && vn <= 3) {
    return (
      <section className="bg-bg overflow-hidden" style={{ padding: "48px 16px 64px" }}>
        <style>{STYLES}</style>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr", gap: 40, alignItems: "center" }} className="md:!grid-cols-2 md:!gap-12 lg:!gap-16">
          <div className="hero-anim-1">
            {eyebrow && <div className="hero-eyebrow"><div className="hero-eyebrow-line" /><span className="hero-eyebrow-text">{eyebrow}</span></div>}
            <H1 lines={headlines} className="hero-h1 hero-h1-dark hero-h1-sm" />
            {subheadline && <p className="hero-sub hero-sub-dark">{subheadline}</p>}
            <div className="hero-cta-row">
              {ctaPrimary && <a href={ctaPrimary.href} className="hero-btn hero-btn-accent">{ctaPrimary.label} <Arrow /></a>}
              {ctaSecondary && <a href={ctaSecondary.href} className="hero-btn hero-btn-outline">{ctaSecondary.label}</a>}
            </div>
          </div>
          <div className="hero-anim-2" style={{ position: "relative", marginTop: 16 }}>
            {image ? (
              <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 20px 60px rgb(0 0 0 / 0.1)" }}>
                <img src={image} alt="" className="hero-img hero-img-zoom" style={{ aspectRatio: "4/3" }} />
              </div>
            ) : (
              <div style={{ aspectRatio: "4/3", borderRadius: 24, background: "linear-gradient(135deg, rgb(var(--color-accent) / 0.1), rgb(var(--color-surface)))" }} />
            )}
          </div>
        </div>
      </section>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 4-6: Reversed split (image left, text right)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn >= 4 && vn <= 6) {
    return (
      <section className="bg-bg overflow-hidden" style={{ padding: "48px 16px 64px" }}>
        <style>{STYLES}</style>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr", gap: 40, alignItems: "center" }} className="md:!grid-cols-2 md:!gap-12 lg:!gap-16">
          {/* Image LEFT (shows second on mobile) */}
          <div className="hero-anim-sl order-1 md:!order-none" style={{ position: "relative" }}>
            {image ? (
              <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 24px 64px rgb(0 0 0 / 0.12)" }}>
                <img src={image} alt="" className="hero-img hero-img-zoom" style={{ aspectRatio: "3/4" }} />
                {/* Floating badge */}
                <div className="hero-badge hero-anim-5" style={{ bottom: 16, left: 16 }}>
                  <div className="hero-badge-icon">🕯️</div>
                  <div><div className="hero-badge-value">30+ zapachow</div><div className="hero-badge-label">w naszej kolekcji</div></div>
                </div>
              </div>
            ) : (
              <div style={{ aspectRatio: "3/4", borderRadius: 24, background: "linear-gradient(135deg, rgb(var(--color-accent) / 0.1), rgb(var(--color-surface)))" }} />
            )}
          </div>
          {/* Text RIGHT */}
          <div className="hero-anim-2 order-0 md:!order-none">
            {eyebrow && <div className="hero-eyebrow"><div className="hero-eyebrow-line" /><span className="hero-eyebrow-text">{eyebrow}</span></div>}
            <H1 lines={headlines} className="hero-h1 hero-h1-dark hero-h1-sm" />
            {subheadline && <p className="hero-sub hero-sub-dark">{subheadline}</p>}
            <div className="hero-cta-row" style={{ marginBottom: 24 }}>
              {ctaPrimary && <a href={ctaPrimary.href} className="hero-btn hero-btn-accent">{ctaPrimary.label} <Arrow /></a>}
              {ctaSecondary && <a href={ctaSecondary.href} className="hero-btn hero-btn-outline">{ctaSecondary.label}</a>}
            </div>
            {items.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {items.slice(0, 4).map((it, i) => (
                  <span key={i} className="hero-pill"><span className="hero-pill-icon">{str(it.icon) || "✦"}</span> {str(it.name || it.title || it.label)}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 7-9: Fullscreen overlay / form / slider / countdown
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn >= 7 && vn <= 9) {
    // VN 8: Slider - use first 3 headlines for rotation
    // VN 9: Countdown

    return (
      <section style={{ position: "relative", minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <style>{STYLES}{`
          .hero-vignette { position: absolute; inset: 0; background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%); z-index: 2; }
          ${vn === 9 ? `
          .cd-block { width: 64px; height: 72px; background: rgb(255 255 255 / 0.08); backdrop-filter: blur(12px); border: 1px solid rgb(255 255 255 / 0.12); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 28px; font-weight: 700; color: white; }
          @media (min-width: 768px) { .cd-block { width: 80px; height: 88px; font-size: 36px; border-radius: 20px; } }
          .cd-label { font-size: 10px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: rgb(255 255 255 / 0.4); margin-top: 8px; }
          .cd-sep { display: flex; align-items: center; padding-bottom: 24px; font-size: 24px; color: rgb(255 255 255 / 0.2); }
          ` : ""}
        `}</style>
        {/* BG */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          {image && <img src={image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
        </div>
        <div className="hero-overlay" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.6) 100%)", zIndex: 1 }} />
        <div className="hero-vignette" />

        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "24px 16px", maxWidth: 800 }} className="hero-anim-1">
          {eyebrow && (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 24 }} className="hero-anim-2">
              <div className="hero-eyebrow-line" style={{ background: "rgb(var(--color-accent-light))" }} />
              <span className="hero-eyebrow-text-light">{eyebrow}</span>
              <div className="hero-eyebrow-line" style={{ background: "rgb(var(--color-accent-light))" }} />
            </div>
          )}
          <H1 lines={headlines} className="hero-h1 hero-h1-white hero-h1-lg hero-anim-2" />
          {subheadline && <p className="hero-sub hero-sub-white hero-anim-3" style={{ margin: "0 auto 36px", maxWidth: 560 }}>{subheadline}</p>}

          {/* Countdown for vn 9 */}
          {vn === 9 && (
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 40 }} className="hero-anim-3">
              <div style={{ textAlign: "center" }}><div className="cd-block">{String(countdown.d).padStart(2, "0")}</div><div className="cd-label">Dni</div></div>
              <div className="cd-sep">:</div>
              <div style={{ textAlign: "center" }}><div className="cd-block">{String(countdown.h).padStart(2, "0")}</div><div className="cd-label">Godzin</div></div>
              <div className="cd-sep">:</div>
              <div style={{ textAlign: "center" }}><div className="cd-block">{String(countdown.m).padStart(2, "0")}</div><div className="cd-label">Minut</div></div>
              <div className="cd-sep">:</div>
              <div style={{ textAlign: "center" }}><div className="cd-block">{String(countdown.s).padStart(2, "0")}</div><div className="cd-label">Sekund</div></div>
            </div>
          )}

          <div className="hero-cta-row hero-anim-4" style={{ justifyContent: "center" }}>
            {ctaPrimary && <a href={ctaPrimary.href} className="hero-btn hero-btn-white">{ctaPrimary.label} <Arrow /></a>}
            {ctaSecondary && <a href={ctaSecondary.href} className="hero-btn hero-btn-glass">{ctaSecondary.label}</a>}
          </div>
        </div>

        <div className="hero-scroll hero-anim-5">
          <span className="hero-scroll-text">Przewin</span>
          <div className="hero-scroll-line" />
        </div>
        <div className="hero-fade" />
      </section>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 10-12: Fullscreen bottom-aligned (cinematic / parallax)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn >= 10 && vn <= 12) {
    return (
      <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <style>{STYLES}</style>
        {/* Parallax BG */}
        <div style={{ position: "absolute", inset: "-20%", width: "140%", height: "140%", transform: `translateY(${parallaxY}px)`, willChange: "transform" }}>
          {image && <img src={image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
        </div>
        <div className="hero-overlay" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.25) 100%)", zIndex: 1 }} />

        {/* Bottom-aligned content */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10, padding: "0 16px 48px" }} className="md:!px-12 lg:!px-20">
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            {eyebrow && <div className="hero-eyebrow hero-anim-1"><div className="hero-eyebrow-line" style={{ background: "rgb(var(--color-accent-light))" }} /><span className="hero-eyebrow-text-light">{eyebrow}</span></div>}
            <h1 className="hero-h1 hero-h1-white hero-anim-2" style={{ fontSize: 40, maxWidth: 800 }}>
              {headlines.map((l, i) => <span key={i}>{l}{i < headlines.length - 1 && <br />}</span>)}
            </h1>
            {subheadline && <p className="hero-sub hero-sub-white hero-anim-3">{subheadline}</p>}
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 24 }} className="hero-anim-4">
              {ctaPrimary && <a href={ctaPrimary.href} className="hero-btn hero-btn-white">{ctaPrimary.label} <Arrow /></a>}
              {stats.length > 0 && (
                <>
                  <div style={{ width: 1, height: 40, background: "rgb(255 255 255 / 0.15)" }} className="hidden md:block" />
                  <div style={{ display: "flex", gap: 24 }}>
                    {stats.slice(0, 3).map((s, i) => (
                      <div key={i}>
                        <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "white", lineHeight: 1 }}>{str(s.value)}{str(s.suffix)}</div>
                        <div style={{ fontSize: 11, color: "rgb(255 255 255 / 0.4)", marginTop: 4 }}>{str(s.label)}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 13: Centered text + feature cards
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 13) {
    return (
      <section className="bg-bg" style={{ padding: "64px 16px 48px", position: "relative", overflow: "hidden" }}>
        <style>{STYLES}{`
          .hero13-card { background: rgb(var(--color-surface)); border: 1px solid rgb(var(--color-border) / 0.5); border-radius: 20px; padding: 28px 24px; transition: all 0.3s ease; position: relative; overflow: hidden; }
          .hero13-card:hover { border-color: rgb(var(--color-accent) / 0.3); box-shadow: 0 8px 32px rgb(0 0 0 / 0.06); transform: translateY(-4px); }
          .hero13-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, rgb(var(--color-accent) / 0.6), rgb(var(--color-accent-light) / 0.3)); opacity: 0; transition: opacity 0.3s; }
          .hero13-card:hover::before { opacity: 1; }
          .hero13-icon { width: 52px; height: 52px; border-radius: 14px; background: rgb(var(--color-accent) / 0.08); display: flex; align-items: center; justify-content: center; font-size: 26px; margin-bottom: 18px; }
          .hero13-title { font-family: var(--font-display); font-size: 18px; font-weight: 600; color: rgb(var(--color-text-primary)); margin-bottom: 8px; }
          .hero13-desc { font-size: 14px; line-height: 1.6; color: rgb(var(--color-text-muted)); }
        `}</style>
        {/* Decorative bg circle */}
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgb(var(--color-accent) / 0.05), transparent 70%)", top: -200, left: "50%", transform: "translateX(-50%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 48px" }}>
            {eyebrow && <div className="hero-anim-1" style={{ display: "inline-flex", alignItems: "center", gap: 16, marginBottom: 24 }}><div className="hero-eyebrow-line-gradient" /><span className="hero-eyebrow-text">{eyebrow}</span><div className="hero-eyebrow-line-gradient-r" /></div>}
            <H1 lines={headlines} className="hero-h1 hero-h1-dark hero-h1-lg hero-anim-2" />
            {subheadline && <p className="hero-sub hero-sub-dark hero-anim-3" style={{ margin: "0 auto 32px", textAlign: "center" }}>{subheadline}</p>}
            <div className="hero-cta-row hero-anim-3" style={{ justifyContent: "center" }}>
              {ctaPrimary && <a href={ctaPrimary.href} className="hero-btn hero-btn-accent">{ctaPrimary.label} <Arrow /></a>}
              {ctaSecondary && <a href={ctaSecondary.href} className="hero-btn hero-btn-outline">{ctaSecondary.label}</a>}
            </div>
          </div>
          {items.length > 0 && (
            <div className="hero-anim-4" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
              {items.slice(0, 3).map((it, i) => (
                <div key={i} className="hero13-card">
                  <div className="hero13-icon">{str(it.icon) || "✦"}</div>
                  <div className="hero13-title">{str(it.name || it.title || it.label)}</div>
                  <div className="hero13-desc">{str(it.desc || it.description)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 14: Asymmetric (image overlaps, accent bg block)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 14) {
    return (
      <section className="bg-bg overflow-hidden" style={{ position: "relative", padding: "48px 16px 64px", minHeight: "80vh", display: "flex", alignItems: "center" }}>
        <style>{STYLES}</style>
        {/* Accent bg block */}
        <div className="hero-deco" style={{ top: 0, right: 0, width: "45%", height: "100%", background: "rgb(var(--color-accent) / 0.06)", zIndex: 0 }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr", gap: 40, alignItems: "center", width: "100%" }} className="lg:!grid-cols-2 lg:!gap-0 lg:!px-12">
          {/* Text */}
          <div className="hero-anim-1" style={{ paddingRight: 0 }}>
            {eyebrow && <div className="hero-eyebrow"><div className="hero-eyebrow-line" /><span className="hero-eyebrow-text">{eyebrow}</span></div>}
            <H1 lines={headlines} className="hero-h1 hero-h1-dark hero-h1-sm" />
            {subheadline && <p className="hero-sub hero-sub-dark">{subheadline}</p>}
            <div className="hero-cta-row" style={{ marginBottom: 28 }}>
              {ctaPrimary && <a href={ctaPrimary.href} className="hero-btn hero-btn-accent">{ctaPrimary.label} <Arrow /></a>}
              {ctaSecondary && <a href={ctaSecondary.href} className="hero-btn hero-btn-outline">{ctaSecondary.label}</a>}
            </div>
            {stats.length > 0 && (
              <div style={{ display: "flex", gap: 32, paddingTop: 24, borderTop: "1px solid rgb(var(--color-border) / 0.5)" }}>
                {stats.slice(0, 3).map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "rgb(var(--color-accent))", lineHeight: 1 }}>{str(s.value)}{str(s.suffix)}</div>
                    <div style={{ fontSize: 12, color: "rgb(var(--color-text-dim))", marginTop: 4 }}>{str(s.label)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Image */}
          <div className="hero-anim-sr" style={{ position: "relative" }}>
            {image ? (
              <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 24px 64px rgb(0 0 0 / 0.12)" }}>
                <img src={image} alt="" className="hero-img hero-img-zoom" style={{ aspectRatio: "4/5" }} />
              </div>
            ) : (
              <div style={{ aspectRatio: "4/5", borderRadius: 24, background: "linear-gradient(135deg, rgb(var(--color-accent) / 0.1), rgb(var(--color-surface)))" }} />
            )}
          </div>
        </div>
      </section>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 15: Location (image bg + info card for local businesses)
  // ═══════════════════════════════════════════════════════════════════════════
  // Default / fallback
  const address = str(content.address);
  const phone = str(content.phone);
  const email = str(content.email);
  const hours = str(content.hours);

  return (
    <section style={{ position: "relative", minHeight: "85vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      <style>{STYLES}{`
        .info-card { background: rgb(var(--color-surface) / 0.95); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-radius: 24px; padding: 28px 24px; box-shadow: 0 24px 64px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.08); }
        @media (min-width: 768px) { .info-card { padding: 32px 28px; } }
        .info-item { display: flex; gap: 14px; align-items: flex-start; text-decoration: none; padding: 10px 12px; margin: -10px -12px; border-radius: 14px; transition: background 0.2s; color: inherit; }
        a.info-item:hover { background: rgb(var(--color-bg-alt) / 0.5); }
        .info-icon { width: 42px; height: 42px; border-radius: 12px; background: rgb(var(--color-accent) / 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: rgb(var(--color-accent)); }
        .info-label { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgb(var(--color-text-dim)); margin-bottom: 3px; }
        .info-value { font-size: 14px; font-weight: 500; color: rgb(var(--color-text-primary)); line-height: 1.4; }
      `}</style>
      <div style={{ position: "absolute", inset: 0 }}>
        {image && <img src={image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
      </div>
      <div className="hero-overlay" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.65) 100%)", zIndex: 1 }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "80px 16px", display: "grid", gridTemplateColumns: "1fr", gap: 40, alignItems: "center", width: "100%" }} className="md:!grid-cols-[1fr_380px] md:!px-6 lg:!grid-cols-[1fr_420px] lg:!px-12 lg:!gap-16">
        <div className="hero-anim-1">
          {eyebrow && <div className="hero-eyebrow"><div className="hero-eyebrow-line" style={{ background: "rgb(var(--color-accent-light))" }} /><span className="hero-eyebrow-text-light">{eyebrow}</span></div>}
          <H1 lines={headlines} className="hero-h1 hero-h1-white hero-h1-sm" />
          {subheadline && <p className="hero-sub hero-sub-white">{subheadline}</p>}
          <div className="hero-cta-row">
            {ctaPrimary && <a href={ctaPrimary.href} className="hero-btn hero-btn-accent">{ctaPrimary.label} <Arrow /></a>}
            {ctaSecondary && <a href={ctaSecondary.href} className="hero-btn hero-btn-glass">{ctaSecondary.label}</a>}
          </div>
        </div>
        <div className="info-card hero-anim-2">
          <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, color: "rgb(var(--color-text-primary))", marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid rgb(var(--color-border) / 0.5)" }}>Odwiedz nas</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {address && (
              <div className="info-item">
                <div className="info-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
                <div><div className="info-label">Adres</div><div className="info-value">{address}</div></div>
              </div>
            )}
            {phone && (
              <a href={`tel:${phone}`} className="info-item">
                <div className="info-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg></div>
                <div><div className="info-label">Telefon</div><div className="info-value">{phone}</div></div>
              </a>
            )}
            {hours && (
              <div className="info-item">
                <div className="info-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg></div>
                <div><div className="info-label">Godziny</div><div className="info-value">{hours}</div></div>
              </div>
            )}
            {email && (
              <a href={`mailto:${email}`} className="info-item">
                <div className="info-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/></svg></div>
                <div><div className="info-label">Email</div><div className="info-value">{email}</div></div>
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="hero-fade" />
    </section>
  );
}
