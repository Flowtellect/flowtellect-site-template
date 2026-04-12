"use client";

// ─── CtaSection ──────────────────────────────────────────────────────────────
// 20 individually crafted CTA variants matching HTML mockups.

/* eslint-disable @next/next/no-img-element */

import { useState, useEffect } from "react";
import { str, arr, resolveImage, resolveIcon } from "./shared";

interface CtaProps {
  content: Record<string, unknown>;
  vn: number;
}

function Arrow() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
}

const S = `
  .ct-wrap{max-width:1280px;margin:0 auto;padding:0 16px}
  @media(min-width:768px){.ct-wrap{padding:0 24px}}@media(min-width:1024px){.ct-wrap{padding:0 48px}}

  .ct-h2{font-family:var(--font-display);font-weight:700;line-height:1.15;letter-spacing:-.02em;margin-bottom:14px}
  .ct-h2 em{font-style:italic}
  .ct-h2-d{color:rgb(var(--color-text-primary))}
  .ct-h2-d em{color:rgb(var(--color-accent))}
  .ct-h2-w{color:white}
  .ct-h2-w em{color:rgb(var(--color-accent-light))}
  .ct-h2-m{font-size:32px}@media(min-width:768px){.ct-h2-m{font-size:40px}}@media(min-width:1024px){.ct-h2-m{font-size:48px}}
  .ct-h2-l{font-size:36px}@media(min-width:768px){.ct-h2-l{font-size:56px}}@media(min-width:1024px){.ct-h2-l{font-size:80px}}

  .ct-body-d{font-size:15px;line-height:1.7;color:rgb(var(--color-text-muted));max-width:520px;margin-bottom:28px}
  .ct-body-w{font-size:15px;line-height:1.7;color:rgb(255 255 255/0.7);max-width:520px;margin-bottom:28px}
  @media(min-width:1024px){.ct-body-d,.ct-body-w{font-size:16px}}

  .ct-btn{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;font-family:var(--font-body);font-size:14px;font-weight:600;border-radius:12px;text-decoration:none;transition:all .3s;border:none;cursor:pointer}
  .ct-btn-accent{background:rgb(var(--color-accent));color:rgb(var(--color-on-accent));box-shadow:0 4px 16px rgb(var(--color-accent)/0.3)}
  .ct-btn-accent:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgb(var(--color-accent)/0.4)}
  .ct-btn-inv{background:rgb(var(--color-bg));color:rgb(var(--color-text-primary));box-shadow:0 4px 20px rgb(0 0 0/0.15)}
  .ct-btn-inv:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgb(0 0 0/0.2)}
  .ct-btn-outline{background:transparent;color:rgb(var(--color-accent));border:2px solid rgb(var(--color-accent)/0.3)}
  .ct-btn-outline:hover{border-color:rgb(var(--color-accent));background:rgb(var(--color-accent)/0.05);transform:translateY(-2px)}
  .ct-btn-glass{background:transparent;color:white;border:2px solid rgb(255 255 255/0.3)}
  .ct-btn-glass:hover{border-color:rgb(255 255 255/0.6);background:rgb(255 255 255/0.1)}

  .ct-eyebrow{font-size:11px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;margin-bottom:16px}
  .ct-note{font-size:12px;margin-top:16px;opacity:.5}

  .ct-overlay{position:absolute;inset:0}
  .ct-fade{position:absolute;bottom:0;left:0;right:0;height:100px;background:linear-gradient(to bottom,transparent,rgb(var(--color-bg)));z-index:5}

  @keyframes ctUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  .ca1{opacity:0;animation:ctUp .8s ease .1s forwards}
  .ca2{opacity:0;animation:ctUp .8s ease .3s forwards}
  .ca3{opacity:0;animation:ctUp .8s ease .5s forwards}

  @keyframes ctGradient{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
  @keyframes ctFloat{0%,100%{transform:translate(0,0)}50%{transform:translate(10px,-10px)}}
  @keyframes ctRotate{from{transform:rotate(0)}to{transform:rotate(360deg)}}

  .ct-card{background:rgb(var(--color-accent)/0.05);border:1px solid rgb(var(--color-accent)/0.2);border-radius:24px;transition:all .3s;position:relative;overflow:hidden}
  .ct-card:hover{border-color:rgb(var(--color-accent)/0.4);box-shadow:0 8px 32px rgb(0 0 0/0.06);transform:translateY(-4px)}
  .ct-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:rgb(var(--color-accent));opacity:0;transition:opacity .3s}
  .ct-card:hover::before{opacity:1}

  .ct-input{width:100%;padding:12px 16px;background:rgb(var(--color-bg));border:1px solid rgb(var(--color-border));border-radius:12px;font-family:var(--font-body);font-size:14px;color:rgb(var(--color-text-primary));outline:none;transition:all .2s}
  .ct-input:focus{border-color:rgb(var(--color-accent));box-shadow:0 0 0 3px rgb(var(--color-accent)/0.1)}
`;

export default function CtaSection({ content, vn }: CtaProps) {
  const ey = str(content.eyebrow);
  const hl = str(content.headline || content.heading);
  const body = str(content.body || content.text);
  const ctaObj = content.cta as Record<string, unknown> | null;
  const ctaLabel = ctaObj ? str(ctaObj.label) : "";
  const ctaHref = ctaObj ? str(ctaObj.href) || "#" : "#";
  const note = str(content.note);
  const img = resolveImage(content.image || content.bg_image || content.hero_image);
  const items = arr(content.items || content.options || content.cards);

  // Countdown for vn 5
  const [cd, setCd] = useState({ d: 3, h: 12, m: 45, s: 30 });
  useEffect(() => {
    if (vn !== 5) return;
    const t = Date.now() + 3 * 86400000;
    const tick = () => { const d = Math.max(0, t - Date.now()); setCd({ d: Math.floor(d / 86400000), h: Math.floor((d % 86400000) / 3600000), m: Math.floor((d % 3600000) / 60000), s: Math.floor((d % 60000) / 1000) }); };
    tick(); const iv = setInterval(tick, 1000); return () => clearInterval(iv);
  }, [vn]);

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 1: Prosta - accent bg, centered, inverted button
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 1) {
    return (<section className="bg-accent text-on-accent" style={{ padding: "64px 0" }}><style>{S}</style><div className="ct-wrap" style={{ textAlign: "center" }}>
      <div className="ca1">
        {ey && <div className="ct-eyebrow" style={{ opacity: 0.8 }}>{ey}</div>}
        <h2 className="ct-h2 ct-h2-w ct-h2-m">{hl}</h2>
        {body && <p className="ct-body-w" style={{ margin: "0 auto 28px" }}>{body}</p>}
        <a href={ctaHref} className="ct-btn ct-btn-inv">{ctaLabel || "Zamow teraz"} <Arrow /></a>
        {note && <p className="ct-note" style={{ color: "white" }}>{note}</p>}
      </div>
    </div></section>);
  }

  // VN 2: Dwa przyciski
  if (vn === 2) {
    const cta2 = content.cta_secondary as Record<string, unknown> | null;
    return (<section className="bg-accent text-on-accent" style={{ padding: "80px 0" }}><style>{S}</style><div className="ct-wrap" style={{ textAlign: "center" }}>
      <div className="ca1">
        {ey && <div className="ct-eyebrow" style={{ opacity: 0.8 }}>{ey}</div>}
        <h2 className="ct-h2 ct-h2-w ct-h2-m" style={{ fontSize: 36 }}>{hl}</h2>
        {body && <p className="ct-body-w" style={{ margin: "0 auto 32px" }}>{body}</p>}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          <a href={ctaHref} className="ct-btn ct-btn-inv">{ctaLabel || "Zamow teraz"} <Arrow /></a>
          {cta2 && <a href={str(cta2.href) || "#"} className="ct-btn ct-btn-glass">{str(cta2.label)}</a>}
        </div>
      </div>
    </div></section>);
  }

  // VN 3: Z formularzem (newsletter split)
  if (vn === 3) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="ct-wrap">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="ca1">
          {ey && <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}><div style={{ width: 32, height: 1, background: "rgb(var(--color-accent))" }} /><span className="ct-eyebrow" style={{ color: "rgb(var(--color-accent))", marginBottom: 0 }}>{ey}</span></div>}
          <h2 className="ct-h2 ct-h2-d ct-h2-m" style={{ fontSize: 32 }}>{hl}</h2>
          {body && <p className="ct-body-d">{body}</p>}
        </div>
        <div className="ca2">
          <div style={{ display: "flex", gap: 0 }}>
            <input type="email" className="ct-input" placeholder="Twoj email" style={{ borderRadius: "12px 0 0 12px", flex: 1 }} />
            <button className="ct-btn ct-btn-accent" style={{ borderRadius: "0 12px 12px 0", whiteSpace: "nowrap" }}>{ctaLabel || "Zapisz sie"}</button>
          </div>
          <p style={{ fontSize: 12, color: "rgb(var(--color-text-dim))", marginTop: 10 }}>Bez spamu. Mozesz sie wypisac w kazdej chwili.</p>
        </div>
      </div>
    </div></section>);
  }

  // VN 4: Pelnoekranowa z dekoracyjnymi kolkami
  if (vn === 4) {
    return (<section className="bg-accent text-on-accent" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "64px 16px" }}><style>{S}</style>
      <div style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", background: "rgb(255 255 255/0.05)", top: -40, right: -40 }} />
      <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "rgb(255 255 255/0.03)", bottom: -80, left: -60 }} />
      <div style={{ position: "absolute", width: 120, height: 120, borderRadius: "50%", background: "rgb(255 255 255/0.04)", top: "40%", left: "15%" }} />
      <div className="ca1" style={{ textAlign: "center", position: "relative", zIndex: 10, maxWidth: 700 }}>
        {ey && <div className="ct-eyebrow" style={{ opacity: 0.8 }}>{ey}</div>}
        <h2 className="ct-h2 ct-h2-w ct-h2-l">{hl}</h2>
        {body && <p className="ct-body-w" style={{ margin: "0 auto 36px" }}>{body}</p>}
        <a href={ctaHref} className="ct-btn ct-btn-inv" style={{ padding: "18px 40px", fontSize: 16 }}>{ctaLabel || "Zamow teraz"} <Arrow /></a>
      </div>
    </section>);
  }

  // VN 5: Z odliczaniem
  if (vn === 5) {
    const boxes = [{ v: cd.d, l: "Dni" }, { v: cd.h, l: "Godzin" }, { v: cd.m, l: "Minut" }, { v: cd.s, l: "Sekund" }];
    return (<section className="bg-accent text-on-accent" style={{ padding: "64px 0" }}><style>{S}</style><div className="ct-wrap" style={{ textAlign: "center" }}>
      <div className="ca1">
        {ey && <div className="ct-eyebrow" style={{ opacity: 0.8 }}>{ey}</div>}
        <h2 className="ct-h2 ct-h2-w ct-h2-m">{hl}</h2>
        {body && <p className="ct-body-w" style={{ margin: "0 auto 32px" }}>{body}</p>}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 32 }}>
          {boxes.map((b, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ width: 64, height: 72, background: "rgb(255 255 255/0.1)", backdropFilter: "blur(12px)", border: "1px solid rgb(255 255 255/0.12)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700 }}>{String(b.v).padStart(2, "0")}</div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.5, marginTop: 8 }}>{b.l}</div>
            </div>
          ))}
        </div>
        <a href={ctaHref} className="ct-btn ct-btn-inv">{ctaLabel || "Zamow teraz"} <Arrow /></a>
      </div>
    </div></section>);
  }

  // VN 6: Newsletter card
  if (vn === 6) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="ct-wrap">
      <div className="ca1" style={{ maxWidth: 600, margin: "0 auto", background: "rgb(var(--color-accent)/0.05)", border: "1px solid rgb(var(--color-accent)/0.2)", borderRadius: 24, padding: "40px 32px", textAlign: "center" }}>
        <h2 className="ct-h2 ct-h2-d ct-h2-m" style={{ fontSize: 28 }}>{hl}</h2>
        {body && <p className="ct-body-d" style={{ margin: "0 auto 24px", textAlign: "center" }}>{body}</p>}
        <div style={{ display: "flex", gap: 0, maxWidth: 400, margin: "0 auto" }}>
          <input type="email" className="ct-input" placeholder="Twoj email" style={{ borderRadius: "12px 0 0 12px" }} />
          <button className="ct-btn ct-btn-accent" style={{ borderRadius: "0 12px 12px 0" }}>{ctaLabel || "Zapisz sie"}</button>
        </div>
      </div>
    </div></section>);
  }

  // VN 7: Na tle zdjecia
  if (vn === 7) {
    return (<section style={{ position: "relative", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}><style>{S}</style>
      <div style={{ position: "absolute", inset: 0 }}>{img && <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}</div>
      <div className="ct-overlay" style={{ background: "linear-gradient(to bottom,rgba(0,0,0,0.6),rgba(0,0,0,0.4) 40%,rgba(0,0,0,0.7))", zIndex: 1 }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center,transparent 50%,rgba(0,0,0,0.3))", zIndex: 2 }} />
      <div className="ca1" style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "40px 16px", maxWidth: 700 }}>
        {ey && <div className="ct-eyebrow" style={{ color: "rgb(var(--color-accent-light))" }}>{ey}</div>}
        <h2 className="ct-h2 ct-h2-w ct-h2-m">{hl}</h2>
        {body && <p className="ct-body-w" style={{ margin: "0 auto 32px" }}>{body}</p>}
        <a href={ctaHref} className="ct-btn ct-btn-inv">{ctaLabel || "Zamow teraz"} <Arrow /></a>
      </div>
      <div className="ct-fade" />
    </section>);
  }

  // VN 8: Gradient z floating circles
  if (vn === 8) {
    return (<section style={{ position: "relative", padding: "80px 0", background: "linear-gradient(135deg, rgb(var(--color-accent)), rgb(var(--color-accent-dark)), rgb(var(--color-accent)))", backgroundSize: "200% 200%", animation: "ctGradient 8s ease infinite", color: "white", overflow: "hidden" }}><style>{S}</style>
      <div style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", background: "rgb(255 255 255/0.05)", top: -40, right: -40 }} />
      <div style={{ position: "absolute", width: 150, height: 150, borderRadius: "50%", background: "rgb(255 255 255/0.04)", bottom: -30, left: "20%" }} />
      <div style={{ position: "absolute", width: 80, height: 80, borderRadius: "50%", background: "rgb(255 255 255/0.03)", top: "40%", left: "60%" }} />
      <div className="ct-wrap ca1" style={{ textAlign: "center", position: "relative", zIndex: 10 }}>
        {ey && <div className="ct-eyebrow" style={{ opacity: 0.8 }}>{ey}</div>}
        <h2 className="ct-h2 ct-h2-w ct-h2-m">{hl}</h2>
        {body && <p className="ct-body-w" style={{ margin: "0 auto 32px" }}>{body}</p>}
        <a href={ctaHref} className="ct-btn ct-btn-inv">{ctaLabel || "Zamow teraz"} <Arrow /></a>
        {note && <p className="ct-note" style={{ color: "white" }}>{note}</p>}
      </div>
    </section>);
  }

  // VN 9: Split (tekst lewo, obraz prawo)
  if (vn === 9) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="ct-wrap">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="ca1">
          {ey && <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}><div style={{ width: 32, height: 1, background: "rgb(var(--color-accent))" }} /><span className="ct-eyebrow" style={{ color: "rgb(var(--color-accent))", marginBottom: 0 }}>{ey}</span></div>}
          <h2 className="ct-h2 ct-h2-d ct-h2-m" style={{ fontSize: 32 }}>{hl}</h2>
          {body && <p className="ct-body-d">{body}</p>}
          <a href={ctaHref} className="ct-btn ct-btn-accent">{ctaLabel || "Zamow teraz"} <Arrow /></a>
        </div>
        <div className="ca2" style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 16px 48px rgb(0 0 0/0.08)" }}>
          {img ? <img src={img} alt="" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }} /> : <div style={{ width: "100%", aspectRatio: "4/3", background: "linear-gradient(135deg, rgb(var(--color-accent)/0.1), rgb(var(--color-surface)))" }} />}
        </div>
      </div>
    </div></section>);
  }

  // VN 10: Z social proof
  if (vn === 10) {
    return (<section className="bg-accent text-on-accent" style={{ padding: "64px 0" }}><style>{S}</style><div className="ct-wrap" style={{ textAlign: "center" }}>
      <div className="ca1">
        {ey && <div className="ct-eyebrow" style={{ opacity: 0.8 }}>{ey}</div>}
        <h2 className="ct-h2 ct-h2-w ct-h2-m">{hl}</h2>
        {body && <p className="ct-body-w" style={{ margin: "0 auto 28px" }}>{body}</p>}
        <a href={ctaHref} className="ct-btn ct-btn-inv" style={{ marginBottom: 28 }}>{ctaLabel || "Zamow teraz"} <Arrow /></a>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, paddingTop: 24, borderTop: "1px solid rgb(255 255 255/0.15)" }}>
          <div style={{ display: "flex" }}>
            {["😊", "🕯️", "⭐", "💛", "✨"].map((e, i) => (
              <div key={i} style={{ width: 32, height: 32, borderRadius: "50%", background: "rgb(255 255 255/0.15)", border: "2px solid rgb(var(--color-accent))", marginLeft: i > 0 ? -8 : 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{e}</div>
            ))}
          </div>
          <span style={{ fontSize: 13, opacity: 0.8 }}>500+ zadowolonych klientow</span>
        </div>
      </div>
    </div></section>);
  }

  // VN 11-15: Simpler variants (banner, card, etc.)
  if (vn === 11) {
    // Baner - thin strip
    return (<section style={{ background: "rgb(var(--color-accent)/0.1)", borderTop: "1px solid rgb(var(--color-accent)/0.2)", borderBottom: "1px solid rgb(var(--color-accent)/0.2)", padding: "16px 0" }}><style>{S}</style><div className="ct-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
      <span style={{ fontSize: 18 }}>🕯️</span>
      <span style={{ fontSize: 14, color: "rgb(var(--color-text-muted))" }}>{body || hl}</span>
      <a href={ctaHref} style={{ fontSize: 14, fontWeight: 600, color: "rgb(var(--color-accent))", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>{ctaLabel || "Zamow teraz"} <Arrow /></a>
    </div></section>);
  }

  if (vn === 12) {
    // Card centered
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="ct-wrap">
      <div className="ca1" style={{ maxWidth: 500, margin: "0 auto", background: "rgb(var(--color-accent)/0.05)", border: "1px solid rgb(var(--color-accent)/0.2)", borderRadius: 24, padding: "48px 36px", textAlign: "center" }}>
        {ey && <div className="ct-eyebrow" style={{ color: "rgb(var(--color-accent))" }}>{ey}</div>}
        <h2 className="ct-h2 ct-h2-d" style={{ fontSize: 28 }}>{hl}</h2>
        {body && <p className="ct-body-d" style={{ margin: "0 auto 24px", textAlign: "center" }}>{body}</p>}
        <a href={ctaHref} className="ct-btn ct-btn-accent">{ctaLabel || "Zamow teraz"} <Arrow /></a>
      </div>
    </div></section>);
  }

  if (vn === 13) {
    // Z wideo split
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="ct-wrap">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="ca1">
          {ey && <div className="ct-eyebrow" style={{ color: "rgb(var(--color-accent))" }}>{ey}</div>}
          <h2 className="ct-h2 ct-h2-d ct-h2-m" style={{ fontSize: 32 }}>{hl}</h2>
          {body && <p className="ct-body-d">{body}</p>}
          <a href={ctaHref} className="ct-btn ct-btn-accent">{ctaLabel || "Zamow teraz"} <Arrow /></a>
        </div>
        <div className="ca2" style={{ position: "relative", borderRadius: 24, overflow: "hidden", boxShadow: "0 16px 48px rgb(0 0 0/0.08)" }}>
          {img ? <img src={img} alt="" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }} /> : <div style={{ width: "100%", aspectRatio: "16/9", background: "linear-gradient(135deg, rgb(var(--color-accent)/0.15), rgb(var(--color-surface)))" }} />}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgb(0 0 0/0.15)", cursor: "pointer" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgb(var(--color-surface)/0.95)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 32px rgb(0 0 0/0.15)" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="rgb(var(--color-accent))"><polygon points="5,3 19,12 5,21"/></svg>
            </div>
          </div>
        </div>
      </div>
    </div></section>);
  }

  if (vn === 14) {
    // Karty opcji
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="ct-wrap">
      <div className="ca1" style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 40px" }}>
        <h2 className="ct-h2 ct-h2-d ct-h2-m">{hl}</h2>
        {body && <p className="ct-body-d" style={{ margin: "0 auto", textAlign: "center" }}>{body}</p>}
      </div>
      <div className="ca2 grid grid-cols-1 md:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <div key={i} className="ct-card" style={{ padding: 28 }}>
            {str(it.icon) && <div style={{ fontSize: 28, marginBottom: 14 }}>{resolveIcon(it.icon)}</div>}
            <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "rgb(var(--color-text-primary))", marginBottom: 8 }}>{str(it.name || it.title || it.label)}</div>
            <div style={{ fontSize: 14, lineHeight: 1.6, color: "rgb(var(--color-text-muted))", marginBottom: 16 }}>{str(it.desc || it.description)}</div>
            <a href={str(it.href) || "#"} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "rgb(var(--color-accent))", textDecoration: "none", transition: "gap 0.2s" }} className="hover:!gap-2.5">{str(it.cta_label) || "Dowiedz sie"} <Arrow /></a>
          </div>
        ))}
      </div>
    </div></section>);
  }

  if (vn === 15) {
    // Minimalistyczna - jeden link
    return (<section className="bg-bg" style={{ padding: "80px 16px" }}><style>{S}</style><div style={{ textAlign: "center" }}>
      <a href={ctaHref} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 15, color: "rgb(var(--color-accent))", textDecoration: "none", fontWeight: 500, transition: "gap 0.2s" }} className="hover:!gap-3">
        <span style={{ fontSize: 20 }}>🕯️</span> {body || hl || ctaLabel} <Arrow />
      </a>
    </div></section>);
  }

  // VN 16-20: More variants
  if (vn === 16) {
    // Dwa plany
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="ct-wrap">
      <div className="ca1" style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 40px" }}>
        <h2 className="ct-h2 ct-h2-d ct-h2-m">{hl}</h2>
        {body && <p className="ct-body-d" style={{ margin: "0 auto" }}>{body}</p>}
      </div>
      <div className="ca2 grid grid-cols-1 md:grid-cols-2 gap-5" style={{ maxWidth: 800, margin: "0 auto" }}>
        {items.slice(0, 2).map((it, i) => (
          <div key={i} style={{ background: i === 1 ? "rgb(var(--color-accent)/0.05)" : "rgb(var(--color-surface))", border: `1px solid ${i === 1 ? "rgb(var(--color-accent)/0.3)" : "rgb(var(--color-border)/0.5)"}`, borderRadius: 24, padding: 32, position: "relative" }}>
            {i === 1 && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "rgb(var(--color-accent))", color: "rgb(var(--color-on-accent))", fontSize: 11, fontWeight: 600, padding: "4px 16px", borderRadius: 100, textTransform: "uppercase", letterSpacing: "0.1em" }}>Popularne</div>}
            <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, marginBottom: 8 }}>{str(it.name || it.title)}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "rgb(var(--color-accent))", marginBottom: 16 }}>{str(it.price) || "od 39 zl"}</div>
            <div style={{ fontSize: 14, color: "rgb(var(--color-text-muted))", lineHeight: 1.6, marginBottom: 20 }}>{str(it.desc || it.description)}</div>
            <a href={str(it.href) || "#"} className={`ct-btn ${i === 1 ? "ct-btn-accent" : "ct-btn-outline"}`} style={{ width: "100%", justifyContent: "center" }}>{str(it.cta_label) || "Wybierz"}</a>
          </div>
        ))}
      </div>
    </div></section>);
  }

  if (vn === 17 || vn === 18) {
    // Chatbot / generic accent centered
    return (<section className="bg-accent text-on-accent" style={{ padding: "64px 0" }}><style>{S}</style><div className="ct-wrap ca1" style={{ textAlign: "center" }}>
      {ey && <div className="ct-eyebrow" style={{ opacity: 0.8 }}>{ey}</div>}
      <h2 className="ct-h2 ct-h2-w ct-h2-m">{hl}</h2>
      {body && <p className="ct-body-w" style={{ margin: "0 auto 28px" }}>{body}</p>}
      <a href={ctaHref} className="ct-btn ct-btn-inv">{ctaLabel || "Zamow teraz"} <Arrow /></a>
    </div></section>);
  }

  if (vn === 19) {
    // Z opinia
    const testimonials = arr(content.testimonials || content.reviews);
    const t = testimonials[0];
    return (<section className="bg-accent text-on-accent" style={{ padding: "64px 0" }}><style>{S}</style><div className="ct-wrap ca1" style={{ textAlign: "center" }}>
      {ey && <div className="ct-eyebrow" style={{ opacity: 0.8 }}>{ey}</div>}
      <h2 className="ct-h2 ct-h2-w ct-h2-m">{hl}</h2>
      {body && <p className="ct-body-w" style={{ margin: "0 auto 28px" }}>{body}</p>}
      <a href={ctaHref} className="ct-btn ct-btn-inv" style={{ marginBottom: 28 }}>{ctaLabel || "Zamow teraz"} <Arrow /></a>
      {t && (
        <div style={{ maxWidth: 420, margin: "0 auto", background: "rgb(255 255 255/0.1)", backdropFilter: "blur(12px)", border: "1px solid rgb(255 255 255/0.12)", borderRadius: 16, padding: "18px 22px", textAlign: "left" }}>
          <div style={{ color: "rgb(var(--color-accent-light))", fontSize: 13, marginBottom: 6 }}>★★★★★</div>
          <div style={{ fontSize: 13, fontStyle: "italic", opacity: 0.8, lineHeight: 1.5, marginBottom: 8 }}>&ldquo;{str(t.quote)}&rdquo;</div>
          <div style={{ fontSize: 12, fontWeight: 600 }}>{str(t.author)}</div>
        </div>
      )}
    </div></section>);
  }

  // VN 20: Animowany tekst (default)
  return (<section className="bg-bg" style={{ padding: "80px 0", textAlign: "center" }}><style>{S}{`
    .ct-rot-wrap{display:inline-block;position:relative;height:1.15em;overflow:hidden;vertical-align:bottom}
    .ct-rot-words{display:flex;flex-direction:column;animation:ctRot 9s cubic-bezier(.4,0,.2,1) infinite}
    .ct-rot-word{height:1.15em;display:flex;align-items:center;font-style:italic;color:rgb(var(--color-accent));position:relative}
    .ct-rot-word::after{content:'';position:absolute;bottom:4px;left:0;right:0;height:3px;background:rgb(var(--color-accent)/0.2);border-radius:2px}
    @keyframes ctRot{0%,28%{transform:translateY(0)}33%,61%{transform:translateY(-33.33%)}66%,94%{transform:translateY(-66.66%)}100%{transform:translateY(0)}}
  `}</style><div className="ct-wrap ca1">
    <h2 className="ct-h2 ct-h2-d ct-h2-m">
      {hl || "Swiece, ktore tworza"}{" "}
      <span className="ct-rot-wrap"><span className="ct-rot-words">
        <span className="ct-rot-word">klimat</span>
        <span className="ct-rot-word">harmonie</span>
        <span className="ct-rot-word">wspomnienia</span>
      </span></span>
    </h2>
    {body && <p className="ct-body-d" style={{ margin: "0 auto 32px", textAlign: "center" }}>{body}</p>}
    <a href={ctaHref} className="ct-btn ct-btn-accent">{ctaLabel || "Zamow teraz"} <Arrow /></a>
  </div></section>);
}
