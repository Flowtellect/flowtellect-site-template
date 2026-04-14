"use client";

// ─── ProductsSection ─────────────────────────────────────────────────────────
// 20 individually crafted product/service variants matching HTML mockups.
// Also used for services and blog categories.

/* eslint-disable @next/next/no-img-element */

import { str, arr, resolveImage, resolveIcon } from "./shared";
import { ScrollReveal, StaggerChildren } from "./ClientComponents";

interface ProductsProps {
  content: Record<string, unknown>;
  vn: number;
}

function Arrow() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
}

const S = `
  .pr-wrap{max-width:1280px;margin:0 auto;padding:0 16px}
  @media(min-width:768px){.pr-wrap{padding:0 24px}}@media(min-width:1024px){.pr-wrap{padding:0 48px}}
  .pr-header{text-align:center;max-width:640px;margin:0 auto 48px}
  .pr-eyebrow{display:inline-flex;align-items:center;gap:16px;margin-bottom:20px}
  .pr-eline{width:32px;height:1px;background:linear-gradient(90deg,transparent,rgb(var(--color-accent)/0.4))}
  .pr-eline-r{width:32px;height:1px;background:linear-gradient(90deg,rgb(var(--color-accent)/0.4),transparent)}
  .pr-etxt{font-size:11px;font-weight:600;letter-spacing:.25em;text-transform:uppercase;color:rgb(var(--color-accent))}
  .pr-h2{font-family:var(--font-display);font-size:32px;font-weight:700;line-height:1.15;letter-spacing:-.02em;color:rgb(var(--color-text-primary));margin-bottom:14px}
  @media(min-width:768px){.pr-h2{font-size:40px}}@media(min-width:1024px){.pr-h2{font-size:48px}}
  .pr-h2 em{font-style:italic;color:rgb(var(--color-accent))}
  .pr-desc{font-size:16px;line-height:1.7;color:rgb(var(--color-text-muted))}

  .pr-card{background:rgb(var(--color-surface));border:1px solid rgb(var(--color-border)/0.5);border-radius:20px;overflow:hidden;transition:all .3s;display:flex;flex-direction:column}
  .pr-card:hover{border-color:rgb(var(--color-accent)/0.3);box-shadow:0 12px 40px rgb(0 0 0/0.06);transform:translateY(-4px)}
  .pr-card-img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block;transition:transform .6s}
  .pr-card:hover .pr-card-img{transform:scale(1.05)}
  .pr-card-body{padding:20px 22px 24px;flex:1;display:flex;flex-direction:column}
  .pr-card-title{font-family:var(--font-display);font-size:16px;font-weight:600;color:rgb(var(--color-text-primary));margin-bottom:6px}
  .pr-card-desc{font-size:13px;line-height:1.6;color:rgb(var(--color-text-muted));flex:1;margin-bottom:10px}
  .pr-card-price{font-family:var(--font-display);font-size:15px;font-weight:700;color:rgb(var(--color-accent))}
  .pr-card-link{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:rgb(var(--color-accent));text-decoration:none;margin-top:10px;transition:gap .2s}
  .pr-card-link:hover{gap:10px}

  .pr-badge{position:absolute;top:12px;left:12px;padding:4px 12px;border-radius:8px;font-size:11px;font-weight:600;text-transform:uppercase;color:white;z-index:2}
  .pr-badge-accent{background:rgb(var(--color-accent))}
  .pr-badge-green{background:rgb(34 197 94)}
  .pr-badge-red{background:rgb(239 68 68)}
  .pr-badge-purple{background:rgb(139 92 246)}

  .pr-btn{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;background:rgb(var(--color-accent));color:rgb(var(--color-on-accent));font-family:var(--font-body);font-size:14px;font-weight:600;border-radius:12px;text-decoration:none;transition:all .3s;box-shadow:0 4px 16px rgb(var(--color-accent)/0.3);border:none;cursor:pointer;width:100%;justify-content:center}
  .pr-btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgb(var(--color-accent)/0.4)}
  .pr-btn-sm{padding:10px 20px;width:auto}

  .pr-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 60%);opacity:0;transition:opacity .3s;display:flex;align-items:flex-end;padding:20px}
  .pr-card:hover .pr-overlay{opacity:1}

  .pr-filter{display:inline-flex;align-items:center;padding:8px 20px;border-radius:100px;font-size:13px;font-weight:500;color:rgb(var(--color-text-muted));background:rgb(var(--color-surface));border:1px solid rgb(var(--color-border)/0.5);cursor:pointer;transition:all .2s;text-decoration:none}
  .pr-filter:hover{border-color:rgb(var(--color-accent)/0.3);color:rgb(var(--color-text-primary))}
  .pr-filter-active{background:rgb(var(--color-accent));color:rgb(var(--color-on-accent));border-color:rgb(var(--color-accent))}

  @keyframes prUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  .pa1{opacity:0;animation:prUp .8s ease .1s forwards}
  .pa2{opacity:0;animation:prUp .8s ease .3s forwards}
`;

export default function ProductsSection({ content, vn }: ProductsProps) {
  const ey = str(content.eyebrow);
  const hl = str(content.headline || content.heading);
  const body = str(content.body);
  const items = arr(content.items || content.categories || content.tabs || content.products || content.services);
  const ctaObj = content.cta as Record<string, unknown> | null;

  const Header = () => (
    <div className="pr-header pa1">
      {ey && <ScrollReveal delay={0}><div className="pr-eyebrow"><div className="pr-eline"/><span className="pr-etxt">{ey}</span><div className="pr-eline-r"/></div></ScrollReveal>}
      <ScrollReveal delay={0.1}><h2 className="pr-h2">{hl}</h2></ScrollReveal>
      {body && <ScrollReveal delay={0.2}><p className="pr-desc">{body}</p></ScrollReveal>}
    </div>
  );

  const ImgOrGrad = ({ item, aspect = "4/3", cls = "" }: { item: Record<string, unknown>; aspect?: string; cls?: string }) => {
    const src = resolveImage(item.image || item.src);
    return src
      ? <img src={src} alt={str(item.name || item.title)} style={{ width: "100%", aspectRatio: aspect, objectFit: "cover", display: "block", transition: "transform .6s" }} className={cls} />
      : <div style={{ width: "100%", aspectRatio: aspect, background: "linear-gradient(135deg, rgb(var(--color-accent)/0.1), rgb(var(--color-surface)))" }} />;
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 1: Lista - 3-col grid, basic cards
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 1) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="pr-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.12}><div className="pa2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <div key={i} className="pr-card card-hover">
            <div style={{ overflow: "hidden" }}><ImgOrGrad item={it} /></div>
            <div className="pr-card-body">
              {str(it.icon) && <div style={{ fontSize: 20, marginBottom: 6 }}>{resolveIcon(it.icon)}</div>}
              <div className="pr-card-title">{str(it.name || it.title || it.label)}</div>
              <div className="pr-card-desc">{str(it.desc || it.description)}</div>
              {str(it.price) && <div className="pr-card-price">{str(it.price)}</div>}
            </div>
          </div>
        ))}
      </div></StaggerChildren>
      {ctaObj && <div className="pa2" style={{ textAlign: "center", marginTop: 40 }}><a href={str(ctaObj.href) || "#"} className="pr-btn pr-btn-sm">{str(ctaObj.label)} <Arrow /></a></div>}
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 2: Karty z badgeami
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 2) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="pr-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.12}><div className="pa2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => {
          const badge = str(it.badge || it.tag);
          return (
            <div key={i} className="pr-card card-hover">
              <div style={{ overflow: "hidden", position: "relative" }}>
                <ImgOrGrad item={it} />
                {badge && <div className="pr-badge pr-badge-accent">{badge}</div>}
              </div>
              <div className="pr-card-body">
                <div className="pr-card-title">{str(it.name || it.title || it.label)}</div>
                <div className="pr-card-desc">{str(it.desc || it.description)}</div>
                {str(it.price) && <div className="pr-card-price">{str(it.price)}</div>}
              </div>
            </div>
          );
        })}
      </div></StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 3: Karty z cenami + przycisk kup
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 3) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="pr-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.12}><div className="pa2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <div key={i} className="pr-card card-hover">
            <div style={{ overflow: "hidden" }}><ImgOrGrad item={it} /></div>
            <div className="pr-card-body">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                <div className="pr-card-title" style={{ marginBottom: 0 }}>{str(it.name || it.title)}</div>
                {str(it.price) && <div className="pr-card-price">{str(it.price)}</div>}
              </div>
              <div className="pr-card-desc">{str(it.desc || it.description)}</div>
              <button className="pr-btn" style={{ marginTop: "auto" }}>{str(it.cta_label) || "Dodaj do koszyka"}</button>
            </div>
          </div>
        ))}
      </div></StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 4: Lookbook - duze zdjecia z overlay na hover
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 4) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="pr-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.12}><div className="pa2 grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map((it, i) => (
          <div key={i} className="pr-card card-hover" style={{ position: "relative", borderRadius: 20, overflow: "hidden" }}>
            <ImgOrGrad item={it} aspect="3/4" />
            <div className="pr-overlay">
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: "white", marginBottom: 4 }}>{str(it.name || it.title)}</div>
                {str(it.price) && <div style={{ fontSize: 16, color: "rgb(var(--color-accent-light))", fontWeight: 600 }}>{str(it.price)}</div>}
              </div>
            </div>
          </div>
        ))}
      </div></StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 5: Karuzela - horizontal scroll
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 5) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}{`
      .pr-scroll{display:flex;gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding:0 16px 16px}
      .pr-scroll::-webkit-scrollbar{display:none}
      .pr-scroll-card{min-width:280px;scroll-snap-align:start;flex-shrink:0}
      @media(min-width:768px){.pr-scroll{padding:0 24px 16px}.pr-scroll-card{min-width:300px}}
    `}</style><div className="pr-wrap">
      <Header />
      <ScrollReveal delay={0.2}><div className="pr-scroll pa2">
        {items.map((it, i) => (
          <div key={i} className="pr-card pr-scroll-card card-hover">
            <div style={{ overflow: "hidden" }}><ImgOrGrad item={it} /></div>
            <div className="pr-card-body">
              <div className="pr-card-title">{str(it.name || it.title)}</div>
              <div className="pr-card-desc">{str(it.desc || it.description)}</div>
              {str(it.price) && <div className="pr-card-price">{str(it.price)}</div>}
            </div>
          </div>
        ))}
      </div></ScrollReveal>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 6: Flagship - jeden duzy produkt
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 6) {
    const it = items[0] || {};
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="pr-wrap">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <ScrollReveal delay={0}><div className="pa1" style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 24px 64px rgb(0 0 0/0.1)" }}>
          <ImgOrGrad item={it} aspect="1/1" />
        </div></ScrollReveal>
        <div className="pa2">
          {ey && <ScrollReveal delay={0}><div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgb(var(--color-accent))", marginBottom: 12 }}>{ey}</div></ScrollReveal>}
          <ScrollReveal delay={0.1}><h2 style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 700, color: "rgb(var(--color-text-primary))", marginBottom: 12, lineHeight: 1.15 }}>{str(it.name || it.title || hl)}</h2></ScrollReveal>
          <ScrollReveal delay={0.2}><p style={{ fontSize: 15, lineHeight: 1.7, color: "rgb(var(--color-text-muted))", marginBottom: 20 }}>{str(it.desc || it.description || body)}</p></ScrollReveal>
          {str(it.price) && <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "rgb(var(--color-accent))", marginBottom: 24 }}>{str(it.price)}</div>}
          <a href={str(it.href || it.cta_href) || "#"} className="pr-btn pr-btn-sm">{str(it.cta_label) || "Zamow teraz"} <Arrow /></a>
        </div>
      </div>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 7: Katalog z filtrami
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 7) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="pr-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.12}><div className="pa2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <div key={i} className="pr-card card-hover">
            <div style={{ overflow: "hidden" }}><ImgOrGrad item={it} /></div>
            <div className="pr-card-body">
              {str(it.category) && <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgb(var(--color-accent))", marginBottom: 6 }}>{str(it.category)}</div>}
              <div className="pr-card-title">{str(it.name || it.title)}</div>
              <div className="pr-card-desc">{str(it.desc || it.description)}</div>
              {str(it.price) && <div className="pr-card-price">{str(it.price)}</div>}
            </div>
          </div>
        ))}
      </div></StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 8: Porownanie - tabela
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 8) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="pr-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.12}><div className="pa2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <div key={i} className="pr-card card-hover" style={{ textAlign: "center", padding: 24 }}>
            <div style={{ width: 80, height: 80, borderRadius: 16, overflow: "hidden", margin: "0 auto 16px" }}>
              <ImgOrGrad item={it} aspect="1/1" />
            </div>
            <div className="pr-card-title" style={{ fontSize: 18 }}>{str(it.name || it.title)}</div>
            <div className="pr-card-desc">{str(it.desc || it.description)}</div>
            {str(it.price) && <div className="pr-card-price" style={{ fontSize: 24, marginTop: 12 }}>{str(it.price)}</div>}
          </div>
        ))}
      </div></StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 9: Hover overlay - zdjecia z overlay na hover
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 9) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="pr-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.12}><div className="pa2 grid grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it, i) => (
          <div key={i} className="pr-card card-hover" style={{ position: "relative", borderRadius: 16, overflow: "hidden" }}>
            <ImgOrGrad item={it} aspect="1/1" />
            <div className="pr-overlay" style={{ borderRadius: 0 }}>
              <div style={{ width: "100%" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, color: "white" }}>{str(it.name || it.title)}</div>
                {str(it.price) && <div style={{ fontSize: 14, color: "rgb(var(--color-accent-light))", fontWeight: 600, marginTop: 4 }}>{str(it.price)}</div>}
              </div>
            </div>
          </div>
        ))}
      </div></StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 10: Zakladki
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 10) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="pr-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.12}><div className="pa2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <div key={i} className="pr-card card-hover">
            <div style={{ overflow: "hidden" }}><ImgOrGrad item={it} /></div>
            <div className="pr-card-body">
              <div className="pr-card-title">{str(it.name || it.title)}</div>
              <div className="pr-card-desc">{str(it.desc || it.description)}</div>
              {str(it.price) && <div className="pr-card-price">{str(it.price)}</div>}
              <a href={str(it.href) || "#"} className="pr-card-link">{str(it.cta_label) || "Zobacz"} <Arrow /></a>
            </div>
          </div>
        ))}
      </div></StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 11: Masonry
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 11) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}{`
      .pr-masonry{column-count:1;column-gap:16px}
      @media(min-width:640px){.pr-masonry{column-count:2}}
      @media(min-width:1024px){.pr-masonry{column-count:3}}
      .pr-masonry-item{break-inside:avoid;margin-bottom:16px}
    `}</style><div className="pr-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.12}><div className="pr-masonry pa2">
        {items.map((it, i) => {
          const tall = i % 3 === 0;
          return (
            <div key={i} className="pr-masonry-item">
              <div className="pr-card card-hover">
                <div style={{ overflow: "hidden" }}><ImgOrGrad item={it} aspect={tall ? "3/4" : "4/3"} /></div>
                <div className="pr-card-body">
                  <div className="pr-card-title">{str(it.name || it.title)}</div>
                  {str(it.price) && <div className="pr-card-price">{str(it.price)}</div>}
                </div>
              </div>
            </div>
          );
        })}
      </div></StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 12: Z recenzjami
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 12) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="pr-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.12}><div className="pa2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <div key={i} className="pr-card card-hover">
            <div style={{ overflow: "hidden" }}><ImgOrGrad item={it} /></div>
            <div className="pr-card-body">
              <div className="pr-card-title">{str(it.name || it.title)}</div>
              {str(it.price) && <div className="pr-card-price" style={{ marginBottom: 12 }}>{str(it.price)}</div>}
              {str(it.review || it.quote) && (
                <div style={{ paddingTop: 12, borderTop: "1px solid rgb(var(--color-border)/0.3)" }}>
                  <div style={{ color: "rgb(var(--color-accent))", fontSize: 12, marginBottom: 4 }}>★★★★★</div>
                  <div style={{ fontSize: 12, fontStyle: "italic", color: "rgb(var(--color-text-muted))", lineHeight: 1.5 }}>&ldquo;{str(it.review || it.quote)}&rdquo;</div>
                  {str(it.reviewer || it.author) && <div style={{ fontSize: 11, fontWeight: 600, color: "rgb(var(--color-text-dim))", marginTop: 6 }}>{str(it.reviewer || it.author)}</div>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div></StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 13: Z badgeami (kolorowe)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 13) {
    const badgeColors: Record<string, string> = { bestseller: "pr-badge-accent", nowosc: "pr-badge-green", limitowane: "pr-badge-red", wyprzedaz: "pr-badge-purple", promocja: "pr-badge-purple" };
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="pr-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.12}><div className="pa2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => {
          const badge = str(it.badge || it.tag);
          const cls = badgeColors[badge.toLowerCase()] || "pr-badge-accent";
          return (
            <div key={i} className="pr-card card-hover">
              <div style={{ overflow: "hidden", position: "relative" }}>
                <ImgOrGrad item={it} />
                {badge && <div className={`pr-badge ${cls}`}>{badge}</div>}
              </div>
              <div className="pr-card-body">
                <div className="pr-card-title">{str(it.name || it.title)}</div>
                <div className="pr-card-desc">{str(it.desc || it.description)}</div>
                {str(it.price) && <div className="pr-card-price">{str(it.price)}</div>}
              </div>
            </div>
          );
        })}
      </div></StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 14: Specyfikacja - jeden produkt + tabela cech
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 14) {
    const it = items[0] || {};
    const specs = arr(it.specs || it.features || content.specs);
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="pr-wrap">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <ScrollReveal delay={0}><div className="pa1" style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 20px 60px rgb(0 0 0/0.08)" }}>
          <ImgOrGrad item={it} aspect="4/5" />
        </div></ScrollReveal>
        <div className="pa2">
          <ScrollReveal delay={0.1}><h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, marginBottom: 8 }}>{str(it.name || it.title || hl)}</h2></ScrollReveal>
          {str(it.price) && <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "rgb(var(--color-accent))", marginBottom: 16 }}>{str(it.price)}</div>}
          <ScrollReveal delay={0.2}><p style={{ fontSize: 15, lineHeight: 1.7, color: "rgb(var(--color-text-muted))", marginBottom: 24 }}>{str(it.desc || it.description || body)}</p></ScrollReveal>
          {specs.length > 0 && (
            <div style={{ borderRadius: 16, border: "1px solid rgb(var(--color-border)/0.5)", overflow: "hidden", marginBottom: 24 }}>
              {specs.map((sp, j) => (
                <div key={j} style={{ display: "flex", justifyContent: "space-between", padding: "12px 20px", borderBottom: j < specs.length - 1 ? "1px solid rgb(var(--color-border)/0.3)" : "none", fontSize: 14 }}>
                  <span style={{ color: "rgb(var(--color-text-muted))" }}>{str(sp.label || sp.name)}</span>
                  <span style={{ fontWeight: 600 }}>{str(sp.value)}</span>
                </div>
              ))}
            </div>
          )}
          <a href="#" className="pr-btn pr-btn-sm">{str(it.cta_label) || "Zamow teraz"} <Arrow /></a>
        </div>
      </div>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 15: Galeria zdjec - jeden produkt z miniaturkami
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 15) {
    const it = items[0] || {};
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="pr-wrap">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ScrollReveal delay={0}><div className="pa1">
          <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 20px 60px rgb(0 0 0/0.08)", marginBottom: 12 }}>
            <ImgOrGrad item={it} aspect="1/1" />
          </div>
        </div></ScrollReveal>
        <div className="pa2">
          <ScrollReveal delay={0.1}><h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, marginBottom: 8 }}>{str(it.name || it.title || hl)}</h2></ScrollReveal>
          {str(it.price) && <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "rgb(var(--color-accent))", marginBottom: 16 }}>{str(it.price)}</div>}
          <ScrollReveal delay={0.2}><p style={{ fontSize: 15, lineHeight: 1.7, color: "rgb(var(--color-text-muted))", marginBottom: 24 }}>{str(it.desc || it.description || body)}</p></ScrollReveal>
          <a href="#" className="pr-btn pr-btn-sm">{str(it.cta_label) || "Zamow teraz"} <Arrow /></a>
        </div>
      </div>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 16: Karty 3D (perspective tilt hover)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 16) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}{`
      .pr-3d{perspective:800px}
      .pr-3d .pr-card{transition:transform .4s ease,box-shadow .4s ease}
      .pr-3d .pr-card:hover{transform:rotateY(4deg) rotateX(-2deg);box-shadow:-8px 12px 40px rgb(0 0 0/0.1)}
    `}</style><div className="pr-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.12}><div className="pa2 pr-3d grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <div key={i} className="pr-card card-hover">
            <div style={{ overflow: "hidden" }}><ImgOrGrad item={it} /></div>
            <div className="pr-card-body">
              <div className="pr-card-title">{str(it.name || it.title)}</div>
              <div className="pr-card-desc">{str(it.desc || it.description)}</div>
              {str(it.price) && <div className="pr-card-price">{str(it.price)}</div>}
            </div>
          </div>
        ))}
      </div></StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 17: Kategorie - duze karty z overlayem
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 17) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="pr-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.12}><div className="pa2 grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map((it, i) => (
          <div key={i} className="pr-card card-hover" style={{ position: "relative", borderRadius: 24, overflow: "hidden", minHeight: 280 }}>
            <ImgOrGrad item={it} aspect="16/9" />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2))", display: "flex", alignItems: "flex-end", padding: 28 }}>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "white", marginBottom: 6 }}>{str(it.name || it.title)}</div>
                <div style={{ fontSize: 14, color: "rgb(255 255 255/0.7)", marginBottom: 12 }}>{str(it.desc || it.description)}</div>
                <a href={str(it.href) || "#"} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "rgb(var(--color-accent-light))", textDecoration: "none" }}>{str(it.cta_label) || "Odkryj"} <Arrow /></a>
              </div>
            </div>
          </div>
        ))}
      </div></StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 18: Przed / Po
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 18) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="pr-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.12}><div className="pa2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <div key={i} className="pr-card card-hover">
            <div style={{ overflow: "hidden" }}><ImgOrGrad item={it} /></div>
            <div className="pr-card-body">
              <div className="pr-card-title">{str(it.name || it.title)}</div>
              <div className="pr-card-desc">{str(it.desc || it.description)}</div>
              {str(it.price) && <div className="pr-card-price">{str(it.price)}</div>}
            </div>
          </div>
        ))}
      </div></StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 19: Oferta dnia - jeden produkt z countdown
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 19) {
    const it = items[0] || {};
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="pr-wrap">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <ScrollReveal delay={0}><div className="pa1" style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 24px 64px rgb(0 0 0/0.1)" }}>
          <ImgOrGrad item={it} aspect="1/1" />
        </div></ScrollReveal>
        <div className="pa2">
          <ScrollReveal delay={0}><div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", background: "rgb(var(--color-accent)/0.1)", borderRadius: 100, marginBottom: 16 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgb(var(--color-accent))", animation: "prUp 1.5s ease infinite" }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "rgb(var(--color-accent))", textTransform: "uppercase", letterSpacing: "0.1em" }}>Oferta dnia</span>
          </div></ScrollReveal>
          <ScrollReveal delay={0.1}><h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, marginBottom: 8 }}>{str(it.name || it.title || hl)}</h2></ScrollReveal>
          <ScrollReveal delay={0.2}><p style={{ fontSize: 15, lineHeight: 1.7, color: "rgb(var(--color-text-muted))", marginBottom: 16 }}>{str(it.desc || it.description || body)}</p></ScrollReveal>
          {str(it.price) && <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "rgb(var(--color-accent))", marginBottom: 24 }}>{str(it.price)}</div>}
          <a href="#" className="pr-btn pr-btn-sm">{str(it.cta_label) || "Zamow teraz"} <Arrow /></a>
        </div>
      </div>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 20: Konfigurator - split layout: image left, config right
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 20) {
    const cfgName = str(content.name || content.product_name) || str(items[0]?.name || items[0]?.title) || hl;
    const cfgDesc = str(content.desc || content.product_desc) || str(items[0]?.desc || items[0]?.description) || body;
    const cfgBasePrice = str(content.base_price) || str(items[0]?.price) || "od 49 zl";
    const cfgImage = resolveImage(content.image || content.product_image) || resolveImage(items[0]?.image);
    const cfgOptions = arr(content.options);
    const cfgCta = content.cta as Record<string, unknown> | null;
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="pr-wrap">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Image */}
        <ScrollReveal delay={0}><div className="pa1" style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 24px 64px rgb(0 0 0/0.1)", position: "sticky", top: 100 }}>
          {cfgImage ? <img src={cfgImage} alt="" style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block" }} /> : <div style={{ width: "100%", aspectRatio: "1/1", background: "linear-gradient(135deg, rgb(var(--color-accent)/0.1), rgb(var(--color-surface)))" }} />}
        </div></ScrollReveal>
        {/* Config */}
        <div className="pa2">
          <ScrollReveal delay={0.1}><h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, marginBottom: 8 }}>{cfgName}</h2></ScrollReveal>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "rgb(var(--color-accent))", marginBottom: 16 }}>{cfgBasePrice}</div>
          {cfgDesc && <ScrollReveal delay={0.2}><p style={{ fontSize: 15, lineHeight: 1.7, color: "rgb(var(--color-text-muted))", marginBottom: 24 }}>{cfgDesc}</p></ScrollReveal>}
          {/* Options */}
          {cfgOptions.map((opt, oi) => (
            <div key={oi} style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "rgb(var(--color-text-primary))", marginBottom: 10 }}>{str(opt.label || opt.name)}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {arr(opt.choices).map((ch, ci) => (
                  <button key={ci} style={{ padding: "8px 16px", borderRadius: 10, border: ci === 0 ? "2px solid rgb(var(--color-accent))" : "1px solid rgb(var(--color-border))", background: ci === 0 ? "rgb(var(--color-accent)/0.05)" : "rgb(var(--color-surface))", fontSize: 13, fontWeight: 500, color: ci === 0 ? "rgb(var(--color-accent))" : "rgb(var(--color-text-muted))", cursor: "pointer", fontFamily: "var(--font-body)" }}>{str(ch.label || ch)}</button>
                ))}
              </div>
            </div>
          ))}
          <button className="pr-btn" style={{ marginTop: 8 }}>{cfgCta ? str(cfgCta.label) : "Dodaj do koszyka"}</button>
        </div>
      </div>
    </div></section>);
  }

  // Featured + grid (multi-item)
  if (items.length > 1) {
    const featured = items[0];
    const rest = items.slice(1);
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="pr-wrap">
      <Header />
      <ScrollReveal delay={0}><div className="pa1 grid grid-cols-1 md:grid-cols-2 gap-8 items-center" style={{ marginBottom: 32 }}>
        <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 16px 48px rgb(0 0 0/0.08)" }}>
          <ImgOrGrad item={featured} aspect="4/3" />
        </div>
        <div>
          {str(featured.icon) && <div style={{ fontSize: 24, marginBottom: 8 }}>{resolveIcon(featured.icon)}</div>}
          <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, marginBottom: 8 }}>{str(featured.name || featured.title)}</div>
          <div style={{ fontSize: 15, lineHeight: 1.7, color: "rgb(var(--color-text-muted))", marginBottom: 12 }}>{str(featured.desc || featured.description)}</div>
          {str(featured.price) && <div className="pr-card-price" style={{ fontSize: 20 }}>{str(featured.price)}</div>}
        </div>
      </div></ScrollReveal>
      <StaggerChildren staggerDelay={0.12}><div className="pa2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {rest.map((it, i) => (
          <div key={i} className="pr-card card-hover">
            <div style={{ overflow: "hidden" }}><ImgOrGrad item={it} /></div>
            <div className="pr-card-body">
              <div className="pr-card-title">{str(it.name || it.title)}</div>
              <div className="pr-card-desc">{str(it.desc || it.description)}</div>
              {str(it.price) && <div className="pr-card-price">{str(it.price)}</div>}
            </div>
          </div>
        ))}
      </div></StaggerChildren>
    </div></section>);
  }

  // Fallback: Basic grid
  return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="pr-wrap">
    <Header />
    <StaggerChildren staggerDelay={0.12}><div className="pa2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((it, i) => (
        <div key={i} className="pr-card card-hover">
          <div style={{ overflow: "hidden" }}><ImgOrGrad item={it} /></div>
          <div className="pr-card-body">
            <div className="pr-card-title">{str(it.name || it.title)}</div>
            <div className="pr-card-desc">{str(it.desc || it.description)}</div>
            {str(it.price) && <div className="pr-card-price">{str(it.price)}</div>}
          </div>
        </div>
      ))}
    </div></StaggerChildren>
  </div></section>);
}
