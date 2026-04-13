"use client";

// ---- ServicesSection --------------------------------------------------------
// 15 individually crafted service variants based on ProductsSection layouts.
// Separate file so services can diverge from products later.

/* eslint-disable @next/next/no-img-element */

import { str, arr, resolveImage, resolveIcon } from "./shared";
import { ScrollReveal, StaggerChildren } from "./ClientComponents";

interface ServicesProps {
  content: Record<string, unknown>;
  vn: number;
}

function Arrow() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
}

const S = `
  .sv-wrap{max-width:1280px;margin:0 auto;padding:0 16px}
  @media(min-width:768px){.sv-wrap{padding:0 24px}}@media(min-width:1024px){.sv-wrap{padding:0 48px}}
  .sv-header{text-align:center;max-width:640px;margin:0 auto 48px}
  .sv-eyebrow{display:inline-flex;align-items:center;gap:16px;margin-bottom:20px}
  .sv-eline{width:32px;height:1px;background:linear-gradient(90deg,transparent,rgb(var(--color-accent)/0.4))}
  .sv-eline-r{width:32px;height:1px;background:linear-gradient(90deg,rgb(var(--color-accent)/0.4),transparent)}
  .sv-etxt{font-size:11px;font-weight:600;letter-spacing:.25em;text-transform:uppercase;color:rgb(var(--color-accent))}
  .sv-h2{font-family:var(--font-display);font-size:32px;font-weight:700;line-height:1.15;letter-spacing:-.02em;color:rgb(var(--color-text-primary));margin-bottom:14px}
  @media(min-width:768px){.sv-h2{font-size:40px}}@media(min-width:1024px){.sv-h2{font-size:48px}}
  .sv-h2 em{font-style:italic;color:rgb(var(--color-accent))}
  .sv-desc{font-size:16px;line-height:1.7;color:rgb(var(--color-text-muted))}

  .sv-card{background:rgb(var(--color-surface));border:1px solid rgb(var(--color-border)/0.5);border-radius:20px;overflow:hidden;transition:all .3s;display:flex;flex-direction:column}
  .sv-card:hover{border-color:rgb(var(--color-accent)/0.3);box-shadow:0 12px 40px rgb(0 0 0/0.06);transform:translateY(-4px)}
  .sv-card-img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block;transition:transform .6s}
  .sv-card:hover .sv-card-img{transform:scale(1.05)}
  .sv-card-body{padding:20px 22px 24px;flex:1;display:flex;flex-direction:column}
  .sv-card-title{font-family:var(--font-display);font-size:16px;font-weight:600;color:rgb(var(--color-text-primary));margin-bottom:6px}
  .sv-card-desc{font-size:13px;line-height:1.6;color:rgb(var(--color-text-muted));flex:1;margin-bottom:10px}
  .sv-card-price{font-family:var(--font-display);font-size:15px;font-weight:700;color:rgb(var(--color-accent))}
  .sv-card-link{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:rgb(var(--color-accent));text-decoration:none;margin-top:10px;transition:gap .2s}
  .sv-card-link:hover{gap:10px}

  .sv-badge{position:absolute;top:12px;left:12px;padding:4px 12px;border-radius:8px;font-size:11px;font-weight:600;text-transform:uppercase;color:white;z-index:2}
  .sv-badge-accent{background:rgb(var(--color-accent))}
  .sv-badge-green{background:rgb(34 197 94)}
  .sv-badge-red{background:rgb(239 68 68)}
  .sv-badge-purple{background:rgb(139 92 246)}

  .sv-btn{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;background:rgb(var(--color-accent));color:rgb(var(--color-on-accent));font-family:var(--font-body);font-size:14px;font-weight:600;border-radius:12px;text-decoration:none;transition:all .3s;box-shadow:0 4px 16px rgb(var(--color-accent)/0.3);border:none;cursor:pointer;width:100%;justify-content:center}
  .sv-btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgb(var(--color-accent)/0.4)}
  .sv-btn-sm{padding:10px 20px;width:auto}

  .sv-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 60%);opacity:0;transition:opacity .3s;display:flex;align-items:flex-end;padding:20px}
  .sv-card:hover .sv-overlay{opacity:1}

  .sv-filter{display:inline-flex;align-items:center;padding:8px 20px;border-radius:100px;font-size:13px;font-weight:500;color:rgb(var(--color-text-muted));background:rgb(var(--color-surface));border:1px solid rgb(var(--color-border)/0.5);cursor:pointer;transition:all .2s;text-decoration:none}
  .sv-filter:hover{border-color:rgb(var(--color-accent)/0.3);color:rgb(var(--color-text-primary))}
  .sv-filter-active{background:rgb(var(--color-accent));color:rgb(var(--color-on-accent));border-color:rgb(var(--color-accent))}

  @keyframes svUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  .sa1{opacity:0;animation:svUp .8s ease .1s forwards}
  .sa2{opacity:0;animation:svUp .8s ease .3s forwards}
`;

export default function ServicesSection({ content, vn }: ServicesProps) {
  const ey = str(content.eyebrow);
  const hl = str(content.headline || content.heading);
  const body = str(content.body);
  const items = arr(content.items || content.services || content.categories || content.tabs || content.products);
  const ctaObj = content.cta as Record<string, unknown> | null;

  const Header = () => (
    <div className="sv-header sa1">
      {ey && <ScrollReveal delay={0}><div className="sv-eyebrow"><div className="sv-eline"/><span className="sv-etxt">{ey}</span><div className="sv-eline-r"/></div></ScrollReveal>}
      <ScrollReveal delay={0.1}><h2 className="sv-h2">{hl}</h2></ScrollReveal>
      {body && <ScrollReveal delay={0.2}><p className="sv-desc">{body}</p></ScrollReveal>}
    </div>
  );

  const ImgOrGrad = ({ item, aspect = "4/3", cls = "" }: { item: Record<string, unknown>; aspect?: string; cls?: string }) => {
    const src = resolveImage(item.image || item.src);
    return src
      ? <img src={src} alt={str(item.name || item.title)} style={{ width: "100%", aspectRatio: aspect, objectFit: "cover", display: "block", transition: "transform .6s" }} className={cls} />
      : <div style={{ width: "100%", aspectRatio: aspect, background: "linear-gradient(135deg, rgb(var(--color-accent)/0.1), rgb(var(--color-surface)))" }} />;
  };

  // =========================================================================
  // VN 1: Lista - 3-col grid, basic cards
  // =========================================================================
  if (vn === 1) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="sv-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.12}><div className="sa2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <div key={i} className="sv-card card-hover">
            <div style={{ overflow: "hidden" }}><ImgOrGrad item={it} /></div>
            <div className="sv-card-body">
              {str(it.icon) && <div style={{ fontSize: 20, marginBottom: 6 }}>{resolveIcon(it.icon)}</div>}
              <div className="sv-card-title">{str(it.name || it.title || it.label)}</div>
              <div className="sv-card-desc">{str(it.desc || it.description)}</div>
              {str(it.price) && <div className="sv-card-price">{str(it.price)}</div>}
            </div>
          </div>
        ))}
      </div></StaggerChildren>
      {ctaObj && <div className="sa2" style={{ textAlign: "center", marginTop: 40 }}><a href={str(ctaObj.href) || "#"} className="sv-btn sv-btn-sm">{str(ctaObj.label)} <Arrow /></a></div>}
    </div></section>);
  }

  // =========================================================================
  // VN 2: Karty z badgeami
  // =========================================================================
  if (vn === 2) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="sv-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.12}><div className="sa2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => {
          const badge = str(it.badge || it.tag);
          return (
            <div key={i} className="sv-card card-hover">
              <div style={{ overflow: "hidden", position: "relative" }}>
                <ImgOrGrad item={it} />
                {badge && <div className="sv-badge sv-badge-accent">{badge}</div>}
              </div>
              <div className="sv-card-body">
                <div className="sv-card-title">{str(it.name || it.title || it.label)}</div>
                <div className="sv-card-desc">{str(it.desc || it.description)}</div>
                {str(it.price) && <div className="sv-card-price">{str(it.price)}</div>}
              </div>
            </div>
          );
        })}
      </div></StaggerChildren>
    </div></section>);
  }

  // =========================================================================
  // VN 3: Karty z cenami + przycisk
  // =========================================================================
  if (vn === 3) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="sv-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.12}><div className="sa2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <div key={i} className="sv-card card-hover">
            <div style={{ overflow: "hidden" }}><ImgOrGrad item={it} /></div>
            <div className="sv-card-body">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                <div className="sv-card-title" style={{ marginBottom: 0 }}>{str(it.name || it.title)}</div>
                {str(it.price) && <div className="sv-card-price">{str(it.price)}</div>}
              </div>
              <div className="sv-card-desc">{str(it.desc || it.description)}</div>
              <button className="sv-btn" style={{ marginTop: "auto" }}>{str(it.cta_label) || "Umow wizyte"}</button>
            </div>
          </div>
        ))}
      </div></StaggerChildren>
    </div></section>);
  }

  // =========================================================================
  // VN 4: Lookbook - duze zdjecia z overlay na hover
  // =========================================================================
  if (vn === 4) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="sv-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.12}><div className="sa2 grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map((it, i) => (
          <div key={i} className="sv-card card-hover" style={{ position: "relative", borderRadius: 20, overflow: "hidden" }}>
            <ImgOrGrad item={it} aspect="3/4" />
            <div className="sv-overlay">
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

  // =========================================================================
  // VN 5: Karuzela - horizontal scroll
  // =========================================================================
  if (vn === 5) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}{`
      .sv-scroll{display:flex;gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding:0 16px 16px}
      .sv-scroll::-webkit-scrollbar{display:none}
      .sv-scroll-card{min-width:280px;scroll-snap-align:start;flex-shrink:0}
      @media(min-width:768px){.sv-scroll{padding:0 24px 16px}.sv-scroll-card{min-width:300px}}
    `}</style><div className="sv-wrap">
      <Header />
      <ScrollReveal delay={0.2}><div className="sv-scroll sa2">
        {items.map((it, i) => (
          <div key={i} className="sv-card sv-scroll-card card-hover">
            <div style={{ overflow: "hidden" }}><ImgOrGrad item={it} /></div>
            <div className="sv-card-body">
              <div className="sv-card-title">{str(it.name || it.title)}</div>
              <div className="sv-card-desc">{str(it.desc || it.description)}</div>
              {str(it.price) && <div className="sv-card-price">{str(it.price)}</div>}
            </div>
          </div>
        ))}
      </div></ScrollReveal>
    </div></section>);
  }

  // =========================================================================
  // VN 6: Flagship - jedna usluga
  // =========================================================================
  if (vn === 6) {
    const it = items[0] || {};
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="sv-wrap">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <ScrollReveal delay={0}><div className="sa1" style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 24px 64px rgb(0 0 0/0.1)" }}>
          <ImgOrGrad item={it} aspect="1/1" />
        </div></ScrollReveal>
        <div className="sa2">
          {ey && <ScrollReveal delay={0}><div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgb(var(--color-accent))", marginBottom: 12 }}>{ey}</div></ScrollReveal>}
          <ScrollReveal delay={0.1}><h2 style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 700, color: "rgb(var(--color-text-primary))", marginBottom: 12, lineHeight: 1.15 }}>{str(it.name || it.title || hl)}</h2></ScrollReveal>
          <ScrollReveal delay={0.2}><p style={{ fontSize: 15, lineHeight: 1.7, color: "rgb(var(--color-text-muted))", marginBottom: 20 }}>{str(it.desc || it.description || body)}</p></ScrollReveal>
          {str(it.price) && <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "rgb(var(--color-accent))", marginBottom: 24 }}>{str(it.price)}</div>}
          <a href={str(it.href || it.cta_href) || "#"} className="sv-btn sv-btn-sm">{str(it.cta_label) || "Umow wizyte"} <Arrow /></a>
        </div>
      </div>
    </div></section>);
  }

  // =========================================================================
  // VN 7: Katalog z kategoriami
  // =========================================================================
  if (vn === 7) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="sv-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.12}><div className="sa2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <div key={i} className="sv-card card-hover">
            <div style={{ overflow: "hidden" }}><ImgOrGrad item={it} /></div>
            <div className="sv-card-body">
              {str(it.category) && <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgb(var(--color-accent))", marginBottom: 6 }}>{str(it.category)}</div>}
              <div className="sv-card-title">{str(it.name || it.title)}</div>
              <div className="sv-card-desc">{str(it.desc || it.description)}</div>
              {str(it.price) && <div className="sv-card-price">{str(it.price)}</div>}
            </div>
          </div>
        ))}
      </div></StaggerChildren>
    </div></section>);
  }

  // =========================================================================
  // VN 8: Porownanie - karty z ikonami
  // =========================================================================
  if (vn === 8) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="sv-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.12}><div className="sa2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <div key={i} className="sv-card card-hover" style={{ textAlign: "center", padding: 24 }}>
            <div style={{ width: 80, height: 80, borderRadius: 16, overflow: "hidden", margin: "0 auto 16px" }}>
              <ImgOrGrad item={it} aspect="1/1" />
            </div>
            <div className="sv-card-title" style={{ fontSize: 18 }}>{str(it.name || it.title)}</div>
            <div className="sv-card-desc">{str(it.desc || it.description)}</div>
            {str(it.price) && <div className="sv-card-price" style={{ fontSize: 24, marginTop: 12 }}>{str(it.price)}</div>}
          </div>
        ))}
      </div></StaggerChildren>
    </div></section>);
  }

  // =========================================================================
  // VN 9: Hover overlay - zdjecia z overlay na hover
  // =========================================================================
  if (vn === 9) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="sv-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.12}><div className="sa2 grid grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it, i) => (
          <div key={i} className="sv-card card-hover" style={{ position: "relative", borderRadius: 16, overflow: "hidden" }}>
            <ImgOrGrad item={it} aspect="1/1" />
            <div className="sv-overlay" style={{ borderRadius: 0 }}>
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

  // =========================================================================
  // VN 10: Zakladki - karty z linkami
  // =========================================================================
  if (vn === 10) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="sv-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.12}><div className="sa2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <div key={i} className="sv-card card-hover">
            <div style={{ overflow: "hidden" }}><ImgOrGrad item={it} /></div>
            <div className="sv-card-body">
              <div className="sv-card-title">{str(it.name || it.title)}</div>
              <div className="sv-card-desc">{str(it.desc || it.description)}</div>
              {str(it.price) && <div className="sv-card-price">{str(it.price)}</div>}
              <a href={str(it.href) || "#"} className="sv-card-link">{str(it.cta_label) || "Zobacz"} <Arrow /></a>
            </div>
          </div>
        ))}
      </div></StaggerChildren>
    </div></section>);
  }

  // =========================================================================
  // VN 11: Masonry
  // =========================================================================
  if (vn === 11) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}{`
      .sv-masonry{column-count:1;column-gap:16px}
      @media(min-width:640px){.sv-masonry{column-count:2}}
      @media(min-width:1024px){.sv-masonry{column-count:3}}
      .sv-masonry-item{break-inside:avoid;margin-bottom:16px}
    `}</style><div className="sv-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.12}><div className="sv-masonry sa2">
        {items.map((it, i) => {
          const tall = i % 3 === 0;
          return (
            <div key={i} className="sv-masonry-item">
              <div className="sv-card card-hover">
                <div style={{ overflow: "hidden" }}><ImgOrGrad item={it} aspect={tall ? "3/4" : "4/3"} /></div>
                <div className="sv-card-body">
                  <div className="sv-card-title">{str(it.name || it.title)}</div>
                  {str(it.price) && <div className="sv-card-price">{str(it.price)}</div>}
                </div>
              </div>
            </div>
          );
        })}
      </div></StaggerChildren>
    </div></section>);
  }

  // =========================================================================
  // VN 12: Z recenzjami
  // =========================================================================
  if (vn === 12) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="sv-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.12}><div className="sa2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <div key={i} className="sv-card card-hover">
            <div style={{ overflow: "hidden" }}><ImgOrGrad item={it} /></div>
            <div className="sv-card-body">
              <div className="sv-card-title">{str(it.name || it.title)}</div>
              {str(it.price) && <div className="sv-card-price" style={{ marginBottom: 12 }}>{str(it.price)}</div>}
              {str(it.review || it.quote) && (
                <div style={{ paddingTop: 12, borderTop: "1px solid rgb(var(--color-border)/0.3)" }}>
                  <div style={{ color: "rgb(var(--color-accent))", fontSize: 12, marginBottom: 4 }}>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
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

  // =========================================================================
  // VN 13: Z badgeami (kolorowe)
  // =========================================================================
  if (vn === 13) {
    const badgeColors: Record<string, string> = { bestseller: "sv-badge-accent", nowosc: "sv-badge-green", limitowane: "sv-badge-red", wyprzedaz: "sv-badge-purple", promocja: "sv-badge-purple" };
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="sv-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.12}><div className="sa2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => {
          const badge = str(it.badge || it.tag);
          const cls = badgeColors[badge.toLowerCase()] || "sv-badge-accent";
          return (
            <div key={i} className="sv-card card-hover">
              <div style={{ overflow: "hidden", position: "relative" }}>
                <ImgOrGrad item={it} />
                {badge && <div className={`sv-badge ${cls}`}>{badge}</div>}
              </div>
              <div className="sv-card-body">
                <div className="sv-card-title">{str(it.name || it.title)}</div>
                <div className="sv-card-desc">{str(it.desc || it.description)}</div>
                {str(it.price) && <div className="sv-card-price">{str(it.price)}</div>}
              </div>
            </div>
          );
        })}
      </div></StaggerChildren>
    </div></section>);
  }

  // =========================================================================
  // VN 14: Specyfikacja - jedna usluga + tabela cech
  // =========================================================================
  if (vn === 14) {
    const it = items[0] || {};
    const specs = arr(it.specs || it.features || content.specs);
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="sv-wrap">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <ScrollReveal delay={0}><div className="sa1" style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 20px 60px rgb(0 0 0/0.08)" }}>
          <ImgOrGrad item={it} aspect="4/5" />
        </div></ScrollReveal>
        <div className="sa2">
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
          <a href="#" className="sv-btn sv-btn-sm">{str(it.cta_label) || "Umow wizyte"} <Arrow /></a>
        </div>
      </div>
    </div></section>);
  }

  // =========================================================================
  // VN 15: Galeria zdjec - jedna usluga z miniaturkami
  // =========================================================================
  if (vn === 15) {
    const it = items[0] || {};
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="sv-wrap">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ScrollReveal delay={0}><div className="sa1">
          <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 20px 60px rgb(0 0 0/0.08)", marginBottom: 12 }}>
            <ImgOrGrad item={it} aspect="1/1" />
          </div>
        </div></ScrollReveal>
        <div className="sa2">
          <ScrollReveal delay={0.1}><h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 700, marginBottom: 8 }}>{str(it.name || it.title || hl)}</h2></ScrollReveal>
          {str(it.price) && <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "rgb(var(--color-accent))", marginBottom: 16 }}>{str(it.price)}</div>}
          <ScrollReveal delay={0.2}><p style={{ fontSize: 15, lineHeight: 1.7, color: "rgb(var(--color-text-muted))", marginBottom: 24 }}>{str(it.desc || it.description || body)}</p></ScrollReveal>
          <a href="#" className="sv-btn sv-btn-sm">{str(it.cta_label) || "Umow wizyte"} <Arrow /></a>
        </div>
      </div>
    </div></section>);
  }

  // =========================================================================
  // Fallback: basic grid
  // =========================================================================
  return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="sv-wrap">
    <Header />
    <StaggerChildren staggerDelay={0.12}><div className="sa2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((it, i) => (
        <div key={i} className="sv-card card-hover">
          <div style={{ overflow: "hidden" }}><ImgOrGrad item={it} /></div>
          <div className="sv-card-body">
            <div className="sv-card-title">{str(it.name || it.title)}</div>
            <div className="sv-card-desc">{str(it.desc || it.description)}</div>
            {str(it.price) && <div className="sv-card-price">{str(it.price)}</div>}
          </div>
        </div>
      ))}
    </div></StaggerChildren>
  </div></section>);
}
