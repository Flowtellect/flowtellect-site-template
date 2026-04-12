"use client";

// -- BlogSection ---------------------------------------------------------------
// 10 individually crafted blog/article variants matching HTML mockups.

/* eslint-disable @next/next/no-img-element */

import { str, arr, resolveImage } from "./shared";

interface BlogProps {
  content: Record<string, unknown>;
  vn: number;
}

function Arrow() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
}

function fmtDate(v: unknown): string {
  const s = str(v);
  if (!s) return "";
  try {
    const d = new Date(s);
    if (isNaN(d.getTime())) return s;
    return d.toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return s;
  }
}

const S = `
  .bl-wrap{max-width:1280px;margin:0 auto;padding:0 16px}
  @media(min-width:768px){.bl-wrap{padding:0 24px}}@media(min-width:1024px){.bl-wrap{padding:0 48px}}
  .bl-header{text-align:center;max-width:640px;margin:0 auto 48px}
  .bl-eyebrow{display:inline-flex;align-items:center;gap:16px;margin-bottom:20px}
  .bl-eline{width:32px;height:1px;background:linear-gradient(90deg,transparent,rgb(var(--color-accent)/0.4))}
  .bl-eline-r{width:32px;height:1px;background:linear-gradient(90deg,rgb(var(--color-accent)/0.4),transparent)}
  .bl-etxt{font-size:11px;font-weight:600;letter-spacing:.25em;text-transform:uppercase;color:rgb(var(--color-accent))}
  .bl-h2{font-family:var(--font-display);font-size:32px;font-weight:700;line-height:1.15;letter-spacing:-.02em;color:rgb(var(--color-text-primary));margin-bottom:14px}
  @media(min-width:768px){.bl-h2{font-size:40px}}@media(min-width:1024px){.bl-h2{font-size:48px}}
  .bl-h2 em{font-style:italic;color:rgb(var(--color-accent))}
  .bl-desc{font-size:16px;line-height:1.7;color:rgb(var(--color-text-muted))}

  .bl-card{background:rgb(var(--color-surface));border:1px solid rgb(var(--color-border)/0.5);border-radius:20px;overflow:hidden;transition:all .3s;display:flex;flex-direction:column}
  .bl-card:hover{border-color:rgb(var(--color-accent)/0.3);box-shadow:0 12px 40px rgb(0 0 0/0.06);transform:translateY(-4px)}
  .bl-card-img{width:100%;aspect-ratio:16/9;object-fit:cover;display:block;transition:transform .6s}
  .bl-card:hover .bl-card-img{transform:scale(1.05)}
  .bl-card-body{padding:20px 22px 24px;flex:1;display:flex;flex-direction:column}
  .bl-card-title{font-family:var(--font-display);font-size:16px;font-weight:600;color:rgb(var(--color-text-primary));margin-bottom:6px}
  .bl-card-excerpt{font-size:13px;line-height:1.6;color:rgb(var(--color-text-muted));flex:1;margin-bottom:10px}
  .bl-card-date{font-size:12px;font-weight:500;color:rgb(var(--color-text-dim));margin-bottom:8px}
  .bl-card-author{font-size:12px;font-weight:600;color:rgb(var(--color-text-muted))}
  .bl-card-link{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:rgb(var(--color-accent));text-decoration:none;margin-top:10px;transition:gap .2s}
  .bl-card-link:hover{gap:10px}

  .bl-cat{display:inline-block;padding:3px 10px;border-radius:6px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:rgb(var(--color-accent));background:rgb(var(--color-accent)/0.08);margin-bottom:8px}

  .bl-filter{display:inline-flex;align-items:center;padding:8px 20px;border-radius:100px;font-size:13px;font-weight:500;color:rgb(var(--color-text-muted));background:rgb(var(--color-surface));border:1px solid rgb(var(--color-border)/0.5);cursor:pointer;transition:all .2s;text-decoration:none}
  .bl-filter:hover{border-color:rgb(var(--color-accent)/0.3);color:rgb(var(--color-text-primary))}
  .bl-filter-active{background:rgb(var(--color-accent));color:rgb(var(--color-on-accent));border-color:rgb(var(--color-accent))}

  .bl-btn{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;background:rgb(var(--color-accent));color:rgb(var(--color-on-accent));font-family:var(--font-body);font-size:14px;font-weight:600;border-radius:12px;text-decoration:none;transition:all .3s;box-shadow:0 4px 16px rgb(var(--color-accent)/0.3);border:none;cursor:pointer;width:100%;justify-content:center}
  .bl-btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgb(var(--color-accent)/0.4)}
  .bl-btn-sm{padding:10px 20px;width:auto}

  @keyframes blUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  .ba1{opacity:0;animation:blUp .8s ease .1s forwards}
  .ba2{opacity:0;animation:blUp .8s ease .3s forwards}
`;

export default function BlogSection({ content, vn }: BlogProps) {
  const ey = str(content.eyebrow);
  const hl = str(content.headline || content.heading);
  const body = str(content.body);
  const items = arr(content.items || content.posts || content.articles);
  const ctaObj = content.cta as Record<string, unknown> | null;

  const Header = () => (
    <div className="bl-header ba1">
      {ey && <div className="bl-eyebrow"><div className="bl-eline"/><span className="bl-etxt">{ey}</span><div className="bl-eline-r"/></div>}
      <h2 className="bl-h2">{hl}</h2>
      {body && <p className="bl-desc">{body}</p>}
    </div>
  );

  const ImgOrGrad = ({ item, aspect = "16/9", cls = "" }: { item: Record<string, unknown>; aspect?: string; cls?: string }) => {
    const src = resolveImage(item.image || item.src);
    return src
      ? <img src={src} alt={str(item.title || item.name)} style={{ width: "100%", aspectRatio: aspect, objectFit: "cover", display: "block", transition: "transform .6s" }} className={cls} />
      : <div style={{ width: "100%", aspectRatio: aspect, background: "linear-gradient(135deg, rgb(var(--color-accent)/0.1), rgb(var(--color-surface)))" }} />;
  };

  const CardMeta = ({ item }: { item: Record<string, unknown> }) => {
    const date = fmtDate(item.date || item.published || item.publishedAt || item.created);
    const author = str(item.author);
    if (!date && !author) return null;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        {date && <span className="bl-card-date">{date}</span>}
        {date && author && <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgb(var(--color-text-dim))" }} />}
        {author && <span className="bl-card-author">{author}</span>}
      </div>
    );
  };

  // =========================================================================
  // VN 1: 3-col grid - basic blog cards
  // =========================================================================
  if (vn === 1) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="bl-wrap">
      <Header />
      <div className="ba2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <div key={i} className="bl-card">
            <div style={{ overflow: "hidden" }}><ImgOrGrad item={it} /></div>
            <div className="bl-card-body">
              <CardMeta item={it} />
              <div className="bl-card-title">{str(it.title || it.name)}</div>
              <div className="bl-card-excerpt">{str(it.excerpt || it.description || it.desc)}</div>
              <a href={str(it.href || it.url || it.slug) || "#"} className="bl-card-link">Czytaj dalej <Arrow /></a>
            </div>
          </div>
        ))}
      </div>
      {ctaObj && <div className="ba2" style={{ textAlign: "center", marginTop: 40 }}><a href={str(ctaObj.href) || "#"} className="bl-btn bl-btn-sm">{str(ctaObj.label)} <Arrow /></a></div>}
    </div></section>);
  }

  // =========================================================================
  // VN 2: 3-col grid - cards with category badge
  // =========================================================================
  if (vn === 2) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="bl-wrap">
      <Header />
      <div className="ba2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <div key={i} className="bl-card">
            <div style={{ overflow: "hidden" }}><ImgOrGrad item={it} /></div>
            <div className="bl-card-body">
              {str(it.category) && <div className="bl-cat">{str(it.category)}</div>}
              <CardMeta item={it} />
              <div className="bl-card-title">{str(it.title || it.name)}</div>
              <div className="bl-card-excerpt">{str(it.excerpt || it.description || it.desc)}</div>
              {str(it.author) && <div style={{ marginTop: "auto", paddingTop: 12, borderTop: "1px solid rgb(var(--color-border)/0.3)", display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgb(var(--color-accent)/0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "rgb(var(--color-accent))" }}>{str(it.author).charAt(0)}</div>
                <span className="bl-card-author">{str(it.author)}</span>
              </div>}
            </div>
          </div>
        ))}
      </div>
    </div></section>);
  }

  // =========================================================================
  // VN 3: 3-col grid - image overlay with read-more
  // =========================================================================
  if (vn === 3) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}{`
      .bl-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.75) 0%,transparent 60%);opacity:0;transition:opacity .3s;display:flex;align-items:flex-end;padding:20px}
      .bl-card:hover .bl-overlay{opacity:1}
    `}</style><div className="bl-wrap">
      <Header />
      <div className="ba2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <div key={i} className="bl-card" style={{ position: "relative", borderRadius: 20, overflow: "hidden" }}>
            <ImgOrGrad item={it} aspect="4/3" />
            <div className="bl-overlay">
              <div>
                {fmtDate(it.date || it.published) && <div style={{ fontSize: 11, color: "rgb(255 255 255/0.6)", marginBottom: 4 }}>{fmtDate(it.date || it.published)}</div>}
                <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "white", marginBottom: 6 }}>{str(it.title || it.name)}</div>
                <a href={str(it.href || it.url || it.slug) || "#"} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "rgb(var(--color-accent-light))", textDecoration: "none" }}>Czytaj dalej <Arrow /></a>
              </div>
            </div>
          </div>
        ))}
      </div>
      {ctaObj && <div className="ba2" style={{ textAlign: "center", marginTop: 40 }}><a href={str(ctaObj.href) || "#"} className="bl-btn bl-btn-sm">{str(ctaObj.label)} <Arrow /></a></div>}
    </div></section>);
  }

  // =========================================================================
  // VN 4: Carousel - horizontal scroll
  // =========================================================================
  if (vn === 4) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}{`
      .bl-scroll{display:flex;gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding:0 16px 16px}
      .bl-scroll::-webkit-scrollbar{display:none}
      .bl-scroll-card{min-width:300px;scroll-snap-align:start;flex-shrink:0}
      @media(min-width:768px){.bl-scroll{padding:0 24px 16px}.bl-scroll-card{min-width:340px}}
    `}</style><div className="bl-wrap">
      <Header />
      <div className="bl-scroll ba2">
        {items.map((it, i) => (
          <div key={i} className="bl-card bl-scroll-card">
            <div style={{ overflow: "hidden" }}><ImgOrGrad item={it} /></div>
            <div className="bl-card-body">
              <CardMeta item={it} />
              <div className="bl-card-title">{str(it.title || it.name)}</div>
              <div className="bl-card-excerpt">{str(it.excerpt || it.description || it.desc)}</div>
              <a href={str(it.href || it.url || it.slug) || "#"} className="bl-card-link">Czytaj dalej <Arrow /></a>
            </div>
          </div>
        ))}
      </div>
    </div></section>);
  }

  // =========================================================================
  // VN 5: Category filter pills + grid
  // =========================================================================
  if (vn === 5) {
    const categories = Array.from(new Set(items.map(it => str(it.category)).filter(Boolean)));
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="bl-wrap">
      <Header />
      {categories.length > 0 && (
        <div className="ba1" style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 32 }}>
          <span className="bl-filter bl-filter-active">Wszystkie</span>
          {categories.map((cat, i) => (
            <span key={i} className="bl-filter">{cat}</span>
          ))}
        </div>
      )}
      <div className="ba2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <div key={i} className="bl-card">
            <div style={{ overflow: "hidden" }}><ImgOrGrad item={it} /></div>
            <div className="bl-card-body">
              {str(it.category) && <div className="bl-cat">{str(it.category)}</div>}
              <CardMeta item={it} />
              <div className="bl-card-title">{str(it.title || it.name)}</div>
              <div className="bl-card-excerpt">{str(it.excerpt || it.description || it.desc)}</div>
              <a href={str(it.href || it.url || it.slug) || "#"} className="bl-card-link">Czytaj dalej <Arrow /></a>
            </div>
          </div>
        ))}
      </div>
    </div></section>);
  }

  // =========================================================================
  // VN 6: Masonry layout
  // =========================================================================
  if (vn === 6) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}{`
      .bl-masonry{column-count:1;column-gap:16px}
      @media(min-width:640px){.bl-masonry{column-count:2}}
      @media(min-width:1024px){.bl-masonry{column-count:3}}
      .bl-masonry-item{break-inside:avoid;margin-bottom:16px}
    `}</style><div className="bl-wrap">
      <Header />
      <div className="bl-masonry ba2">
        {items.map((it, i) => {
          const tall = i % 3 === 0;
          return (
            <div key={i} className="bl-masonry-item">
              <div className="bl-card">
                <div style={{ overflow: "hidden" }}><ImgOrGrad item={it} aspect={tall ? "3/4" : "16/9"} /></div>
                <div className="bl-card-body">
                  <CardMeta item={it} />
                  <div className="bl-card-title">{str(it.title || it.name)}</div>
                  <div className="bl-card-excerpt">{str(it.excerpt || it.description || it.desc)}</div>
                  <a href={str(it.href || it.url || it.slug) || "#"} className="bl-card-link">Czytaj dalej <Arrow /></a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div></section>);
  }

  // =========================================================================
  // VN 7: Minimal list - no images, just titles + dates + descriptions
  // =========================================================================
  if (vn === 7) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}{`
      .bl-list-item{padding:24px 0;border-bottom:1px solid rgb(var(--color-border)/0.3);transition:all .2s}
      .bl-list-item:first-child{border-top:1px solid rgb(var(--color-border)/0.3)}
      .bl-list-item:hover{padding-left:12px}
    `}</style><div className="bl-wrap">
      <Header />
      <div className="ba2" style={{ maxWidth: 800, margin: "0 auto" }}>
        {items.map((it, i) => {
          const date = fmtDate(it.date || it.published || it.publishedAt || it.created);
          return (
            <div key={i} className="bl-list-item">
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "8px 16px", marginBottom: 6 }}>
                <a href={str(it.href || it.url || it.slug) || "#"} style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "rgb(var(--color-text-primary))", textDecoration: "none", transition: "color .2s" }}>{str(it.title || it.name)}</a>
                {date && <span style={{ fontSize: 13, color: "rgb(var(--color-text-dim))", whiteSpace: "nowrap" }}>{date}</span>}
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.6, color: "rgb(var(--color-text-muted))" }}>{str(it.excerpt || it.description || it.desc)}</div>
              {str(it.author) && <div style={{ fontSize: 12, fontWeight: 600, color: "rgb(var(--color-text-dim))", marginTop: 6 }}>{str(it.author)}</div>}
            </div>
          );
        })}
      </div>
      {ctaObj && <div className="ba2" style={{ textAlign: "center", marginTop: 40 }}><a href={str(ctaObj.href) || "#"} className="bl-btn bl-btn-sm">{str(ctaObj.label)} <Arrow /></a></div>}
    </div></section>);
  }

  // =========================================================================
  // VN 8: Grid + newsletter signup card at end
  // =========================================================================
  if (vn === 8) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}{`
      .bl-nl-card{background:linear-gradient(135deg,rgb(var(--color-accent)/0.08),rgb(var(--color-accent)/0.02));border:1px dashed rgb(var(--color-accent)/0.3);border-radius:20px;padding:32px 24px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;min-height:280px}
      .bl-nl-input{width:100%;padding:10px 16px;border-radius:10px;border:1px solid rgb(var(--color-border)/0.5);background:rgb(var(--color-surface));color:rgb(var(--color-text-primary));font-size:14px;font-family:var(--font-body);outline:none;transition:border-color .2s}
      .bl-nl-input:focus{border-color:rgb(var(--color-accent)/0.5)}
    `}</style><div className="bl-wrap">
      <Header />
      <div className="ba2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <div key={i} className="bl-card">
            <div style={{ overflow: "hidden" }}><ImgOrGrad item={it} /></div>
            <div className="bl-card-body">
              <CardMeta item={it} />
              <div className="bl-card-title">{str(it.title || it.name)}</div>
              <div className="bl-card-excerpt">{str(it.excerpt || it.description || it.desc)}</div>
              <a href={str(it.href || it.url || it.slug) || "#"} className="bl-card-link">Czytaj dalej <Arrow /></a>
            </div>
          </div>
        ))}
        {/* Newsletter signup card */}
        <div className="bl-nl-card">
          <div style={{ fontSize: 28, marginBottom: 12 }}>&#9993;</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "rgb(var(--color-text-primary))", marginBottom: 8 }}>Nie przegap nowych wpisow</div>
          <div style={{ fontSize: 13, color: "rgb(var(--color-text-muted))", marginBottom: 16, lineHeight: 1.5 }}>Zapisz sie do newslettera i otrzymuj powiadomienia o nowych artykulach.</div>
          <div style={{ display: "flex", gap: 8, width: "100%", maxWidth: 280 }}>
            <input type="email" placeholder="Twoj e-mail" className="bl-nl-input" />
            <button className="bl-btn" style={{ width: "auto", whiteSpace: "nowrap", padding: "10px 18px" }}>Zapisz</button>
          </div>
        </div>
      </div>
    </div></section>);
  }

  // =========================================================================
  // VN 9: Timeline - vertical line with posts as timeline items
  // =========================================================================
  if (vn === 9) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}{`
      .bl-timeline{position:relative;max-width:800px;margin:0 auto;padding-left:32px}
      .bl-timeline::before{content:'';position:absolute;left:11px;top:0;bottom:0;width:2px;background:rgb(var(--color-border)/0.4)}
      .bl-tl-item{position:relative;padding-bottom:32px}
      .bl-tl-item:last-child{padding-bottom:0}
      .bl-tl-dot{position:absolute;left:-32px;top:4px;width:22px;height:22px;border-radius:50%;border:3px solid rgb(var(--color-accent));background:rgb(var(--color-surface));z-index:1;transition:background .2s}
      .bl-tl-item:hover .bl-tl-dot{background:rgb(var(--color-accent))}
      @media(min-width:768px){.bl-timeline{padding-left:48px}.bl-timeline::before{left:19px}.bl-tl-dot{left:-48px;width:24px;height:24px}}
    `}</style><div className="bl-wrap">
      <Header />
      <div className="bl-timeline ba2">
        {items.map((it, i) => {
          const date = fmtDate(it.date || it.published || it.publishedAt || it.created);
          const src = resolveImage(it.image || it.src);
          return (
            <div key={i} className="bl-tl-item">
              <div className="bl-tl-dot" />
              {date && <div style={{ fontSize: 12, fontWeight: 600, color: "rgb(var(--color-accent))", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>{date}</div>}
              <div className="bl-card" style={{ flexDirection: src ? "row" : "column" }}>
                {src && (
                  <div style={{ flexShrink: 0, width: "100%", maxWidth: 180, overflow: "hidden" }}>
                    <img src={src} alt={str(it.title || it.name)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", minHeight: 120 }} />
                  </div>
                )}
                <div className="bl-card-body" style={{ padding: "16px 20px" }}>
                  <div className="bl-card-title">{str(it.title || it.name)}</div>
                  <div className="bl-card-excerpt">{str(it.excerpt || it.description || it.desc)}</div>
                  {str(it.author) && <div className="bl-card-author" style={{ marginTop: 4 }}>{str(it.author)}</div>}
                  <a href={str(it.href || it.url || it.slug) || "#"} className="bl-card-link">Czytaj dalej <Arrow /></a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div></section>);
  }

  // =========================================================================
  // VN 10: Magazine - first post featured large, rest in 3-col grid
  // =========================================================================
  if (vn === 10) {
    const featured = items[0];
    const rest = items.slice(1);
    if (!featured) {
      return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="bl-wrap"><Header /></div></section>);
    }
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="bl-wrap">
      <Header />
      {/* Featured large post */}
      <div className="ba1 grid grid-cols-1 md:grid-cols-2 gap-8 items-center" style={{ marginBottom: 40 }}>
        <div style={{ borderRadius: 24, overflow: "hidden", boxShadow: "0 16px 48px rgb(0 0 0/0.08)" }}>
          <ImgOrGrad item={featured} aspect="4/3" />
        </div>
        <div>
          {str(featured.category) && <div className="bl-cat">{str(featured.category)}</div>}
          <CardMeta item={featured} />
          <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "rgb(var(--color-text-primary))", marginBottom: 10, lineHeight: 1.2 }}>{str(featured.title || featured.name)}</div>
          <div style={{ fontSize: 15, lineHeight: 1.7, color: "rgb(var(--color-text-muted))", marginBottom: 16 }}>{str(featured.excerpt || featured.description || featured.desc)}</div>
          <a href={str(featured.href || featured.url || featured.slug) || "#"} className="bl-btn bl-btn-sm">Czytaj dalej <Arrow /></a>
        </div>
      </div>
      {/* Rest in grid */}
      {rest.length > 0 && (
        <div className="ba2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((it, i) => (
            <div key={i} className="bl-card">
              <div style={{ overflow: "hidden" }}><ImgOrGrad item={it} /></div>
              <div className="bl-card-body">
                <CardMeta item={it} />
                <div className="bl-card-title">{str(it.title || it.name)}</div>
                <div className="bl-card-excerpt">{str(it.excerpt || it.description || it.desc)}</div>
                <a href={str(it.href || it.url || it.slug) || "#"} className="bl-card-link">Czytaj dalej <Arrow /></a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div></section>);
  }

  // =========================================================================
  // Fallback - basic 3-col grid (same as vn 1)
  // =========================================================================
  return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="bl-wrap">
    <Header />
    <div className="ba2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((it, i) => (
        <div key={i} className="bl-card">
          <div style={{ overflow: "hidden" }}><ImgOrGrad item={it} /></div>
          <div className="bl-card-body">
            <CardMeta item={it} />
            <div className="bl-card-title">{str(it.title || it.name)}</div>
            <div className="bl-card-excerpt">{str(it.excerpt || it.description || it.desc)}</div>
            <a href={str(it.href || it.url || it.slug) || "#"} className="bl-card-link">Czytaj dalej <Arrow /></a>
          </div>
        </div>
      ))}
    </div>
  </div></section>);
}
