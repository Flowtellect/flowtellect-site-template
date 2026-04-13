"use client";

// ─── AdvantagesSection ───────────────────────────────────────────────────────
// 10 individually crafted advantage variants matching HTML mockups.

/* eslint-disable @next/next/no-img-element */

import { str, arr, resolveImage, resolveIcon } from "./shared";
import { ScrollReveal, StaggerChildren } from './ClientComponents'

interface AdvantagesProps {
  content: Record<string, unknown>;
  vn: number;
}

function Arrow() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
}

const S = `
  .adv-wrap{max-width:1280px;margin:0 auto;padding:0 16px}
  @media(min-width:768px){.adv-wrap{padding:0 24px}}@media(min-width:1024px){.adv-wrap{padding:0 48px}}
  .adv-eyebrow{display:inline-flex;align-items:center;gap:16px;margin-bottom:20px}
  .adv-eline{width:32px;height:1px;background:linear-gradient(90deg,transparent,rgb(var(--color-accent)/0.4))}
  .adv-eline-r{width:32px;height:1px;background:linear-gradient(90deg,rgb(var(--color-accent)/0.4),transparent)}
  .adv-etxt{font-size:11px;font-weight:600;letter-spacing:.25em;text-transform:uppercase;color:rgb(var(--color-accent))}
  .adv-h2{font-family:var(--font-display);font-weight:700;line-height:1.15;letter-spacing:-.02em;color:rgb(var(--color-text-primary));margin-bottom:14px}
  .adv-h2 em{font-style:italic;color:rgb(var(--color-accent))}
  .adv-h2-m{font-size:32px}@media(min-width:768px){.adv-h2-m{font-size:40px}}@media(min-width:1024px){.adv-h2-m{font-size:48px}}
  .adv-desc{font-size:16px;line-height:1.7;color:rgb(var(--color-text-muted))}
  .adv-header{text-align:center;max-width:640px;margin:0 auto 48px}
  @media(min-width:768px){.adv-header{margin-bottom:56px}}

  .adv-card{background:rgb(var(--color-surface));border:1px solid rgb(var(--color-border)/0.5);border-radius:20px;padding:28px 24px;transition:all .3s;position:relative;overflow:hidden}
  .adv-card:hover{border-color:rgb(var(--color-accent)/0.3);box-shadow:0 8px 32px rgb(0 0 0/0.06);transform:translateY(-4px)}
  .adv-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,rgb(var(--color-accent)/0.6),rgb(var(--color-accent-light)/0.2));opacity:0;transition:opacity .3s}
  .adv-card:hover::before{opacity:1}
  .adv-card-icon{width:56px;height:56px;border-radius:16px;background:rgb(var(--color-accent)/0.08);display:flex;align-items:center;justify-content:center;font-size:28px;margin-bottom:18px}
  .adv-card-title{font-family:var(--font-display);font-size:18px;font-weight:600;color:rgb(var(--color-text-primary));margin-bottom:8px}
  .adv-card-desc{font-size:14px;line-height:1.6;color:rgb(var(--color-text-muted))}
  .adv-card-link{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:rgb(var(--color-accent));text-decoration:none;margin-top:14px;transition:gap .2s}
  .adv-card-link:hover{gap:10px}

  .adv-card-num{font-family:var(--font-display);font-size:36px;font-weight:700;color:rgb(var(--color-accent));line-height:1;margin-bottom:10px}

  .adv-card-img{background:rgb(var(--color-surface));border:1px solid rgb(var(--color-border)/0.5);border-radius:24px;overflow:hidden;transition:all .3s}
  .adv-card-img:hover{border-color:rgb(var(--color-accent)/0.3);box-shadow:0 12px 40px rgb(0 0 0/0.08);transform:translateY(-4px)}
  .adv-card-img img{width:100%;aspect-ratio:16/9;object-fit:cover;display:block;transition:transform .6s}
  .adv-card-img:hover img{transform:scale(1.05)}

  .adv-big-icon{width:80px;height:80px;border-radius:50%;background:rgb(var(--color-accent)/0.06);display:flex;align-items:center;justify-content:center;font-size:40px;margin:0 auto 16px;transition:transform .3s}

  .adv-tl-line{position:absolute;left:15px;top:8px;bottom:8px;width:2px;background:linear-gradient(to bottom,rgb(var(--color-accent)/0.3),rgb(var(--color-border)/0.3));border-radius:1px}
  .adv-tl-dot{position:absolute;left:-40px;top:4px;width:32px;height:32px;border-radius:50%;background:rgb(var(--color-bg-alt));border:3px solid rgb(var(--color-accent)/0.4);display:flex;align-items:center;justify-content:center;z-index:2;font-size:12px;font-weight:700;color:rgb(var(--color-accent))}

  .adv-cmp-row{display:grid;grid-template-columns:1fr 1fr;border-bottom:1px solid rgb(var(--color-border)/0.3);transition:background .2s}
  .adv-cmp-row:hover{background:rgb(var(--color-surface-deep)/0.3)}
  .adv-cmp-cell{padding:14px 20px;font-size:14px;color:rgb(var(--color-text-muted));text-align:center}
  .adv-cmp-check{color:rgb(34 197 94);font-size:18px}
  .adv-cmp-x{color:rgb(var(--color-text-dim));font-size:18px;opacity:.4}

  .adv-trust-card{display:flex;align-items:center;gap:10px;padding:12px 20px;background:rgb(var(--color-surface));border:1px solid rgb(var(--color-border)/0.5);border-radius:12px;font-size:14px;font-weight:500;color:rgb(var(--color-text-muted));transition:all .2s;white-space:nowrap;flex-shrink:0}
  .adv-trust-card:hover{border-color:rgb(var(--color-accent)/0.3);color:rgb(var(--color-text-primary))}
  .adv-trust-icon{font-size:20px}

  @keyframes advUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  .aa1{opacity:0;animation:advUp .8s ease .1s forwards}
  .aa2{opacity:0;animation:advUp .8s ease .3s forwards}
  @keyframes advMarquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
`;

export default function AdvantagesSection({ content, vn }: AdvantagesProps) {
  const ey = str(content.eyebrow);
  const hl = str(content.headline || content.heading);
  const body = str(content.body);
  const items = arr(content.items || content.highlights || content.features);
  const img = resolveImage(content.image || content.video_thumbnail);

  const Header = () => (
    <div className="adv-header aa1">
      {ey && <div className="adv-eyebrow"><div className="adv-eline"/><span className="adv-etxt">{ey}</span><div className="adv-eline-r"/></div>}
      <ScrollReveal delay={0}><h2 className="adv-h2 adv-h2-m">{hl}</h2></ScrollReveal>
      {body && <ScrollReveal delay={0.1}><p className="adv-desc">{body}</p></ScrollReveal>}
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 1: Karty z ikonami
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 1) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="adv-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.12}><div className="aa2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <div key={i} className="adv-card card-hover" style={{ textAlign: "center" }}>
            <div className="adv-card-icon" style={{ margin: "0 auto 18px" }}>{resolveIcon(it.icon)}</div>
            <div className="adv-card-title">{str(it.name || it.title || it.label)}</div>
            <div className="adv-card-desc">{str(it.desc || it.description)}</div>
          </div>
        ))}
      </div></StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 2: Z liczbami
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 2) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="adv-wrap">
      <Header />
      <div className="aa2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((it, i) => (
          <div key={i} className="adv-card" style={{ textAlign: "center" }}>
            <div className="adv-card-num">{str(it.value || it.number || it.name || it.title)}</div>
            <div className="adv-card-title">{str(it.title || it.label || it.name)}</div>
            <div className="adv-card-desc">{str(it.desc || it.description)}</div>
          </div>
        ))}
      </div>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 3: Z linkami
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 3) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="adv-wrap">
      <Header />
      <div className="aa2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <div key={i} className="adv-card" style={{ display: "flex", flexDirection: "column" }}>
            <div className="adv-card-icon">{resolveIcon(it.icon)}</div>
            <div className="adv-card-title">{str(it.name || it.title || it.label)}</div>
            <div className="adv-card-desc" style={{ flex: 1 }}>{str(it.desc || it.description)}</div>
            <a href={str(it.href) || "#"} className="adv-card-link">{str(it.cta_label) || "Dowiedz sie wiecej"} <Arrow /></a>
          </div>
        ))}
      </div>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 4: Zig-zag (naprzemiennie obraz/tekst)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 4) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="adv-wrap">
      <Header />
      <div className="aa2" style={{ display: "flex", flexDirection: "column", gap: 48 }}>
        {items.map((it, i) => {
          const itImg = resolveImage(it.image || it.src);
          const reversed = i % 2 === 1;
          return (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className={reversed ? "md:order-2" : ""}>
                {itImg ? (
                  <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 12px 40px rgb(0 0 0/0.08)" }}>
                    <img src={itImg} alt="" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block", transition: "transform 6s ease" }} />
                  </div>
                ) : (
                  <div style={{ width: "100%", aspectRatio: "4/3", borderRadius: 20, background: "linear-gradient(135deg, rgb(var(--color-accent)/0.1), rgb(var(--color-surface)))" }} />
                )}
              </div>
              <div className={reversed ? "md:order-1" : ""}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgb(var(--color-accent)/0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 16 }}>{resolveIcon(it.icon)}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, color: "rgb(var(--color-text-primary))", marginBottom: 10 }}>{str(it.name || it.title || it.label)}</div>
                <div style={{ fontSize: 15, lineHeight: 1.7, color: "rgb(var(--color-text-muted))" }}>{str(it.desc || it.description)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 5: Duze ikony (80px, minimalistyczny)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 5) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="adv-wrap">
      <Header />
      <div className="aa2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((it, i) => (
          <div key={i} style={{ textAlign: "center", padding: "24px 16px", borderRadius: 20, transition: "all 0.3s", cursor: "default" }} className="hover:bg-surface hover:shadow-md hover:-translate-y-1">
            <div className="adv-big-icon">{resolveIcon(it.icon)}</div>
            <div className="adv-card-title">{str(it.name || it.title || it.label)}</div>
            <div className="adv-card-desc">{str(it.desc || it.description)}</div>
          </div>
        ))}
      </div>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 6: Z wideo (split: lista lewo + wideo prawo)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 6) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="adv-wrap">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="aa1">
          {ey && <div className="adv-eyebrow" style={{ justifyContent: "flex-start" }}><div style={{ width: 32, height: 1, background: "rgb(var(--color-accent))" }}/><span className="adv-etxt">{ey}</span></div>}
          <h2 className="adv-h2 adv-h2-m" style={{ fontSize: 32 }}>{hl}</h2>
          {body && <p className="adv-desc" style={{ marginBottom: 28 }}>{body}</p>}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {items.map((it, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgb(var(--color-accent)/0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{resolveIcon(it.icon)}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "rgb(var(--color-text-primary))", marginBottom: 3 }}>{str(it.name || it.title || it.label)}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.6, color: "rgb(var(--color-text-muted))" }}>{str(it.desc || it.description)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="aa2" style={{ position: "relative", borderRadius: 24, overflow: "hidden", boxShadow: "0 16px 48px rgb(0 0 0/0.08)" }}>
          {img ? <img src={img} alt="" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }} />
          : <div style={{ width: "100%", aspectRatio: "16/9", background: "linear-gradient(135deg, rgb(var(--color-accent)/0.15), rgb(var(--color-surface)))" }} />}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgb(0 0 0/0.15)", cursor: "pointer" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgb(var(--color-surface)/0.95)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 32px rgb(0 0 0/0.15)" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="rgb(var(--color-accent))"><polygon points="5,3 19,12 5,21"/></svg>
            </div>
          </div>
        </div>
      </div>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 7: Os czasu (timeline pionowy)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 7) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="adv-wrap">
      <Header />
      <div className="aa2" style={{ position: "relative", maxWidth: 720, margin: "0 auto", paddingLeft: 40 }}>
        <div className="adv-tl-line" />
        {items.map((it, i) => (
          <div key={i} style={{ position: "relative", paddingBottom: i < items.length - 1 ? 40 : 0 }}>
            <div className="adv-tl-dot">{i + 1}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, color: "rgb(var(--color-text-primary))", marginBottom: 8 }}>{str(it.name || it.title || it.label)}</div>
            <div style={{ fontSize: 14, lineHeight: 1.7, color: "rgb(var(--color-text-muted))", maxWidth: 520 }}>{str(it.desc || it.description)}</div>
          </div>
        ))}
      </div>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 8: My vs konkurencja (tabela porownawcza)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 8) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="adv-wrap">
      <Header />
      <div className="aa2" style={{ maxWidth: 700, margin: "0 auto", background: "rgb(var(--color-surface))", border: "1px solid rgb(var(--color-border)/0.5)", borderRadius: 20, overflow: "hidden" }}>
        {/* Header row */}
        <div className="adv-cmp-row" style={{ background: "rgb(var(--color-surface-deep)/0.5)", borderBottom: "2px solid rgb(var(--color-border)/0.5)" }}>
          <div className="adv-cmp-cell" style={{ fontWeight: 700, color: "rgb(var(--color-accent))", fontFamily: "var(--font-display)", fontSize: 16 }}>{str(content.brand_name) || "My"}</div>
          <div className="adv-cmp-cell" style={{ fontWeight: 600, color: "rgb(var(--color-text-dim))" }}>{str(content.competitor_name) || "Konkurencja"}</div>
        </div>
        {items.map((it, i) => (
          <div key={i} className="adv-cmp-row">
            <div className="adv-cmp-cell">
              <div className="adv-cmp-check">✓</div>
              <div style={{ fontSize: 13, marginTop: 2 }}>{str(it.name || it.title || it.label)}</div>
            </div>
            <div className="adv-cmp-cell">
              <div className="adv-cmp-x">✗</div>
              <div style={{ fontSize: 13, marginTop: 2, opacity: 0.5 }}>{str(it.competitor_text) || "Brak"}</div>
            </div>
          </div>
        ))}
      </div>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 9: Zaufali nam (trust strip z logo)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 9) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="adv-wrap">
      <Header />
      <div className="aa2" style={{ overflow: "hidden", position: "relative" }}>
        {/* Fade edges */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 60, background: "linear-gradient(to right, rgb(var(--color-bg-alt)), transparent)", zIndex: 2 }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 60, background: "linear-gradient(to left, rgb(var(--color-bg-alt)), transparent)", zIndex: 2 }} />
        <div style={{ display: "flex", gap: 16, animation: "advMarquee 30s linear infinite", width: "max-content" }}>
          {[...items, ...items].map((it, i) => (
            <div key={i} className="adv-trust-card">
              <span className="adv-trust-icon">{resolveIcon(it.icon)}</span>
              {str(it.name || it.title || it.label)}
            </div>
          ))}
        </div>
      </div>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 10: Ze zdjeciami (karty z duzymi obrazami)
  // ═══════════════════════════════════════════════════════════════════════════
  return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="adv-wrap">
    <Header />
    <div className="aa2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((it, i) => {
        const itImg = resolveImage(it.image || it.src);
        return (
          <div key={i} className="adv-card-img">
            {itImg ? <img src={itImg} alt="" /> : <div style={{ width: "100%", aspectRatio: "16/9", background: "linear-gradient(135deg, rgb(var(--color-accent)/0.1), rgb(var(--color-surface)))" }} />}
            <div style={{ padding: "20px 22px 24px" }}>
              {str(it.icon) && <div style={{ fontSize: 20, marginBottom: 8 }}>{resolveIcon(it.icon)}</div>}
              <div className="adv-card-title">{str(it.name || it.title || it.label)}</div>
              <div className="adv-card-desc">{str(it.desc || it.description)}</div>
            </div>
          </div>
        );
      })}
    </div>
  </div></section>);
}
