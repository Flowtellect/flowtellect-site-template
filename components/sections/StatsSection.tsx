"use client";

// ─── StatsSection ────────────────────────────────────────────────────────────
// 12 individually crafted stats variants matching HTML mockups.
// CountUp animation on all number variants via IntersectionObserver.

/* eslint-disable @next/next/no-img-element */

import { useState, useEffect, useRef } from "react";
import { str, num, arr, resolveImage, resolveIcon } from "./shared";
import { ScrollReveal, StaggerChildren } from './ClientComponents'

interface StatsProps {
  content: Record<string, unknown>;
  vn: number;
}

// ── CountUp hook ─────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 2000) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = Date.now();
        const tick = () => {
          const p = Math.min((Date.now() - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(eased * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return { val, ref };
}

// ── Parse number from value ──────────────────────────────────────────────────

function parseStatValue(v: unknown): { n: number; suffix: string; raw: string } {
  const raw = typeof v === "number" ? String(v) : str(v);
  const n = parseInt(raw.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = raw.replace(/[0-9.,\s]/g, "");
  return { n, suffix, raw };
}

// ── Stat item with CountUp ───────────────────────────────────────────────────

function CountStat({ value, suffix: extraSuffix, label, className, numClass, labelClass }: {
  value: unknown; suffix?: string; label: string;
  className?: string; numClass?: string; labelClass?: string;
}) {
  const { n, suffix } = parseStatValue(value);
  const suf = str(extraSuffix) || suffix;
  const { val, ref } = useCountUp(n);

  return (
    <div ref={ref} className={className}>
      <div className={numClass}>{n > 0 ? val : str(value)}{suf}</div>
      <div className={labelClass}>{label}</div>
    </div>
  );
}

// ── Styles ───────────────────────────────────────────────────────────────────

const S = `
  .st-wrap{max-width:1280px;margin:0 auto;padding:0 16px}
  @media(min-width:768px){.st-wrap{padding:0 24px}}@media(min-width:1024px){.st-wrap{padding:0 48px}}
  .st-header{text-align:center;margin-bottom:40px}
  .st-h2{font-family:var(--font-display);font-size:28px;font-weight:700;color:rgb(var(--color-text-primary));margin-bottom:8px}
  @media(min-width:768px){.st-h2{font-size:36px}}
  .st-h2-w{color:rgb(var(--color-on-accent))}
  .st-desc{font-size:15px;color:rgb(var(--color-text-muted));line-height:1.6}
  .st-desc-w{color:rgb(var(--color-on-accent) /0.7)}

  @keyframes stUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  .sta1{opacity:0;animation:stUp .8s ease .1s forwards}
  .sta2{opacity:0;animation:stUp .8s ease .3s forwards}

  .st-card{background:rgb(var(--color-surface));border:1px solid rgb(var(--color-border)/0.5);border-radius:20px;padding:28px 24px;text-align:center;transition:all .3s;position:relative;overflow:hidden}
  .st-card:hover{border-color:rgb(var(--color-accent)/0.3);box-shadow:0 8px 28px rgb(0 0 0/0.05);transform:translateY(-3px)}
  .st-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:rgb(var(--color-accent));opacity:0;transition:opacity .3s}
  .st-card:hover::before{opacity:1}
  .st-card-icon{width:44px;height:44px;border-radius:12px;background:rgb(var(--color-accent)/0.08);display:flex;align-items:center;justify-content:center;font-size:22px;margin:0 auto 14px}
  .st-card-num{font-family:var(--font-display);font-size:36px;font-weight:700;color:rgb(var(--color-accent));line-height:1;margin-bottom:6px}
  .st-card-lbl{font-size:13px;color:rgb(var(--color-text-muted))}

  .st-bar-num{font-family:var(--font-display);font-size:40px;font-weight:700;line-height:1}
  @media(min-width:768px){.st-bar-num{font-size:52px}}
  .st-bar-lbl{font-size:14px;margin-top:6px;opacity:.8}

  .st-big-num{font-family:var(--font-display);font-size:80px;font-weight:700;color:rgb(var(--color-accent));line-height:1}
  @media(min-width:768px){.st-big-num{font-size:100px}}
  @media(min-width:1024px){.st-big-num{font-size:120px}}
  .st-big-lbl{font-size:16px;color:rgb(var(--color-text-muted));margin-top:8px}
  @media(min-width:768px){.st-big-lbl{font-size:18px}}

  @keyframes stMarquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
  @keyframes stProgress{from{width:0}to{width:var(--target-width)}}
  @keyframes stRing{from{stroke-dashoffset:var(--ring-circumference)}to{stroke-dashoffset:var(--ring-offset)}}

  .st-flip-digit{display:inline-flex;align-items:center;justify-content:center;width:36px;height:48px;background:rgb(var(--color-text-primary));color:rgb(var(--color-bg));font-family:var(--font-display);font-size:28px;font-weight:700;border-radius:6px;position:relative;margin:0 2px}
  @media(min-width:768px){.st-flip-digit{width:44px;height:56px;font-size:34px;border-radius:8px}}
  .st-flip-digit::after{content:'';position:absolute;left:2px;right:2px;top:50%;height:1px;background:rgb(0 0 0/0.3)}
  .st-flip-suf{font-family:var(--font-display);font-size:20px;font-weight:600;color:rgb(var(--color-text-primary));margin-left:6px}

  .st-glass{background:rgb(var(--color-on-accent) /0.08);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgb(var(--color-on-accent) /0.1);border-radius:16px;padding:24px 20px;text-align:center}

  .st-icon-circle{width:72px;height:72px;border-radius:50%;background:rgb(var(--color-accent)/0.08);display:flex;align-items:center;justify-content:center;font-size:32px;margin:0 auto 12px}
  @keyframes stBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @keyframes stPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.15);opacity:.8}}
  @keyframes stWiggle{0%,100%{transform:rotate(0)}25%{transform:rotate(-8deg)}75%{transform:rotate(8deg)}}
  @keyframes stSpin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
`;

export default function StatsSection({ content, vn }: StatsProps) {
  const hl = str(content.headline || content.eyebrow || content.heading);
  const body = str(content.body);
  const items = arr(content.items);

  // Countdown state for vn 10
  const [cd, setCd] = useState({ d: 30, h: 12, m: 45, s: 30 });
  useEffect(() => {
    if (vn !== 10) return;
    const target = Date.now() + 30 * 86400000;
    const tick = () => {
      const d = Math.max(0, target - Date.now());
      setCd({ d: Math.floor(d / 86400000), h: Math.floor((d % 86400000) / 3600000), m: Math.floor((d % 3600000) / 60000), s: Math.floor((d % 60000) / 1000) });
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, [vn]);

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 1: Pasek na accent tle
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 1) {
    return (<section className="bg-accent text-on-accent" style={{ padding: "48px 0" }}><style>{S}</style><div className="st-wrap sta1">
      {hl && <ScrollReveal delay={0}><div className="st-header"><h2 className="st-h2 st-h2-w">{hl}</h2></div></ScrollReveal>}
      <StaggerChildren staggerDelay={0.1}>
      <div className="flex flex-wrap justify-around gap-8 text-center">
        {items.map((it, i) => <CountStat key={i} value={it.value} suffix={str(it.suffix)} label={str(it.label)} numClass="st-bar-num" labelClass="st-bar-lbl" />)}
      </div>
      </StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 2: Karty z ikonami
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 2) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="st-wrap">
      {hl && <ScrollReveal delay={0}><div className="st-header sta1"><h2 className="st-h2">{hl}</h2>{body && <p className="st-desc">{body}</p>}</div></ScrollReveal>}
      <StaggerChildren staggerDelay={0.1}>
      <div className="sta2 grid grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((it, i) => (
          <div key={i} className="st-card">
            <div className="st-card-icon">{resolveIcon(it.icon)}</div>
            <CountStat value={it.value} suffix={str(it.suffix)} label={str(it.label)} numClass="st-card-num" labelClass="st-card-lbl" />
          </div>
        ))}
      </div>
      </StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 3: Odometer (cyfry w boxach)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 3) {
    return (<section className="bg-accent text-on-accent" style={{ padding: "48px 0" }}><style>{S}</style><div className="st-wrap sta1">
      {hl && <ScrollReveal delay={0}><div className="st-header"><h2 className="st-h2 st-h2-w">{hl}</h2></div></ScrollReveal>}
      <StaggerChildren staggerDelay={0.1}>
      <div className="flex flex-wrap justify-around gap-8 text-center">
        {items.map((it, i) => {
          const { raw } = parseStatValue(it.value);
          const digits = raw.replace(/[^0-9]/g, "").split("");
          const suffix = raw.replace(/[0-9]/g, "");
          return (
            <div key={i}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
                {digits.map((d, j) => (
                  <div key={j} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 48, background: "rgb(var(--color-on-accent) /0.12)", backdropFilter: "blur(8px)", borderRadius: 8, margin: "0 2px", fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700 }}>{d}</div>
                ))}
                {suffix && <span style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, marginLeft: 6, opacity: 0.9 }}>{suffix}</span>}
              </div>
              <div style={{ fontSize: 14, opacity: 0.8 }}>{str(it.label)}</div>
            </div>
          );
        })}
      </div>
      </StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 4: Progress bary
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 4) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="st-wrap">
      {hl && <ScrollReveal delay={0}><div className="st-header sta1"><h2 className="st-h2">{hl}</h2></div></ScrollReveal>}
      <StaggerChildren staggerDelay={0.1}>
      <div className="sta2" style={{ maxWidth: 600, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
        {items.map((it, i) => {
          const { n } = parseStatValue(it.value);
          const pct = Math.min(n, 100);
          return (
            <div key={i} style={{ background: "rgb(var(--color-surface))", border: "1px solid rgb(var(--color-border)/0.5)", borderRadius: 16, padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "rgb(var(--color-text-primary))" }}>{str(it.label || it.name || it.title)}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "rgb(var(--color-accent))" }}>{str(it.value)}{str(it.suffix)}</span>
              </div>
              <div style={{ height: 8, borderRadius: 100, background: "rgb(var(--color-surface-deep))", overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 100, background: "linear-gradient(90deg, rgb(var(--color-accent)), rgb(var(--color-accent-light)))", width: `${pct}%`, animation: "stProgress 1.5s ease forwards", ["--target-width" as string]: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
      </StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 5: Pierscienie (SVG ring charts)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 5) {
    const R = 45;
    const C = 2 * Math.PI * R;
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="st-wrap">
      {hl && <ScrollReveal delay={0}><div className="st-header sta1"><h2 className="st-h2">{hl}</h2></div></ScrollReveal>}
      <StaggerChildren staggerDelay={0.1}>
      <div className="sta2 grid grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((it, i) => {
          const { n, suffix } = parseStatValue(it.value);
          const pct = Math.min(n, 100);
          const offset = C - (pct / 100) * C;
          return (
            <div key={i} className="st-card" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ position: "relative", width: 100, height: 100, marginBottom: 12 }}>
                <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="50" cy="50" r={R} fill="none" stroke="rgb(var(--color-surface-deep))" strokeWidth="6" />
                  <circle cx="50" cy="50" r={R} fill="none" stroke="rgb(var(--color-accent))" strokeWidth="6" strokeLinecap="round"
                    strokeDasharray={C} strokeDashoffset={C}
                    style={{ animation: `stRing 1.5s ease .5s forwards`, ["--ring-circumference" as string]: C, ["--ring-offset" as string]: offset }} />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "rgb(var(--color-accent))" }}>{n > 0 ? n : str(it.value)}{suffix}</div>
              </div>
              <div className="st-card-lbl">{str(it.label)}</div>
            </div>
          );
        })}
      </div>
      </StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 6: Wielkie cyfry
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 6) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="st-wrap sta1">
      {hl && <ScrollReveal delay={0}><div className="st-header"><h2 className="st-h2">{hl}</h2></div></ScrollReveal>}
      <StaggerChildren staggerDelay={0.1}>
      <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: 32 }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: i < items.length - 1 ? 32 : 0, borderBottom: i < items.length - 1 ? "1px solid rgb(var(--color-border)/0.3)" : "none" }} className="md:flex-row md:gap-8 md:items-baseline">
            <CountStat value={it.value} suffix={str(it.suffix)} label={str(it.label)} numClass="st-big-num" labelClass="st-big-lbl" className="text-center md:text-left" />
          </div>
        ))}
      </div>
      </StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 7: Ticker marquee
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 7) {
    return (<section className="bg-accent text-on-accent" style={{ padding: "24px 0", overflow: "hidden" }}><style>{S}</style>
      <ScrollReveal delay={0}>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 60, background: "linear-gradient(to right, rgb(var(--color-accent)), transparent)", zIndex: 2 }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 60, background: "linear-gradient(to left, rgb(var(--color-accent)), transparent)", zIndex: 2 }} />
        <div style={{ display: "flex", gap: 32, animation: "stMarquee 20s linear infinite", width: "max-content" }}>
          {[...items, ...items].map((it, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, whiteSpace: "nowrap", flexShrink: 0 }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700 }}>{str(it.value)}{str(it.suffix)}</span>
              <span style={{ fontSize: 14, opacity: 0.8 }}>{str(it.label)}</span>
              <span style={{ opacity: 0.3, fontSize: 20 }}>-</span>
            </div>
          ))}
        </div>
      </div>
      </ScrollReveal>
    </section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 8: Na tle zdjecia z glassmorphism
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 8) {
    const bgImg = resolveImage(content.image || content.bg_image);
    return (<section style={{ position: "relative", padding: "80px 0", overflow: "hidden" }}><style>{S}</style>
      <div style={{ position: "absolute", inset: 0 }}>{bgImg && <img src={bgImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}</div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.65), rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.7))" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3))" }} />
      <div className="st-wrap sta1" style={{ position: "relative", zIndex: 10 }}>
        {hl && <ScrollReveal delay={0}><div className="st-header"><h2 className="st-h2 st-h2-w">{hl}</h2></div></ScrollReveal>}
        <StaggerChildren staggerDelay={0.1}>
        <div className="flex flex-wrap justify-center gap-6">
          {items.map((it, i) => (
            <div key={i} className="st-glass">
              <CountStat value={it.value} suffix={str(it.suffix)} label={str(it.label)} numClass="st-bar-num" labelClass="st-bar-lbl" />
            </div>
          ))}
        </div>
        </StaggerChildren>
      </div>
    </section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 9: Flip board (retro split-flap)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 9) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="st-wrap">
      {hl && <ScrollReveal delay={0}><div className="st-header sta1"><h2 className="st-h2">{hl}</h2></div></ScrollReveal>}
      <StaggerChildren staggerDelay={0.1}>
      <div className="sta2 flex flex-wrap justify-center gap-10">
        {items.map((it, i) => {
          const { raw } = parseStatValue(it.value);
          const digits = raw.replace(/[^0-9]/g, "").split("");
          const suffix = raw.replace(/[0-9]/g, "");
          return (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                {digits.map((d, j) => <div key={j} className="st-flip-digit">{d}</div>)}
                {suffix && <span className="st-flip-suf">{suffix}</span>}
              </div>
              <div style={{ fontSize: 13, color: "rgb(var(--color-text-muted))" }}>{str(it.label)}</div>
            </div>
          );
        })}
      </div>
      </StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 10: Countdown (live ticking)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 10) {
    const boxes = [
      { val: cd.d, label: "Dni" }, { val: cd.h, label: "Godzin" },
      { val: cd.m, label: "Minut" }, { val: cd.s, label: "Sekund" },
    ];
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="st-wrap sta1">
      {hl && <ScrollReveal delay={0}><div className="st-header"><h2 className="st-h2">{hl}</h2>{body && <p className="st-desc">{body}</p>}</div></ScrollReveal>}
      <StaggerChildren staggerDelay={0.1}>
      <div className="flex justify-center gap-3 md:gap-5">
        {boxes.map((b, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ width: 64, height: 72, background: "rgb(var(--color-accent)/0.08)", backdropFilter: "blur(12px)", border: "1px solid rgb(var(--color-accent)/0.15)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "rgb(var(--color-text-primary))" }} className="md:!w-20 md:!h-22 md:!text-4xl md:!rounded-xl">
              {String(b.val).padStart(2, "0")}
            </div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgb(var(--color-text-dim))", marginTop: 8 }}>{b.label}</div>
          </div>
        ))}
      </div>
      </StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 11: Animowane ikony
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 11) {
    const anims = ["stBounce 1.5s ease infinite", "stPulse 2s ease infinite", "stWiggle 1.5s ease infinite", "stSpin 4s linear infinite"];
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="st-wrap">
      {hl && <ScrollReveal delay={0}><div className="st-header sta1"><h2 className="st-h2">{hl}</h2></div></ScrollReveal>}
      <StaggerChildren staggerDelay={0.1}>
      <div className="sta2 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div className="st-icon-circle" style={{ animation: anims[i % anims.length] }}>{resolveIcon(it.icon)}</div>
            <CountStat value={it.value} suffix={str(it.suffix)} label={str(it.label)} numClass="st-card-num" labelClass="st-card-lbl" />
          </div>
        ))}
      </div>
      </StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 12: Gradient strip z dekoracyjnymi kolkami
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 12) {
  const gradientFrom = str(content.gradient_from) || "rgb(var(--color-accent))";
  const gradientTo = str(content.gradient_to) || "rgb(var(--color-accent-dark))";
  return (<section style={{ position: "relative", padding: "64px 0", background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo}, ${gradientFrom})`, color: "rgb(var(--color-on-accent))", overflow: "hidden" }}><style>{S}</style>
    {/* Decorative circles */}
    <div style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", background: "rgb(var(--color-on-accent) /0.05)", top: -60, right: -40 }} />
    <div style={{ position: "absolute", width: 140, height: 140, borderRadius: "50%", background: "rgb(var(--color-on-accent) /0.04)", bottom: -40, left: "20%" }} />
    <div style={{ position: "absolute", width: 80, height: 80, borderRadius: "50%", background: "rgb(var(--color-on-accent) /0.03)", top: "40%", left: "60%" }} />
    <div className="st-wrap sta1" style={{ position: "relative", zIndex: 10 }}>
      {hl && <ScrollReveal delay={0}><div className="st-header"><h2 className="st-h2 st-h2-w">{hl}</h2></div></ScrollReveal>}
      <StaggerChildren staggerDelay={0.1}>
      <div className="flex flex-wrap justify-around gap-8 text-center">
        {items.map((it, i) => <CountStat key={i} value={it.value} suffix={str(it.suffix)} label={str(it.label)} numClass="st-bar-num" labelClass="st-bar-lbl" />)}
      </div>
      </StaggerChildren>
    </div>
  </section>);
  }

  // Fallback: Accent bar
  return (<section className="bg-accent text-on-accent" style={{ padding: "48px 0" }}><style>{S}</style><div className="st-wrap sta1">
    {hl && <ScrollReveal delay={0}><div className="st-header"><h2 className="st-h2 st-h2-w">{hl}</h2></div></ScrollReveal>}
    <StaggerChildren staggerDelay={0.1}>
    <div className="flex flex-wrap justify-around gap-8 text-center">
      {items.map((it, i) => <CountStat key={i} value={it.value} suffix={str(it.suffix)} label={str(it.label)} numClass="st-bar-num" labelClass="st-bar-lbl" />)}
    </div>
    </StaggerChildren>
  </div></section>);
}
