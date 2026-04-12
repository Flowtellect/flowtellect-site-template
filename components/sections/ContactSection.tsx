"use client";

// ─── ContactSection ──────────────────────────────────────────────────────────
// 10 individually crafted contact variants matching HTML mockups.

import { str, arr, resolveImage } from "./shared";

interface ContactProps {
  content: Record<string, unknown>;
  vn: number;
}

function Arrow() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
}

const S = `
  .co-wrap{max-width:1280px;margin:0 auto;padding:0 16px}
  @media(min-width:768px){.co-wrap{padding:0 24px}}@media(min-width:1024px){.co-wrap{padding:0 48px}}
  .co-header{text-align:center;max-width:640px;margin:0 auto 48px}
  .co-eyebrow{display:inline-flex;align-items:center;gap:16px;margin-bottom:20px}
  .co-eline{width:32px;height:1px;background:linear-gradient(90deg,transparent,rgb(var(--color-accent)/0.4))}
  .co-eline-r{width:32px;height:1px;background:linear-gradient(90deg,rgb(var(--color-accent)/0.4),transparent)}
  .co-etxt{font-size:11px;font-weight:600;letter-spacing:.25em;text-transform:uppercase;color:rgb(var(--color-accent))}
  .co-h2{font-family:var(--font-display);font-size:32px;font-weight:700;line-height:1.15;letter-spacing:-.02em;color:rgb(var(--color-text-primary));margin-bottom:14px}
  @media(min-width:768px){.co-h2{font-size:40px}}@media(min-width:1024px){.co-h2{font-size:48px}}
  .co-desc{font-size:16px;line-height:1.7;color:rgb(var(--color-text-muted))}

  .co-item{display:flex;gap:14px;align-items:flex-start;padding:12px 14px;border-radius:14px;transition:background .2s;text-decoration:none;color:inherit}
  a.co-item:hover{background:rgb(var(--color-surface-deep)/0.5)}
  .co-item-icon{width:44px;height:44px;border-radius:12px;background:rgb(var(--color-accent)/0.08);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:rgb(var(--color-accent))}
  .co-item-label{font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:rgb(var(--color-text-dim));margin-bottom:3px}
  .co-item-value{font-size:14px;font-weight:500;color:rgb(var(--color-text-primary));line-height:1.4}

  .co-input{width:100%;padding:12px 16px;background:rgb(var(--color-bg));border:1px solid rgb(var(--color-border));border-radius:12px;font-family:var(--font-body);font-size:14px;color:rgb(var(--color-text-primary));outline:none;transition:all .2s}
  .co-input:focus{border-color:rgb(var(--color-accent));box-shadow:0 0 0 3px rgb(var(--color-accent)/0.1)}
  .co-textarea{width:100%;padding:12px 16px;background:rgb(var(--color-bg));border:1px solid rgb(var(--color-border));border-radius:12px;font-family:var(--font-body);font-size:14px;color:rgb(var(--color-text-primary));outline:none;resize:vertical;min-height:100px;transition:all .2s}
  .co-textarea:focus{border-color:rgb(var(--color-accent));box-shadow:0 0 0 3px rgb(var(--color-accent)/0.1)}
  .co-btn{width:100%;padding:14px;background:rgb(var(--color-accent));color:rgb(var(--color-on-accent));font-family:var(--font-body);font-size:14px;font-weight:600;border:none;border-radius:12px;cursor:pointer;transition:all .3s;box-shadow:0 4px 16px rgb(var(--color-accent)/0.3)}
  .co-btn:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgb(var(--color-accent)/0.4)}
  .co-btn-sm{width:auto;display:inline-flex;align-items:center;gap:8px;padding:12px 24px}
  .co-label{display:block;font-size:12px;font-weight:600;color:rgb(var(--color-text-muted));margin-bottom:6px;letter-spacing:.03em}

  .co-card{background:rgb(var(--color-surface));border:1px solid rgb(var(--color-border)/0.5);border-radius:24px;padding:32px 28px;transition:all .3s}
  .co-card:hover{border-color:rgb(var(--color-accent)/0.3);box-shadow:0 8px 32px rgb(0 0 0/0.06)}

  @keyframes coUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  .ca1{opacity:0;animation:coUp .8s ease .1s forwards}
  .ca2{opacity:0;animation:coUp .8s ease .3s forwards}
`;

// SVG icons
const PinIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const PhoneIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>;
const MailIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/></svg>;
const ClockIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>;

function ContactItems({ content }: { content: Record<string, unknown> }) {
  const address = str(content.address);
  const phone = str(content.phone);
  const email = str(content.email);
  const hours = str(content.hours);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {address && <div className="co-item"><div className="co-item-icon"><PinIcon /></div><div><div className="co-item-label">Adres</div><div className="co-item-value">{address}</div></div></div>}
      {phone && <a href={`tel:${phone}`} className="co-item"><div className="co-item-icon"><PhoneIcon /></div><div><div className="co-item-label">Telefon</div><div className="co-item-value">{phone}</div></div></a>}
      {email && <a href={`mailto:${email}`} className="co-item"><div className="co-item-icon"><MailIcon /></div><div><div className="co-item-label">Email</div><div className="co-item-value">{email}</div></div></a>}
      {hours && <div className="co-item"><div className="co-item-icon"><ClockIcon /></div><div><div className="co-item-label">Godziny</div><div className="co-item-value">{hours}</div></div></div>}
    </div>
  );
}

function ContactForm({ compact }: { compact?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {!compact && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div><label className="co-label">Imie</label><input className="co-input" placeholder="Anna" /></div>
          <div><label className="co-label">Telefon</label><input className="co-input" placeholder="+48 500..." /></div>
        </div>
      )}
      <div><label className="co-label">Email</label><input type="email" className="co-input" placeholder="anna@example.com" /></div>
      <div><label className="co-label">Wiadomosc</label><textarea className="co-textarea" placeholder="Czym mozemy pomoc?" /></div>
      <button className="co-btn">Wyslij wiadomosc</button>
    </div>
  );
}

export default function ContactSection({ content, vn }: ContactProps) {
  const ey = str(content.eyebrow);
  const hl = str(content.headline);
  const body = str(content.body || content.note);
  const img = resolveImage(content.image || content.bg_image);
  const items = arr(content.items || content.locations);
  const faqItems = arr(content.faq || content.questions);
  const topics = arr(content.topics || content.departments);

  const Header = ({ centered = true }: { centered?: boolean }) => (
    <div className={`ca1 ${centered ? "co-header" : ""}`} style={!centered ? { marginBottom: 32 } : undefined}>
      {ey && <div className="co-eyebrow"><div className="co-eline"/><span className="co-etxt">{ey}</span>{centered && <div className="co-eline-r"/>}</div>}
      <h2 className="co-h2">{hl}</h2>
      {body && <p className="co-desc">{body}</p>}
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 1: Prosta - dwie kolumny, info + placeholder
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 1) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="co-wrap">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="ca1">
          <Header centered={false} />
          <ContactItems content={content} />
        </div>
        <div className="ca2" style={{ borderRadius: 20, overflow: "hidden", minHeight: 300 }}>
          {img ? <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: 20 }} /> : <div style={{ width: "100%", height: 300, background: "linear-gradient(135deg, rgb(var(--color-accent)/0.08), rgb(var(--color-surface)))", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>📍</div>}
        </div>
      </div>
    </div></section>);
  }

  // VN 2: Formularz + mapa
  if (vn === 2) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="co-wrap">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="ca1"><ContactForm /></div>
        <div className="ca2">
          <div style={{ borderRadius: 20, background: "linear-gradient(135deg, rgb(var(--color-accent)/0.06), rgb(var(--color-surface)))", minHeight: 250, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, marginBottom: 24, border: "1px solid rgb(var(--color-border)/0.3)" }}>📍</div>
          <ContactItems content={content} />
        </div>
      </div>
    </div></section>);
  }

  // VN 3: Multi-lokalizacja
  if (vn === 3) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="co-wrap">
      <Header />
      <div className="ca2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.length > 0 ? items.map((it, i) => (
          <div key={i} className="co-card">
            <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, marginBottom: 16 }}>{str(it.name || it.title || it.location)}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {str(it.address) && <div className="co-item" style={{ padding: "8px 0" }}><div className="co-item-icon" style={{ width: 36, height: 36, borderRadius: 10 }}><PinIcon /></div><div><div className="co-item-value" style={{ fontSize: 13 }}>{str(it.address)}</div></div></div>}
              {str(it.phone) && <a href={`tel:${str(it.phone)}`} className="co-item" style={{ padding: "8px 0" }}><div className="co-item-icon" style={{ width: 36, height: 36, borderRadius: 10 }}><PhoneIcon /></div><div><div className="co-item-value" style={{ fontSize: 13 }}>{str(it.phone)}</div></div></a>}
              {str(it.email) && <a href={`mailto:${str(it.email)}`} className="co-item" style={{ padding: "8px 0" }}><div className="co-item-icon" style={{ width: 36, height: 36, borderRadius: 10 }}><MailIcon /></div><div><div className="co-item-value" style={{ fontSize: 13 }}>{str(it.email)}</div></div></a>}
            </div>
          </div>
        )) : (
          <div className="co-card"><ContactItems content={content} /></div>
        )}
      </div>
    </div></section>);
  }

  // VN 4: Split (formularz lewo + info prawo)
  if (vn === 4) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="co-wrap">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="ca1">
          <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Napisz do nas</div>
          <p style={{ fontSize: 14, color: "rgb(var(--color-text-muted))", marginBottom: 24 }}>Odpowiadamy w ciagu 24h</p>
          <ContactForm />
        </div>
        <div className="ca2">
          <Header centered={false} />
          <ContactItems content={content} />
        </div>
      </div>
    </div></section>);
  }

  // VN 5: Pelnoekranowa mapa + overlapping card
  if (vn === 5) {
    return (<section className="bg-bg" style={{ padding: 0 }}><style>{S}</style>
      <div style={{ minHeight: 300, background: "linear-gradient(135deg, rgb(var(--color-accent)/0.06), rgb(var(--color-surface-deep)))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>📍</div>
      <div className="co-wrap">
        <div className="ca1" style={{ maxWidth: 600, margin: "-64px auto 64px", background: "rgb(var(--color-surface))", borderRadius: 24, boxShadow: "0 20px 60px rgb(0 0 0/0.1)", padding: "36px 32px", position: "relative", zIndex: 10 }}>
          <h2 className="co-h2" style={{ fontSize: 28, textAlign: "center" }}>{hl}</h2>
          {body && <p className="co-desc" style={{ textAlign: "center", marginBottom: 24 }}>{body}</p>}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 24 }}>
            <ContactItems content={content} />
          </div>
          <div style={{ borderTop: "1px solid rgb(var(--color-border)/0.5)", paddingTop: 24 }}>
            <ContactForm compact />
          </div>
        </div>
      </div>
    </section>);
  }

  // VN 6: Z rezerwacja
  if (vn === 6) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="co-wrap">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="ca1"><ContactItems content={content} /></div>
        <div className="ca2 co-card">
          <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 600, marginBottom: 20 }}>Zarezerwuj wizyte</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div><label className="co-label">Data</label><input type="date" className="co-input" /></div>
            <div><label className="co-label">Godzina</label><select className="co-input"><option>9:00</option><option>10:00</option><option>11:00</option><option>12:00</option><option>14:00</option><option>15:00</option><option>16:00</option></select></div>
            <div><label className="co-label">Imie</label><input className="co-input" placeholder="Anna" /></div>
            <div><label className="co-label">Telefon</label><input className="co-input" placeholder="+48 500..." /></div>
            <button className="co-btn">Zarezerwuj</button>
          </div>
        </div>
      </div>
    </div></section>);
  }

  // VN 7: Wizytowka (centered card)
  if (vn === 7) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="co-wrap">
      <div className="ca1" style={{ maxWidth: 500, margin: "0 auto", background: "rgb(var(--color-surface))", borderRadius: 24, boxShadow: "0 20px 60px rgb(0 0 0/0.08)", padding: "40px 36px", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, marginBottom: 6 }}>{hl || "Candlegreen"}</div>
        {body && <p style={{ fontSize: 14, color: "rgb(var(--color-text-muted))", marginBottom: 24 }}>{body}</p>}
        <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, rgb(var(--color-accent)), rgb(var(--color-accent-light)))", margin: "0 auto 24px", borderRadius: 1 }} />
        <ContactItems content={content} />
      </div>
    </div></section>);
  }

  // VN 8: Z FAQ (split)
  if (vn === 8) {
    return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="co-wrap">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">
        <div className="ca1">
          {faqItems.map((it, i) => (
            <details key={i} style={{ borderBottom: "1px solid rgb(var(--color-border)/0.5)" }}>
              <summary style={{ display: "flex", justifyContent: "space-between", padding: "18px 0", cursor: "pointer", fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600, listStyle: "none" }}>
                {str(it.question)}<span style={{ color: "rgb(var(--color-accent))", fontSize: 20, transition: "transform 0.3s" }}>+</span>
              </summary>
              <div style={{ paddingBottom: 18, fontSize: 14, lineHeight: 1.7, color: "rgb(var(--color-text-muted))" }} dangerouslySetInnerHTML={{ __html: str(it.answer) }} />
            </details>
          ))}
          {faqItems.length === 0 && <p style={{ color: "rgb(var(--color-text-dim))", fontSize: 14 }}>FAQ content not available</p>}
        </div>
        <div className="ca2" style={{ background: "rgb(var(--color-accent)/0.05)", border: "1px solid rgb(var(--color-accent)/0.2)", borderRadius: 20, padding: "28px 24px", position: "sticky", top: 100 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Nie znalazles odpowiedzi?</div>
          <ContactItems content={content} />
          <a href="#" className="co-btn co-btn-sm" style={{ marginTop: 20, width: "100%", justifyContent: "center" }}>Napisz do nas <Arrow /></a>
        </div>
      </div>
    </div></section>);
  }

  // VN 9: Na tle zdjecia (glassmorphism card)
  if (vn === 9) {
    return (<section style={{ position: "relative", padding: "80px 0", overflow: "hidden" }}><style>{S}</style>
      <div style={{ position: "absolute", inset: 0 }}>{img && <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}</div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.65), rgba(0,0,0,0.5))" }} />
      <div className="co-wrap" style={{ position: "relative", zIndex: 10 }}>
        <div className="ca1" style={{ maxWidth: 600, margin: "0 auto", background: "rgb(var(--color-surface)/0.95)", backdropFilter: "blur(24px)", borderRadius: 24, boxShadow: "0 24px 64px rgba(0,0,0,0.15)", padding: "36px 32px" }}>
          <h2 className="co-h2" style={{ fontSize: 28, textAlign: "center" }}>{hl}</h2>
          {body && <p className="co-desc" style={{ textAlign: "center", marginBottom: 24 }}>{body}</p>}
          <ContactItems content={content} />
          <div style={{ borderTop: "1px solid rgb(var(--color-border)/0.5)", marginTop: 24, paddingTop: 24 }}>
            <ContactForm compact />
          </div>
        </div>
      </div>
    </section>);
  }

  // VN 10: Routing tematow (default)
  return (<section className="bg-bg" style={{ padding: "64px 0" }}><style>{S}</style><div className="co-wrap">
    <Header />
    <div className="ca2 grid grid-cols-1 md:grid-cols-3 gap-5">
      {topics.length > 0 ? topics.map((t, i) => (
        <div key={i} className="co-card" style={{ textAlign: "center" }}>
          {str(t.icon) && <div style={{ fontSize: 28, marginBottom: 12 }}>{str(t.icon)}</div>}
          <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{str(t.name || t.title)}</div>
          <div style={{ fontSize: 13, color: "rgb(var(--color-text-muted))", lineHeight: 1.6, marginBottom: 16 }}>{str(t.desc || t.description)}</div>
          {str(t.email) && <a href={`mailto:${str(t.email)}`} style={{ display: "block", fontSize: 13, color: "rgb(var(--color-accent))", fontWeight: 600, textDecoration: "none" }}>{str(t.email)}</a>}
          {str(t.phone) && <a href={`tel:${str(t.phone)}`} style={{ display: "block", fontSize: 13, color: "rgb(var(--color-accent))", fontWeight: 600, textDecoration: "none", marginTop: 4 }}>{str(t.phone)}</a>}
        </div>
      )) : (
        <div className="co-card md:col-span-3" style={{ maxWidth: 600, margin: "0 auto" }}>
          <ContactItems content={content} />
        </div>
      )}
    </div>
  </div></section>);
}
