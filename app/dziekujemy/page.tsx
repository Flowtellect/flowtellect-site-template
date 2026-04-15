import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dziękujemy za wiadomość',
  description: 'Twoja wiadomość została wysłana.',
  robots: { index: false, follow: false },
};

// Server-side fallback target for ContactForm. JS-enabled visitors stay on
// the original page (AJAX submit shows inline thank-you); JS-disabled
// visitors get a real POST -> Netlify -> 302 redirect here.
export default function ThankYouPage() {
  return (
    <main
      id="main-content"
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
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(var(--color-accent, 99 102 241), 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px',
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgb(var(--color-accent, 99 102 241))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h1
        style={{
          fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
          fontWeight: 700,
          fontFamily: 'var(--font-display, system-ui)',
          marginBottom: '12px',
          letterSpacing: '-0.02em',
        }}
      >
        Dziękujemy!
      </h1>

      <p
        style={{
          fontSize: '16px',
          color: 'rgba(var(--color-text-primary, 15 15 20), 0.6)',
          maxWidth: '450px',
          lineHeight: 1.6,
          marginBottom: '32px',
        }}
      >
        Twoja wiadomość została wysłana. Odpowiemy najszybciej jak to możliwe.
      </p>

      <Link
        href="/"
        style={{
          padding: '12px 28px',
          borderRadius: '8px',
          background: 'rgb(var(--color-accent, 99 102 241))',
          color: 'rgb(var(--color-on-accent, 255 255 255))',
          fontSize: '14px',
          fontWeight: 600,
          fontFamily: 'var(--font-body, system-ui)',
          textDecoration: 'none',
        }}
      >
        Wróć na stronę główną
      </Link>
    </main>
  );
}
