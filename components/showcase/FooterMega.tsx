"use client";

// ─── FooterMega (Showcase Tier 1) ────────────────────────────────────────────
//
// 4-col mega footer: brand/tagline/socials + 2x nav columns + contact/hours.
// Jesli schema ma `columns[]` → uzywa ich, inaczej fallback na flat `links[]`
// w jednej kolumnie "Nawigacja". Accent top line, border-top bottom bar z legal.

import { pickStr, isValidImage } from "./shared";

interface FooterLink {
  label?: string;
  href?: string;
  url?: string;
}

interface FooterColumn {
  title?: string;
  heading?: string;
  links?: FooterLink[];
  items?: FooterLink[];
}

interface SocialLink {
  platform?: string;
  url?: string;
  href?: string;
}

interface Props {
  content: Record<string, unknown>;
}

export default function FooterMega({ content }: Props) {
  const c = content;
  const brandName = pickStr(c, "brand_name", "company_name", "logo_text");
  const tagline = pickStr(c, "tagline", "description", "subtitle");
  const copyright =
    pickStr(c, "copyright", "legal") ||
    `© ${new Date().getFullYear()} ${brandName}`.trim();
  const phone = pickStr(c, "phone", "telephone");
  const email = pickStr(c, "email");
  const address = pickStr(c, "address", "location");
  const hours = pickStr(c, "hours", "opening_hours", "opening_hours_text");
  const logo = pickStr(c, "logo");
  const hasLogo = isValidImage(logo);

  const rawColumns = (c.columns ?? c.sections ?? []) as FooterColumn[];
  const columns = Array.isArray(rawColumns) ? rawColumns.slice(0, 4) : [];

  const rawLinks = (c.links ?? c.quick_links ?? []) as FooterLink[];
  const links = Array.isArray(rawLinks) ? rawLinks : [];

  const rawSocials = (c.socials ??
    c.social ??
    c.social_links ??
    []) as SocialLink[];
  const socials = Array.isArray(rawSocials) ? rawSocials : [];

  const displayColumns: FooterColumn[] =
    columns.length > 0
      ? columns
      : links.length > 0
      ? [{ title: "Nawigacja", links }]
      : [];

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "rgb(var(--color-surface-deep))",
        color: "rgb(var(--color-text-primary))",
      }}
    >
      {/* Top accent line */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgb(var(--color-accent)), transparent)",
          opacity: 0.3,
        }}
      />

      <div
        className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24"
        style={{
          paddingTop: "var(--space-3xl, 64px)",
          paddingBottom: "var(--space-xl, 32px)",
        }}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            {hasLogo ? (
              <a href="/">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo}
                  alt={brandName}
                  style={{
                    height: "32px",
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
              </a>
            ) : brandName ? (
              <a
                href="/"
                className="font-display font-bold text-primary"
                style={{
                  fontSize: "var(--text-xl)",
                  textDecoration: "none",
                }}
              >
                {brandName}
              </a>
            ) : null}

            {tagline && (
              <p
                className="font-body text-muted mt-4"
                style={{
                  fontSize: "var(--text-sm)",
                  lineHeight: "var(--leading-normal)",
                  maxWidth: "30ch",
                }}
              >
                {tagline}
              </p>
            )}

            {/* Social icons */}
            {socials.length > 0 && (
              <div className="flex gap-3 mt-6">
                {socials.map((s, i) => {
                  const url = s.url ?? s.href ?? "#";
                  const platform = (s.platform ?? "").toLowerCase();
                  return (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={platform || "social"}
                      className="flex items-center justify-center transition-colors duration-fast"
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "var(--radius-sm, 6px)",
                        background: "rgba(var(--color-accent), 0.08)",
                        color: "rgb(var(--color-text-muted))",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        el.style.background = "rgba(var(--color-accent), 0.2)";
                        el.style.color = "rgb(var(--color-accent))";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget;
                        el.style.background = "rgba(var(--color-accent), 0.08)";
                        el.style.color = "rgb(var(--color-text-muted))";
                      }}
                    >
                      <span style={{ fontSize: "14px", fontWeight: 700 }}>
                        {platform.charAt(0).toUpperCase() || "·"}
                      </span>
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Navigation columns */}
          {displayColumns.map((col, i) => {
            const colTitle = col.title ?? col.heading ?? "";
            const colLinks = col.links ?? col.items ?? [];
            return (
              <div key={i}>
                {colTitle && (
                  <h4
                    className="font-accent font-semibold text-accent uppercase mb-4"
                    style={{
                      fontSize: "var(--text-xs)",
                      letterSpacing: "var(--tracking-wide, 0.06em)",
                    }}
                  >
                    {colTitle}
                  </h4>
                )}
                <nav className="flex flex-col gap-3">
                  {colLinks.map((link, j) => {
                    const href = link.href ?? link.url ?? "#";
                    const label = link.label ?? "";
                    if (!label) return null;
                    return (
                      <a
                        key={j}
                        href={href}
                        className="font-body text-muted transition-colors duration-fast hover:text-accent"
                        style={{
                          fontSize: "var(--text-sm)",
                          textDecoration: "none",
                        }}
                      >
                        {label}
                      </a>
                    );
                  })}
                </nav>
              </div>
            );
          })}

          {/* Contact column */}
          {(phone || email || address || hours) && (
            <div>
              <h4
                className="font-accent font-semibold text-accent uppercase mb-4"
                style={{
                  fontSize: "var(--text-xs)",
                  letterSpacing: "var(--tracking-wide, 0.06em)",
                }}
              >
                Kontakt
              </h4>
              <div className="flex flex-col gap-3">
                {address && (
                  <p
                    className="font-body text-muted"
                    style={{
                      fontSize: "var(--text-sm)",
                      lineHeight: "var(--leading-normal)",
                    }}
                  >
                    {address}
                  </p>
                )}
                {phone && (
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="font-body text-muted hover:text-accent transition-colors duration-fast"
                    style={{
                      fontSize: "var(--text-sm)",
                      textDecoration: "none",
                    }}
                  >
                    {phone}
                  </a>
                )}
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="font-body text-muted hover:text-accent transition-colors duration-fast"
                    style={{
                      fontSize: "var(--text-sm)",
                      textDecoration: "none",
                    }}
                  >
                    {email}
                  </a>
                )}
                {hours && (
                  <p
                    className="font-body text-dim"
                    style={{
                      fontSize: "var(--text-xs)",
                      lineHeight: "var(--leading-normal)",
                    }}
                  >
                    {hours}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
          style={{
            borderTop: "1px solid rgba(var(--color-border-soft), 0.3)",
          }}
        >
          <p
            className="font-body text-dim"
            style={{ fontSize: "var(--text-xs)" }}
          >
            {copyright}
          </p>
          <div className="flex gap-4">
            <a
              href="/polityka-prywatnosci"
              className="font-body text-dim hover:text-muted transition-colors duration-fast"
              style={{
                fontSize: "var(--text-xs)",
                textDecoration: "none",
              }}
            >
              Polityka prywatności
            </a>
            <a
              href="/regulamin"
              className="font-body text-dim hover:text-muted transition-colors duration-fast"
              style={{
                fontSize: "var(--text-xs)",
                textDecoration: "none",
              }}
            >
              Regulamin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
