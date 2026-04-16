"use client";

// ─── ContactForm (Netlify Forms + inline validation) ─────────────────────────
//
// Netlify auto-detects form (data-netlify="true") przy deploy. Hidden static
// placeholder nie jest potrzebny bo form-name pole jest zawsze w DOM-ie.
//
// Live validation: on blur (po opuszczeniu pola) + on submit (mark all touched
// zeby kazde zle pole podswietlalo sie od razu). State machine:
//   idle -> sending -> (sent | error). Sent state = success card z checkmarkiem.

import { useState, type ChangeEvent, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

interface Props {
  eyebrow?: string;
  heading?: string;
  /** Optional trust reducer pod przyciskiem (z brandVoice.ctaPattern.trust_reducers). */
  trustReducer?: string;
}

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const INITIAL: FormValues = { name: "", email: "", phone: "", message: "" };

function validate(field: keyof FormValues, value: string): string | null {
  switch (field) {
    case "name":
      if (value.trim().length < 2) return "Podaj swoje imię i nazwisko";
      return null;
    case "email":
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "Wpisz poprawny adres email";
      return null;
    case "phone":
      if (value.trim().length === 0) return null; // opcjonalne
      if (value.trim().length < 6) return "Za krótki numer telefonu";
      return null;
    case "message":
      if (value.trim().length < 10) return "Napisz kilka słów (min. 10 znaków)";
      return null;
  }
}

export default function ContactForm({ eyebrow, heading, trustReducer }: Props) {
  const [values, setValues] = useState<FormValues>(INITIAL);
  const [touched, setTouched] = useState<Record<keyof FormValues, boolean>>({
    name: false, email: false, phone: false, message: false,
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const errors: Record<keyof FormValues, string | null> = {
    name:    touched.name    ? validate("name",    values.name)    : null,
    email:   touched.email   ? validate("email",   values.email)   : null,
    phone:   touched.phone   ? validate("phone",   values.phone)   : null,
    message: touched.message ? validate("message", values.message) : null,
  };

  const valid: Record<keyof FormValues, boolean> = {
    name:    !errors.name    && values.name.trim().length >= 2,
    email:   !errors.email   && values.email.trim().length > 0 && /@/.test(values.email),
    phone:   !errors.phone   && values.phone.trim().length >= 6,
    message: !errors.message && values.message.trim().length >= 10,
  };

  function updateField(field: keyof FormValues, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function markTouched(field: keyof FormValues) {
    setTouched((t) => ({ ...t, [field]: true }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, message: true });

    const hasErrors =
      validate("name", values.name) !== null ||
      validate("email", values.email) !== null ||
      validate("phone", values.phone) !== null ||
      validate("message", values.message) !== null;
    if (hasErrors) return;

    setStatus("sending");
    setErrorMsg(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      params.append(key, String(value));
    });

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      if (res.ok) {
        setStatus("sent");
        setValues(INITIAL);
        setTouched({ name: false, email: false, phone: false, message: false });
      } else {
        setStatus("error");
        setErrorMsg(`Błąd ${res.status}. Spróbuj ponownie lub napisz bezpośrednio na e-mail.`);
      }
    } catch {
      setStatus("error");
      setErrorMsg("Brak połączenia. Sprawdź internet i spróbuj ponownie.");
    }
  }

  if (status === "sent") {
    return (
      <div
        className="border border-accent/20 text-center"
        style={{
          background: "rgba(var(--color-accent), 0.08)",
          borderRadius: "var(--radius-xl, 20px)",
          padding: "var(--space-2xl, 48px) var(--space-xl, 32px)",
        }}
        role="status"
        aria-live="polite"
      >
        <div
          className="inline-flex items-center justify-center"
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "var(--radius-full)",
            background: "rgba(var(--color-accent), 0.15)",
            marginBottom: "var(--space-md, 16px)",
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgb(var(--color-accent))"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3
          className="font-display font-semibold text-primary"
          style={{ fontSize: "var(--text-xl)", marginBottom: "var(--space-sm)" }}
        >
          Dziękujemy!
        </h3>
        <p
          className="font-body text-muted"
          style={{ fontSize: "var(--text-sm)", lineHeight: "var(--leading-normal)" }}
        >
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
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Nie wypełniaj tego pola: <input name="bot-field" />
        </label>
      </p>

      {(eyebrow || heading) && (
        <div className="mb-2">
          {eyebrow && (
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-accent" />
              <span className="text-xs uppercase tracking-[0.3em] text-accent font-accent">
                {eyebrow}
              </span>
            </div>
          )}
          {heading && (
            <h3 className="font-display text-2xl md:text-3xl text-primary leading-tight">
              {heading}
            </h3>
          )}
        </div>
      )}

      <FormField
        label="Imię i nazwisko"
        name="name"
        type="text"
        value={values.name}
        error={errors.name}
        valid={valid.name}
        placeholder="Jan Kowalski"
        autoComplete="name"
        onChange={(v) => updateField("name", v)}
        onBlur={() => markTouched("name")}
      />

      <FormField
        label="E-mail"
        name="email"
        type="email"
        value={values.email}
        error={errors.email}
        valid={valid.email}
        placeholder="jan@example.com"
        autoComplete="email"
        onChange={(v) => updateField("email", v)}
        onBlur={() => markTouched("email")}
      />

      <FormField
        label="Telefon (opcjonalnie)"
        name="phone"
        type="tel"
        value={values.phone}
        error={errors.phone}
        valid={valid.phone}
        placeholder="+48 123 456 789"
        autoComplete="tel"
        onChange={(v) => updateField("phone", v)}
        onBlur={() => markTouched("phone")}
      />

      <FormField
        label="Wiadomość"
        name="message"
        type="textarea"
        value={values.message}
        error={errors.message}
        valid={valid.message}
        placeholder="W czym możemy pomóc?"
        onChange={(v) => updateField("message", v)}
        onBlur={() => markTouched("message")}
      />

      {errorMsg && (
        <p
          className="font-body"
          style={{ fontSize: "var(--text-sm)", color: "rgb(239, 68, 68)" }}
          role="alert"
        >
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 inline-flex items-center justify-center gap-2 font-body font-semibold disabled:cursor-not-allowed transition-all"
        style={{
          padding: "var(--space-md, 16px) var(--space-xl, 32px)",
          borderRadius: "var(--radius-md, 10px)",
          background: "rgb(var(--color-accent))",
          color: "rgb(var(--color-on-accent))",
          fontSize: "var(--text-sm)",
          boxShadow: "var(--shadow-accent)",
          opacity: status === "sending" ? 0.6 : 1,
          border: "none",
          cursor: status === "sending" ? "wait" : "pointer",
        }}
      >
        {status === "sending" ? "Wysyłanie..." : "Wyślij wiadomość"}
      </button>

      {trustReducer && (
        <p
          className="font-body text-dim text-center"
          style={{ fontSize: "var(--text-xs)", marginTop: "var(--space-xs, 4px)" }}
        >
          {trustReducer}
        </p>
      )}

      <p
        className="font-body text-dim"
        style={{ fontSize: "var(--text-xs)", marginTop: "var(--space-xs)" }}
      >
        Wysyłając formularz akceptujesz naszą{" "}
        <a
          href="/polityka-prywatnosci"
          className="underline hover:text-accent transition-colors"
        >
          politykę prywatności
        </a>
        .
      </p>
    </form>
  );
}

// ─── FormField — controlled input/textarea z inline validation state ─────────

interface FormFieldProps {
  label: string;
  name: string;
  type: "text" | "email" | "tel" | "textarea";
  value: string;
  error: string | null;
  valid: boolean;
  placeholder?: string;
  autoComplete?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

function FormField({
  label, name, type, value, error, valid,
  placeholder, autoComplete, onChange, onBlur,
}: FormFieldProps) {
  const state = error ? "error" : valid ? "valid" : "default";
  const borderColor =
    state === "error"  ? "rgb(239, 68, 68)" :
    state === "valid"  ? "rgb(var(--color-accent))" :
                         "rgb(var(--color-border))";

  const hasIcon = state !== "default" && type !== "textarea";
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "var(--space-sm, 10px) var(--space-md, 16px)",
    paddingRight: hasIcon ? "40px" : undefined,
    borderRadius: "var(--radius-md, 10px)",
    border: `1.5px solid ${borderColor}`,
    background: "rgb(var(--color-bg-alt))",
    color: "rgb(var(--color-text-primary))",
    fontSize: "var(--text-sm)",
    fontFamily: "var(--font-body)",
    outline: "none",
    transition: "border-color var(--duration-fast, 150ms)",
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-body text-xs uppercase tracking-wider text-muted">
        {label}
      </span>

      <div style={{ position: "relative" }}>
        {type === "textarea" ? (
          <textarea
            name={name}
            value={value}
            placeholder={placeholder}
            rows={5}
            style={{ ...inputStyle, resize: "vertical" }}
            onChange={handleChange}
            onBlur={onBlur}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            autoComplete={autoComplete}
            style={inputStyle}
            onChange={handleChange}
            onBlur={onBlur}
          />
        )}

        {hasIcon && (
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "16px",
              color: state === "valid" ? "rgb(var(--color-accent))" : "rgb(239, 68, 68)",
              pointerEvents: "none",
              fontWeight: 700,
            }}
          >
            {state === "valid" ? "✓" : "!"}
          </span>
        )}
      </div>

      {error && (
        <span
          className="font-body"
          style={{ fontSize: "var(--text-xs)", color: "rgb(239, 68, 68)" }}
        >
          {error}
        </span>
      )}
    </label>
  );
}
