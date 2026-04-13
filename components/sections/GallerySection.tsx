"use client";

// ─── GallerySection ──────────────────────────────────────────────────────────
// 20 individually crafted gallery variants matching HTML mockups.
// Also used for showcase sections.

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { str, arr, resolveImage } from "./shared";
import { ScrollReveal, StaggerChildren } from './ClientComponents'

interface GalleryProps {
  content: Record<string, unknown>;
  vn: number;
}

const S = `
  .gl-wrap{max-width:1280px;margin:0 auto;padding:0 16px}
  @media(min-width:768px){.gl-wrap{padding:0 24px}}@media(min-width:1024px){.gl-wrap{padding:0 48px}}
  .gl-header{text-align:center;max-width:640px;margin:0 auto 48px}
  .gl-eyebrow{display:inline-flex;align-items:center;gap:16px;margin-bottom:20px}
  .gl-eline{width:32px;height:1px;background:linear-gradient(90deg,transparent,rgb(var(--color-accent)/0.4))}
  .gl-eline-r{width:32px;height:1px;background:linear-gradient(90deg,rgb(var(--color-accent)/0.4),transparent)}
  .gl-etxt{font-size:11px;font-weight:600;letter-spacing:.25em;text-transform:uppercase;color:rgb(var(--color-accent))}
  .gl-h2{font-family:var(--font-display);font-size:32px;font-weight:700;line-height:1.15;letter-spacing:-.02em;color:rgb(var(--color-text-primary));margin-bottom:14px}
  @media(min-width:768px){.gl-h2{font-size:40px}}@media(min-width:1024px){.gl-h2{font-size:48px}}
  .gl-desc{font-size:16px;line-height:1.7;color:rgb(var(--color-text-muted))}

  .gl-img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s ease}
  .gl-cell{overflow:hidden;border-radius:12px;position:relative;cursor:pointer}
  .gl-cell:hover .gl-img{transform:scale(1.06)}
  .gl-cell:hover .gl-overlay{opacity:1}
  .gl-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.5),transparent 60%);opacity:0;transition:opacity .3s;display:flex;align-items:flex-end;padding:16px}
  .gl-overlay-text{font-size:13px;color:white;font-weight:500}

  .gl-caption{font-size:12px;font-style:italic;color:rgb(var(--color-text-dim));margin-top:8px;padding:0 2px}

  @keyframes glUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  .ga1{opacity:0;animation:glUp .8s ease .1s forwards}
  .ga2{opacity:0;animation:glUp .8s ease .3s forwards}

  @keyframes glMarquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
  @keyframes glMarqueeR{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}

  .gl-lightbox{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;padding:20px;cursor:zoom-out}
  .gl-lightbox img{max-width:100%;max-height:90vh;object-fit:contain;border-radius:12px}
  .gl-lightbox-close{position:absolute;top:20px;right:20px;width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,0.1);border:none;color:white;font-size:24px;cursor:pointer;display:flex;align-items:center;justify-content:center}

  .gl-masonry{column-count:1;column-gap:10px}
  @media(min-width:640px){.gl-masonry{column-count:2}}
  @media(min-width:1024px){.gl-masonry{column-count:3}}
  .gl-masonry-item{break-inside:avoid;margin-bottom:10px}

  .gl-scroll{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding:0 16px}
  .gl-scroll::-webkit-scrollbar{display:none}
  .gl-scroll-item{min-width:280px;scroll-snap-align:start;flex-shrink:0;border-radius:16px;overflow:hidden}
  @media(min-width:768px){.gl-scroll-item{min-width:320px}}

  .gl-polaroid{background:white;padding:8px 8px 40px;border-radius:4px;box-shadow:0 4px 20px rgb(0 0 0/0.1);transition:all .3s ease}
  .gl-polaroid:hover{transform:rotate(0deg) translateY(-6px)!important;box-shadow:0 12px 40px rgb(0 0 0/0.15)}
  .gl-polaroid img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:2px}
  .gl-polaroid-caption{font-family:var(--font-display);font-size:14px;font-style:italic;color:rgb(var(--color-text-muted));text-align:center;margin-top:12px;padding:0 4px}
`;

function ImgCell({ src, alt, caption, aspect = "1/1", className = "" }: { src: string | null; alt?: string; caption?: string; aspect?: string; className?: string }) {
  if (!src) return <div className={`gl-cell ${className}`} style={{ aspectRatio: aspect, background: "linear-gradient(135deg, rgb(var(--color-accent)/0.1), rgb(var(--color-surface)))" }} />;
  return (
    <div className={`gl-cell ${className}`} style={{ aspectRatio: aspect }}>
      <img src={src} alt={alt || ""} className="gl-img" />
      {caption && <div className="gl-overlay"><div className="gl-overlay-text">{caption}</div></div>}
    </div>
  );
}

export default function GallerySection({ content, vn }: GalleryProps) {
  const hl = str(content.heading || content.headline);
  const body = str(content.body);
  const ey = str(content.eyebrow);
  const images = arr(content.images);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const [thumbIdx, setThumbIdx] = useState(0);

  const Header = () => (
    <ScrollReveal delay={0}>
    <div className="gl-header ga1">
      {ey && <div className="gl-eyebrow"><div className="gl-eline"/><span className="gl-etxt">{ey}</span><div className="gl-eline-r"/></div>}
      <h2 className="gl-h2">{hl}</h2>
      {body && <p className="gl-desc">{body}</p>}
    </div>
    </ScrollReveal>
  );

  const Lightbox = () => lightbox ? (
    <div className="gl-lightbox" onClick={() => setLightbox(null)}>
      <img src={lightbox} alt="" />
      <button className="gl-lightbox-close" onClick={() => setLightbox(null)}>✕</button>
    </div>
  ) : null;

  const getImgSrc = (img: Record<string, unknown>) => resolveImage(img.src || img.image || img.url);
  const getCaption = (img: Record<string, unknown>) => str(img.caption || img.alt || img.title);

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 1: Siatka 4-col
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 1) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="gl-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.08}>
      <div className="ga2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {images.map((img, i) => <div key={i} className="img-zoom" onClick={() => setLightbox(getImgSrc(img))}><ImgCell src={getImgSrc(img)} alt={getCaption(img)} /></div>)}
      </div>
      </StaggerChildren>
    </div><Lightbox /></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 2: Kolumny 3-col z podpisami
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 2) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="gl-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.08}>
      <div className="ga2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <div key={i} className="img-zoom">
            <ImgCell src={getImgSrc(img)} alt={getCaption(img)} aspect="4/3" className="rounded-2xl" />
            {getCaption(img) && <div className="gl-caption">{getCaption(img)}</div>}
          </div>
        ))}
      </div>
      </StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 3: Karuzela horizontal scroll
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 3) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="gl-wrap"><Header /></div>
      <div className="gl-scroll ga2">
        {images.map((img, i) => (
          <div key={i} className="gl-scroll-item">
            <ImgCell src={getImgSrc(img)} alt={getCaption(img)} aspect="4/3" />
          </div>
        ))}
      </div>
    </section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 4: Masonry
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 4) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="gl-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.08}>
      <div className="gl-masonry ga2">
        {images.map((img, i) => (
          <div key={i} className="gl-masonry-item img-zoom">
            <ImgCell src={getImgSrc(img)} alt={getCaption(img)} aspect={i % 3 === 0 ? "3/4" : "1/1"} />
          </div>
        ))}
      </div>
      </StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 5: Lightbox (grid + klik otwiera fullscreen)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 5) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="gl-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.08}>
      <div className="ga2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {images.map((img, i) => (
          <div key={i} className="img-zoom" onClick={() => setLightbox(getImgSrc(img))} style={{ cursor: "zoom-in" }}>
            <ImgCell src={getImgSrc(img)} alt={getCaption(img)} caption="Kliknij aby powiekszyc" />
          </div>
        ))}
      </div>
      </StaggerChildren>
    </div><Lightbox /></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 6: Fullscreen slider
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 6) {
    const src = getImgSrc(images[slideIdx] || {});
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="gl-wrap">
      <Header />
      <div className="ga2" style={{ position: "relative", borderRadius: 20, overflow: "hidden", boxShadow: "0 16px 48px rgb(0 0 0/0.08)" }}>
        {src ? <img src={src} alt="" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block", transition: "opacity 0.5s" }} /> : <div style={{ width: "100%", aspectRatio: "16/9", background: "rgb(var(--color-surface-deep))" }} />}
        {/* Counter */}
        <div style={{ position: "absolute", top: 16, right: 16, padding: "6px 14px", background: "rgb(0 0 0/0.5)", backdropFilter: "blur(8px)", borderRadius: 8, fontSize: 13, color: "white", fontWeight: 500 }}>{slideIdx + 1} / {images.length}</div>
        {/* Arrows */}
        {images.length > 1 && <>
          <button onClick={() => setSlideIdx((slideIdx - 1 + images.length) % images.length)} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", background: "rgb(255 255 255/0.15)", backdropFilter: "blur(8px)", border: "1px solid rgb(255 255 255/0.2)", color: "white", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
          <button onClick={() => setSlideIdx((slideIdx + 1) % images.length)} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", background: "rgb(255 255 255/0.15)", backdropFilter: "blur(8px)", border: "1px solid rgb(255 255 255/0.2)", color: "white", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
        </>}
        {/* Dots */}
        <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
          {images.map((_, i) => <div key={i} onClick={() => setSlideIdx(i)} style={{ width: i === slideIdx ? 24 : 8, height: 8, borderRadius: 4, background: i === slideIdx ? "white" : "rgb(255 255 255/0.4)", cursor: "pointer", transition: "all 0.3s" }} />)}
        </div>
      </div>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 7: Z filtrami
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 7) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="gl-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.08}>
      <div className="ga2 grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((img, i) => (
          <div key={i} className="img-zoom" onClick={() => setLightbox(getImgSrc(img))}>
            <ImgCell src={getImgSrc(img)} alt={getCaption(img)} aspect="4/3" className="rounded-2xl" caption={getCaption(img)} />
          </div>
        ))}
      </div>
      </StaggerChildren>
    </div><Lightbox /></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 8: Przed / Po
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 8) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="gl-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.08}>
      <div className="ga2 grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((img, i) => (
          <div key={i} className="img-zoom" style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgb(var(--color-border)/0.5)" }}>
            <ImgCell src={getImgSrc(img)} alt={getCaption(img)} aspect="16/9" />
            {getCaption(img) && <div style={{ padding: "12px 16px", fontSize: 13, color: "rgb(var(--color-text-muted))", textAlign: "center" }}>{getCaption(img)}</div>}
          </div>
        ))}
      </div>
      </StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 9: Bento asymmetric
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 9) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}{`
      .gl-bento{display:grid;grid-template-columns:1fr;gap:12px}
      @media(min-width:768px){.gl-bento{grid-template-columns:repeat(3,1fr);grid-auto-rows:200px}}
      .gl-bento-lg{grid-column:span 1;grid-row:span 1}
      @media(min-width:768px){.gl-bento-lg{grid-column:span 2;grid-row:span 2}}
    `}</style><div className="gl-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.08}>
      <div className="gl-bento ga2">
        {images.map((img, i) => (
          <div key={i} className={`${i === 0 ? "gl-bento-lg" : ""} img-zoom`} onClick={() => setLightbox(getImgSrc(img))}>
            <ImgCell src={getImgSrc(img)} alt={getCaption(img)} aspect={i === 0 ? "auto" : "auto"} className="!rounded-2xl h-full" />
          </div>
        ))}
      </div>
      </StaggerChildren>
    </div><Lightbox /></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 10: Z wideo (mixed media)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 10) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="gl-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.08}>
      <div className="ga2 grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((img, i) => {
          const isVideo = i % 4 === 2;
          return (
            <div key={i} className="img-zoom" style={{ position: "relative" }} onClick={() => setLightbox(getImgSrc(img))}>
              <ImgCell src={getImgSrc(img)} alt={getCaption(img)} aspect="4/3" className="rounded-2xl" />
              {isVideo && (
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgb(0 0 0/0.15)" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgb(var(--color-surface)/0.95)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgb(0 0 0/0.15)" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="rgb(var(--color-accent))"><polygon points="5,3 19,12 5,21"/></svg>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      </StaggerChildren>
    </div><Lightbox /></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 11: Kolaz (artistic overlapping)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 11) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="gl-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.08}>
      <div className="ga2 grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, i) => {
          const rot = ((i % 5) - 2) * 2;
          return (
            <div key={i} style={{ transform: `rotate(${rot}deg)`, transition: "transform 0.3s" }} className="img-zoom hover:!rotate-0 hover:scale-105 hover:z-10">
              <ImgCell src={getImgSrc(img)} alt={getCaption(img)} aspect={i % 3 === 0 ? "3/4" : "4/3"} className="rounded-2xl shadow-lg" />
            </div>
          );
        })}
      </div>
      </StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 12: Hexagony
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 12) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}{`
      .gl-hex{clip-path:polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%);width:100%;aspect-ratio:1;overflow:hidden;transition:transform .3s}
      .gl-hex:hover{transform:scale(1.05)}
      .gl-hex img{width:100%;height:100%;object-fit:cover;transition:transform .6s}
      .gl-hex:hover img{transform:scale(1.1)}
    `}</style><div className="gl-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.08}>
      <div className="ga2 grid grid-cols-2 md:grid-cols-3 gap-4" style={{ maxWidth: 800, margin: "0 auto" }}>
        {images.map((img, i) => (
          <div key={i} className="gl-hex img-zoom">
            {getImgSrc(img) ? <img src={getImgSrc(img)!} alt="" /> : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, rgb(var(--color-accent)/0.1), rgb(var(--color-surface)))" }} />}
          </div>
        ))}
      </div>
      </StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 13: Infinite scroll (grid + load more)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 13) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="gl-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.08}>
      <div className="ga2 grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((img, i) => <div key={i} className="img-zoom"><ImgCell src={getImgSrc(img)} alt={getCaption(img)} aspect="4/3" className="rounded-2xl" /></div>)}
      </div>
      </StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 14: Justified rows
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 14) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="gl-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.08}>
      <div className="ga2" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {images.map((img, i) => {
          const wide = i % 3 === 0;
          return (
            <div key={i} style={{ height: 200, flex: wide ? "1.6 1 0" : "1 1 0", borderRadius: 12, overflow: "hidden", minWidth: 120 }} className="img-zoom md:!h-[280px]">
              {getImgSrc(img) ? <img src={getImgSrc(img)!} alt="" className="gl-img" style={{ borderRadius: 0 }} /> : <div style={{ width: "100%", height: "100%", background: "rgb(var(--color-surface-deep))" }} />}
            </div>
          );
        })}
      </div>
      </StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 15: Polaroid
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 15) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="gl-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.08}>
      <div className="ga2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img, i) => {
          const rot = ((i % 5) - 2) * 2;
          return (
            <div key={i} className="gl-polaroid img-zoom" style={{ transform: `rotate(${rot}deg)` }}>
              {getImgSrc(img) ? <img src={getImgSrc(img)!} alt="" /> : <div style={{ width: "100%", aspectRatio: "1", background: "rgb(var(--color-surface-deep))", borderRadius: 2 }} />}
              {getCaption(img) && <div className="gl-polaroid-caption">{getCaption(img)}</div>}
            </div>
          );
        })}
      </div>
      </StaggerChildren>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 16: Panorama drag
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 16) {
    const src = getImgSrc(images[0] || {});
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="gl-wrap">
      <Header />
      <div className="ga2" style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 12px 40px rgb(0 0 0/0.08)", cursor: "grab", position: "relative" }}>
        <div style={{ overflowX: "auto", scrollbarWidth: "none" }} className="[&::-webkit-scrollbar]:hidden">
          {src ? <img src={src} alt="" style={{ width: "200%", height: "auto", display: "block", minHeight: 300, objectFit: "cover" }} /> : <div style={{ width: "200%", height: 400, background: "rgb(var(--color-surface-deep))" }} />}
        </div>
        <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", padding: "8px 20px", background: "rgb(0 0 0/0.5)", backdropFilter: "blur(8px)", borderRadius: 100, fontSize: 13, color: "white", display: "flex", alignItems: "center", gap: 8 }}>
          <span>👆</span> Przeciagnij aby zobaczyc
        </div>
      </div>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 17: Slider + thumbnails
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 17) {
    const src = getImgSrc(images[thumbIdx] || {});
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="gl-wrap">
      <Header />
      <div className="ga2" style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 12px 40px rgb(0 0 0/0.08)", marginBottom: 16 }}>
          {src ? <img src={src} alt="" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block", transition: "opacity 0.4s" }} /> : <div style={{ width: "100%", aspectRatio: "4/3", background: "rgb(var(--color-surface-deep))" }} />}
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          {images.slice(0, 6).map((img, i) => (
            <div key={i} onClick={() => setThumbIdx(i)} style={{ width: 64, height: 64, borderRadius: 10, overflow: "hidden", cursor: "pointer", border: i === thumbIdx ? "2px solid rgb(var(--color-accent))" : "2px solid transparent", opacity: i === thumbIdx ? 1 : 0.6, transition: "all 0.2s" }}>
              {getImgSrc(img) ? <img src={getImgSrc(img)!} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", background: "rgb(var(--color-surface-deep))" }} />}
            </div>
          ))}
        </div>
      </div>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 18: Z lupa (zoom on hover)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 18) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="gl-wrap">
      <Header />
      <StaggerChildren staggerDelay={0.08}>
      <div className="ga2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <div key={i} className="img-zoom" style={{ borderRadius: 16, overflow: "hidden", cursor: "zoom-in" }} onClick={() => setLightbox(getImgSrc(img))}>
            <ImgCell src={getImgSrc(img)} alt={getCaption(img)} aspect="3/4" />
          </div>
        ))}
      </div>
      </StaggerChildren>
    </div><Lightbox /></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 19: Marquee (dwa rzedy, przeciwne kierunki)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 19) {
    const half = Math.ceil(images.length / 2);
    const row1 = images.slice(0, half);
    const row2 = images.slice(half);
    return (<section className="bg-bg" style={{ padding: "64px 0", overflow: "hidden" }}><style>{S}</style>
      <div className="gl-wrap"><Header /></div>
      {[row1, row2].map((row, ri) => (
        <div key={ri} style={{ position: "relative", marginBottom: ri === 0 ? 12 : 0 }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to right, rgb(var(--color-bg)), transparent)", zIndex: 2 }} />
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(to left, rgb(var(--color-bg)), transparent)", zIndex: 2 }} />
          <div style={{ display: "flex", gap: 12, animation: `${ri === 0 ? "glMarquee" : "glMarqueeR"} ${30 + ri * 5}s linear infinite`, width: "max-content" }}>
            {[...row, ...row].map((img, i) => (
              <div key={i} style={{ height: 200, borderRadius: 12, overflow: "hidden", flexShrink: 0 }}>
                {getImgSrc(img) ? <img src={getImgSrc(img)!} alt="" style={{ height: "100%", width: "auto", objectFit: "cover", display: "block" }} /> : <div style={{ height: "100%", width: 280, background: "rgb(var(--color-surface-deep))" }} />}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 20: Tilt 3D (default)
  // ═══════════════════════════════════════════════════════════════════════════
  return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}{`
    .gl-tilt{perspective:800px}
    .gl-tilt .gl-cell{transition:transform .4s ease,box-shadow .4s ease}
    .gl-tilt .gl-cell:hover{transform:rotateY(4deg) rotateX(-2deg);box-shadow:-8px 12px 40px rgb(0 0 0/0.12)}
  `}</style><div className="gl-wrap">
    <Header />
    <StaggerChildren staggerDelay={0.08}>
    <div className="ga2 gl-tilt grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((img, i) => (
        <div key={i} className="img-zoom" onClick={() => setLightbox(getImgSrc(img))}>
          <ImgCell src={getImgSrc(img)} alt={getCaption(img)} aspect="4/3" className="rounded-2xl" caption={getCaption(img)} />
        </div>
      ))}
    </div>
    </StaggerChildren>
  </div><Lightbox /></section>);
}
