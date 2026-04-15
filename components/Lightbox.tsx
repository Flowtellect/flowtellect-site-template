'use client';

import { useEffect, useState } from 'react';

interface Props {
  images: Array<{ src: string; alt?: string }>;
  initialIndex?: number;
  onClose: () => void;
}

// Fullscreen image viewer with keyboard nav (Esc, ←/→), touch-friendly arrows,
// counter, fade-in. Locks body scroll while open. Click backdrop = close,
// click image = no-op (stopPropagation).
export default function Lightbox({ images, initialIndex = 0, onClose }: Props) {
  const [current, setCurrent] = useState(initialIndex);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrent((c) => Math.min(c + 1, images.length - 1));
      if (e.key === 'ArrowLeft') setCurrent((c) => Math.max(c - 1, 0));
    };
    window.addEventListener('keydown', handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [images.length, onClose]);

  if (images.length === 0) return null;
  const img = images[current];

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Powiekszone zdjecie"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'zoom-out',
        animation: 'lightboxFadeIn 0.2s ease',
      }}
    >
      <style>{`@keyframes lightboxFadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Zamknij"
        style={{
          position: 'absolute', top: '20px', right: '20px',
          width: '40px', height: '40px', borderRadius: '50%',
          border: 'none', background: 'rgba(255,255,255,0.1)',
          color: 'white', fontSize: '20px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2,
        }}
      >
        ✕
      </button>

      {current > 0 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setCurrent((c) => c - 1); }}
          aria-label="Poprzednie zdjecie"
          style={{
            position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
            width: '44px', height: '44px', borderRadius: '50%', border: 'none',
            background: 'rgba(255,255,255,0.1)', color: 'white', fontSize: '22px',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2,
          }}
        >‹</button>
      )}
      {current < images.length - 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setCurrent((c) => c + 1); }}
          aria-label="Nastepne zdjecie"
          style={{
            position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
            width: '44px', height: '44px', borderRadius: '50%', border: 'none',
            background: 'rgba(255,255,255,0.1)', color: 'white', fontSize: '22px',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2,
          }}
        >›</button>
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img.src}
        alt={img.alt ?? ''}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '90vw',
          maxHeight: '85vh',
          objectFit: 'contain',
          borderRadius: '4px',
          cursor: 'default',
        }}
      />

      {images.length > 1 && (
        <span
          style={{
            position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.65)', fontSize: '13px',
            fontFamily: 'system-ui, sans-serif', letterSpacing: '0.05em',
          }}
        >
          {current + 1} / {images.length}
        </span>
      )}
    </div>
  );
}
