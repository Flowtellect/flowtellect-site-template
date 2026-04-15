'use client';

import { useEffect } from 'react';

// Shown while Netlify build is in flight (first ~60-90s after publish, any
// URL is a 404) or for any real 404 thereafter. Auto-refresh every 15s so the
// visitor lands on the finished site without manually reloading.
export default function NotFound() {
  useEffect(() => {
    const timer = setInterval(() => {
      window.location.reload();
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgb(var(--color-bg, 255 255 255))',
        color: 'rgb(var(--color-text-primary, 15 15 20))',
        fontFamily: 'var(--font-body, system-ui)',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'rgba(var(--color-accent, 99 102 241), 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgb(var(--color-accent, 99 102 241))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      </div>
      <h1
        style={{
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 700,
          fontFamily: 'var(--font-display, system-ui)',
          marginBottom: '12px',
          letterSpacing: '-0.02em',
        }}
      >
        Strona w przygotowaniu
      </h1>
      <p
        style={{
          fontSize: '15px',
          color: 'rgba(var(--color-text-primary, 15 15 20), 0.6)',
          maxWidth: '400px',
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        Trwa budowanie strony. Odśwież za chwilę — zajmie to najwyżej minutę.
      </p>
    </div>
  );
}
