"use client";

// ─── FooterSection ───────────────────────────────────────────────────────────
// 15 individually crafted footer variants matching HTML mockups.

/* eslint-disable @next/next/no-img-element */

import { str, arr, resolveImage, BrandLogo } from "./shared";

interface FooterProps {
  content: Record<string, unknown>;
  vn: number;
}

// SVG social icons
const SOCIALS: Record<string, React.ReactNode> = {
  facebook: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  instagram: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  twitter: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  x: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  linkedin: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  youtube: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  tiktok: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>,
  pinterest: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/></svg>,
  whatsapp: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
};

function getSocialSvg(platform: string): React.ReactNode {
  const k = platform.toLowerCase().trim();
  if (SOCIALS[k]) return SOCIALS[k];
  for (const [key, val] of Object.entries(SOCIALS)) { if (k.includes(key)) return val; }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>;
}

const S = `
  .ft-wrap{max-width:1280px;margin:0 auto;padding:0 16px}
  @media(min-width:768px){.ft-wrap{padding:0 24px}}@media(min-width:1024px){.ft-wrap{padding:0 48px}}
  .ft-link{font-size:13px;color:rgb(var(--color-text-muted));text-decoration:none;transition:color .2s;display:block;padding:4px 0}
  .ft-link:hover{color:rgb(var(--color-accent))}
  .ft-link-w{font-size:13px;color:rgb(var(--color-text-primary) /0.6);text-decoration:none;transition:color .2s;display:block;padding:4px 0}
  .ft-link-w:hover{color:rgb(var(--color-text-primary))}
  .ft-col-title{font-family:var(--font-display);font-size:14px;font-weight:600;color:rgb(var(--color-text-primary));margin-bottom:16px}
  .ft-col-title-w{font-family:var(--font-display);font-size:14px;font-weight:600;color:rgb(var(--color-text-primary));margin-bottom:16px}
  .ft-tagline{font-size:13px;color:rgb(var(--color-text-muted));line-height:1.6;max-width:280px;margin-top:12px}
  .ft-tagline-w{font-size:13px;color:rgb(var(--color-text-primary) /0.6);line-height:1.6;max-width:280px;margin-top:12px}
  .ft-copy{font-size:12px;color:rgb(var(--color-text-dim))}
  .ft-copy-w{font-size:12px;color:rgb(var(--color-text-primary) /0.4)}
  .ft-social{width:36px;height:36px;border-radius:50%;background:rgb(var(--color-accent)/0.08);display:flex;align-items:center;justify-content:center;color:rgb(var(--color-accent));transition:all .3s;text-decoration:none}
  .ft-social:hover{background:rgb(var(--color-accent));color:rgb(var(--color-on-accent))}
  .ft-social-w{width:36px;height:36px;border-radius:50%;background:rgb(var(--color-text-primary) /0.1);display:flex;align-items:center;justify-content:center;color:rgb(var(--color-text-primary));transition:all .3s;text-decoration:none}
  .ft-social-w:hover{background:rgb(var(--color-text-primary) /0.2)}
  .ft-social-lg{width:44px;height:44px}
  @keyframes ftMarquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
`;

export default function FooterSection({ content, vn }: FooterProps) {
  const tagline = str(content.tagline);
  const columns = arr(content.columns);
  const flatLinks = arr(content.links);
  const socials = arr(content.socials || content.social_links);
  const copyright = str(content.copyright);
  const phone = str(content.phone);
  const email = str(content.email);
  const hours = str(content.hours);
  const address = str(content.address);

  const SocialIcons = ({ white, large }: { white?: boolean; large?: boolean }) => (
    <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
      {socials.map((s, i) => (
        <a key={i} href={str(s.href || s.url) || "#"} className={`${white ? "ft-social-w" : "ft-social"} ${large ? "ft-social-lg" : ""}`} target="_blank" rel="noopener noreferrer" aria-label={str(s.platform || s.label)}>
          {getSocialSvg(str(s.platform || s.icon || s.label))}
        </a>
      ))}
    </div>
  );

  const Columns = ({ white }: { white?: boolean }) => (
    <>
      {columns.map((col, i) => (
        <div key={i}>
          <div className={white ? "ft-col-title-w" : "ft-col-title"}>{str(col.heading)}</div>
          {arr(col.links).map((link, j) => (
            <a key={j} href={str(link.href) || "#"} className={white ? "ft-link-w" : "ft-link"}>{str(link.label)}</a>
          ))}
        </div>
      ))}
      {flatLinks.length > 0 && columns.length === 0 && (
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {flatLinks.map((link, i) => <a key={i} href={str(link.href) || "#"} className={white ? "ft-link-w" : "ft-link"}>{str(link.label)}</a>)}
        </div>
      )}
    </>
  );

  const CopyBar = ({ white }: { white?: boolean }) => (
    <div style={{ paddingTop: 24, marginTop: 32, borderTop: `1px solid ${white ? "rgb(var(--color-text-primary) /0.1)" : "rgb(var(--color-border)/0.5)"}` }}>
      <p className={white ? "ft-copy-w" : "ft-copy"}>{copyright || "© 2025 Wszelkie prawa zastrzezone."}</p>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 1: Prosta - single row
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 1) {
    return (<footer className="bg-bg" style={{ borderTop: "1px solid rgb(var(--color-border)/0.5)", padding: "24px 0" }}><style>{S}</style><div className="ft-wrap" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
      <BrandLogo content={content} size="sm" />
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {flatLinks.map((l, i) => <a key={i} href={str(l.href) || "#"} className="ft-link">{str(l.label)}</a>)}
        {columns.map(col => arr(col.links).map((l, j) => <a key={j} href={str(l.href) || "#"} className="ft-link">{str(l.label)}</a>))}
      </div>
      <p className="ft-copy">{copyright}</p>
    </div></footer>);
  }

  // VN 2: Kolumny klasyczne
  if (vn === 2) {
    return (<footer style={{ background: "rgb(var(--color-surface-deep))", borderTop: "1px solid rgb(var(--color-border)/0.5)", padding: "48px 0" }}><style>{S}</style><div className="ft-wrap">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <BrandLogo content={content} size="sm" />
          {tagline && <p className="ft-tagline">{tagline}</p>}
          <SocialIcons />
        </div>
        <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
          <Columns />
        </div>
      </div>
      <CopyBar />
    </div></footer>);
  }

  // VN 3: Z newsletterem
  if (vn === 3) {
    return (<footer style={{ background: "rgb(var(--color-surface-deep))", borderTop: "1px solid rgb(var(--color-border)/0.5)", padding: "48px 0" }}><style>{S}</style><div className="ft-wrap">
      {/* Newsletter */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 20, paddingBottom: 32, marginBottom: 32, borderBottom: "1px solid rgb(var(--color-border)/0.5)" }}>
        <div><div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, marginBottom: 4 }}>Dostaj 10% rabatu</div><p style={{ fontSize: 13, color: "rgb(var(--color-text-muted))" }}>Zapisz sie na newsletter</p></div>
        <div style={{ display: "flex", gap: 0 }}>
          <input type="email" placeholder="Twoj email" style={{ padding: "10px 16px", border: "1px solid rgb(var(--color-border))", borderRadius: "10px 0 0 10px", fontSize: 14, fontFamily: "var(--font-body)", outline: "none", width: 240, background: "rgb(var(--color-bg))" }} />
          <button style={{ padding: "10px 20px", background: "rgb(var(--color-accent))", color: "rgb(var(--color-on-accent))", border: "none", borderRadius: "0 10px 10px 0", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-body)" }}>Zapisz sie</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4"><BrandLogo content={content} size="sm" />{tagline && <p className="ft-tagline">{tagline}</p>}<SocialIcons /></div>
        <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8"><Columns /></div>
      </div>
      <CopyBar />
    </div></footer>);
  }

  // VN 4: Z social media (duze ikony)
  if (vn === 4) {
    return (<footer style={{ background: "rgb(var(--color-surface-deep))", borderTop: "1px solid rgb(var(--color-border)/0.5)", padding: "48px 0" }}><style>{S}</style><div className="ft-wrap">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4"><BrandLogo content={content} size="sm" />{tagline && <p className="ft-tagline">{tagline}</p>}<SocialIcons large /></div>
        <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8"><Columns /></div>
      </div>
      <CopyBar />
    </div></footer>);
  }

  // VN 5: Z CTA
  if (vn === 5) {
    return (<footer><style>{S}</style>
      <div style={{ background: "rgb(var(--color-accent))", color: "rgb(var(--color-on-accent))", padding: "40px 0", textAlign: "center" }}>
        <div className="ft-wrap">
          <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, marginBottom: 12 }}>{str(content.cta_headline) || "Zamow naturalne swiece"}</div>
          <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px", background: "rgb(var(--color-bg))", color: "rgb(var(--color-text-primary))", fontSize: 14, fontWeight: 600, borderRadius: 12, textDecoration: "none" }}>{str(content.cta_label) || "Zobacz oferte"}</a>
        </div>
      </div>
      <div style={{ background: "rgb(var(--color-surface-deep))", padding: "48px 0" }}>
        <div className="ft-wrap">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-4"><BrandLogo content={content} size="sm" />{tagline && <p className="ft-tagline">{tagline}</p>}<SocialIcons /></div>
            <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8"><Columns /></div>
          </div>
          <CopyBar />
        </div>
      </div>
    </footer>);
  }

  // VN 6: Centrowana
  if (vn === 6) {
    return (<footer className="bg-bg" style={{ borderTop: "1px solid rgb(var(--color-border)/0.5)", padding: "48px 0", textAlign: "center" }}><style>{S}</style><div className="ft-wrap">
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}><BrandLogo content={content} size="sm" /></div>
      {tagline && <p style={{ fontSize: 13, color: "rgb(var(--color-text-muted))", maxWidth: 400, margin: "0 auto 24px" }}>{tagline}</p>}
      <div style={{ width: 60, height: 1, background: "rgb(var(--color-border))", margin: "0 auto 24px" }} />
      <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", marginBottom: 24 }}>
        {flatLinks.map((l, i) => <a key={i} href={str(l.href) || "#"} className="ft-link">{str(l.label)}</a>)}
        {columns.map(col => arr(col.links).map((l, j) => <a key={j} href={str(l.href) || "#"} className="ft-link">{str(l.label)}</a>))}
      </div>
      <div style={{ width: 60, height: 1, background: "rgb(var(--color-border))", margin: "0 auto 24px" }} />
      <div style={{ display: "flex", justifyContent: "center" }}><SocialIcons /></div>
      <CopyBar />
    </div></footer>);
  }

  // VN 7: Na tle zdjecia
  if (vn === 7) {
    const bgImg = resolveImage(content.image || content.bg_image);
    return (<footer style={{ position: "relative", padding: "48px 0", overflow: "hidden" }}><style>{S}</style>
      {bgImg && <div style={{ position: "absolute", inset: 0, opacity: 0.15 }}><img src={bgImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>}
      <div style={{ position: "absolute", inset: 0, background: "rgb(var(--color-text-primary))" }} />
      <div className="ft-wrap" style={{ position: "relative", zIndex: 10 }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4"><BrandLogo content={content} size="sm" className="brightness-0 invert" />{tagline && <p className="ft-tagline-w">{tagline}</p>}<SocialIcons white /></div>
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8"><Columns white /></div>
        </div>
        <CopyBar white />
      </div>
    </footer>);
  }

  // VN 8: Z mapa
  if (vn === 8) {
    return (<footer style={{ background: "rgb(var(--color-surface-deep))", borderTop: "1px solid rgb(var(--color-border)/0.5)", padding: "48px 0" }}><style>{S}</style><div className="ft-wrap">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <BrandLogo content={content} size="sm" />
          {tagline && <p className="ft-tagline">{tagline}</p>}
          <SocialIcons />
          <div className="grid grid-cols-2 gap-8" style={{ marginTop: 28 }}><Columns /></div>
        </div>
        <div style={{ borderRadius: 20, overflow: "hidden", background: "linear-gradient(135deg, rgb(var(--color-accent)/0.05), rgb(var(--color-surface)))", minHeight: 250, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgb(var(--color-border)/0.3)" }}>
          <div style={{ textAlign: "center", color: "rgb(var(--color-text-dim))" }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>📍</div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>{address || "Mapa"}</div>
          </div>
        </div>
      </div>
      <CopyBar />
    </div></footer>);
  }

  // VN 9: Gradient
  if (vn === 9) {
    return (<footer style={{ background: "linear-gradient(135deg, rgb(var(--color-accent-dark)), rgb(var(--color-accent)))", color: "rgb(var(--color-on-accent))", padding: "48px 0", position: "relative", overflow: "hidden" }}><style>{S}</style>
      <div style={{ position: "absolute", width: 180, height: 180, borderRadius: "50%", background: "rgb(var(--color-text-primary) /0.05)", top: -40, right: -40 }} />
      <div style={{ position: "absolute", width: 120, height: 120, borderRadius: "50%", background: "rgb(var(--color-text-primary) /0.04)", bottom: -30, left: "25%" }} />
      <div className="ft-wrap" style={{ position: "relative", zIndex: 10 }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4"><BrandLogo content={content} size="sm" className="brightness-0 invert" />{tagline && <p className="ft-tagline-w">{tagline}</p>}<SocialIcons white /></div>
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8"><Columns white /></div>
        </div>
        <CopyBar white />
      </div>
    </footer>);
  }

  // VN 10: Mega
  if (vn === 10) {
    return (<footer style={{ background: "rgb(var(--color-surface-deep))", borderTop: "1px solid rgb(var(--color-border)/0.5)", padding: "48px 0" }}><style>{S}</style><div className="ft-wrap">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-3"><BrandLogo content={content} size="sm" />{tagline && <p className="ft-tagline">{tagline}</p>}<SocialIcons /></div>
        <div className="md:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-8"><Columns /></div>
      </div>
      <CopyBar />
    </div></footer>);
  }

  // VN 11: Dwurzedowa
  if (vn === 11) {
    return (<footer style={{ background: "rgb(var(--color-surface-deep))", borderTop: "1px solid rgb(var(--color-border)/0.5)", padding: "48px 0" }}><style>{S}</style><div className="ft-wrap">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10" style={{ paddingBottom: 32, borderBottom: "1px solid rgb(var(--color-border)/0.5)" }}>
        <div className="lg:col-span-5"><BrandLogo content={content} size="sm" />{tagline && <p className="ft-tagline">{tagline}</p>}<SocialIcons /></div>
        <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8"><Columns /></div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", paddingTop: 24, gap: 12 }}>
        <p className="ft-copy">{copyright}</p>
        <div style={{ display: "flex", gap: 16 }}>
          <a href="#" className="ft-link" style={{ fontSize: 12 }}>Polityka prywatnosci</a>
          <a href="#" className="ft-link" style={{ fontSize: 12 }}>Regulamin</a>
        </div>
      </div>
    </div></footer>);
  }

  // VN 12: Z godzinami
  if (vn === 12) {
    return (<footer style={{ background: "rgb(var(--color-surface-deep))", borderTop: "1px solid rgb(var(--color-border)/0.5)", padding: "48px 0" }}><style>{S}</style><div className="ft-wrap">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4"><BrandLogo content={content} size="sm" />{tagline && <p className="ft-tagline">{tagline}</p>}<SocialIcons /></div>
        <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
          <Columns />
          {(hours || phone || email) && (
            <div>
              <div className="ft-col-title">Kontakt</div>
              {phone && <a href={`tel:${phone}`} className="ft-link">📞 {phone}</a>}
              {email && <a href={`mailto:${email}`} className="ft-link">✉️ {email}</a>}
              {hours && <div style={{ marginTop: 10, fontSize: 13, color: "rgb(var(--color-text-muted))" }}>🕐 {hours}</div>}
            </div>
          )}
        </div>
      </div>
      <CopyBar />
    </div></footer>);
  }

  // VN 13: Split
  if (vn === 13) {
    return (<footer style={{ background: "rgb(var(--color-surface-deep))", borderTop: "1px solid rgb(var(--color-border)/0.5)", padding: "48px 0" }}><style>{S}</style><div className="ft-wrap">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <BrandLogo content={content} size="sm" />
          {tagline && <p className="ft-tagline">{tagline}</p>}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 20 }}>
            {phone && <a href={`tel:${phone}`} className="ft-link" style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 28, height: 28, borderRadius: 8, background: "rgb(var(--color-accent)/0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>📞</span> {phone}</a>}
            {email && <a href={`mailto:${email}`} className="ft-link" style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 28, height: 28, borderRadius: 8, background: "rgb(var(--color-accent)/0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✉️</span> {email}</a>}
            {address && <div className="ft-link" style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ width: 28, height: 28, borderRadius: 8, background: "rgb(var(--color-accent)/0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>📍</span> {address}</div>}
          </div>
          <SocialIcons />
        </div>
        <div className="grid grid-cols-2 gap-8"><Columns /></div>
      </div>
      <CopyBar />
    </div></footer>);
  }

  // VN 14: Z marquee
  if (vn === 14) {
    return (<footer><style>{S}</style>
      <div style={{ background: "rgb(var(--color-accent))", color: "white", padding: "12px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 32, animation: "ftMarquee 30s linear infinite", width: "max-content", fontSize: 13, fontWeight: 500 }}>
          {[1, 2].map(n => <span key={n} style={{ display: "flex", gap: 32, whiteSpace: "nowrap" }}>
            <span>Naturalne swiece sojowe</span><span style={{ opacity: 0.4 }}>-</span>
            <span>Reczna produkcja</span><span style={{ opacity: 0.4 }}>-</span>
            <span>30+ zapachow</span><span style={{ opacity: 0.4 }}>-</span>
            <span>Darmowa dostawa od 150 zl</span><span style={{ opacity: 0.4 }}>-</span>
          </span>)}
        </div>
      </div>
      <div style={{ background: "rgb(var(--color-surface-deep))", padding: "48px 0" }}>
        <div className="ft-wrap">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-4"><BrandLogo content={content} size="sm" />{tagline && <p className="ft-tagline">{tagline}</p>}<SocialIcons /></div>
            <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8"><Columns /></div>
          </div>
          <CopyBar />
        </div>
      </div>
    </footer>);
  }

  // VN 15: Z app badges
  if (vn === 15) {
  const appStoreUrl = str(content.app_store_url);
  const googlePlayUrl = str(content.google_play_url);
  return (<footer style={{ background: "rgb(var(--color-surface-deep))", borderTop: "1px solid rgb(var(--color-border)/0.5)", padding: "48px 0" }}><style>{S}</style><div className="ft-wrap">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
      <div className="md:col-span-4">
        <BrandLogo content={content} size="sm" />
        {tagline && <p className="ft-tagline">{tagline}</p>}
        {/* App store badges */}
        {(appStoreUrl || googlePlayUrl) && <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
          {appStoreUrl && <a href={appStoreUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 16px", background: "rgb(var(--color-text-primary))", color: "white", borderRadius: 10, textDecoration: "none", fontSize: 12, fontWeight: 500 }}>
            <span style={{ fontSize: 18 }}>🍎</span>
            <div><div style={{ fontSize: 9, opacity: 0.7 }}>Pobierz z</div><div style={{ fontSize: 13, fontWeight: 600 }}>App Store</div></div>
          </a>}
          {googlePlayUrl && <a href={googlePlayUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 16px", background: "rgb(var(--color-text-primary))", color: "white", borderRadius: 10, textDecoration: "none", fontSize: 12, fontWeight: 500 }}>
            <span style={{ fontSize: 18 }}>▶️</span>
            <div><div style={{ fontSize: 9, opacity: 0.7 }}>Pobierz z</div><div style={{ fontSize: 13, fontWeight: 600 }}>Google Play</div></div>
          </a>}
        </div>}
        <SocialIcons />
      </div>
      <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8"><Columns /></div>
    </div>
    <CopyBar />
  </div></footer>);
  }

  // Fallback: Simple footer
  return (<footer style={{ background: "rgb(var(--color-surface-deep))", borderTop: "1px solid rgb(var(--color-border)/0.5)", padding: "48px 0" }}><style>{S}</style><div className="ft-wrap">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
      <div className="md:col-span-4"><BrandLogo content={content} size="sm" />{tagline && <p className="ft-tagline">{tagline}</p>}<SocialIcons /></div>
      <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8"><Columns /></div>
    </div>
    <CopyBar />
  </div></footer>);
}
