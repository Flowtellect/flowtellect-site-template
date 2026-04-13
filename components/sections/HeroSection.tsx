"use client";

// ─── HeroSection ────────────────────────────────────────────────────────────
// 15 individually crafted hero variants. Each vn is a separate block.

/* eslint-disable @next/next/no-img-element */

import { useState, useEffect } from "react";
import { str, arr, resolveImage } from "./shared";
import { ScrollReveal, FadeScale } from './ClientComponents'

interface HeroProps {
  content: Record<string, unknown>;
  vn: number;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function getHeadlines(c: Record<string, unknown>): string[] {
  const raw = c.headline;
  if (Array.isArray(raw)) return raw.map(String);
  if (typeof raw === "string") return raw.split("\n").filter(Boolean);
  return [""];
}
function cta(c: Record<string, unknown>, key: string) {
  const v = c[key];
  if (!v || typeof v !== "object") return null;
  const o = v as Record<string, unknown>;
  return { label: str(o.label), href: str(o.href) || "#" };
}
function Arrow() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
}

// ── Shared styles ────────────────────────────────────────────────────────────

const S = `
  .he-eyebrow { display:flex; align-items:center; gap:12px; margin-bottom:20px; }
  .he-eline { width:32px; height:1px; background:rgb(var(--color-accent)); }
  .he-eline-g { width:40px; height:1px; background:linear-gradient(90deg,transparent,rgb(var(--color-accent)/0.4)); }
  .he-eline-gr { width:40px; height:1px; background:linear-gradient(90deg,rgb(var(--color-accent)/0.4),transparent); }
  .he-etxt { font-size:11px; font-weight:600; letter-spacing:0.2em; text-transform:uppercase; color:rgb(var(--color-accent)); }
  .he-etxt-w { font-size:11px; font-weight:600; letter-spacing:0.2em; text-transform:uppercase; color:rgb(var(--color-accent-light)); }

  .he-h1 { font-family:var(--font-display); font-weight:700; line-height:1.1; letter-spacing:-0.02em; margin-bottom:18px; }
  .he-h1 em { font-style:italic; }
  .he-h1-d { color:rgb(var(--color-text-primary)); }
  .he-h1-d em { color:rgb(var(--color-accent)); }
  .he-h1-w { color:white; }
  .he-h1-w em { color:rgb(var(--color-accent-light)); }
  .he-h1-s { font-size:36px; } .he-h1-m { font-size:36px; } .he-h1-l { font-size:40px; }
  @media(min-width:768px){ .he-h1-s{font-size:44px} .he-h1-m{font-size:48px} .he-h1-l{font-size:60px} }
  @media(min-width:1024px){ .he-h1-s{font-size:56px} .he-h1-m{font-size:58px} .he-h1-l{font-size:76px} }
  .he-h1-xl { font-size:40px; }
  @media(min-width:768px){ .he-h1-xl{font-size:64px} }
  @media(min-width:1024px){ .he-h1-xl{font-size:80px} }
  @media(min-width:1280px){ .he-h1-xl{font-size:92px} }

  .he-sub { font-family:var(--font-body); font-size:15px; line-height:1.7; max-width:480px; margin-bottom:28px; }
  .he-sub-d { color:rgb(var(--color-text-muted)); }
  .he-sub-w { color:rgb(255 255 255/0.7); }
  @media(min-width:1024px){ .he-sub{font-size:17px} }

  .he-ctas { display:flex; flex-wrap:wrap; gap:12px; }
  .he-btn { display:inline-flex; align-items:center; gap:8px; padding:14px 28px; font-family:var(--font-body); font-size:14px; font-weight:600; border-radius:12px; text-decoration:none; transition:all 0.3s ease; border:none; cursor:pointer; }
  .he-btn-a { background:rgb(var(--color-accent)); color:rgb(var(--color-on-accent)); box-shadow:0 4px 16px rgb(var(--color-accent)/0.3); }
  .he-btn-a:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgb(var(--color-accent)/0.4); }
  .he-btn-o { background:transparent; color:rgb(var(--color-accent)); border:2px solid rgb(var(--color-accent)/0.3); }
  .he-btn-o:hover { border-color:rgb(var(--color-accent)); background:rgb(var(--color-accent)/0.05); transform:translateY(-2px); }
  .he-btn-w { background:white; color:rgb(var(--color-text-primary)); box-shadow:0 4px 20px rgb(0 0 0/0.15); }
  .he-btn-w:hover { transform:translateY(-2px); box-shadow:0 8px 32px rgb(0 0 0/0.2); }
  .he-btn-g { background:transparent; color:white; border:2px solid rgb(255 255 255/0.3); }
  .he-btn-g:hover { border-color:rgb(255 255 255/0.6); background:rgb(255 255 255/0.1); transform:translateY(-2px); }

  .he-badge { position:absolute; background:rgb(var(--color-surface)/0.92); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); border-radius:14px; padding:12px 16px; display:flex; align-items:center; gap:10px; box-shadow:0 4px 16px rgb(0 0 0/0.1); }
  .he-badge-icon { width:36px; height:36px; border-radius:10px; background:rgb(var(--color-accent)/0.12); display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; }
  .he-badge-val { font-size:15px; font-weight:700; color:rgb(var(--color-text-primary)); }
  .he-badge-lbl { font-size:11px; color:rgb(var(--color-text-muted)); }

  .he-pill { display:inline-flex; align-items:center; gap:6px; padding:8px 14px; background:rgb(var(--color-surface)); border:1px solid rgb(var(--color-border)/0.5); border-radius:100px; font-size:12px; font-weight:500; color:rgb(var(--color-text-muted)); }

  .he-overlay { position:absolute; inset:0; }
  .he-fade { position:absolute; bottom:0; left:0; right:0; height:100px; background:linear-gradient(to bottom,transparent,rgb(var(--color-bg))); z-index:5; }

  @keyframes hfu { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
  @keyframes hsl { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
  @keyframes hsr { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
  .ha1{opacity:0;animation:hfu .8s cubic-bezier(.16,1,.3,1) .1s forwards}
  .ha2{opacity:0;animation:hfu .8s cubic-bezier(.16,1,.3,1) .3s forwards}
  .ha3{opacity:0;animation:hfu .8s cubic-bezier(.16,1,.3,1) .5s forwards}
  .ha4{opacity:0;animation:hfu .8s cubic-bezier(.16,1,.3,1) .7s forwards}
  .ha5{opacity:0;animation:hfu .8s cubic-bezier(.16,1,.3,1) .9s forwards}
  .hasl{opacity:0;animation:hsl .9s cubic-bezier(.16,1,.3,1) .1s forwards}
  .hasr{opacity:0;animation:hsr .9s cubic-bezier(.16,1,.3,1) .3s forwards}

  .he-scroll{position:absolute;bottom:32px;left:50%;transform:translateX(-50%);z-index:10;display:flex;flex-direction:column;align-items:center;gap:8px}
  .he-scroll-t{font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:rgb(255 255 255/0.5)}
  .he-scroll-l{width:1px;height:40px;background:linear-gradient(to bottom,rgb(255 255 255/0.4),transparent);animation:sp 2s ease-in-out infinite}
  @keyframes sp{0%,100%{opacity:.4}50%{opacity:1}}

  .he-wrap{max-width:1280px;margin:0 auto;padding:0 16px}
  @media(min-width:768px){.he-wrap{padding:0 24px}}
  @media(min-width:1024px){.he-wrap{padding:0 48px}}
  .he-grid{display:grid;grid-template-columns:1fr;gap:40px;align-items:center}
  @media(min-width:768px){.he-grid{grid-template-columns:1fr 1fr;gap:48px}}
  @media(min-width:1024px){.he-grid{gap:64px}}
`;

// ── Headline component ───────────────────────────────────────────────────────
function H({ lines, cls }: { lines: string[]; cls: string }) {
  return (
    <h1 className={cls}>
      {lines.map((l, i) => <span key={i}>{l}{i < lines.length - 1 && <br />}</span>)}
    </h1>
  );
}

// ═════════════════════════════════════════════════════════════════════════════

export default function HeroSection({ content, vn }: HeroProps) {
  const hl = getHeadlines(content);
  const ey = str(content.eyebrow);
  const sub = str(content.subheadline);
  const img = resolveImage(content.hero_image);
  const c1 = cta(content, "cta_primary");
  const c2 = cta(content, "cta_secondary");
  const items = arr(content.items || content.highlights || content.features);
  const sts = arr(content.stats);

  // Countdown for vn 9
  const [cd, setCd] = useState({ d: 12, h: 6, m: 34, s: 52 });
  // Parallax for vn 10-12
  const [pY, setPY] = useState(0);

  useEffect(() => {
    if (vn === 9) {
      const t = Date.now() + 12 * 86400000;
      const tick = () => { const d = Math.max(0, t - Date.now()); setCd({ d: Math.floor(d / 86400000), h: Math.floor((d % 86400000) / 3600000), m: Math.floor((d % 3600000) / 60000), s: Math.floor((d % 60000) / 1000) }); };
      tick(); const iv = setInterval(tick, 1000); return () => clearInterval(iv);
    }
    if (vn >= 10 && vn <= 12) {
      const f = () => setPY(window.scrollY * 0.4);
      window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f);
    }
  }, [vn]);

  const ImgOrGrad = ({ aspect = "4/3", cls = "" }: { aspect?: string; cls?: string }) =>
    img ? <img src={img} alt="" style={{ width: "100%", aspectRatio: aspect, objectFit: "cover", display: "block", transition: "transform 6s ease" }} className={cls} />
    : <div style={{ width: "100%", aspectRatio: aspect, background: "linear-gradient(135deg, rgb(var(--color-accent)/0.1), rgb(var(--color-surface)))" }} />;

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 1: Klasyczny - tekst lewo, obraz prawo
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 1) {
    return (<section className="bg-bg overflow-hidden" style={{ padding: "48px 0 64px" }}><style>{S}</style><div className="he-wrap"><div className="he-grid">
      <div className="ha1">
        {ey && <ScrollReveal delay={0}><div className="he-eyebrow"><div className="he-eline"/><span className="he-etxt">{ey}</span></div></ScrollReveal>}
        <ScrollReveal delay={0.1}><H lines={hl} cls="he-h1 he-h1-d he-h1-s" /></ScrollReveal>
        {sub && <ScrollReveal delay={0.25}><p className="he-sub he-sub-d">{sub}</p></ScrollReveal>}
        <ScrollReveal delay={0.35}><div className="he-ctas">{c1 && <a href={c1.href} className="he-btn he-btn-a">{c1.label} <Arrow/></a>}{c2 && <a href={c2.href} className="he-btn he-btn-o">{c2.label}</a>}</div></ScrollReveal>
      </div>
      <FadeScale delay={0.2}><div className="ha2" style={{ position: "relative" }}>
        <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 20px 60px rgb(0 0 0/0.1)" }}><ImgOrGrad aspect="4/3" /></div>
      </div></FadeScale>
    </div></div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 2: Pelnoekranowy - zdjecie w tle, tekst centrowany
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 2) {
    return (<section style={{ position: "relative", minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}><style>{S}</style>
      <div style={{ position: "absolute", inset: 0 }}>{img && <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>}</div>
      <div className="he-overlay" style={{ background: "linear-gradient(to bottom,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.25) 40%,rgba(0,0,0,0.6) 100%)", zIndex: 1 }}/>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center,transparent 50%,rgba(0,0,0,0.3) 100%)", zIndex: 2 }}/>
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "24px 16px", maxWidth: 800 }}>
        {ey && <ScrollReveal delay={0}><div className="ha2" style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 24 }}><div className="he-eline" style={{ background: "rgb(var(--color-accent-light))" }}/><span className="he-etxt-w">{ey}</span><div className="he-eline" style={{ background: "rgb(var(--color-accent-light))" }}/></div></ScrollReveal>}
        <ScrollReveal delay={0.1}><H lines={hl} cls="he-h1 he-h1-w he-h1-l ha2" /></ScrollReveal>
        {sub && <ScrollReveal delay={0.25}><p className="he-sub he-sub-w ha3" style={{ margin: "0 auto 36px", maxWidth: 560 }}>{sub}</p></ScrollReveal>}
        <ScrollReveal delay={0.35}><div className="he-ctas ha4" style={{ justifyContent: "center" }}>{c1 && <a href={c1.href} className="he-btn he-btn-w">{c1.label} <Arrow/></a>}{c2 && <a href={c2.href} className="he-btn he-btn-g">{c2.label}</a>}</div></ScrollReveal>
      </div>
      <div className="he-scroll ha5"><span className="he-scroll-t">Przewin</span><div className="he-scroll-l"/></div>
      <div className="he-fade"/>
    </section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 3: Minimalistyczny - bez zdjecia, czysta typografia
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 3) {
    return (<section className="bg-bg" style={{ padding: "80px 16px 64px", textAlign: "center", position: "relative", overflow: "hidden" }}><style>{S}{`
      .he3-em::after{content:'';position:absolute;bottom:4px;left:0;right:0;height:3px;background:rgb(var(--color-accent)/0.25);border-radius:2px}
      @media(min-width:768px){.he3-em::after{height:4px;bottom:6px}}
      .he3-bl{width:1px;height:48px;background:linear-gradient(to bottom,rgb(var(--color-accent)/0.3),transparent);margin:0 auto}
      .he3-dot{width:6px;height:6px;border-radius:50%;background:rgb(var(--color-accent)/0.3);margin:-1px auto 0}
    `}</style>
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", border: "1px solid rgb(var(--color-accent)/0.06)", top: -200, right: -200, pointerEvents: "none" }}/>
      <div style={{ position: "relative", zIndex: 10, maxWidth: 800, margin: "0 auto" }}>
        {ey && <ScrollReveal delay={0}><div className="ha1" style={{ display: "inline-flex", alignItems: "center", gap: 16, marginBottom: 32 }}><div className="he-eline-g"/><span className="he-etxt">{ey}</span><div className="he-eline-gr"/></div></ScrollReveal>}
        <ScrollReveal delay={0.1}><H lines={hl} cls="he-h1 he-h1-d he-h1-l ha2" /></ScrollReveal>
        {sub && <ScrollReveal delay={0.25}><p className="he-sub he-sub-d ha3" style={{ margin: "0 auto 40px", textAlign: "center", maxWidth: 520, fontSize: 18 }}>{sub}</p></ScrollReveal>}
        <ScrollReveal delay={0.35}><div className="he-ctas ha3" style={{ justifyContent: "center" }}>{c1 && <a href={c1.href} className="he-btn he-btn-a">{c1.label} <Arrow/></a>}{c2 && <a href={c2.href} className="he-btn he-btn-o">{c2.label}</a>}</div></ScrollReveal>
        <div className="ha4" style={{ marginTop: 48, display: "flex", flexDirection: "column", alignItems: "center" }}><div className="he3-bl"/><div className="he3-dot"/></div>
      </div>
    </section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 4: Split odwrocony - obraz lewo, tekst prawo, floating badge
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 4) {
    return (<section className="bg-bg overflow-hidden" style={{ padding: "48px 0 64px" }}><style>{S}</style><div className="he-wrap"><div className="he-grid">
      <FadeScale delay={0.2}><div className="hasl order-1 md:!order-none" style={{ position: "relative" }}>
        <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 24px 64px rgb(0 0 0/0.12)", position: "relative" }}>
          <ImgOrGrad aspect="3/4" />
          <div className="he-badge ha5" style={{ bottom: 16, left: 16 }}><div className="he-badge-icon">🕯️</div><div><div className="he-badge-val">30+ zapachow</div><div className="he-badge-lbl">w kolekcji</div></div></div>
        </div>
      </div></FadeScale>
      <div className="ha2 order-0 md:!order-none">
        {ey && <ScrollReveal delay={0}><div className="he-eyebrow"><div className="he-eline"/><span className="he-etxt">{ey}</span></div></ScrollReveal>}
        <ScrollReveal delay={0.1}><H lines={hl} cls="he-h1 he-h1-d he-h1-s" /></ScrollReveal>
        {sub && <ScrollReveal delay={0.25}><p className="he-sub he-sub-d">{sub}</p></ScrollReveal>}
        <ScrollReveal delay={0.35}><div className="he-ctas" style={{ marginBottom: 24 }}>{c1 && <a href={c1.href} className="he-btn he-btn-a">{c1.label} <Arrow/></a>}{c2 && <a href={c2.href} className="he-btn he-btn-o">{c2.label}</a>}</div></ScrollReveal>
        {items.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{items.slice(0,4).map((it,i) => <span key={i} className="he-pill"><span style={{ fontSize: 14 }}>{str(it.icon)||"✦"}</span> {str(it.name||it.title||it.label)}</span>)}</div>}
      </div>
    </div></div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 5: Gradient - animowany gradient w tle z blobami
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 5) {
    return (<section style={{ position: "relative", minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}><style>{S}{`
      .he5-gr{position:absolute;inset:-50%;width:200%;height:200%;background:linear-gradient(135deg,rgb(var(--color-accent-dark)),rgb(var(--color-accent)),rgb(var(--color-accent-light)),rgb(var(--color-accent)));background-size:200% 200%;animation:he5gs 8s ease infinite;z-index:0}
      @keyframes he5gs{0%{transform:translate(0,0)}25%{transform:translate(-5%,-5%)}50%{transform:translate(0,-3%)}75%{transform:translate(5%,-2%)}100%{transform:translate(0,0)}}
      .he5-blob{position:absolute;border-radius:50%;background:rgba(255,255,255,0.06);z-index:2}
      .he5-b1{width:400px;height:400px;top:-100px;right:-100px;animation:he5bf 12s ease-in-out infinite}
      .he5-b2{width:300px;height:300px;bottom:-80px;left:-60px;animation:he5bf 10s ease-in-out infinite reverse}
      @keyframes he5bf{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(20px,-30px) scale(1.05)}66%{transform:translate(-15px,15px) scale(0.95)}}
      .he5-pill{display:inline-flex;align-items:center;gap:8px;padding:8px 20px;background:rgba(255,255,255,0.12);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.15);border-radius:100px;margin-bottom:28px}
      .he5-dot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,0.6);animation:he5p 2s ease infinite}
      @keyframes he5p{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.3)}}
    `}</style>
      <div className="he5-gr"/><div className="he5-blob he5-b1"/><div className="he5-blob he5-b2"/>
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "24px 16px", maxWidth: 780 }}>
        {ey && <ScrollReveal delay={0}><div className="he5-pill ha1"><div className="he5-dot"/><span style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.1em", color: "rgba(255,255,255,0.9)" }}>{ey}</span></div></ScrollReveal>}
        <ScrollReveal delay={0.1}><H lines={hl} cls="he-h1 he-h1-w he-h1-l ha2" /></ScrollReveal>
        {sub && <ScrollReveal delay={0.25}><p className="he-sub he-sub-w ha3" style={{ margin: "0 auto 36px", maxWidth: 520 }}>{sub}</p></ScrollReveal>}
        <ScrollReveal delay={0.35}><div className="he-ctas ha4" style={{ justifyContent: "center" }}>{c1 && <a href={c1.href} className="he-btn he-btn-w">{c1.label} <Arrow/></a>}{c2 && <a href={c2.href} className="he-btn he-btn-g">{c2.label}</a>}</div></ScrollReveal>
        {sts.length > 0 && <div className="ha5" style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 48, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.12)" }}>{sts.slice(0,3).map((s,i)=><div key={i}><div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "white" }}>{str(s.value)}{str(s.suffix)}</div><div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{str(s.label)}</div></div>)}</div>}
      </div>
      <div className="he-fade"/>
    </section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 6: Split 50/50 - obraz pelna polowa, tekst + karty wyroznikow
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 6) {
    return (<section style={{ display: "grid", gridTemplateColumns: "1fr", minHeight: "auto" }} className="md:!grid-cols-2 md:!min-h-[85vh]"><style>{S}{`
      .he6-edge{display:none}@media(min-width:768px){.he6-edge{display:block;position:absolute;top:0;right:0;width:80px;height:100%;background:linear-gradient(to right,transparent,rgb(var(--color-bg)));z-index:2}}
      .he6-fc{display:grid;grid-template-columns:1fr 1fr;gap:10px}@media(min-width:1024px){.he6-fc{gap:12px}}
      .he6-f{display:flex;align-items:center;gap:10px;padding:14px 16px;background:rgb(var(--color-surface));border:1px solid rgb(var(--color-border)/0.5);border-radius:14px;transition:all .2s}
      .he6-f:hover{border-color:rgb(var(--color-accent)/0.3);box-shadow:0 2px 12px rgb(0 0 0/0.04)}
      .he6-fi{width:36px;height:36px;border-radius:10px;background:rgb(var(--color-accent)/0.1);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
      .he6-ft{font-size:13px;font-weight:600;color:rgb(var(--color-text-primary));line-height:1.3}
      .he6-fs{font-size:11px;color:rgb(var(--color-text-dim));margin-top:1px}
    `}</style>
      <FadeScale delay={0.2}><div className="ha1" style={{ position: "relative", overflow: "hidden", minHeight: 300 }}>
        {img && <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 8s ease" }}/>}
        <div className="he6-edge"/>
      </div></FadeScale>
      <div className="ha2 md:!p-12 lg:!p-16" style={{ display: "flex", alignItems: "center", padding: "48px 16px" }}>
        <div style={{ maxWidth: 520 }}>
          {ey && <ScrollReveal delay={0}><div className="he-eyebrow"><div className="he-eline"/><span className="he-etxt">{ey}</span></div></ScrollReveal>}
          <ScrollReveal delay={0.1}><H lines={hl} cls="he-h1 he-h1-d he-h1-s" /></ScrollReveal>
          {sub && <ScrollReveal delay={0.25}><p className="he-sub he-sub-d">{sub}</p></ScrollReveal>}
          <ScrollReveal delay={0.35}><div className="he-ctas" style={{ marginBottom: 28 }}>{c1 && <a href={c1.href} className="he-btn he-btn-a">{c1.label} <Arrow/></a>}{c2 && <a href={c2.href} className="he-btn he-btn-o">{c2.label}</a>}</div></ScrollReveal>
          {items.length > 0 && <div className="he6-fc">{items.slice(0,4).map((it,i)=><div key={i} className="he6-f"><div className="he6-fi">{str(it.icon)||"✦"}</div><div><div className="he6-ft">{str(it.name||it.title||it.label)}</div><div className="he6-fs">{str(it.desc||it.description)}</div></div></div>)}</div>}
        </div>
      </div>
    </section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 7: Z formularzem - zdjecie bg + formularz po prawej
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 7) {
    return (<section style={{ position: "relative", minHeight: "85vh", display: "flex", alignItems: "center", overflow: "hidden" }}><style>{S}{`
      .he7-form{background:rgb(var(--color-surface)/0.95);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-radius:24px;padding:32px 28px;box-shadow:0 24px 64px rgba(0,0,0,0.15),0 8px 24px rgba(0,0,0,0.08)}
      .he7-inp{width:100%;padding:12px 16px;background:rgb(var(--color-bg));border:1px solid rgb(var(--color-border));border-radius:12px;font-family:var(--font-body);font-size:14px;color:rgb(var(--color-text-primary));outline:none;transition:all .2s}
      .he7-inp:focus{border-color:rgb(var(--color-accent));box-shadow:0 0 0 3px rgb(var(--color-accent)/0.1)}
      .he7-lbl{display:block;font-size:12px;font-weight:600;color:rgb(var(--color-text-muted));margin-bottom:6px;letter-spacing:.03em}
      .he7-sub{width:100%;padding:14px;margin-top:8px;background:rgb(var(--color-accent));color:rgb(var(--color-on-accent));font-family:var(--font-body);font-size:14px;font-weight:600;border:none;border-radius:12px;cursor:pointer;transition:all .3s;box-shadow:0 4px 16px rgb(var(--color-accent)/0.3)}
      .he7-sub:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgb(var(--color-accent)/0.4)}
    `}</style>
      <div style={{ position: "absolute", inset: 0 }}>{img && <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>}</div>
      <div className="he-overlay" style={{ background: "linear-gradient(135deg,rgba(0,0,0,0.7),rgba(0,0,0,0.5) 40%,rgba(0,0,0,0.65))", zIndex: 1 }}/>
      <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "80px 16px", display: "grid", gridTemplateColumns: "1fr", gap: 40, alignItems: "center", width: "100%" }} className="md:!grid-cols-[1fr_420px] md:!px-6 lg:!px-12 lg:!gap-16">
        <div className="ha1">
          {ey && <ScrollReveal delay={0}><div className="he-eyebrow"><div className="he-eline" style={{ background: "rgb(var(--color-accent-light))" }}/><span className="he-etxt-w">{ey}</span></div></ScrollReveal>}
          <ScrollReveal delay={0.1}><H lines={hl} cls="he-h1 he-h1-w he-h1-m" /></ScrollReveal>
          {sub && <ScrollReveal delay={0.25}><p className="he-sub he-sub-w">{sub}</p></ScrollReveal>}
        </div>
        <div className="he7-form ha2">
          <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: "rgb(var(--color-text-primary))", marginBottom: 4 }}>Skontaktuj sie</div>
          <div style={{ fontSize: 13, color: "rgb(var(--color-text-muted))", marginBottom: 24 }}>Wypelnij formularz - odezwiemy sie w 24h</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            <div><label className="he7-lbl">Imie</label><input className="he7-inp" placeholder="Anna"/></div>
            <div><label className="he7-lbl">Telefon</label><input className="he7-inp" placeholder="+48 500..."/></div>
          </div>
          <div style={{ marginBottom: 14 }}><label className="he7-lbl">Email</label><input className="he7-inp" placeholder="anna@example.com"/></div>
          <div style={{ marginBottom: 8 }}><label className="he7-lbl">Wiadomosc</label><textarea className="he7-inp" placeholder="Czym mozemy pomoc?" style={{ resize: "vertical", minHeight: 80 }}/></div>
          <button className="he7-sub">Wyslij zapytanie</button>
        </div>
      </div>
      <div className="he-fade"/>
    </section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 8: Slider - karuzela ze zmiana zdjec i naglowkow
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 8) {
    return (<section style={{ position: "relative", minHeight: "92vh", overflow: "hidden" }}><style>{S}{`
      .he8-prog{position:absolute;bottom:0;left:0;right:0;height:3px;background:rgba(255,255,255,0.1);z-index:20}
      .he8-bar{height:100%;background:rgb(var(--color-accent-light));animation:he8pf 5s linear infinite}
      @keyframes he8pf{from{width:0}to{width:100%}}
    `}</style>
      <div style={{ position: "absolute", inset: 0 }}>{img && <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 8s ease", transform: "scale(1.08)" }}/>}</div>
      <div className="he-overlay" style={{ background: "linear-gradient(to bottom,rgba(0,0,0,0.4),rgba(0,0,0,0.2) 40%,rgba(0,0,0,0.65))", zIndex: 1 }}/>
      <div style={{ position: "relative", zIndex: 10, minHeight: "92vh", display: "flex", alignItems: "flex-end", padding: "0 16px 80px" }} className="md:!px-12 lg:!px-20">
        <div style={{ maxWidth: 700 }}>
          {ey && <ScrollReveal delay={0}><div className="he-eyebrow ha1"><div className="he-eline" style={{ background: "rgb(var(--color-accent-light))" }}/><span className="he-etxt-w">{ey}</span></div></ScrollReveal>}
          <ScrollReveal delay={0.1}><H lines={hl} cls="he-h1 he-h1-w he-h1-xl ha2" /></ScrollReveal>
          {sub && <ScrollReveal delay={0.25}><p className="he-sub he-sub-w ha3">{sub}</p></ScrollReveal>}
          <ScrollReveal delay={0.35}><div className="he-ctas ha4">{c1 && <a href={c1.href} className="he-btn he-btn-w">{c1.label} <Arrow/></a>}{c2 && <a href={c2.href} className="he-btn he-btn-g">{c2.label}</a>}</div></ScrollReveal>
        </div>
      </div>
      <div className="he8-prog"><div className="he8-bar"/></div>
      <div className="he-fade"/>
    </section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 9: Countdown - odliczanie z glassmorphism boxami
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 9) {
    return (<section style={{ position: "relative", minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}><style>{S}{`
      .he9-cd{width:64px;height:72px;background:rgb(255 255 255/0.08);backdrop-filter:blur(12px);border:1px solid rgb(255 255 255/0.12);border-radius:16px;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:28px;font-weight:700;color:white;position:relative;overflow:hidden}
      @media(min-width:768px){.he9-cd{width:80px;height:88px;font-size:36px;border-radius:20px}}
      .he9-cd::after{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent);animation:he9sh 3s ease infinite}
      @keyframes he9sh{0%{left:-100%}50%,100%{left:100%}}
      .he9-lb{font-size:10px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:rgb(255 255 255/0.4);margin-top:8px}
      .he9-sep{display:flex;align-items:center;padding-bottom:24px;font-size:24px;color:rgb(255 255 255/0.2)}
      .he9-badge{display:inline-flex;align-items:center;gap:8px;padding:8px 20px;background:rgb(var(--color-accent)/0.2);border:1px solid rgb(var(--color-accent)/0.3);border-radius:100px;margin-bottom:28px}
      .he9-dot{width:8px;height:8px;border-radius:50%;background:rgb(var(--color-accent-light));animation:he9bl 1.5s ease infinite}
      @keyframes he9bl{0%,100%{opacity:1}50%{opacity:.3}}
    `}</style>
      <div style={{ position: "absolute", inset: 0 }}>{img && <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>}</div>
      <div className="he-overlay" style={{ background: "linear-gradient(160deg,rgba(0,0,0,0.75),rgba(0,0,0,0.5) 50%,rgba(0,0,0,0.7))", zIndex: 1 }}/>
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "24px 16px", maxWidth: 800 }}>
        {ey && <ScrollReveal delay={0}><div className="he9-badge ha1"><div className="he9-dot"/><span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgb(var(--color-accent-light))" }}>{ey}</span></div></ScrollReveal>}
        <ScrollReveal delay={0.1}><H lines={hl} cls="he-h1 he-h1-w he-h1-l ha2" /></ScrollReveal>
        {sub && <ScrollReveal delay={0.25}><p className="he-sub he-sub-w ha3" style={{ margin: "0 auto 40px", maxWidth: 500 }}>{sub}</p></ScrollReveal>}
        <ScrollReveal delay={0.25}><div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 40 }} className="ha3">
          <div style={{ textAlign: "center" }}><div className="he9-cd">{String(cd.d).padStart(2,"0")}</div><div className="he9-lb">Dni</div></div>
          <div className="he9-sep">:</div>
          <div style={{ textAlign: "center" }}><div className="he9-cd">{String(cd.h).padStart(2,"0")}</div><div className="he9-lb">Godzin</div></div>
          <div className="he9-sep">:</div>
          <div style={{ textAlign: "center" }}><div className="he9-cd">{String(cd.m).padStart(2,"0")}</div><div className="he9-lb">Minut</div></div>
          <div className="he9-sep">:</div>
          <div style={{ textAlign: "center" }}><div className="he9-cd">{String(cd.s).padStart(2,"0")}</div><div className="he9-lb">Sekund</div></div>
        </div></ScrollReveal>
        <ScrollReveal delay={0.35}><div className="he-ctas ha4" style={{ justifyContent: "center" }}>{c1 && <a href={c1.href} className="he-btn he-btn-a" style={{ padding: "16px 32px" }}>{c1.label} <Arrow/></a>}{c2 && <a href={c2.href} className="he-btn he-btn-g">{c2.label}</a>}</div></ScrollReveal>
      </div>
      <div className="he-fade"/>
    </section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 10: Parallax - pelny viewport, tekst na dole, parallax bg
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 10) {
    return (<section style={{ position: "relative", height: "100vh", overflow: "hidden" }}><style>{S}</style>
      <div style={{ position: "absolute", inset: "-20%", width: "140%", height: "140%", transform: `translateY(${pY}px)`, willChange: "transform" }}>{img && <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>}</div>
      <div className="he-overlay" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.5) 35%,rgba(0,0,0,0.15) 60%,rgba(0,0,0,0.25) 100%)", zIndex: 1 }}/>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10, padding: "0 16px 48px" }} className="md:!px-12 lg:!px-20">
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {ey && <ScrollReveal delay={0}><div className="he-eyebrow ha1"><div className="he-eline" style={{ background: "rgb(var(--color-accent-light))" }}/><span className="he-etxt-w">{ey}</span></div></ScrollReveal>}
          <ScrollReveal delay={0.1}><H lines={hl} cls="he-h1 he-h1-w he-h1-xl ha2" /></ScrollReveal>
          {sub && <ScrollReveal delay={0.25}><p className="he-sub he-sub-w ha3">{sub}</p></ScrollReveal>}
          <ScrollReveal delay={0.35}><div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 24 }} className="ha4">
            {c1 && <a href={c1.href} className="he-btn he-btn-w">{c1.label} <Arrow/></a>}
            {sts.length > 0 && <><div style={{ width: 1, height: 40, background: "rgb(255 255 255/0.15)" }} className="hidden md:block"/><div style={{ display: "flex", gap: 24 }}>{sts.slice(0,3).map((s,i)=><div key={i}><div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "white", lineHeight: 1 }}>{str(s.value)}{str(s.suffix)}</div><div style={{ fontSize: 11, color: "rgb(255 255 255/0.4)", marginTop: 4 }}>{str(s.label)}</div></div>)}</div></>}
          </div></ScrollReveal>
        </div>
      </div>
    </section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 11: Animowany tekst - rotujace slowa CSS
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 11) {
    return (<section className="bg-bg" style={{ padding: "80px 16px 64px", textAlign: "center", position: "relative", overflow: "hidden", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}><style>{S}{`
      .he11-rw{display:inline-block;position:relative;height:1.15em;overflow:hidden;vertical-align:bottom}
      .he11-rws{display:flex;flex-direction:column;animation:he11r 9s cubic-bezier(.4,0,.2,1) infinite}
      .he11-rwd{height:1.15em;display:flex;align-items:center;font-style:italic;color:rgb(var(--color-accent));position:relative}
      .he11-rwd::after{content:'';position:absolute;bottom:4px;left:0;right:0;height:3px;background:rgb(var(--color-accent)/0.2);border-radius:2px}
      @keyframes he11r{0%,28%{transform:translateY(0)}33%,61%{transform:translateY(-33.33%)}66%,94%{transform:translateY(-66.66%)}100%{transform:translateY(0)}}
    `}</style>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%,rgb(var(--color-accent)/0.04),transparent 50%),radial-gradient(circle at 80% 50%,rgb(var(--color-accent)/0.03),transparent 50%)", pointerEvents: "none" }}/>
      <div style={{ position: "relative", zIndex: 10, maxWidth: 900, margin: "0 auto" }}>
        {ey && <ScrollReveal delay={0}><div className="ha1" style={{ display: "inline-flex", alignItems: "center", gap: 16, marginBottom: 32 }}><div className="he-eline-g"/><span className="he-etxt">{ey}</span><div className="he-eline-gr"/></div></ScrollReveal>}
        <ScrollReveal delay={0.1}><h1 className="he-h1 he-h1-d he-h1-l ha2">{hl[0] || "Swiece, ktore"}<br/><span className="he11-rw"><span className="he11-rws"><span className="he11-rwd">{hl[1] || "rozswietlaja"}</span><span className="he11-rwd">{hl[2] || "zachwycaja"}</span><span className="he11-rwd">{hl[3] || hl[1] || "inspiruja"}</span></span></span></h1></ScrollReveal>
        {sub && <ScrollReveal delay={0.25}><p className="he-sub he-sub-d ha3" style={{ margin: "0 auto 40px", textAlign: "center", maxWidth: 540, fontSize: 18 }}>{sub}</p></ScrollReveal>}
        <ScrollReveal delay={0.35}><div className="he-ctas ha3" style={{ justifyContent: "center" }}>{c1 && <a href={c1.href} className="he-btn he-btn-a">{c1.label} <Arrow/></a>}{c2 && <a href={c2.href} className="he-btn he-btn-o">{c2.label}</a>}</div></ScrollReveal>
      </div>
    </section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 12: Social Proof - avatary + rating + testimonial inline
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 12) {
    const testimonials = arr(content.testimonials || content.reviews);
    return (<section className="bg-bg overflow-hidden" style={{ padding: "64px 0 48px" }}><style>{S}{`
      .he12-av{width:36px;height:36px;border-radius:50%;border:3px solid rgb(var(--color-bg));margin-left:-10px;background:rgb(var(--color-surface-deep));display:flex;align-items:center;justify-content:center;font-size:16px;overflow:hidden}
      .he12-av:first-child{margin-left:0}
      .he12-avc{width:36px;height:36px;border-radius:50%;border:3px solid rgb(var(--color-bg));margin-left:-10px;background:rgb(var(--color-accent));color:rgb(var(--color-on-accent));font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center}
      .he12-tc{background:rgb(var(--color-surface));border:1px solid rgb(var(--color-border)/0.5);border-radius:16px;padding:18px 20px;display:flex;gap:14px;max-width:420px;margin-top:28px}
      .he12-ti{width:40px;height:40px;border-radius:10px;background:rgb(var(--color-accent)/0.1);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
    `}</style><div className="he-wrap"><div className="he-grid">
      <div className="ha1">
        <ScrollReveal delay={0}><div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ display: "flex" }}><div className="he12-av">😊</div><div className="he12-av">🕯️</div><div className="he12-av">⭐</div><div className="he12-av">💛</div><div className="he12-avc">99+</div></div>
          <div><div style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ color: "rgb(var(--color-accent))", fontSize: 13 }}>★★★★★</span><span style={{ fontSize: 13, fontWeight: 700 }}>4.9</span></div><span style={{ fontSize: 12, color: "rgb(var(--color-text-dim))" }}>500+ klientow</span></div>
        </div></ScrollReveal>
        {ey && <ScrollReveal delay={0}><div className="he-eyebrow"><div className="he-eline"/><span className="he-etxt">{ey}</span></div></ScrollReveal>}
        <ScrollReveal delay={0.1}><H lines={hl} cls="he-h1 he-h1-d he-h1-s" /></ScrollReveal>
        {sub && <ScrollReveal delay={0.25}><p className="he-sub he-sub-d">{sub}</p></ScrollReveal>}
        <ScrollReveal delay={0.35}><div className="he-ctas">{c1 && <a href={c1.href} className="he-btn he-btn-a">{c1.label} <Arrow/></a>}{c2 && <a href={c2.href} className="he-btn he-btn-o">{c2.label}</a>}</div></ScrollReveal>
        {testimonials.length > 0 && <div className="he12-tc"><div className="he12-ti">🕯️</div><div><div style={{ color: "rgb(var(--color-accent))", fontSize: 11 }}>★★★★★</div><div style={{ fontSize: 13, color: "rgb(var(--color-text-muted))", fontStyle: "italic", lineHeight: 1.5 }}>&ldquo;{str(testimonials[0].quote)}&rdquo;</div><div style={{ fontSize: 12, fontWeight: 600, marginTop: 6 }}>{str(testimonials[0].author)}</div></div></div>}
      </div>
      <FadeScale delay={0.2}><div className="ha2" style={{ position: "relative" }}>
        <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 20px 60px rgb(0 0 0/0.1)" }}><ImgOrGrad aspect="1/1" /></div>
        <div className="he-badge ha4" style={{ top: -16, right: -16 }}><div className="he-badge-icon">🌿</div><div><div className="he-badge-val">100%</div><div className="he-badge-lbl">Naturalne</div></div></div>
        <div className="he-badge ha5" style={{ bottom: -16, left: -16 }}><div className="he-badge-icon">🤲</div><div><div className="he-badge-val">30+</div><div className="he-badge-lbl">Zapachow</div></div></div>
      </div></FadeScale>
    </div></div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 13: Z kartami - centrowany tekst + 3 feature cards
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 13) {
    return (<section className="bg-bg" style={{ padding: "64px 16px 48px", position: "relative", overflow: "hidden" }}><style>{S}{`
      .he13-c{background:rgb(var(--color-surface));border:1px solid rgb(var(--color-border)/0.5);border-radius:20px;padding:28px 24px;transition:all .3s;position:relative;overflow:hidden}
      .he13-c:hover{border-color:rgb(var(--color-accent)/0.3);box-shadow:0 8px 32px rgb(0 0 0/0.06);transform:translateY(-4px)}
      .he13-c::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,rgb(var(--color-accent)/0.6),rgb(var(--color-accent-light)/0.3));opacity:0;transition:opacity .3s}
      .he13-c:hover::before{opacity:1}
      .he13-i{width:52px;height:52px;border-radius:14px;background:rgb(var(--color-accent)/0.08);display:flex;align-items:center;justify-content:center;font-size:26px;margin-bottom:18px}
      .he13-t{font-family:var(--font-display);font-size:18px;font-weight:600;color:rgb(var(--color-text-primary));margin-bottom:8px}
      .he13-d{font-size:14px;line-height:1.6;color:rgb(var(--color-text-muted))}
      .he13-l{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:rgb(var(--color-accent));text-decoration:none;margin-top:14px;transition:gap .2s}
      .he13-l:hover{gap:10px}
    `}</style>
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgb(var(--color-accent)/0.05),transparent 70%)", top: -200, left: "50%", transform: "translateX(-50%)", pointerEvents: "none" }}/>
      <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 48px" }}>
          {ey && <ScrollReveal delay={0}><div className="ha1" style={{ display: "inline-flex", alignItems: "center", gap: 16, marginBottom: 24 }}><div className="he-eline-g"/><span className="he-etxt">{ey}</span><div className="he-eline-gr"/></div></ScrollReveal>}
          <ScrollReveal delay={0.1}><H lines={hl} cls="he-h1 he-h1-d he-h1-l ha2" /></ScrollReveal>
          {sub && <ScrollReveal delay={0.25}><p className="he-sub he-sub-d ha3" style={{ margin: "0 auto 32px", textAlign: "center" }}>{sub}</p></ScrollReveal>}
          <ScrollReveal delay={0.35}><div className="he-ctas ha3" style={{ justifyContent: "center" }}>{c1 && <a href={c1.href} className="he-btn he-btn-a">{c1.label} <Arrow/></a>}{c2 && <a href={c2.href} className="he-btn he-btn-o">{c2.label}</a>}</div></ScrollReveal>
        </div>
        {items.length > 0 && <div className="ha4 md:!grid-cols-3" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>{items.slice(0,3).map((it,i)=><div key={i} className="he13-c"><div className="he13-i">{str(it.icon)||"✦"}</div><div className="he13-t">{str(it.name||it.title||it.label)}</div><div className="he13-d">{str(it.desc||it.description)}</div></div>)}</div>}
      </div>
    </section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 14: Asymetryczny - accent bg block, obraz overlap
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 14) {
    return (<section className="bg-bg overflow-hidden" style={{ position: "relative", padding: "48px 16px 64px", minHeight: "80vh", display: "flex", alignItems: "center" }}><style>{S}</style>
      <div className="hidden lg:block" style={{ position: "absolute", top: 0, right: 0, width: "45%", height: "100%", background: "rgb(var(--color-accent)/0.06)", zIndex: 0 }}/>
      <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr", gap: 40, alignItems: "center", width: "100%" }} className="lg:!grid-cols-2 lg:!gap-0 lg:!px-12">
        <div className="ha1">
          {ey && <ScrollReveal delay={0}><div className="he-eyebrow"><div className="he-eline"/><span className="he-etxt">{ey}</span></div></ScrollReveal>}
          <ScrollReveal delay={0.1}><H lines={hl} cls="he-h1 he-h1-d he-h1-s" /></ScrollReveal>
          {sub && <ScrollReveal delay={0.25}><p className="he-sub he-sub-d">{sub}</p></ScrollReveal>}
          <ScrollReveal delay={0.35}><div className="he-ctas" style={{ marginBottom: 28 }}>{c1 && <a href={c1.href} className="he-btn he-btn-a">{c1.label} <Arrow/></a>}{c2 && <a href={c2.href} className="he-btn he-btn-o">{c2.label}</a>}</div></ScrollReveal>
          {sts.length > 0 && <div style={{ display: "flex", gap: 32, paddingTop: 24, borderTop: "1px solid rgb(var(--color-border)/0.5)" }}>{sts.slice(0,3).map((s,i)=><div key={i}><div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "rgb(var(--color-accent))", lineHeight: 1 }}>{str(s.value)}{str(s.suffix)}</div><div style={{ fontSize: 12, color: "rgb(var(--color-text-dim))", marginTop: 4 }}>{str(s.label)}</div></div>)}</div>}
        </div>
        <FadeScale delay={0.2}><div className="hasr" style={{ position: "relative" }}>
          {img ? <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 24px 64px rgb(0 0 0/0.12)" }}><img src={img} alt="" style={{ width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block", transition: "transform 6s ease" }}/></div>
          : <div style={{ aspectRatio: "4/5", borderRadius: 24, background: "linear-gradient(135deg, rgb(var(--color-accent)/0.1), rgb(var(--color-surface)))" }}/>}
        </div></FadeScale>
      </div>
    </section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 15: Lokalizacja - zdjecie bg + glassmorphism info card
  // ═══════════════════════════════════════════════════════════════════════════
  const address = str(content.address);
  const phone = str(content.phone);
  const email = str(content.email);
  const hours = str(content.hours);

  return (<section style={{ position: "relative", minHeight: "85vh", display: "flex", alignItems: "center", overflow: "hidden" }}><style>{S}{`
    .he15-card{background:rgb(var(--color-surface)/0.95);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-radius:24px;padding:28px 24px;box-shadow:0 24px 64px rgba(0,0,0,0.15),0 8px 24px rgba(0,0,0,0.08)}
    @media(min-width:768px){.he15-card{padding:32px 28px}}
    .he15-item{display:flex;gap:14px;align-items:flex-start;text-decoration:none;padding:10px 12px;margin:-10px -12px;border-radius:14px;transition:background .2s;color:inherit}
    a.he15-item:hover{background:rgb(var(--color-bg-alt)/0.5)}
    .he15-icon{width:42px;height:42px;border-radius:12px;background:rgb(var(--color-accent)/0.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:rgb(var(--color-accent))}
    .he15-lbl{font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:rgb(var(--color-text-dim));margin-bottom:3px}
    .he15-val{font-size:14px;font-weight:500;color:rgb(var(--color-text-primary));line-height:1.4}
  `}</style>
    <div style={{ position: "absolute", inset: 0 }}>{img && <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>}</div>
    <div className="he-overlay" style={{ background: "linear-gradient(135deg,rgba(0,0,0,0.72),rgba(0,0,0,0.5) 40%,rgba(0,0,0,0.65))", zIndex: 1 }}/>
    <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "80px 16px", display: "grid", gridTemplateColumns: "1fr", gap: 40, alignItems: "center", width: "100%" }} className="md:!grid-cols-[1fr_380px] md:!px-6 lg:!grid-cols-[1fr_420px] lg:!px-12 lg:!gap-16">
      <div className="ha1">
        {ey && <ScrollReveal delay={0}><div className="he-eyebrow"><div className="he-eline" style={{ background: "rgb(var(--color-accent-light))" }}/><span className="he-etxt-w">{ey}</span></div></ScrollReveal>}
        <ScrollReveal delay={0.1}><H lines={hl} cls="he-h1 he-h1-w he-h1-m" /></ScrollReveal>
        {sub && <ScrollReveal delay={0.25}><p className="he-sub he-sub-w">{sub}</p></ScrollReveal>}
        <ScrollReveal delay={0.35}><div className="he-ctas">{c1 && <a href={c1.href} className="he-btn he-btn-a">{c1.label} <Arrow/></a>}{c2 && <a href={c2.href} className="he-btn he-btn-g">{c2.label}</a>}</div></ScrollReveal>
      </div>
      <div className="he15-card ha2">
        <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, color: "rgb(var(--color-text-primary))", marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid rgb(var(--color-border)/0.5)" }}>Odwiedz nas</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {address && <div className="he15-item"><div className="he15-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></div><div><div className="he15-lbl">Adres</div><div className="he15-val">{address}</div></div></div>}
          {phone && <a href={`tel:${phone}`} className="he15-item"><div className="he15-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg></div><div><div className="he15-lbl">Telefon</div><div className="he15-val">{phone}</div></div></a>}
          {hours && <div className="he15-item"><div className="he15-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg></div><div><div className="he15-lbl">Godziny</div><div className="he15-val">{hours}</div></div></div>}
          {email && <a href={`mailto:${email}`} className="he15-item"><div className="he15-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/></svg></div><div><div className="he15-lbl">Email</div><div className="he15-val">{email}</div></div></a>}
        </div>
      </div>
    </div>
    <div className="he-fade"/>
  </section>);
}
