'use client';

import { useEffect, useState } from 'react';

// RODO cookie consent banner. Non-blocking: bottom-left card, does not overlay
// content or capture clicks anywhere else. Delayed 1.5s so first paint isn't
// hijacked. Accept -> localStorage['cookie-consent'] = 'accepted' -> unmount.
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem('cookie-consent') === 'accepted') return;
    } catch { /* private mode / storage disabled */ }

    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  function accept() {
    try { localStorage.setItem('cookie-consent', 'accepted'); } catch { /* ignore */ }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Zgoda na pliki cookie"
      style={{
        position: 'fixed',
        bottom: '16px',
        left: '16px',
        right: '16px',
        maxWidth: '480px',
        zIndex: 9998,
        background: 'rgb(var(--color-bg, 255 255 255))',
        border: '1px solid rgba(var(--color-text-primary, 15 15 20), 0.1)',
        borderRadius: '12px',
        padding: '16px 20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        fontFamily: 'var(--font-body, system-ui)',
        animation: 'cookieSlideUp 0.4s ease',
      }}
    >
      <style>{`
        @keyframes cookieSlideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
      <p
        style={{
          flex: 1,
          fontSize: '13px',
          lineHeight: 1.5,
          color: 'rgba(var(--color-text-primary, 15 15 20), 0.7)',
          margin: 0,
        }}
      >
        Ta strona używa plików cookie w celu zapewnienia najlepszej jakości usług.{' '}
        <a
          href="/polityka-prywatnosci"
          style={{
            color: 'rgb(var(--color-accent, 99 102 241))',
            textDecoration: 'underline',
            textUnderlineOffset: '2px',
          }}
        >
          Polityka prywatności
        </a>
      </p>
      <button
        type="button"
        onClick={accept}
        style={{
          flexShrink: 0,
          padding: '8px 20px',
          borderRadius: '8px',
          border: 'none',
          background: 'rgb(var(--color-accent, 99 102 241))',
          color: 'rgb(var(--color-on-accent, 255 255 255))',
          fontSize: '13px',
          fontWeight: 600,
          fontFamily: 'var(--font-body, system-ui)',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        Akceptuję
      </button>
    </div>
  );
}
