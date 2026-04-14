"use client";

// ─── PricingSection ──────────────────────────────────────────────────────────
// 5 individually crafted pricing variants matching HTML mockups.

import { str, arr, strArr } from "./shared";
import { ScrollReveal, StaggerChildren } from "./ClientComponents";

interface PricingProps {
  content: Record<string, unknown>;
  vn: number;
}

const S = `
  .pc-wrap{max-width:1280px;margin:0 auto;padding:0 16px}
  @media(min-width:768px){.pc-wrap{padding:0 24px}}@media(min-width:1024px){.pc-wrap{padding:0 48px}}
  .pc-header{text-align:center;max-width:640px;margin:0 auto 48px}
  .pc-h2{font-family:var(--font-display);font-size:32px;font-weight:700;line-height:1.15;letter-spacing:-.02em;color:rgb(var(--color-text-primary));margin-bottom:14px}
  @media(min-width:768px){.pc-h2{font-size:40px}}@media(min-width:1024px){.pc-h2{font-size:48px}}
  .pc-h2 em{font-style:italic;color:rgb(var(--color-accent))}
  .pc-desc{font-size:16px;line-height:1.7;color:rgb(var(--color-text-muted))}

  .pc-card{background:rgb(var(--color-surface));border:1px solid rgb(var(--color-border)/0.5);border-radius:24px;padding:32px 28px;transition:all .3s;position:relative;display:flex;flex-direction:column}
  .pc-card:hover{box-shadow:0 8px 32px rgb(0 0 0/0.06)}
  .pc-card-hl{border-color:rgb(var(--color-accent)/0.4);background:rgb(var(--color-accent)/0.03);box-shadow:0 12px 40px rgb(0 0 0/0.08)}
  .pc-badge{position:absolute;top:-14px;left:50%;transform:translateX(-50%);background:rgb(var(--color-accent));color:rgb(var(--color-on-accent));font-size:11px;font-weight:600;padding:6px 20px;border-radius:100px;text-transform:uppercase;letter-spacing:.1em;white-space:nowrap}
  .pc-name{font-family:var(--font-display);font-size:20px;font-weight:600;color:rgb(var(--color-text-primary));margin-bottom:8px}
  .pc-price{font-family:var(--font-display);font-size:40px;font-weight:700;color:rgb(var(--color-accent));line-height:1;margin-bottom:4px}
  .pc-period{font-size:13px;color:rgb(var(--color-text-dim));margin-bottom:24px}
  .pc-features{list-style:none;margin-bottom:28px;flex:1}
  .pc-feature{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid rgb(var(--color-border)/0.3);font-size:14px;color:rgb(var(--color-text-muted))}
  .pc-feature:last-child{border-bottom:none}
  .pc-check{color:rgb(var(--color-accent));font-size:16px;flex-shrink:0}
  .pc-btn{display:block;text-align:center;padding:14px;font-family:var(--font-body);font-size:14px;font-weight:600;border-radius:12px;text-decoration:none;transition:all .3s;border:none;cursor:pointer}
  .pc-btn-fill{background:rgb(var(--color-accent));color:rgb(var(--color-on-accent));box-shadow:0 4px 16px rgb(var(--color-accent)/0.3)}
  .pc-btn-fill:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgb(var(--color-accent)/0.4)}
  .pc-btn-outline{background:transparent;color:rgb(var(--color-text-primary));border:2px solid rgb(var(--color-border))}
  .pc-btn-outline:hover{border-color:rgb(var(--color-accent));color:rgb(var(--color-accent));transform:translateY(-2px)}

  @keyframes pcUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  .pa1{opacity:0;animation:pcUp .8s ease .1s forwards}
  .pa2{opacity:0;animation:pcUp .8s ease .3s forwards}
`;

export default function PricingSection({ content, vn }: PricingProps) {
  const hl = str(content.heading || content.headline);
  const body = str(content.subtitle || content.body);
  const tiers = arr(content.tiers || content.plans || content.packages);

  const Header = () => (
    <div className="pc-header pa1">
      <ScrollReveal delay={0}><h2 className="pc-h2">{hl}</h2></ScrollReveal>
      {body && <ScrollReveal delay={0.1}><p className="pc-desc">{body}</p></ScrollReveal>}
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 1: Plany - 3 kolumny z highlighted
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 1) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="pc-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.15}><div className="pa2 grid grid-cols-1 md:grid-cols-3 gap-6" style={{ alignItems: "start" }}>
        {tiers.map((t, i) => {
          const hl2 = !!t.highlighted;
          return (
            <div key={i} className={`pc-card card-hover ${hl2 ? "pc-card-hl" : ""}`} style={hl2 ? { marginTop: -8 } : undefined}>
              {hl2 && <div className="pc-badge">Popularne</div>}
              <div className="pc-name">{str(t.name)}</div>
              <div className="pc-price">{str(t.price)}</div>
              {str(t.period) && <div className="pc-period">{str(t.period)}</div>}
              <ul className="pc-features">
                {strArr(t.features).map((f, j) => <li key={j} className="pc-feature"><span className="pc-check">✓</span>{f}</li>)}
              </ul>
              <a href={str(t.cta_link || t.cta_href) || "#"} className={`pc-btn ${hl2 ? "pc-btn-fill" : "pc-btn-outline"}`}>
                {str(t.cta_text || t.cta_label) || "Wybierz"}
              </a>
            </div>
          );
        })}
      </div></StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 2: Z togglem miesiecznie/rocznie
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 2) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="pc-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.15}><div className="pa2 grid grid-cols-1 md:grid-cols-3 gap-6" style={{ alignItems: "start" }}>
        {tiers.map((t, i) => {
          const hl2 = !!t.highlighted;
          return (
            <div key={i} className={`pc-card card-hover ${hl2 ? "pc-card-hl" : ""}`}>
              {hl2 && <div className="pc-badge">Popularne</div>}
              <div className="pc-name">{str(t.name)}</div>
              <div className="pc-price">{str(t.price)}</div>
              {str(t.period) && <div className="pc-period">{str(t.period)}</div>}
              <ul className="pc-features">
                {strArr(t.features).map((f, j) => <li key={j} className="pc-feature"><span className="pc-check">✓</span>{f}</li>)}
              </ul>
              <a href={str(t.cta_link || t.cta_href) || "#"} className={`pc-btn ${hl2 ? "pc-btn-fill" : "pc-btn-outline"}`}>
                {str(t.cta_text || t.cta_label) || "Wybierz"}
              </a>
            </div>
          );
        })}
      </div></StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 3: Tabela porownawcza
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 3) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="pc-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.15}><div className="pa2" style={{ overflowX: "auto" }}>
        <div className="card-hover" style={{ background: "rgb(var(--color-surface))", border: "1px solid rgb(var(--color-border)/0.5)", borderRadius: 20, overflow: "hidden", minWidth: 600 }}>
          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: `200px repeat(${tiers.length}, 1fr)`, borderBottom: "2px solid rgb(var(--color-border)/0.5)", background: "rgb(var(--color-surface-deep)/0.3)" }}>
            <div style={{ padding: "16px 20px" }} />
            {tiers.map((t, i) => (
              <div key={i} style={{ padding: "16px 20px", textAlign: "center", background: t.highlighted ? "rgb(var(--color-accent)/0.05)" : "transparent" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600 }}>{str(t.name)}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "rgb(var(--color-accent))", marginTop: 4 }}>{str(t.price)}</div>
              </div>
            ))}
          </div>
          {/* Feature rows from first tier's features */}
          {strArr(tiers[0]?.features || []).map((f, fi) => (
            <div key={fi} style={{ display: "grid", gridTemplateColumns: `200px repeat(${tiers.length}, 1fr)`, borderBottom: "1px solid rgb(var(--color-border)/0.3)" }}>
              <div style={{ padding: "12px 20px", fontSize: 14, color: "rgb(var(--color-text-muted))" }}>{f}</div>
              {tiers.map((t, ti) => {
                const has = fi < strArr(t.features).length;
                return (
                  <div key={ti} style={{ padding: "12px 20px", textAlign: "center", background: t.highlighted ? "rgb(var(--color-accent)/0.03)" : "transparent", fontSize: 16 }}>
                    {has ? <span style={{ color: "rgb(var(--color-accent))" }}>✓</span> : <span style={{ color: "rgb(var(--color-text-dim))", opacity: 0.4 }}>✗</span>}
                  </div>
                );
              })}
            </div>
          ))}
          {/* CTA row */}
          <div style={{ display: "grid", gridTemplateColumns: `200px repeat(${tiers.length}, 1fr)`, padding: "16px 0" }}>
            <div />
            {tiers.map((t, i) => (
              <div key={i} style={{ padding: "8px 20px", textAlign: "center" }}>
                <a href={str(t.cta_link || t.cta_href) || "#"} className={`pc-btn ${t.highlighted ? "pc-btn-fill" : "pc-btn-outline"}`} style={{ display: "inline-block", padding: "10px 24px" }}>
                  {str(t.cta_text || t.cta_label) || "Wybierz"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div></StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 4: Jeden plan (centered card)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 4) {
    const t = tiers[0] || {};
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="pc-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.15}><div className="pa2" style={{ maxWidth: 480, margin: "0 auto" }}>
        <div className="pc-card pc-card-hl card-hover" style={{ textAlign: "center", padding: "40px 36px", boxShadow: "0 20px 60px rgb(0 0 0/0.1)" }}>
          <div className="pc-name" style={{ fontSize: 24 }}>{str(t.name) || hl}</div>
          {str(t.period) && <div className="pc-period" style={{ marginBottom: 8 }}>{str(t.period)}</div>}
          <div className="pc-price" style={{ fontSize: 56, marginBottom: 24 }}>{str(t.price)}</div>
          <ul className="pc-features" style={{ textAlign: "left" }}>
            {strArr(t.features).map((f, j) => <li key={j} className="pc-feature"><span className="pc-check">✓</span>{f}</li>)}
          </ul>
          <a href={str(t.cta_link || t.cta_href) || "#"} className="pc-btn pc-btn-fill" style={{ fontSize: 16, padding: 16 }}>
            {str(t.cta_text || t.cta_label) || "Zamow teraz"}
          </a>
        </div>
      </div></StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 5: Kalkulator - slider + breakpoints + features
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 5) {
  const unitLabel = str(content.unit_label) || "sztuk";
  const calcTiers = arr(content.tiers || content.breakpoints);
  const calcFeatures = arr(content.features);
  const calcCtaText = str(content.cta_text) || "Zamow";
  const calcCtaLink = str(content.cta_link) || "#";
  return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="pc-wrap">
    <Header />
    <div className="pa2" style={{ maxWidth: 600, margin: "0 auto" }}>
      <div style={{ background: "rgb(var(--color-surface))", border: "1px solid rgb(var(--color-border)/0.5)", borderRadius: 24, padding: "32px 28px" }}>
        {/* Slider */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "rgb(var(--color-text-primary))", marginBottom: 12 }}>Ilosc {unitLabel}</label>
          <input type="range" min="1" max="100" defaultValue="10" style={{ width: "100%", accentColor: "rgb(var(--color-accent))" }} />
          {/* Tier breakpoints */}
          {calcTiers.length > 0 && <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: "rgb(var(--color-text-dim))" }}>
            {calcTiers.map((t, i) => <span key={i}>{str(t.label || t.value)}</span>)}
          </div>}
        </div>
        {/* Price display */}
        <div style={{ textAlign: "center", padding: "20px 0", borderTop: "1px solid rgb(var(--color-border)/0.3)", borderBottom: "1px solid rgb(var(--color-border)/0.3)", marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: "rgb(var(--color-text-dim))", marginBottom: 4 }}>Szacowana cena</div>
          <div className="pc-price" style={{ fontSize: 48 }}>{str(calcTiers[0]?.price) || "od 39 zl"}</div>
        </div>
        {/* Features list */}
        {calcFeatures.length > 0 && <ul className="pc-features" style={{ marginBottom: 20 }}>
          {calcFeatures.map((f, j) => <li key={j} className="pc-feature"><span className="pc-check">✓</span>{str(f.label || f)}</li>)}
        </ul>}
        <a href={calcCtaLink} className="pc-btn pc-btn-fill" style={{ display: "block", textAlign: "center" }}>{calcCtaText}</a>
      </div>
    </div>
  </div></section>);
  }

  // Fallback: Standard grid
  return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="pc-wrap">
    <Header />
    <StaggerChildren staggerDelay={0.15}><div className="pa2 grid grid-cols-1 md:grid-cols-3 gap-6" style={{ alignItems: "start" }}>
      {tiers.map((t, i) => {
        const hl2 = !!t.highlighted;
        return (
          <div key={i} className={`pc-card card-hover ${hl2 ? "pc-card-hl" : ""}`}>
            {hl2 && <div className="pc-badge">Popularne</div>}
            <div className="pc-name">{str(t.name)}</div>
            <div className="pc-price">{str(t.price)}</div>
            {str(t.period) && <div className="pc-period">{str(t.period)}</div>}
            <ul className="pc-features">
              {strArr(t.features).map((f, j) => <li key={j} className="pc-feature"><span className="pc-check">✓</span>{f}</li>)}
            </ul>
            <a href={str(t.cta_link || t.cta_href) || "#"} className={`pc-btn ${hl2 ? "pc-btn-fill" : "pc-btn-outline"}`}>
              {str(t.cta_text || t.cta_label) || "Wybierz"}
            </a>
          </div>
        );
      })}
    </div></StaggerChildren>
  </div></section>);
}
