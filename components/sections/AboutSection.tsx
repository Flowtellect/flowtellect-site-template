"use client";

// ─── AboutSection ────────────────────────────────────────────────────────────
// 6 individually crafted about variants matching HTML mockups.

/* eslint-disable @next/next/no-img-element */

import { str, arr, resolveImage, resolveIcon } from "./shared";
import { ScrollReveal, StaggerChildren, FadeScale } from './ClientComponents'

interface AboutProps {
  content: Record<string, unknown>;
  vn: number;
}

function Arrow() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
}

const S = `
  .ab-eyebrow{display:flex;align-items:center;gap:12px;margin-bottom:16px}
  .ab-eline{width:32px;height:1px;background:rgb(var(--color-accent))}
  .ab-eline-g{width:32px;height:1px;background:linear-gradient(90deg,transparent,rgb(var(--color-accent)/0.4))}
  .ab-eline-gr{width:32px;height:1px;background:linear-gradient(90deg,rgb(var(--color-accent)/0.4),transparent)}
  .ab-etxt{font-size:11px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:rgb(var(--color-accent))}
  .ab-h2{font-family:var(--font-display);font-weight:700;line-height:1.15;letter-spacing:-.02em;color:rgb(var(--color-text-primary));margin-bottom:16px}
  .ab-h2 em{font-style:italic;color:rgb(var(--color-accent))}
  .ab-h2-s{font-size:34px}@media(min-width:768px){.ab-h2-s{font-size:40px}}@media(min-width:1024px){.ab-h2-s{font-size:48px}}
  .ab-h2-m{font-size:36px}@media(min-width:768px){.ab-h2-m{font-size:44px}}@media(min-width:1024px){.ab-h2-m{font-size:52px}}
  .ab-body{font-size:16px;line-height:1.75;color:rgb(var(--color-text-muted));margin-bottom:32px;max-width:540px}
  @media(min-width:1024px){.ab-body{font-size:17px;max-width:560px}}
  .ab-btn{display:inline-flex;align-items:center;gap:8px;padding:14px 28px;background:rgb(var(--color-accent));color:rgb(var(--color-on-accent));font-family:var(--font-body);font-size:14px;font-weight:600;border-radius:12px;text-decoration:none;transition:all .3s;box-shadow:0 4px 16px rgb(var(--color-accent)/0.3)}
  .ab-btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgb(var(--color-accent)/0.4)}
  .ab-img{width:100%;object-fit:cover;display:block;border-radius:24px;box-shadow:0 20px 60px rgb(0 0 0/0.08),0 8px 20px rgb(0 0 0/0.04)}
  .ab-hl{display:flex;gap:14px;align-items:flex-start;padding:14px 16px;background:rgb(var(--color-surface));border:1px solid rgb(var(--color-border)/0.5);border-radius:16px;transition:all .2s}
  .ab-hl:hover{border-color:rgb(var(--color-accent)/0.3);box-shadow:0 4px 16px rgb(0 0 0/0.04)}
  .ab-hl-icon{width:40px;height:40px;border-radius:12px;background:rgb(var(--color-accent)/0.1);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
  .ab-hl-title{font-size:14px;font-weight:600;color:rgb(var(--color-text-primary));margin-bottom:2px}
  .ab-hl-desc{font-size:13px;color:rgb(var(--color-text-muted));line-height:1.5}
  .ab-stat-val{font-family:var(--font-display);font-size:28px;font-weight:700;color:rgb(var(--color-accent));line-height:1}
  .ab-stat-lbl{font-size:12px;color:rgb(var(--color-text-dim));margin-top:4px}
  .ab-wrap{max-width:1280px;margin:0 auto;padding:0 16px}
  @media(min-width:768px){.ab-wrap{padding:0 24px}}@media(min-width:1024px){.ab-wrap{padding:0 48px}}
  .ab-grid{display:grid;grid-template-columns:1fr;gap:40px;align-items:center}
  @media(min-width:768px){.ab-grid{grid-template-columns:1fr 1fr;gap:56px}}
  @media(min-width:1024px){.ab-grid{gap:72px}}
  @keyframes abUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  .aba1{opacity:0;animation:abUp .8s ease .1s forwards}
  .aba2{opacity:0;animation:abUp .8s ease .3s forwards}

  .ab-pillar{background:rgb(var(--color-surface));border:1px solid rgb(var(--color-border)/0.5);border-radius:20px;padding:24px 20px;text-align:center;transition:all .3s;position:relative;overflow:hidden}
  .ab-pillar:hover{border-color:rgb(var(--color-accent)/0.3);box-shadow:0 8px 28px rgb(0 0 0/0.05);transform:translateY(-3px)}
  .ab-pillar::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,rgb(var(--color-accent)/0.5),rgb(var(--color-accent-light)/0.2));opacity:0;transition:opacity .3s}
  .ab-pillar:hover::before{opacity:1}
  .ab-pillar-icon{width:48px;height:48px;border-radius:14px;background:rgb(var(--color-accent)/0.08);display:flex;align-items:center;justify-content:center;font-size:24px;margin:0 auto 14px}
  .ab-pillar-title{font-family:var(--font-display);font-size:16px;font-weight:600;color:rgb(var(--color-text-primary));margin-bottom:8px}
  .ab-pillar-desc{font-size:13px;line-height:1.6;color:rgb(var(--color-text-muted))}

  .ab-num-card{background:rgb(var(--color-surface));border:1px solid rgb(var(--color-border)/0.5);border-radius:20px;padding:28px 24px;text-align:center;transition:all .3s;position:relative;overflow:hidden}
  .ab-num-card:hover{border-color:rgb(var(--color-accent)/0.3);box-shadow:0 8px 28px rgb(0 0 0/0.05);transform:translateY(-3px)}
  .ab-num-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:rgb(var(--color-accent));opacity:0;transition:opacity .3s}
  .ab-num-card:hover::before{opacity:1}
  .ab-num-icon{width:44px;height:44px;border-radius:12px;background:rgb(var(--color-accent)/0.08);display:flex;align-items:center;justify-content:center;font-size:22px;margin:0 auto 14px}
  .ab-num-val{font-family:var(--font-display);font-size:36px;font-weight:700;color:rgb(var(--color-accent));line-height:1;margin-bottom:6px}
  @media(min-width:1024px){.ab-num-val{font-size:42px}}
  .ab-num-lbl{font-size:13px;color:rgb(var(--color-text-muted));line-height:1.4}

  .ab-tl-line{position:absolute;left:11px;top:8px;bottom:8px;width:2px;background:linear-gradient(to bottom,rgb(var(--color-accent)/0.3),rgb(var(--color-border)/0.3));border-radius:1px}
  @media(min-width:768px){.ab-tl-line{left:15px}}
  .ab-tl-dot{position:absolute;left:-32px;top:4px;width:24px;height:24px;border-radius:50%;background:rgb(var(--color-bg-alt));border:3px solid rgb(var(--color-accent)/0.4);display:flex;align-items:center;justify-content:center;z-index:2}
  @media(min-width:768px){.ab-tl-dot{left:-40px;width:32px;height:32px}}
  .ab-tl-dot-inner{width:8px;height:8px;border-radius:50%;background:rgb(var(--color-accent))}

  .ab-team-card{background:rgb(var(--color-surface));border:1px solid rgb(var(--color-border)/0.5);border-radius:24px;overflow:hidden;transition:all .3s}
  .ab-team-card:hover{border-color:rgb(var(--color-accent)/0.3);box-shadow:0 12px 40px rgb(0 0 0/0.06);transform:translateY(-4px)}
  .ab-team-img{width:100%;aspect-ratio:4/5;object-fit:cover;display:block;transition:transform .6s}
  .ab-team-card:hover .ab-team-img{transform:scale(1.05)}
`;

export default function AboutSection({ content, vn }: AboutProps) {
  const ey = str(content.eyebrow);
  const hl = str(content.headline);
  const body = str(content.body);
  const img = resolveImage(content.image) || resolveImage(content.hero_image);
  const highlights = arr(content.highlights);
  const pillars = arr(content.pillars);
  const stats = arr(content.stats);
  const members = arr(content.members || content.team);
  const items = arr(content.items || content.milestones || content.timeline);

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 1: Intro - obraz lewo, tekst prawo, highlights + stats
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 1) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="ab-wrap"><div className="ab-grid">
      <FadeScale delay={0.15}><div className="aba1" style={{ position: "relative" }}>
        {img ? <img src={img} alt="" className="ab-img" style={{ aspectRatio: "4/3" }} /> : <div style={{ aspectRatio: "4/3", borderRadius: 24, background: "linear-gradient(135deg, rgb(var(--color-accent)/0.1), rgb(var(--color-surface)))" }} />}
        <div className="hidden md:block" style={{ position: "absolute", width: "100%", height: "100%", border: "2px solid rgb(var(--color-accent)/0.15)", borderRadius: 24, top: 16, left: -16, zIndex: -1 }} />
      </div></FadeScale>
      <div className="aba2">
        {ey && <ScrollReveal delay={0}><div className="ab-eyebrow"><div className="ab-eline"/><span className="ab-etxt">{ey}</span></div></ScrollReveal>}
        <ScrollReveal delay={0.1}><h2 className="ab-h2 ab-h2-s">{hl}</h2></ScrollReveal>
        {body && <ScrollReveal delay={0.2}><p className="ab-body">{body}</p></ScrollReveal>}
        {highlights.length > 0 && <StaggerChildren staggerDelay={0.1} baseDelay={0.3}><div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>{highlights.map((h, i) => (
          <div key={i} className="ab-hl"><div className="ab-hl-icon">{resolveIcon(h.icon)}</div><div><div className="ab-hl-title">{str(h.label || h.title)}</div><div className="ab-hl-desc">{str(h.desc)}</div></div></div>
        ))}</div></StaggerChildren>}
        {stats.length > 0 && <StaggerChildren staggerDelay={0.1} baseDelay={0.3}><div style={{ display: "flex", gap: 32, paddingTop: 24, borderTop: "1px solid rgb(var(--color-border)/0.5)" }}>{stats.map((s, i) => (
          <div key={i}><div className="ab-stat-val">{str(s.value)}{str(s.suffix)}</div><div className="ab-stat-lbl">{str(s.label)}</div></div>
        ))}</div></StaggerChildren>}
      </div>
    </div></div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 2: Historia / Timeline
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 2) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="ab-wrap">
      <div className="aba1" style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
        {ey && <ScrollReveal delay={0}><div style={{ display: "inline-flex", alignItems: "center", gap: 16, marginBottom: 20 }}><div className="ab-eline-g"/><span className="ab-etxt">{ey}</span><div className="ab-eline-gr"/></div></ScrollReveal>}
        <ScrollReveal delay={0.1}><h2 className="ab-h2 ab-h2-m">{hl}</h2></ScrollReveal>
        {body && <ScrollReveal delay={0.2}><p style={{ fontSize: 16, lineHeight: 1.7, color: "rgb(var(--color-text-muted))" }}>{body}</p></ScrollReveal>}
      </div>
      <StaggerChildren staggerDelay={0.1} baseDelay={0.3}><div className="aba2" style={{ position: "relative", maxWidth: 720, margin: "0 auto", paddingLeft: 32 }}>
        <div className="ab-tl-line" />
        {items.map((it, i) => (
          <div key={i} style={{ position: "relative", paddingBottom: i < items.length - 1 ? 40 : 0 }}>
            <div className="ab-tl-dot" style={i === 0 ? { borderColor: "rgb(var(--color-accent))" } : undefined}><div className="ab-tl-dot-inner"/></div>
            <div style={{ fontSize: 14, fontFamily: "var(--font-display)", fontWeight: 600, color: "rgb(var(--color-accent))", marginBottom: 6 }}>{str(it.year || it.date)}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, color: "rgb(var(--color-text-primary))", marginBottom: 8 }}>{str(it.title || it.name || it.label)}</div>
            <div style={{ fontSize: 14, lineHeight: 1.7, color: "rgb(var(--color-text-muted))", maxWidth: 520 }}>{str(it.desc || it.description || it.body)}</div>
          </div>
        ))}
      </div></StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 3: Zespol
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 3) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="ab-wrap">
      <div className="aba1" style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 56px" }}>
        {ey && <ScrollReveal delay={0}><div style={{ display: "inline-flex", alignItems: "center", gap: 16, marginBottom: 20 }}><div className="ab-eline-g"/><span className="ab-etxt">{ey}</span><div className="ab-eline-gr"/></div></ScrollReveal>}
        <ScrollReveal delay={0.1}><h2 className="ab-h2 ab-h2-m">{hl}</h2></ScrollReveal>
        {body && <ScrollReveal delay={0.2}><p style={{ fontSize: 16, lineHeight: 1.7, color: "rgb(var(--color-text-muted))" }}>{body}</p></ScrollReveal>}
      </div>
      <StaggerChildren staggerDelay={0.1} baseDelay={0.3}><div className="aba2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {members.map((m, i) => {
          const mImg = resolveImage(m.image || m.photo);
          return (
            <div key={i} className="ab-team-card">
              <div style={{ overflow: "hidden" }}>
                {mImg ? <img src={mImg} alt="" className="ab-team-img" /> : <div style={{ width: "100%", aspectRatio: "4/5", background: "linear-gradient(135deg, rgb(var(--color-accent)/0.1), rgb(var(--color-surface)))" }} />}
              </div>
              <div style={{ padding: "20px 22px 24px" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{str(m.name)}</div>
                <div style={{ fontSize: 13, color: "rgb(var(--color-accent))", fontWeight: 500, marginBottom: 10 }}>{str(m.role || m.position)}</div>
                <div style={{ fontSize: 13, lineHeight: 1.6, color: "rgb(var(--color-text-muted))" }}>{str(m.bio || m.desc || m.description)}</div>
              </div>
            </div>
          );
        })}
      </div></StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 4: Misja / Wizja / Wartosci
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 4) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="ab-wrap"><div className="ab-grid">
      <div className="aba1">
        {ey && <ScrollReveal delay={0}><div className="ab-eyebrow"><div className="ab-eline"/><span className="ab-etxt">{ey}</span></div></ScrollReveal>}
        <ScrollReveal delay={0.1}><h2 className="ab-h2 ab-h2-s">{hl}</h2></ScrollReveal>
        {body && <ScrollReveal delay={0.2}><p className="ab-body">{body}</p></ScrollReveal>}
        {pillars.length > 0 && <StaggerChildren staggerDelay={0.1} baseDelay={0.3}><div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">{pillars.map((p, i) => (
          <div key={i} className="ab-pillar"><div className="ab-pillar-icon">{resolveIcon(p.icon)}</div><div className="ab-pillar-title">{str(p.title)}</div><div className="ab-pillar-desc">{str(p.body || p.desc)}</div></div>
        ))}</div></StaggerChildren>}
      </div>
      <FadeScale delay={0.15}><div className="aba2" style={{ position: "relative" }}>
        {img ? <img src={img} alt="" className="ab-img" style={{ aspectRatio: "3/4" }} /> : <div style={{ aspectRatio: "3/4", borderRadius: 24, background: "linear-gradient(135deg, rgb(var(--color-accent)/0.1), rgb(var(--color-surface)))" }} />}
      </div></FadeScale>
    </div></div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 5: Z wideo - stacked fullwidth + tekst + liczby
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 5) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="ab-wrap">
      <FadeScale delay={0.15}><div className="aba1" style={{ position: "relative", borderRadius: 24, overflow: "hidden", marginBottom: 48, boxShadow: "0 16px 48px rgb(0 0 0/0.08)" }}>
        {img ? <img src={img} alt="" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }} /> : <div style={{ width: "100%", aspectRatio: "16/9", background: "linear-gradient(135deg, rgb(var(--color-accent)/0.15), rgb(var(--color-surface)))" }} />}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgb(0 0 0/0.15)", cursor: "pointer" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgb(var(--color-surface)/0.95)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 32px rgb(0 0 0/0.15)" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="rgb(var(--color-accent))"><polygon points="5,3 19,12 5,21"/></svg>
          </div>
        </div>
      </div></FadeScale>
      <div className="aba2" style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        {ey && <ScrollReveal delay={0}><div style={{ display: "inline-flex", alignItems: "center", gap: 16, marginBottom: 20 }}><div className="ab-eline-g"/><span className="ab-etxt">{ey}</span><div className="ab-eline-gr"/></div></ScrollReveal>}
        <ScrollReveal delay={0.1}><h2 className="ab-h2 ab-h2-m">{hl}</h2></ScrollReveal>
        {body && <ScrollReveal delay={0.2}><p style={{ fontSize: 16, lineHeight: 1.75, color: "rgb(var(--color-text-muted))", maxWidth: 600, margin: "0 auto 36px" }}>{body}</p></ScrollReveal>}
        {stats.length > 0 && <StaggerChildren staggerDelay={0.1} baseDelay={0.3}><div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap", paddingTop: 28, borderTop: "1px solid rgb(var(--color-border)/0.5)" }}>{stats.map((s, i) => (
          <div key={i}><div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, color: "rgb(var(--color-accent))", lineHeight: 1 }}>{str(s.value)}{str(s.suffix)}</div><div style={{ fontSize: 13, color: "rgb(var(--color-text-dim))", marginTop: 6 }}>{str(s.label)}</div></div>
        ))}</div></StaggerChildren>}
      </div>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 6: Z liczbami - tekst lewo + 2x2 number cards prawo
  // ═══════════════════════════════════════════════════════════════════════════
  return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="ab-wrap"><div className="ab-grid">
    <div className="aba1">
      {ey && <ScrollReveal delay={0}><div className="ab-eyebrow"><div className="ab-eline"/><span className="ab-etxt">{ey}</span></div></ScrollReveal>}
      <ScrollReveal delay={0.1}><h2 className="ab-h2 ab-h2-s">{hl}</h2></ScrollReveal>
      {body && <ScrollReveal delay={0.2}><p className="ab-body">{body}</p></ScrollReveal>}
      <ScrollReveal delay={0.2}><a href="#" className="ab-btn">Poznaj nas <Arrow/></a></ScrollReveal>
    </div>
    <StaggerChildren staggerDelay={0.1} baseDelay={0.3}><div className="aba2 grid grid-cols-2 gap-4">
      {stats.map((s, i) => (
        <div key={i} className="ab-num-card">
          <div className="ab-num-icon">{resolveIcon(s.icon)}</div>
          <div className="ab-num-val">{str(s.value)}{str(s.suffix)}</div>
          <div className="ab-num-lbl">{str(s.label)}</div>
        </div>
      ))}
      {stats.length === 0 && highlights.map((h, i) => (
        <div key={i} className="ab-num-card">
          <div className="ab-num-icon">{resolveIcon(h.icon)}</div>
          <div className="ab-num-val">{str(h.value || h.label)}</div>
          <div className="ab-num-lbl">{str(h.desc)}</div>
        </div>
      ))}
    </div></StaggerChildren>
  </div></div></section>);
}
