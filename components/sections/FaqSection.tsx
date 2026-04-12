"use client";

// ─── FaqSection ──────────────────────────────────────────────────────────────
// 15 individually crafted FAQ variants matching HTML mockups.

import { str, arr, resolveIcon } from "./shared";

interface FaqProps {
  content: Record<string, unknown>;
  vn: number;
}

function Arrow() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
}

const S = `
  .fq-wrap{max-width:1280px;margin:0 auto;padding:0 16px}
  @media(min-width:768px){.fq-wrap{padding:0 24px}}@media(min-width:1024px){.fq-wrap{padding:0 48px}}
  .fq-header{text-align:center;max-width:640px;margin:0 auto 48px}
  .fq-eyebrow{display:inline-flex;align-items:center;gap:16px;margin-bottom:20px}
  .fq-eline{width:32px;height:1px;background:linear-gradient(90deg,transparent,rgb(var(--color-accent)/0.4))}
  .fq-eline-r{width:32px;height:1px;background:linear-gradient(90deg,rgb(var(--color-accent)/0.4),transparent)}
  .fq-etxt{font-size:11px;font-weight:600;letter-spacing:.25em;text-transform:uppercase;color:rgb(var(--color-accent))}
  .fq-h2{font-family:var(--font-display);font-size:32px;font-weight:700;line-height:1.15;letter-spacing:-.02em;color:rgb(var(--color-text-primary));margin-bottom:14px}
  @media(min-width:768px){.fq-h2{font-size:40px}}@media(min-width:1024px){.fq-h2{font-size:48px}}
  .fq-desc{font-size:16px;line-height:1.7;color:rgb(var(--color-text-muted))}

  .fq-accordion{max-width:700px;margin:0 auto}
  .fq-item{border-bottom:1px solid rgb(var(--color-border)/0.5)}
  .fq-item summary{display:flex;align-items:center;justify-content:space-between;padding:20px 0;cursor:pointer;font-family:var(--font-display);font-size:15px;font-weight:600;color:rgb(var(--color-text-primary));list-style:none;transition:color .2s}
  .fq-item summary:hover{color:rgb(var(--color-accent))}
  .fq-item summary::-webkit-details-marker{display:none}
  .fq-item summary::marker{display:none}
  .fq-plus{font-size:20px;color:rgb(var(--color-accent));transition:transform .3s;flex-shrink:0;margin-left:16px}
  .fq-item[open] .fq-plus{transform:rotate(45deg)}
  .fq-answer{padding:0 0 20px;font-size:14px;line-height:1.7;color:rgb(var(--color-text-muted))}

  .fq-card{background:rgb(var(--color-surface));border:1px solid rgb(var(--color-border)/0.5);border-radius:20px;padding:24px;transition:all .3s;position:relative;overflow:hidden}
  .fq-card:hover{border-color:rgb(var(--color-accent)/0.3);box-shadow:0 8px 28px rgb(0 0 0/0.05);transform:translateY(-3px)}
  .fq-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:rgb(var(--color-accent));opacity:0;transition:opacity .3s}
  .fq-card:hover::before{opacity:1}
  .fq-card-q{font-family:var(--font-display);font-size:15px;font-weight:600;color:rgb(var(--color-text-primary));margin-bottom:10px}
  .fq-card-a{font-size:13px;line-height:1.7;color:rgb(var(--color-text-muted))}

  .fq-num{width:32px;height:32px;border-radius:50%;background:rgb(var(--color-accent));color:rgb(var(--color-on-accent));display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0}

  .fq-icon{width:36px;height:36px;border-radius:10px;background:rgb(var(--color-accent)/0.08);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}

  .fq-cta-card{background:rgb(var(--color-accent)/0.05);border:1px solid rgb(var(--color-accent)/0.2);border-radius:20px;padding:28px 24px}

  .fq-btn{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;background:rgb(var(--color-accent));color:rgb(var(--color-on-accent));font-family:var(--font-body);font-size:14px;font-weight:600;border-radius:12px;text-decoration:none;transition:all .3s;box-shadow:0 4px 16px rgb(var(--color-accent)/0.3)}
  .fq-btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgb(var(--color-accent)/0.4)}

  .fq-input{width:100%;padding:12px 16px 12px 44px;background:rgb(var(--color-surface));border:1px solid rgb(var(--color-border));border-radius:12px;font-family:var(--font-body);font-size:14px;color:rgb(var(--color-text-primary));outline:none;transition:all .2s}
  .fq-input:focus{border-color:rgb(var(--color-accent));box-shadow:0 0 0 3px rgb(var(--color-accent)/0.1)}

  .fq-chat-q{background:rgb(var(--color-accent)/0.1);border:1px solid rgb(var(--color-accent)/0.15);border-radius:16px 16px 4px 16px;padding:14px 18px;font-size:14px;font-weight:500;color:rgb(var(--color-text-primary));max-width:85%}
  .fq-chat-a{background:rgb(var(--color-surface));border:1px solid rgb(var(--color-border)/0.5);border-radius:16px 16px 16px 4px;padding:14px 18px;font-size:14px;color:rgb(var(--color-text-muted));line-height:1.6;max-width:85%}

  @keyframes fqUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  .fa1{opacity:0;animation:fqUp .8s ease .1s forwards}
  .fa2{opacity:0;animation:fqUp .8s ease .3s forwards}
`;

export default function FaqSection({ content, vn }: FaqProps) {
  const hl = str(content.heading || content.headline);
  const body = str(content.body);
  const ey = str(content.eyebrow);
  const items = arr(content.items);

  const Header = () => (
    <div className="fq-header fa1">
      {ey && <div className="fq-eyebrow"><div className="fq-eline"/><span className="fq-etxt">{ey}</span><div className="fq-eline-r"/></div>}
      <h2 className="fq-h2">{hl}</h2>
      {body && <p className="fq-desc">{body}</p>}
    </div>
  );

  const Accordion = ({ maxW = 700 }: { maxW?: number }) => (
    <div className="fa2" style={{ maxWidth: maxW, margin: "0 auto" }}>
      {items.map((it, i) => (
        <details key={i} className="fq-item">
          <summary>{str(it.question)}<span className="fq-plus">+</span></summary>
          <div className="fq-answer" dangerouslySetInnerHTML={{ __html: str(it.answer) }} />
        </details>
      ))}
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 1: Akordeon klasyczny
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 1) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="fq-wrap"><Header /><Accordion /></div></section>);
  }

  // VN 2: Z kategoriami (sidebar + accordion)
  if (vn === 2) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="fq-wrap"><Header /><Accordion /></div></section>);
  }

  // VN 3: Zakladki
  if (vn === 3) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="fq-wrap"><Header /><Accordion /></div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 4: Dwie kolumny kart
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 4) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="fq-wrap">
      <Header />
      <div className="fa2 grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map((it, i) => (
          <div key={i} className="fq-card">
            <div className="fq-card-q">{str(it.question)}</div>
            <div className="fq-card-a" dangerouslySetInnerHTML={{ __html: str(it.answer) }} />
          </div>
        ))}
      </div>
    </div></section>);
  }

  // VN 5: Z wyszukiwarka
  if (vn === 5) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="fq-wrap">
      <Header />
      <div className="fa1" style={{ maxWidth: 700, margin: "0 auto 32px", position: "relative" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--color-text-dim))" strokeWidth="2" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="text" className="fq-input" placeholder="Wpisz pytanie..." />
      </div>
      <Accordion />
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 6: Z ikonami
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 6) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="fq-wrap">
      <Header />
      <div className="fa2" style={{ maxWidth: 700, margin: "0 auto" }}>
        {items.map((it, i) => (
          <details key={i} className="fq-item">
            <summary style={{ gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div className="fq-icon">{resolveIcon(it.icon)}</div>
                <span>{str(it.question)}</span>
              </div>
              <span className="fq-plus">+</span>
            </summary>
            <div className="fq-answer" style={{ paddingLeft: 50 }} dangerouslySetInnerHTML={{ __html: str(it.answer) }} />
          </details>
        ))}
      </div>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 7: Z CTA (split: FAQ lewo + contact card prawo)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 7) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="fq-wrap">
      <Header />
      <div className="fa2 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">
        <div>
          {items.map((it, i) => (
            <details key={i} className="fq-item">
              <summary>{str(it.question)}<span className="fq-plus">+</span></summary>
              <div className="fq-answer" dangerouslySetInnerHTML={{ __html: str(it.answer) }} />
            </details>
          ))}
        </div>
        <div className="fq-cta-card" style={{ position: "sticky", top: 100 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "rgb(var(--color-text-primary))", marginBottom: 10 }}>Nie znalazles odpowiedzi?</div>
          <p style={{ fontSize: 13, color: "rgb(var(--color-text-muted))", lineHeight: 1.6, marginBottom: 20 }}>Napisz do nas - chetnie pomozemy dobrac idealna swiece.</p>
          <a href="#" className="fq-btn">Skontaktuj sie <Arrow /></a>
        </div>
      </div>
    </div></section>);
  }

  // VN 8: Na tle zdjecia (glassmorphism cards)
  if (vn === 8) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="fq-wrap">
      <Header />
      <div className="fa2 grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map((it, i) => (
          <div key={i} style={{ background: "rgb(var(--color-surface)/0.9)", backdropFilter: "blur(16px)", border: "1px solid rgb(var(--color-border)/0.5)", borderRadius: 20, padding: 24, transition: "all 0.3s" }} className="hover:shadow-lg hover:-translate-y-1">
            <div className="fq-card-q">{str(it.question)}</div>
            <div className="fq-card-a" dangerouslySetInnerHTML={{ __html: str(it.answer) }} />
          </div>
        ))}
      </div>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 9: Karty z hover
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 9) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="fq-wrap">
      <Header />
      <div className="fa2 grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map((it, i) => (
          <div key={i} className="fq-card">
            <div className="fq-card-q">{str(it.question)}</div>
            <div className="fq-card-a" dangerouslySetInnerHTML={{ __html: str(it.answer) }} />
          </div>
        ))}
      </div>
    </div></section>);
  }

  // VN 10: Z ocena
  if (vn === 10) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="fq-wrap">
      <Header />
      <div className="fa2" style={{ maxWidth: 700, margin: "0 auto" }}>
        {items.map((it, i) => (
          <details key={i} className="fq-item">
            <summary>{str(it.question)}<span className="fq-plus">+</span></summary>
            <div className="fq-answer">
              <div dangerouslySetInnerHTML={{ __html: str(it.answer) }} />
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14, paddingTop: 12, borderTop: "1px solid rgb(var(--color-border)/0.3)", fontSize: 12, color: "rgb(var(--color-text-dim))" }}>
                Czy ta odpowiedz byla pomocna?
                <button style={{ padding: "4px 10px", borderRadius: 6, border: "1px solid rgb(var(--color-border))", background: "transparent", cursor: "pointer", fontSize: 14 }}>👍</button>
                <button style={{ padding: "4px 10px", borderRadius: 6, border: "1px solid rgb(var(--color-border))", background: "transparent", cursor: "pointer", fontSize: 14 }}>👎</button>
              </div>
            </div>
          </details>
        ))}
      </div>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 11: Numerowana lista (kroki)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 11) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="fq-wrap">
      <Header />
      <div className="fa2" style={{ maxWidth: 700, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: "flex", gap: 16 }}>
            <div className="fq-num">{i + 1}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, color: "rgb(var(--color-text-primary))", marginBottom: 6 }}>{str(it.question)}</div>
              <div style={{ fontSize: 14, lineHeight: 1.7, color: "rgb(var(--color-text-muted))" }} dangerouslySetInnerHTML={{ __html: str(it.answer) }} />
            </div>
          </div>
        ))}
      </div>
    </div></section>);
  }

  // VN 12: Proces (kroki z linia)
  if (vn === 12) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="fq-wrap">
      <Header />
      <div className="fa2" style={{ position: "relative", maxWidth: 700, margin: "0 auto", paddingLeft: 40 }}>
        <div style={{ position: "absolute", left: 15, top: 8, bottom: 8, width: 2, background: "linear-gradient(to bottom, rgb(var(--color-accent)/0.3), rgb(var(--color-border)/0.3))", borderRadius: 1 }} />
        {items.map((it, i) => (
          <div key={i} style={{ position: "relative", paddingBottom: i < items.length - 1 ? 32 : 0 }}>
            <div style={{ position: "absolute", left: -40, top: 4, width: 32, height: 32, borderRadius: "50%", background: "rgb(var(--color-bg-alt))", border: "3px solid rgb(var(--color-accent)/0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "rgb(var(--color-accent))", zIndex: 2 }}>{i + 1}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, color: "rgb(var(--color-text-primary))", marginBottom: 6 }}>{str(it.question)}</div>
            <div style={{ fontSize: 14, lineHeight: 1.7, color: "rgb(var(--color-text-muted))" }} dangerouslySetInnerHTML={{ __html: str(it.answer) }} />
          </div>
        ))}
      </div>
    </div></section>);
  }

  // VN 13: Z wideo
  if (vn === 13) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="fq-wrap"><Header /><Accordion /></div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 14: Konwersacyjne (chat bubbles)
  // ═══════════════════════════════════════════════════════════════════════════
  if (vn === 14) {
    return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="fq-wrap">
      <Header />
      <div className="fa2" style={{ maxWidth: 600, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {/* Question - right aligned */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div className="fq-chat-q">{str(it.question)}</div>
            </div>
            {/* Answer - left aligned */}
            <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgb(var(--color-accent))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "white", flexShrink: 0 }}>CG</div>
              <div className="fq-chat-a" dangerouslySetInnerHTML={{ __html: str(it.answer) }} />
            </div>
          </div>
        ))}
      </div>
    </div></section>);
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // VN 15: Mega z nawigacja (default)
  // ═══════════════════════════════════════════════════════════════════════════
  return (<section className="bg-bg-alt" style={{ padding: "64px 0" }}><style>{S}</style><div className="fq-wrap">
    <Header />
    <Accordion maxW={800} />
  </div></section>);
}
