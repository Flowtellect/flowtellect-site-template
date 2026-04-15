'use client';

import { useState } from 'react';

// Netlify Forms-compatible contact form with inline AJAX submit (no redirect).
// Netlify auto-detects forms with `data-netlify="true"` at deploy time. The
// hidden static placeholder rendered alongside (see comment below) ensures the
// form is recognized even though React only mounts the dynamic version on the client.
//
// Submit posts to "/" with x-www-form-urlencoded; Netlify intercepts the POST
// because of the form-name field. /dziekujemy is the redirect fallback if JS
// is disabled (form's `action` attribute).

type Status = 'idle' | 'sending' | 'sent' | 'error';

interface Props {
  /** Section eyebrow above the form (e.g. "Skontaktuj się"). */
  eyebrow?: string;
  /** Heading above the form. */
  heading?: string;
}

export default function ContactForm({ eyebrow, heading }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Convert FormData -> URLSearchParams for application/x-www-form-urlencoded
    const params = new URLSearchParams();
    formData.forEach((value, key) => { params.append(key, String(value)); });

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });
      if (res.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
        setErrorMsg(`Błąd ${res.status}. Spróbuj ponownie lub napisz bezpośrednio na e-mail.`);
      }
    } catch {
      setStatus('error');
      setErrorMsg('Brak połączenia. Sprawdź internet i spróbuj ponownie.');
    }
  }

  if (status === 'sent') {
    return (
      <div
        className="bg-bg-alt border border-accent/20 rounded-xl p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--color-accent))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-display text-xl text-primary font-semibold mb-2">Dziękujemy!</h3>
        <p className="font-body text-sm text-muted">
          Twoja wiadomość została wysłana. Odpowiemy najszybciej jak to możliwe.
        </p>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      action="/dziekujemy"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      {/* Required by Netlify when AJAX-submitting — identifies which form */}
      <input type="hidden" name="form-name" value="contact" />

      {/* Honeypot — bots fill this; humans don't see it */}
      <p className="hidden">
        <label>Nie wypełniaj tego pola: <input name="bot-field" /></label>
      </p>

      {(eyebrow || heading) && (
        <div className="mb-2">
          {eyebrow && (
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-accent" />
              <span className="text-xs uppercase tracking-[0.3em] text-accent font-accent">{eyebrow}</span>
            </div>
          )}
          {heading && (
            <h3 className="font-display text-2xl md:text-3xl text-primary leading-tight">{heading}</h3>
          )}
        </div>
      )}

      <label className="flex flex-col gap-1.5">
        <span className="font-body text-xs uppercase tracking-wider text-muted">Imię i nazwisko</span>
        <input
          type="text"
          name="name"
          required
          autoComplete="name"
          className="bg-bg-alt border border-border rounded-lg px-4 py-3 text-sm text-primary placeholder:text-dim focus:border-accent focus:outline-none transition-colors"
          placeholder="Jan Kowalski"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="font-body text-xs uppercase tracking-wider text-muted">E-mail</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className="bg-bg-alt border border-border rounded-lg px-4 py-3 text-sm text-primary placeholder:text-dim focus:border-accent focus:outline-none transition-colors"
          placeholder="jan@example.com"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="font-body text-xs uppercase tracking-wider text-muted">Telefon (opcjonalnie)</span>
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          className="bg-bg-alt border border-border rounded-lg px-4 py-3 text-sm text-primary placeholder:text-dim focus:border-accent focus:outline-none transition-colors"
          placeholder="+48 123 456 789"
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="font-body text-xs uppercase tracking-wider text-muted">Wiadomość</span>
        <textarea
          name="message"
          required
          rows={5}
          className="bg-bg-alt border border-border rounded-lg px-4 py-3 text-sm text-primary placeholder:text-dim focus:border-accent focus:outline-none transition-colors resize-y"
          placeholder="W czym możemy pomóc?"
        />
      </label>

      {errorMsg && (
        <p className="font-body text-sm text-red-400" role="alert">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent text-on-accent font-body font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Wysyłanie...' : 'Wyślij wiadomość'}
      </button>

      <p className="font-body text-xs text-dim mt-1">
        Wysyłając formularz akceptujesz naszą{' '}
        <a href="/polityka-prywatnosci" className="underline hover:text-accent transition-colors">
          politykę prywatności
        </a>.
      </p>
    </form>
  );
}
