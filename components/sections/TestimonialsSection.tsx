"use client";

// ─── TestimonialsSection ─────────────────────────────────────────────────────
// 12 individually crafted testimonial variants matching HTML mockups.

/* eslint-disable @next/next/no-img-element */

import { str, num, arr, resolveImage, resolveIcon } from "./shared";
import { ScrollReveal, StaggerChildren } from './ClientComponents'

interface TestimonialsProps {
  content: Record<string, unknown>;
  vn: number;
}

const S = `
  .tm-wrap{max-width:1280px;margin:0 auto;padding:0 16px}
  @media(min-width:768px){.tm-wrap{padding:0 24px}}@media(min-width:1024px){.tm-wrap{padding:0 48px}}
  .tm-header{text-align:center;max-width:680px;margin:0 auto 56px}
  .tm-eyebrow{display:inline-flex;align-items:center;gap:16px;margin-bottom:20px}
  .tm-eline{width:32px;height:1px;background:linear-gradient(90deg,transparent,rgb(var(--color-accent)/0.4))}
  .tm-eline-r{width:32px;height:1px;background:linear-gradient(90deg,rgb(var(--color-accent)/0.4),transparent)}
  .tm-etxt{font-size:11px;font-weight:600;letter-spacing:.25em;text-transform:uppercase;color:rgb(var(--color-accent))}
  .tm-h2{font-family:var(--font-display);font-size:36px;font-weight:700;line-height:1.15;letter-spacing:-.02em;color:rgb(var(--color-text-primary));margin-bottom:14px}
  @media(min-width:768px){.tm-h2{font-size:44px}}@media(min-width:1024px){.tm-h2{font-size:52px}}
  .tm-h2 em{font-style:italic;color:rgb(var(--color-accent))}
  .tm-h2-w{color:rgb(var(--color-on-accent))}
  .tm-desc{font-size:16px;line-height:1.7;color:rgb(var(--color-text-muted))}

  .tm-card{background:rgb(var(--color-surface));border:1px solid rgb(var(--color-border)/0.5);border-radius:20px;padding:28px 24px;transition:all .3s}
  .tm-card:hover{border-color:rgb(var(--color-accent)/0.3);box-shadow:0 8px 32px rgb(0 0 0/0.06);transform:translateY(-3px)}
  .tm-stars{color:rgb(var(--color-accent));font-size:14px;letter-spacing:2px;margin-bottom:12px}
  .tm-quote{font-size:14px;font-style:italic;line-height:1.65;color:rgb(var(--color-text-muted));margin-bottom:16px}
  .tm-author{display:flex;align-items:center;gap:12px;padding-top:16px;border-top:1px solid rgb(var(--color-border)/0.3)}
  .tm-avatar{width:40px;height:40px;border-radius:50%;background:rgb(var(--color-surface-deep));display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;overflow:hidden}
  .tm-avatar img{width:100%;height:100%;object-fit:cover}
  .tm-name{font-size:14px;font-weight:600;color:rgb(var(--color-text-primary))}
  .tm-role{font-size:12px;color:rgb(var(--color-text-dim))}

  .tm-glass{background:rgb(var(--color-on-accent) /0.08);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgb(var(--color-on-accent) /0.1);border-radius:20px;padding:28px 24px}
  .tm-glass .tm-stars{color:rgb(var(--color-accent-light))}
  .tm-glass .tm-quote{color:rgb(var(--color-on-accent) /0.8)}
  .tm-glass .tm-author{border-color:rgb(var(--color-on-accent) /0.1)}
  .tm-glass .tm-name{color:rgb(var(--color-on-accent))}
  .tm-glass .tm-role{color:rgb(var(--color-on-accent) /0.5)}

  @keyframes tmUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  .ta1{opacity:0;animation:tmUp .8s ease .1s forwards}
  .ta2{opacity:0;animation:tmUp .8s ease .3s forwards}
  @keyframes tmMarquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
  @keyframes tmMarqueeR{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}
`;

function Stars({ rating }: { rating: number }) {
  const r = Math.min(Math.max(rating, 0), 5);
  return <div className="tm-stars">{"★".repeat(r)}{"☆".repeat(5 - r)}</div>;
}

function AuthorBlock({ item }: { item: Record<string, unknown> }) {
  const photo = resolveImage(item.photo);
  return (
    <div className="tm-author">
      <div className="tm-avatar">
        {photo ? <img src={photo} alt="" /> : <span>{resolveIcon(item.icon) || "👤"}</span>}
      </div>
      <div>
        <div className="tm-name">{str(item.author)}</div>
        {(str(item.role) || str(item.company)) && (
          <div className="tm-role">{str(item.role)}{str(item.company) ? `, ${str(item.company)}` : ""}</div>
        )}
      </div>
    </div>
  );
}

export default function TestimonialsSection({ content, vn }: TestimonialsProps) {
  const hl = str(content.heading || content.headline);
  const body = str(content.body);
  const ey = str(content.eyebrow);
  const items = arr(content.items);
  const bgImg = resolveImage(content.image || content.bg_image);

  const Header = ({ white }: { white?: boolean }) => (
    <div className="tm-header ta1">
      {ey && <div className="tm-eyebrow"><div className="tm-eline"/><span className="tm-etxt" style={white ? { color: "rgb(var(--color-accent-light))" } : undefined}>{ey}</span><div className="tm-eline-r"/></div>}
      <h2 className={`tm-h2 ${white ? "tm-h2-w" : ""}`}>{hl}</h2>
      {body && <p className="tm-desc" style={white ? { color: "rgb(var(--color-on-accent) / 0.7)" } : undefined}>{body}</p>}
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 1: Prosta siatka 3-col
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 1) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="tm-wrap">
      <ScrollReveal delay={0}><Header /></ScrollReveal>
      <StaggerChildren staggerDelay={0.15}><div className="ta2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <div key={i} className="tm-card card-hover">
            <Stars rating={num(it.rating) || 5} />
            <div className="tm-quote">&ldquo;{str(it.quote)}&rdquo;</div>
            <AuthorBlock item={it} />
          </div>
        ))}
      </div></StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 2: Ze zdjeciem + accent left-border
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 2) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="tm-wrap">
      <ScrollReveal delay={0}><Header /></ScrollReveal>
      <StaggerChildren staggerDelay={0.15}><div className="ta2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <div key={i} className="tm-card card-hover" style={{ borderLeft: "3px solid rgb(var(--color-accent)/0.3)", padding: "32px 28px" }}>
            <Stars rating={num(it.rating) || 5} />
            <div className="tm-quote" style={{ fontSize: 15 }}>&ldquo;{str(it.quote)}&rdquo;</div>
            <div className="tm-author">
              <div className="tm-avatar" style={{ width: 48, height: 48, border: "2px solid rgb(var(--color-accent)/0.3)" }}>
                {resolveImage(it.photo) ? <img src={resolveImage(it.photo)!} alt="" /> : <span>{resolveIcon(it.icon) || "👤"}</span>}
              </div>
              <div>
                <div className="tm-name">{str(it.author)}</div>
                <div className="tm-role">{str(it.role)}{str(it.company) ? `, ${str(it.company)}` : ""}</div>
              </div>
            </div>
          </div>
        ))}
      </div></StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 3: Karuzela marquee
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 3) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0", overflow: "hidden" }}><style>{S}</style><div className="tm-wrap"><ScrollReveal delay={0}><Header /></ScrollReveal></div>
      <div className="ta2" style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 60, background: "linear-gradient(to right, rgb(var(--color-bg-alt)), transparent)", zIndex: 2 }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 60, background: "linear-gradient(to left, rgb(var(--color-bg-alt)), transparent)", zIndex: 2 }} />
        <div style={{ display: "flex", gap: 20, animation: "tmMarquee 40s linear infinite", width: "max-content" }} className="hover:[animation-play-state:paused]">
          {[...items, ...items].map((it, i) => (
            <div key={i} className="tm-card" style={{ minWidth: 320, flexShrink: 0 }}>
              <Stars rating={num(it.rating) || 5} />
              <div className="tm-quote">&ldquo;{str(it.quote)}&rdquo;</div>
              <AuthorBlock item={it} />
            </div>
          ))}
        </div>
      </div>
    </section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 4: Duzy cytat centrowany
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 4) {
    const it = items[0] || {};
    return (<section className="bg-bg-alt" style={{ padding: "80px 0" }}><style>{S}</style><div className="tm-wrap">
      <ScrollReveal delay={0}><div className="ta1" style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative" }}>
        {/* Decorative quote mark */}
        <div style={{ fontFamily: "var(--font-display)", fontSize: 120, color: "rgb(var(--color-accent)/0.12)", lineHeight: 1, position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)", userSelect: "none" }}>&ldquo;</div>
        <div style={{ position: "relative", zIndex: 2 }}>
          <Stars rating={num(it.rating) || 5} />
          <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontStyle: "italic", lineHeight: 1.6, color: "rgb(var(--color-text-primary))", margin: "16px 0 28px" }}>&ldquo;{str(it.quote)}&rdquo;</div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div className="tm-avatar" style={{ width: 64, height: 64 }}>
              {resolveImage(it.photo) ? <img src={resolveImage(it.photo)!} alt="" /> : <span style={{ fontSize: 28 }}>{resolveIcon(it.icon) || "👤"}</span>}
            </div>
            <div>
              <div className="tm-name" style={{ textAlign: "center" }}>{str(it.author)}</div>
              <div className="tm-role" style={{ textAlign: "center" }}>{str(it.role)}{str(it.company) ? `, ${str(it.company)}` : ""}</div>
            </div>
          </div>
          {/* Dots */}
          {items.length > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 28 }}>
              {items.map((_, j) => (
                <div key={j} style={{ width: 8, height: 8, borderRadius: "50%", background: j === 0 ? "rgb(var(--color-accent))" : "rgb(var(--color-border))", transition: "background 0.3s" }} />
              ))}
            </div>
          )}
        </div>
      </div></ScrollReveal>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 5: Featured + kompaktowe
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 5) {
    const featured = items[0];
    const rest = items.slice(1);
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="tm-wrap">
      <ScrollReveal delay={0}><Header /></ScrollReveal>
      <StaggerChildren staggerDelay={0.15}><div className="ta2 grid grid-cols-1 md:grid-cols-5 gap-6">
        {featured && (
          <div className="md:col-span-2 card-hover" style={{ background: "rgb(var(--color-accent)/0.05)", border: "1px solid rgb(var(--color-accent)/0.2)", borderRadius: 24, padding: 32 }}>
            <Stars rating={num(featured.rating) || 5} />
            <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontStyle: "italic", lineHeight: 1.6, color: "rgb(var(--color-text-primary))", marginBottom: 20 }}>&ldquo;{str(featured.quote)}&rdquo;</div>
            <AuthorBlock item={featured} />
          </div>
        )}
        <div className="md:col-span-3" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {rest.map((it, i) => (
            <div key={i} className="card-hover" style={{ display: "flex", gap: 16, padding: "16px 20px", background: "rgb(var(--color-surface))", border: "1px solid rgb(var(--color-border)/0.5)", borderRadius: 16, transition: "all 0.2s" }}>
              <div className="tm-avatar" style={{ flexShrink: 0 }}>
                {resolveImage(it.photo) ? <img src={resolveImage(it.photo)!} alt="" /> : <span>{resolveIcon(it.icon) || "👤"}</span>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <div className="tm-name">{str(it.author)}</div>
                  <div style={{ color: "rgb(var(--color-accent))", fontSize: 12 }}>{"★".repeat(num(it.rating) || 5)}</div>
                </div>
                <div style={{ fontSize: 13, fontStyle: "italic", color: "rgb(var(--color-text-muted))", lineHeight: 1.5 }}>&ldquo;{str(it.quote)}&rdquo;</div>
              </div>
            </div>
          ))}
        </div>
      </div></StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 6: Wideo (karty z play button)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 6) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="tm-wrap">
      <ScrollReveal delay={0}><Header /></ScrollReveal>
      <StaggerChildren staggerDelay={0.15}><div className="ta2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => {
          const photo = resolveImage(it.photo || it.image || it.video_thumbnail);
          return (
            <div key={i} className="tm-card card-hover" style={{ padding: 0, overflow: "hidden" }}>
              <div style={{ position: "relative", aspectRatio: "16/10", background: "rgb(var(--color-surface-deep))", overflow: "hidden" }}>
                {photo && <img src={photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                <div style={{ position: "absolute", inset: 0, background: "rgb(0 0 0/0.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgb(var(--color-surface)/0.95)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgb(0 0 0/0.15)" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="rgb(var(--color-accent))"><polygon points="5,3 19,12 5,21"/></svg>
                  </div>
                </div>
              </div>
              <div style={{ padding: "20px 24px" }}>
                <Stars rating={num(it.rating) || 5} />
                <div className="tm-quote">&ldquo;{str(it.quote)}&rdquo;</div>
                <AuthorBlock item={it} />
              </div>
            </div>
          );
        })}
      </div></StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 7: Na tle zdjecia z glassmorphism
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 7) {
    return (<section style={{ position: "relative", padding: "80px 0", overflow: "hidden" }}><style>{S}</style>
      <div style={{ position: "absolute", inset: 0 }}>{bgImg && <img src={bgImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}</div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.65), rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.7))" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3))" }} />
      <div className="tm-wrap" style={{ position: "relative", zIndex: 10 }}>
        <ScrollReveal delay={0}><Header white /></ScrollReveal>
        <StaggerChildren staggerDelay={0.15}><div className="ta2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <div key={i} className="tm-glass card-hover">
              <Stars rating={num(it.rating) || 5} />
              <div className="tm-quote">&ldquo;{str(it.quote)}&rdquo;</div>
              <AuthorBlock item={it} />
            </div>
          ))}
        </div></StaggerChildren>
      </div>
    </section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 8: Sciana opinii (masonry)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 8) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}{`
      .tm-masonry{column-count:1;column-gap:16px}
      @media(min-width:640px){.tm-masonry{column-count:2}}
      @media(min-width:1024px){.tm-masonry{column-count:3}}
      .tm-masonry-item{break-inside:avoid;margin-bottom:16px}
    `}</style><div className="tm-wrap">
      <ScrollReveal delay={0}><Header /></ScrollReveal>
      <StaggerChildren staggerDelay={0.15}><div className="tm-masonry ta2">
        {items.map((it, i) => (
          <div key={i} className="tm-masonry-item">
            <div className="tm-card card-hover" style={i % 3 === 0 ? { borderLeft: "3px solid rgb(var(--color-accent)/0.3)" } : undefined}>
              <Stars rating={num(it.rating) || 5} />
              <div className="tm-quote">&ldquo;{str(it.quote)}&rdquo;</div>
              <AuthorBlock item={it} />
            </div>
          </div>
        ))}
      </div></StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 9: B2B z logami
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 9) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="tm-wrap">
      <ScrollReveal delay={0}><Header /></ScrollReveal>
      <StaggerChildren staggerDelay={0.15}><div className="ta2 grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((it, i) => (
          <div key={i} className="tm-card card-hover" style={{ padding: 32, borderRadius: 24 }}>
            {str(it.company) && (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", background: "rgb(var(--color-bg-alt))", borderRadius: 8, marginBottom: 16, fontSize: 13, fontWeight: 600, color: "rgb(var(--color-text-muted))" }}>
                <span style={{ fontSize: 16 }}>{resolveIcon(it.icon) || "🏢"}</span>
                {str(it.company)}
              </div>
            )}
            <Stars rating={num(it.rating) || 5} />
            <div className="tm-quote" style={{ fontSize: 16 }}>&ldquo;{str(it.quote)}&rdquo;</div>
            <div className="tm-author">
              <div className="tm-avatar">
                {resolveImage(it.photo) ? <img src={resolveImage(it.photo)!} alt="" /> : <span>{resolveIcon(it.icon) || "👤"}</span>}
              </div>
              <div>
                <div className="tm-name">{str(it.author)}</div>
                <div className="tm-role">{str(it.role)}{str(it.company) ? <span style={{ color: "rgb(var(--color-accent))" }}> - {str(it.company)}</span> : ""}</div>
              </div>
            </div>
          </div>
        ))}
      </div></StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 10: Podsumowanie (rating summary + karty)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 10) {
    const avgRating = items.length > 0
      ? (items.reduce((sum, it) => sum + (num(it.rating) || 5), 0) / items.length).toFixed(1)
      : "5.0";
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="tm-wrap">
      <ScrollReveal delay={0}><Header /></ScrollReveal>
      {/* Rating summary */}
      <div className="ta1" style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 64, fontWeight: 700, color: "rgb(var(--color-accent))", lineHeight: 1 }}>{avgRating}</div>
        <div style={{ color: "rgb(var(--color-accent))", fontSize: 20, letterSpacing: 3, margin: "8px 0" }}>★★★★★</div>
        <div style={{ fontSize: 14, color: "rgb(var(--color-text-dim))" }}>na podstawie {items.length > 0 ? items.length * 20 : 127} opinii</div>
      </div>
      {/* Cards */}
      <StaggerChildren staggerDelay={0.15}><div className="ta2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <div key={i} className="tm-card card-hover">
            <Stars rating={num(it.rating) || 5} />
            <div className="tm-quote">&ldquo;{str(it.quote)}&rdquo;</div>
            <AuthorBlock item={it} />
          </div>
        ))}
      </div></StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 11: Dwurzedowa marquee (przeciwne kierunki)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 11) {
    const half = Math.ceil(items.length / 2);
    const row1 = items.slice(0, half);
    const row2 = items.slice(half);
    return (<section className="bg-bg-alt" style={{ padding: "64px 0", overflow: "hidden" }}><style>{S}</style>
      <div className="tm-wrap"><ScrollReveal delay={0}><Header /></ScrollReveal></div>
      {[row1, row2].map((row, ri) => (
        <div key={ri} style={{ position: "relative", marginBottom: ri === 0 ? 16 : 0 }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 60, background: "linear-gradient(to right, rgb(var(--color-bg-alt)), transparent)", zIndex: 2 }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 60, background: "linear-gradient(to left, rgb(var(--color-bg-alt)), transparent)", zIndex: 2 }} />
          <div style={{ display: "flex", gap: 16, animation: `${ri === 0 ? "tmMarquee" : "tmMarqueeR"} ${35 + ri * 5}s linear infinite`, width: "max-content" }}>
            {[...row, ...row].map((it, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "14px 18px", background: "rgb(var(--color-surface))", border: "1px solid rgb(var(--color-border)/0.5)", borderRadius: 14, minWidth: 320, flexShrink: 0, alignItems: "center" }}>
                <div className="tm-avatar" style={{ width: 36, height: 36 }}>
                  {resolveImage(it.photo) ? <img src={resolveImage(it.photo)!} alt="" /> : <span style={{ fontSize: 16 }}>{resolveIcon(it.icon) || "👤"}</span>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{str(it.author)}</div>
                    <div style={{ color: "rgb(var(--color-accent))", fontSize: 11 }}>{"★".repeat(num(it.rating) || 5)}</div>
                  </div>
                  <div style={{ fontSize: 12, fontStyle: "italic", color: "rgb(var(--color-text-muted))", lineHeight: 1.4, marginTop: 3 }}>&ldquo;{str(it.quote).slice(0, 80)}{str(it.quote).length > 80 ? "..." : ""}&rdquo;</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 12: NPS / data-driven (rating summary + quotes)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 12) {
  const npsScore = typeof content.nps_score === "number" ? content.nps_score : 92;
  const npsLabel = str(content.nps_label) || "NPS Score";
  const npsHighlights = arr(content.highlights);
  const quotes = arr(content.quotes).length > 0 ? arr(content.quotes) : items;
  return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="tm-wrap">
    <ScrollReveal delay={0}><Header /></ScrollReveal>
    {/* NPS-style summary */}
    <div className="ta1" style={{ maxWidth: 500, margin: "0 auto 48px", textAlign: "center" }}>
      <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 100, height: 100, borderRadius: "50%", border: "4px solid rgb(var(--color-accent))", marginBottom: 16 }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 700, color: "rgb(var(--color-accent))" }}>{npsScore}</span>
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: "rgb(var(--color-text-primary))", marginBottom: 4 }}>{npsLabel}</div>
      <div style={{ fontSize: 13, color: "rgb(var(--color-text-dim))" }}>Na podstawie {items.length > 0 ? items.length * 20 : 127} odpowiedzi</div>
      {/* Bar */}
      {npsHighlights.length === 3 ? (
        <>
        <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", height: 8, marginTop: 20 }}>
          {npsHighlights.map((h, i) => <div key={i} style={{ width: str(h.pct) || "33%", background: i === 0 ? "rgb(34 197 94)" : i === 1 ? "rgb(var(--color-accent))" : "rgb(239 68 68)" }} />)}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgb(var(--color-text-dim))", marginTop: 6 }}>
          {npsHighlights.map((h, i) => <span key={i}>{str(h.label)}</span>)}
        </div>
        </>
      ) : (
        <>
        <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", height: 8, marginTop: 20 }}>
          <div style={{ width: "73%", background: "rgb(34 197 94)" }} />
          <div style={{ width: "19%", background: "rgb(var(--color-accent))" }} />
          <div style={{ width: "8%", background: "rgb(239 68 68)" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgb(var(--color-text-dim))", marginTop: 6 }}>
          <span>73% promotorzy</span><span>19% neutralni</span><span>8% krytycy</span>
        </div>
        </>
      )}
    </div>
    {/* Quotes */}
    <StaggerChildren staggerDelay={0.15}><div className="ta2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {quotes.slice(0, 3).map((it, i) => (
        <div key={i} className="tm-card card-hover">
          <Stars rating={num(it.rating) || 5} />
          <div className="tm-quote">&ldquo;{str(it.quote)}&rdquo;</div>
          <AuthorBlock item={it} />
        </div>
      ))}
    </div></StaggerChildren>
  </div></section>);
  }

  // Fallback: Basic 3-col grid
  return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="tm-wrap">
    <ScrollReveal delay={0}><Header /></ScrollReveal>
    <StaggerChildren staggerDelay={0.15}><div className="ta2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((it, i) => (
        <div key={i} className="tm-card card-hover">
          <Stars rating={num(it.rating) || 5} />
          <div className="tm-quote">&ldquo;{str(it.quote)}&rdquo;</div>
          <AuthorBlock item={it} />
        </div>
      ))}
    </div></StaggerChildren>
  </div></section>);
}
