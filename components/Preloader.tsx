'use client';

import { useEffect, useState } from 'react';

// Fullscreen overlay shown on first paint to hide FOUC (font swap, layout shift).
// Visible minimum 400ms so it doesn't flicker, max 2s fallback if `load` never
// fires (slow images, stalled network). Unmounts after fade so no DOM cost once
// gone. Colors read --color-bg and --color-accent from theme with hard fallbacks.
export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const startFadeOut = () => {
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => setVisible(false), 500);
      }, 400);
    };

    if (document.readyState === 'complete') {
      startFadeOut();
      return;
    }

    window.addEventListener('load', startFadeOut, { once: true });
    const fallback = setTimeout(startFadeOut, 2000);

    return () => {
      window.removeEventListener('load', startFadeOut);
      clearTimeout(fallback);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgb(var(--color-bg, 255 255 255))',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.5s ease',
        pointerEvents: fadeOut ? 'none' : 'all',
      }}
    >
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'rgb(var(--color-accent, 99 102 241))',
              animation: `preloaderDot 1.2s ease-in-out ${i * 0.15}s infinite`,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes preloaderDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
          40%           { transform: scale(1);   opacity: 1;   }
        }
      `}</style>
    </div>
  );
}
