// ─── FooterSection ───────────────────────────────────────────────────────────
// 15 variants: multi-column, centered, with details

/* eslint-disable @next/next/no-img-element */

import {
  ScrollReveal,
  resolveIcon,
  str,
  arr,
  resolveImage,
  Section,
} from "./shared";

interface FooterProps {
  content: Record<string, unknown>;
  vn: number;
}

function SocialIcon({ social }: { social: Record<string, unknown> }) {
  const platform = str(social.platform) || str(social.icon);
  const href = str(social.href) || str(social.url) || "#";
  const label = str(social.label) || platform;
  const icon = resolveIcon(platform);

  return (
    <a
      href={href}
      aria-label={label}
      className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent hover:text-on-accent transition-all duration-300"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="text-sm">{icon}</span>
    </a>
  );
}

export default function FooterSection({ content, vn }: FooterProps) {
  const logo = resolveImage(content.logo);
  const tagline = str(content.tagline);
  const columns = arr(content.columns);
  const flatLinks = arr(content.links);
  const socials = arr(content.socials) || arr(content.social_links);
  const copyright = str(content.copyright);
  const phone = str(content.phone);
  const email = str(content.email);

  // ── vn 1-5: Multi-column ─────────────────────────────────────────────────

  if (vn <= 5) {
    return (
      <footer className="border-t border-border bg-bg">
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto py-16 md:py-20">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
              {/* Logo + tagline */}
              <div className="md:col-span-4">
                {logo && (
                  <img src={logo} alt="" className="h-9 w-auto mb-4" loading="lazy" />
                )}
                {tagline && (
                  <p className="font-body text-sm text-muted leading-relaxed max-w-xs">
                    {tagline}
                  </p>
                )}

                {socials.length > 0 && (
                  <div className="flex items-center gap-2 mt-6">
                    {socials.map((s, i) => (
                      <SocialIcon key={i} social={s} />
                    ))}
                  </div>
                )}
              </div>

              {/* Columns */}
              {columns.map((col, i) => (
                <div key={i} className="md:col-span-2">
                  {str(col.heading) && (
                    <h4 className="font-display text-sm font-semibold text-primary mb-4">
                      {str(col.heading)}
                    </h4>
                  )}
                  <ul className="space-y-3">
                    {arr(col.links).map((link, j) => (
                      <li key={j}>
                        <a
                          href={str(link.href) || "#"}
                          className="font-body text-sm text-muted hover:text-primary transition-colors duration-200"
                        >
                          {str(link.label)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Copyright */}
          {copyright && (
            <ScrollReveal delay={200}>
              <div className="border-t border-border mt-12 pt-8">
                <p className="font-body text-xs text-muted">{copyright}</p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </footer>
    );
  }

  // ── vn 6-10: Centered ────────────────────────────────────────────────────

  if (vn <= 10) {
    return (
      <footer className="border-t border-border bg-bg">
        <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto py-16 md:py-20">
          <ScrollReveal>
            <div className="text-center">
              {logo && (
                <img src={logo} alt="" className="h-9 w-auto mx-auto mb-4" loading="lazy" />
              )}
              {tagline && (
                <p className="font-body text-sm text-muted leading-relaxed max-w-md mx-auto mb-8">
                  {tagline}
                </p>
              )}

              {/* Flat links */}
              {flatLinks.length > 0 && (
                <nav className="flex flex-wrap items-center justify-center gap-6 mb-8">
                  {flatLinks.map((link, i) => (
                    <a
                      key={i}
                      href={str(link.href) || "#"}
                      className="font-body text-sm text-muted hover:text-primary transition-colors duration-200"
                    >
                      {str(link.label)}
                    </a>
                  ))}
                </nav>
              )}

              {/* Columns as flat links */}
              {flatLinks.length === 0 && columns.length > 0 && (
                <nav className="flex flex-wrap items-center justify-center gap-6 mb-8">
                  {columns.flatMap((col) => arr(col.links)).map((link, i) => (
                    <a
                      key={i}
                      href={str(link.href) || "#"}
                      className="font-body text-sm text-muted hover:text-primary transition-colors duration-200"
                    >
                      {str(link.label)}
                    </a>
                  ))}
                </nav>
              )}

              {/* Social icons */}
              {socials.length > 0 && (
                <div className="flex items-center justify-center gap-3 mb-8">
                  {socials.map((s, i) => (
                    <SocialIcon key={i} social={s} />
                  ))}
                </div>
              )}

              {copyright && (
                <p className="font-body text-xs text-muted">{copyright}</p>
              )}
            </div>
          </ScrollReveal>
        </div>
      </footer>
    );
  }

  // ── vn 11-15: With details ────────────────────────────────────────────────

  return (
    <footer className="bg-surface-deep">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto py-16 md:py-20">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Left - logo, tagline, social, contact */}
            <div className="lg:col-span-5">
              {logo && (
                <img src={logo} alt="" className="h-9 w-auto mb-4" loading="lazy" />
              )}
              {tagline && (
                <p className="font-body text-sm text-muted leading-relaxed max-w-sm mb-6">
                  {tagline}
                </p>
              )}

              {(phone || email) && (
                <div className="space-y-2 mb-6">
                  {phone && (
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="block font-body text-sm text-muted hover:text-primary transition-colors"
                    >
                      {phone}
                    </a>
                  )}
                  {email && (
                    <a
                      href={`mailto:${email}`}
                      className="block font-body text-sm text-muted hover:text-primary transition-colors"
                    >
                      {email}
                    </a>
                  )}
                </div>
              )}

              {socials.length > 0 && (
                <div className="flex items-center gap-2">
                  {socials.map((s, i) => (
                    <SocialIcon key={i} social={s} />
                  ))}
                </div>
              )}
            </div>

            {/* Right - columns */}
            <div className="lg:col-span-7">
              <div className={`grid gap-8 ${
                columns.length === 1
                  ? "grid-cols-1"
                  : columns.length === 2
                  ? "grid-cols-2"
                  : "grid-cols-2 md:grid-cols-3"
              }`}>
                {columns.map((col, i) => (
                  <div key={i}>
                    {str(col.heading) && (
                      <h4 className="font-display text-sm font-semibold text-primary mb-4">
                        {str(col.heading)}
                      </h4>
                    )}
                    <ul className="space-y-3">
                      {arr(col.links).map((link, j) => (
                        <li key={j}>
                          <a
                            href={str(link.href) || "#"}
                            className="font-body text-sm text-muted hover:text-primary transition-colors duration-200"
                          >
                            {str(link.label)}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom bar */}
        <ScrollReveal delay={200}>
          <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            {copyright && (
              <p className="font-body text-xs text-muted">{copyright}</p>
            )}

            {/* Legal links from flat links */}
            {flatLinks.length > 0 && (
              <nav className="flex items-center gap-4">
                {flatLinks.map((link, i) => (
                  <a
                    key={i}
                    href={str(link.href) || "#"}
                    className="font-body text-xs text-muted hover:text-primary transition-colors duration-200"
                  >
                    {str(link.label)}
                  </a>
                ))}
              </nav>
            )}
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
