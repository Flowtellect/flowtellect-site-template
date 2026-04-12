"use client";

// -- ShowcaseSection ----------------------------------------------------------
// 10 portfolio/showcase variants - cards with image + overlay on hover.
// Content items: image/src, title/name, description, category, client, link/href.

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { str, arr, resolveImage } from "./shared";

interface ShowcaseProps {
  content: Record<string, unknown>;
  vn: number;
}

const S = `
  .sc-wrap{max-width:1280px;margin:0 auto;padding:0 16px}
  @media(min-width:768px){.sc-wrap{padding:0 24px}}@media(min-width:1024px){.sc-wrap{padding:0 48px}}
  .sc-header{text-align:center;max-width:640px;margin:0 auto 48px}
  .sc-eyebrow{display:inline-flex;align-items:center;gap:16px;margin-bottom:20px}
  .sc-eline{width:32px;height:1px;background:linear-gradient(90deg,transparent,rgb(var(--color-accent)/0.4))}
  .sc-eline-r{width:32px;height:1px;background:linear-gradient(90deg,rgb(var(--color-accent)/0.4),transparent)}
  .sc-etxt{font-size:11px;font-weight:600;letter-spacing:.25em;text-transform:uppercase;color:rgb(var(--color-accent))}
  .sc-h2{font-family:var(--font-display);font-size:32px;font-weight:700;line-height:1.15;letter-spacing:-.02em;color:rgb(var(--color-text-primary));margin-bottom:14px}
  @media(min-width:768px){.sc-h2{font-size:40px}}@media(min-width:1024px){.sc-h2{font-size:48px}}
  .sc-desc{font-size:16px;line-height:1.7;color:rgb(var(--color-text-muted))}

  .sc-card{position:relative;overflow:hidden;border-radius:16px;cursor:pointer;background:rgb(var(--color-surface))}
  .sc-card img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s ease}
  .sc-card:hover img{transform:scale(1.06)}
  .sc-card:hover .sc-overlay{opacity:1}
  .sc-card:hover .sc-overlay-content{transform:translateY(0)}
  .sc-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.7),rgba(0,0,0,0.1) 50%,transparent);opacity:0;transition:opacity .4s;display:flex;align-items:flex-end;padding:20px}
  .sc-overlay-content{transform:translateY(8px);transition:transform .4s ease}
  .sc-overlay-title{font-family:var(--font-display);font-size:16px;font-weight:600;color:white;margin-bottom:4px}
  .sc-overlay-cat{font-size:12px;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:.1em;font-weight:500}
  .sc-overlay-desc{font-size:13px;color:rgba(255,255,255,0.8);margin-top:6px;line-height:1.5}

  .sc-pill{display:inline-flex;align-items:center;padding:6px 16px;border-radius:100px;font-size:13px;font-weight:500;cursor:pointer;transition:all .3s;border:1px solid rgb(var(--color-border)/0.4);color:rgb(var(--color-text-muted));background:transparent}
  .sc-pill:hover{border-color:rgb(var(--color-accent)/0.5);color:rgb(var(--color-accent))}
  .sc-pill-active{background:rgb(var(--color-accent));color:rgb(var(--color-on-accent));border-color:rgb(var(--color-accent))}
  .sc-pill-active:hover{background:rgb(var(--color-accent));color:rgb(var(--color-on-accent))}

  .sc-scroll{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding:0 16px}
  .sc-scroll::-webkit-scrollbar{display:none}
  .sc-scroll-item{min-width:300px;scroll-snap-align:start;flex-shrink:0;border-radius:16px;overflow:hidden;position:relative}
  @media(min-width:768px){.sc-scroll-item{min-width:360px}}

  .sc-lightbox{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;padding:20px;cursor:zoom-out}
  .sc-lightbox img{max-width:100%;max-height:80vh;object-fit:contain;border-radius:12px}
  .sc-lightbox-close{position:absolute;top:20px;right:20px;width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,0.1);border:none;color:white;font-size:24px;cursor:pointer;display:flex;align-items:center;justify-content:center}
  .sc-lightbox-info{position:absolute;bottom:40px;left:50%;transform:translateX(-50%);text-align:center;color:white;max-width:600px}
  .sc-lightbox-info h3{font-family:var(--font-display);font-size:20px;font-weight:600;margin-bottom:6px}
  .sc-lightbox-info p{font-size:14px;color:rgba(255,255,255,0.7)}

  .sc-masonry{column-count:1;column-gap:12px}
  @media(min-width:640px){.sc-masonry{column-count:2}}
  @media(min-width:1024px){.sc-masonry{column-count:3}}
  .sc-masonry-item{break-inside:avoid;margin-bottom:12px}

  .sc-case{border-radius:16px;overflow:hidden;border:1px solid rgb(var(--color-border)/0.3);background:rgb(var(--color-surface));transition:transform .3s,box-shadow .3s}
  .sc-case:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgb(0 0 0/0.08)}
  .sc-case-body{padding:24px}
  .sc-case-title{font-family:var(--font-display);font-size:18px;font-weight:600;color:rgb(var(--color-text-primary));margin-bottom:8px}
  .sc-case-cat{font-size:11px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;color:rgb(var(--color-accent));margin-bottom:12px}
  .sc-case-desc{font-size:14px;line-height:1.7;color:rgb(var(--color-text-muted));margin-bottom:16px}
  .sc-case-results{display:flex;gap:24px;padding-top:16px;border-top:1px solid rgb(var(--color-border)/0.3)}
  .sc-case-stat-val{font-family:var(--font-display);font-size:22px;font-weight:700;color:rgb(var(--color-accent))}
  .sc-case-stat-lbl{font-size:11px;color:rgb(var(--color-text-dim));margin-top:2px}

  .sc-ba-pair{display:grid;grid-template-columns:1fr 1fr;gap:4px;border-radius:16px;overflow:hidden}
  .sc-ba-label{position:absolute;top:12px;padding:4px 12px;border-radius:100px;font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:white}
  .sc-ba-before{left:12px;background:rgba(0,0,0,0.5);backdrop-filter:blur(8px)}
  .sc-ba-after{right:12px;background:rgb(var(--color-accent)/0.9)}

  .sc-slider{position:relative;border-radius:24px;overflow:hidden;box-shadow:0 16px 48px rgb(0 0 0/0.08)}
  .sc-slider-arrow{position:absolute;top:50%;transform:translateY(-50%);width:48px;height:48px;border-radius:50%;background:rgb(255 255 255/0.15);backdrop-filter:blur(8px);border:1px solid rgb(255 255 255/0.2);color:white;font-size:22px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .3s}
  .sc-slider-arrow:hover{background:rgb(255 255 255/0.25)}
  .sc-slider-dots{position:absolute;bottom:20px;left:50%;transform:translateX(-50%);display:flex;gap:6px}

  .sc-2col{display:grid;grid-template-columns:1fr;gap:20px}
  @media(min-width:768px){.sc-2col{grid-template-columns:1fr 1fr}}
  .sc-2col-card{position:relative;overflow:hidden;border-radius:20px;cursor:pointer}
  .sc-2col-card img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block;transition:transform .6s ease,filter .4s}
  .sc-2col-card:hover img{transform:scale(1.04);filter:brightness(0.7)}
  .sc-2col-card:hover .sc-2col-info{opacity:1;transform:translateY(0)}
  .sc-2col-info{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:32px;opacity:0;transform:translateY(12px);transition:all .4s ease}
  .sc-2col-title{font-family:var(--font-display);font-size:24px;font-weight:700;color:white;margin-bottom:8px}
  .sc-2col-cat{font-size:12px;text-transform:uppercase;letter-spacing:.15em;color:rgba(255,255,255,0.7);margin-bottom:12px;font-weight:500}
  .sc-2col-desc{font-size:14px;color:rgba(255,255,255,0.8);line-height:1.6;max-width:360px}
  .sc-2col-link{display:inline-flex;align-items:center;gap:6px;margin-top:16px;font-size:13px;font-weight:600;color:white;text-decoration:none;border-bottom:1px solid rgba(255,255,255,0.4);padding-bottom:2px;transition:border-color .3s}
  .sc-2col-link:hover{border-color:white}

  @keyframes scUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  .sca1{opacity:0;animation:scUp .8s ease .1s forwards}
  .sca2{opacity:0;animation:scUp .8s ease .3s forwards}
`;

export default function ShowcaseSection({ content, vn }: ShowcaseProps) {
  const hl = str(content.heading || content.headline);
  const body = str(content.body);
  const ey = str(content.eyebrow);
  const items = arr(content.items || content.projects || content.works);

  // -- All useState hooks declared at the top before any if blocks ------------
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [slideIdx, setSlideIdx] = useState(0);
  const [activeFilter, setActiveFilter] = useState("All");

  // -- Helpers ----------------------------------------------------------------
  const getImg = (it: Record<string, unknown>) => resolveImage(it.image || it.src || it.photo || it.thumbnail);
  const getTitle = (it: Record<string, unknown>) => str(it.title || it.name);
  const getDesc = (it: Record<string, unknown>) => str(it.description || it.desc || it.summary);
  const getCat = (it: Record<string, unknown>) => str(it.category || it.tag || it.type);
  const getClient = (it: Record<string, unknown>) => str(it.client || it.company);
  const getLink = (it: Record<string, unknown>) => str(it.link || it.href || it.url);

  // -- Sub-components ---------------------------------------------------------
  const Header = () => (
    <div className="sc-header sca1">
      {ey && <div className="sc-eyebrow"><div className="sc-eline"/><span className="sc-etxt">{ey}</span><div className="sc-eline-r"/></div>}
      <h2 className="sc-h2">{hl}</h2>
      {body && <p className="sc-desc">{body}</p>}
    </div>
  );

  const LightboxModal = () => {
    if (lightboxIdx === null) return null;
    const it = items[lightboxIdx];
    if (!it) return null;
    const src = getImg(it);
    return (
      <div className="sc-lightbox" onClick={() => setLightboxIdx(null)}>
        {src && <img src={src} alt={getTitle(it)} />}
        <button className="sc-lightbox-close" onClick={() => setLightboxIdx(null)}>&#10005;</button>
        <div className="sc-lightbox-info" onClick={(e) => e.stopPropagation()}>
          <h3>{getTitle(it)}</h3>
          {getCat(it) && <p>{getCat(it)}{getClient(it) ? ` - ${getClient(it)}` : ""}</p>}
        </div>
      </div>
    );
  };

  const CardOverlay = ({ it }: { it: Record<string, unknown> }) => (
    <div className="sc-overlay">
      <div className="sc-overlay-content">
        <div className="sc-overlay-title">{getTitle(it)}</div>
        {getCat(it) && <div className="sc-overlay-cat">{getCat(it)}</div>}
      </div>
    </div>
  );

  // =========================================================================
  // VN 1: Grid 3-col with hover overlay (title + category)
  // =========================================================================
  if (vn === 1) {
    return (
      <section className="bg-bg" style={{ padding: "64px 0" }}>
        <style>{S}</style>
        <div className="sc-wrap">
          <Header />
          <div className="sca2" style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: 16 }}>
            <style>{`@media(min-width:640px){.sc-grid3{grid-template-columns:repeat(2,1fr)!important}}@media(min-width:1024px){.sc-grid3{grid-template-columns:repeat(3,1fr)!important}}`}</style>
            <div className="sc-grid3" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
              {items.map((it, i) => {
                const src = getImg(it);
                const href = getLink(it);
                const inner = (
                  <div key={i} className="sc-card" style={{ aspectRatio: "4/3" }}>
                    {src ? <img src={src} alt={getTitle(it)} /> : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, rgb(var(--color-accent)/0.1), rgb(var(--color-surface)))" }} />}
                    <CardOverlay it={it} />
                  </div>
                );
                return href ? <a key={i} href={href} style={{ textDecoration: "none" }}>{inner}</a> : <div key={i}>{inner}</div>;
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // VN 2: Masonry with hover overlay
  // =========================================================================
  if (vn === 2) {
    return (
      <section className="bg-bg" style={{ padding: "64px 0" }}>
        <style>{S}</style>
        <div className="sc-wrap">
          <Header />
          <div className="sc-masonry sca2">
            {items.map((it, i) => {
              const src = getImg(it);
              return (
                <div key={i} className="sc-masonry-item">
                  <div className="sc-card" style={{ aspectRatio: i % 3 === 0 ? "3/4" : i % 3 === 1 ? "1/1" : "4/3" }}>
                    {src ? <img src={src} alt={getTitle(it)} /> : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, rgb(var(--color-accent)/0.1), rgb(var(--color-surface)))" }} />}
                    <CardOverlay it={it} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // VN 3: Carousel horizontal scroll
  // =========================================================================
  if (vn === 3) {
    return (
      <section className="bg-bg" style={{ padding: "64px 0" }}>
        <style>{S}</style>
        <div className="sc-wrap"><Header /></div>
        <div className="sc-scroll sca2">
          {items.map((it, i) => {
            const src = getImg(it);
            return (
              <div key={i} className="sc-scroll-item sc-card" style={{ aspectRatio: "4/3" }}>
                {src ? <img src={src} alt={getTitle(it)} /> : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, rgb(var(--color-accent)/0.1), rgb(var(--color-surface)))" }} />}
                <CardOverlay it={it} />
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // =========================================================================
  // VN 4: Lightbox (click opens fullscreen with info)
  // =========================================================================
  if (vn === 4) {
    return (
      <section className="bg-bg" style={{ padding: "64px 0" }}>
        <style>{S}</style>
        <div className="sc-wrap">
          <Header />
          <div className="sca2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            <style>{`@media(min-width:768px){.sc-lb-grid{grid-template-columns:repeat(3,1fr)!important}}@media(min-width:1024px){.sc-lb-grid{grid-template-columns:repeat(4,1fr)!important}}`}</style>
            <div className="sc-lb-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
              {items.map((it, i) => {
                const src = getImg(it);
                return (
                  <div key={i} className="sc-card" style={{ aspectRatio: "1/1", cursor: "zoom-in" }} onClick={() => setLightboxIdx(i)}>
                    {src ? <img src={src} alt={getTitle(it)} /> : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, rgb(var(--color-accent)/0.1), rgb(var(--color-surface)))" }} />}
                    <CardOverlay it={it} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <LightboxModal />
      </section>
    );
  }

  // =========================================================================
  // VN 5: Case study cards (image + title + description + results)
  // =========================================================================
  if (vn === 5) {
    return (
      <section className="bg-bg" style={{ padding: "64px 0" }}>
        <style>{S}</style>
        <div className="sc-wrap">
          <Header />
          <div className="sca2" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
            <style>{`@media(min-width:768px){.sc-case-grid{grid-template-columns:repeat(2,1fr)!important}}@media(min-width:1024px){.sc-case-grid{grid-template-columns:repeat(3,1fr)!important}}`}</style>
            <div className="sc-case-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
              {items.map((it, i) => {
                const src = getImg(it);
                const href = getLink(it);
                const results = arr(it.results || it.stats || it.metrics);
                const card = (
                  <div className="sc-case">
                    <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                      {src ? <img src={src} alt={getTitle(it)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /> : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, rgb(var(--color-accent)/0.1), rgb(var(--color-surface)))" }} />}
                    </div>
                    <div className="sc-case-body">
                      {getCat(it) && <div className="sc-case-cat">{getCat(it)}</div>}
                      <div className="sc-case-title">{getTitle(it)}</div>
                      {getClient(it) && <div style={{ fontSize: 12, color: "rgb(var(--color-text-dim))", marginBottom: 8 }}>Client: {getClient(it)}</div>}
                      {getDesc(it) && <div className="sc-case-desc">{getDesc(it)}</div>}
                      {results.length > 0 && (
                        <div className="sc-case-results">
                          {results.map((r, ri) => (
                            <div key={ri}>
                              <div className="sc-case-stat-val">{str(r.value || r.number)}</div>
                              <div className="sc-case-stat-lbl">{str(r.label || r.name)}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
                return href ? <a key={i} href={href} style={{ textDecoration: "none", color: "inherit" }}>{card}</a> : <div key={i}>{card}</div>;
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // VN 6: With category filter pills
  // =========================================================================
  if (vn === 6) {
    const categories = ["All", ...Array.from(new Set(items.map(getCat).filter(Boolean)))];
    const filtered = activeFilter === "All" ? items : items.filter((it) => getCat(it) === activeFilter);

    return (
      <section className="bg-bg" style={{ padding: "64px 0" }}>
        <style>{S}</style>
        <div className="sc-wrap">
          <Header />
          <div className="sca1" style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 32 }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`sc-pill ${activeFilter === cat ? "sc-pill-active" : ""}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="sca2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            <style>{`@media(min-width:1024px){.sc-filter-grid{grid-template-columns:repeat(3,1fr)!important}}`}</style>
            <div className="sc-filter-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
              {filtered.map((it, i) => {
                const src = getImg(it);
                return (
                  <div key={i} className="sc-card" style={{ aspectRatio: "4/3" }} onClick={() => setLightboxIdx(items.indexOf(it))}>
                    {src ? <img src={src} alt={getTitle(it)} /> : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, rgb(var(--color-accent)/0.1), rgb(var(--color-surface)))" }} />}
                    <CardOverlay it={it} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <LightboxModal />
      </section>
    );
  }

  // =========================================================================
  // VN 7: Before/after pairs
  // =========================================================================
  if (vn === 7) {
    const pairs: { before: Record<string, unknown>; after: Record<string, unknown>; label: string }[] = [];
    for (let i = 0; i < items.length; i += 2) {
      pairs.push({
        before: items[i],
        after: items[i + 1] || items[i],
        label: getTitle(items[i]) || `Project ${Math.floor(i / 2) + 1}`,
      });
    }

    return (
      <section className="bg-bg" style={{ padding: "64px 0" }}>
        <style>{S}</style>
        <div className="sc-wrap">
          <Header />
          <div className="sca2" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }}>
            <style>{`@media(min-width:768px){.sc-ba-grid{grid-template-columns:repeat(2,1fr)!important}}`}</style>
            <div className="sc-ba-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }}>
              {pairs.map((pair, i) => {
                const beforeSrc = getImg(pair.before);
                const afterSrc = getImg(pair.after);
                return (
                  <div key={i}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "rgb(var(--color-text-primary))", marginBottom: 12, fontFamily: "var(--font-display)" }}>{pair.label}</div>
                    <div className="sc-ba-pair">
                      <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                        {beforeSrc ? <img src={beforeSrc} alt="Before" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /> : <div style={{ width: "100%", height: "100%", background: "rgb(var(--color-surface-deep))" }} />}
                        <div className="sc-ba-label sc-ba-before">Before</div>
                      </div>
                      <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                        {afterSrc ? <img src={afterSrc} alt="After" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /> : <div style={{ width: "100%", height: "100%", background: "rgb(var(--color-surface-deep))" }} />}
                        <div className="sc-ba-label sc-ba-after">After</div>
                      </div>
                    </div>
                    {getDesc(pair.before) && <div style={{ fontSize: 13, color: "rgb(var(--color-text-muted))", marginTop: 10, lineHeight: 1.6 }}>{getDesc(pair.before)}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // VN 8: Mixed media (images + video indicator)
  // =========================================================================
  if (vn === 8) {
    return (
      <section className="bg-bg" style={{ padding: "64px 0" }}>
        <style>{S}</style>
        <div className="sc-wrap">
          <Header />
          <div className="sca2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            <style>{`@media(min-width:768px){.sc-mix-grid{grid-template-columns:repeat(3,1fr)!important}}`}</style>
            <div className="sc-mix-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
              {items.map((it, i) => {
                const src = getImg(it);
                const isVideo = str(it.type || it.media_type).toLowerCase().includes("video") || i % 4 === 2;
                return (
                  <div key={i} className="sc-card" style={{ aspectRatio: "4/3" }} onClick={() => setLightboxIdx(i)}>
                    {src ? <img src={src} alt={getTitle(it)} /> : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, rgb(var(--color-accent)/0.1), rgb(var(--color-surface)))" }} />}
                    {isVideo && (
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgb(0 0 0/0.15)", pointerEvents: "none" }}>
                        <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgb(var(--color-surface)/0.95)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgb(0 0 0/0.15)" }}>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="rgb(var(--color-accent))"><polygon points="5,3 19,12 5,21"/></svg>
                        </div>
                      </div>
                    )}
                    <CardOverlay it={it} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <LightboxModal />
      </section>
    );
  }

  // =========================================================================
  // VN 9: Fullscreen slider
  // =========================================================================
  if (vn === 9) {
    const current = items[slideIdx] || {};
    const src = getImg(current);
    return (
      <section className="bg-bg" style={{ padding: "64px 0" }}>
        <style>{S}</style>
        <div className="sc-wrap">
          <Header />
          <div className="sc-slider sca2">
            <div style={{ position: "relative", aspectRatio: "16/9" }}>
              {src ? <img src={src} alt={getTitle(current)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "opacity 0.5s" }} /> : <div style={{ width: "100%", height: "100%", background: "rgb(var(--color-surface-deep))" }} />}
              {/* Overlay info */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px 28px", background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "white", marginBottom: 4 }}>{getTitle(current)}</div>
                {getCat(current) && <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{getCat(current)}{getClient(current) ? ` - ${getClient(current)}` : ""}</div>}
              </div>
              {/* Counter */}
              <div style={{ position: "absolute", top: 16, right: 16, padding: "6px 14px", background: "rgb(0 0 0/0.5)", backdropFilter: "blur(8px)", borderRadius: 8, fontSize: 13, color: "white", fontWeight: 500 }}>{slideIdx + 1} / {items.length}</div>
              {/* Arrows */}
              {items.length > 1 && <>
                <button className="sc-slider-arrow" style={{ left: 16 }} onClick={() => setSlideIdx((slideIdx - 1 + items.length) % items.length)}>&lsaquo;</button>
                <button className="sc-slider-arrow" style={{ right: 16 }} onClick={() => setSlideIdx((slideIdx + 1) % items.length)}>&rsaquo;</button>
              </>}
              {/* Dots */}
              <div className="sc-slider-dots">
                {items.map((_, i) => (
                  <div key={i} onClick={() => setSlideIdx(i)} style={{ width: i === slideIdx ? 24 : 8, height: 8, borderRadius: 4, background: i === slideIdx ? "white" : "rgb(255 255 255/0.4)", cursor: "pointer", transition: "all 0.3s" }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // VN 10 (default): 2-col large with hover details
  // =========================================================================
  return (
    <section className="bg-bg" style={{ padding: "64px 0" }}>
      <style>{S}</style>
      <div className="sc-wrap">
        <Header />
        <div className="sc-2col sca2">
          {items.map((it, i) => {
            const src = getImg(it);
            const href = getLink(it);
            const inner = (
              <div className="sc-2col-card">
                {src ? <img src={src} alt={getTitle(it)} /> : <div style={{ width: "100%", aspectRatio: "4/3", background: "linear-gradient(135deg, rgb(var(--color-accent)/0.1), rgb(var(--color-surface)))" }} />}
                <div className="sc-2col-info">
                  {getCat(it) && <div className="sc-2col-cat">{getCat(it)}</div>}
                  <div className="sc-2col-title">{getTitle(it)}</div>
                  {getDesc(it) && <div className="sc-2col-desc">{getDesc(it)}</div>}
                  {href && <span className="sc-2col-link">View Project &rarr;</span>}
                </div>
              </div>
            );
            return href ? <a key={i} href={href} style={{ textDecoration: "none" }}>{inner}</a> : <div key={i}>{inner}</div>;
          })}
        </div>
      </div>
    </section>
  );
}
