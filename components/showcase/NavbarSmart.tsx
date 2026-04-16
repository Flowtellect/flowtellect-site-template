"use client";

// ─── NavbarSmart (Showcase Tier 1) ───────────────────────────────────────────
//
// Sticky navbar z transparent→solid transition przy scroll (>60px), kompresja
// padding + logo size. Dropdown submenu z 200ms close delay (pt-2 bridge).
// Mobile: fullscreen overlay z body scroll lock. Schema aligned z navbar_1/2/3.

import { useState, useEffect, useRef } from "react";
import { pickStr, isValidImage } from "./shared";
import { useDesign } from "./DesignContext";
import { getButtonRadius } from "./designStyles";

interface NavLink {
  label?: string;
  href?: string;
  children?: NavLink[];
}

interface Props {
  content: Record<string, unknown>;
}

export default function NavbarSmart({ content }: Props) {
  const c = content;
  const dd = useDesign();
  const btnRadius = getButtonRadius(dd);

  const brandName = pickStr(c, "brand_name", "company_name");
  const logo = pickStr(c, "logo");
  const hasLogo = isValidImage(logo);

  const cta = c.cta as Record<string, unknown> | undefined;
  const ctaLabel = cta && typeof cta.label === "string" ? cta.label : "";
  const ctaHref =
    cta && typeof cta.href === "string" ? cta.href : "#contact";

  const rawLinks = (c.links ?? c.links_left ?? c.menu_groups ?? []) as NavLink[];
  const links = Array.isArray(rawLinks) ? rawLinks : [];

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownIdx, setDropdownIdx] = useState<number | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : prev;
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  function openDropdown(idx: number) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownIdx(idx);
  }

  function closeDropdown() {
    closeTimer.current = setTimeout(() => setDropdownIdx(null), 200);
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? "rgba(var(--color-bg), 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(var(--color-border-soft), 0.5)"
            : "1px solid transparent",
          transition:
            "background var(--duration-normal, 250ms) var(--ease-default), border-bottom-color var(--duration-normal) var(--ease-default)",
        }}
      >
        <nav
          className="max-w-7xl mx-auto flex items-center justify-between"
          style={{
            padding: scrolled
              ? "var(--space-sm, 8px) var(--space-lg, 24px)"
              : "var(--space-md, 16px) var(--space-lg, 24px)",
            transition: "padding var(--duration-normal) var(--ease-default)",
          }}
        >
          {/* Logo / Brand */}
          <a
            href="/"
            className="flex-shrink-0"
            style={{ textDecoration: "none" }}
          >
            {hasLogo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo}
                alt={brandName || "logo"}
                style={{
                  height: scrolled ? "28px" : "36px",
                  width: "auto",
                  objectFit: "contain",
                  transition:
                    "height var(--duration-normal) var(--ease-default)",
                }}
              />
            ) : (
              <span
                className="font-display font-bold text-primary"
                style={{
                  fontSize: scrolled ? "var(--text-lg)" : "var(--text-xl)",
                  transition:
                    "font-size var(--duration-normal) var(--ease-default)",
                }}
              >
                {brandName}
              </span>
            )}
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link, i) => {
              const hasChildren =
                Array.isArray(link.children) && link.children.length > 0;
              return (
                <div
                  key={i}
                  className="relative"
                  onMouseEnter={() => hasChildren && openDropdown(i)}
                  onMouseLeave={hasChildren ? closeDropdown : undefined}
                >
                  <a
                    href={link.href ?? "#"}
                    className="anim-link-underline font-body text-muted hover:text-primary px-3 py-2 inline-flex items-center gap-1"
                    style={{
                      fontSize: "var(--text-sm)",
                      textDecoration: "none",
                      transition:
                        "color var(--duration-fast) var(--ease-default)",
                    }}
                  >
                    {link.label}
                    {hasChildren && (
                      <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      >
                        <path d="M1 1L5 5L9 1" />
                      </svg>
                    )}
                  </a>

                  {hasChildren && dropdownIdx === i && (
                    <div
                      className="absolute top-full left-0 pt-2 z-50"
                      onMouseEnter={() => openDropdown(i)}
                      onMouseLeave={closeDropdown}
                    >
                      <div
                        style={{
                          background: "rgb(var(--color-bg))",
                          border: "1px solid rgb(var(--color-border-soft))",
                          borderRadius: "var(--radius-md, 10px)",
                          boxShadow: "var(--shadow-lg)",
                          padding: "var(--space-xs, 4px)",
                          minWidth: "200px",
                        }}
                      >
                        {link.children!.map((child, j) => (
                          <a
                            key={j}
                            href={child.href ?? "#"}
                            className="block font-body text-muted hover:text-primary hover:bg-bg-alt px-4 py-2.5"
                            style={{
                              fontSize: "var(--text-sm)",
                              textDecoration: "none",
                              borderRadius: "var(--radius-sm, 6px)",
                              transition:
                                "color var(--duration-fast), background var(--duration-fast)",
                            }}
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop CTA */}
          {ctaLabel && (
            <a
              href={ctaHref}
              className="hidden md:inline-flex items-center font-body font-semibold"
              style={{
                padding: "var(--space-sm, 8px) var(--space-lg, 24px)",
                borderRadius: btnRadius,
                background: "rgb(var(--color-accent))",
                color: "rgb(var(--color-on-accent))",
                fontSize: "var(--text-sm)",
                textDecoration: "none",
                boxShadow: "var(--shadow-accent)",
                transition: "transform var(--duration-fast)",
              }}
            >
              {ctaLabel}
            </a>
          )}

          {/* Hamburger */}
          <button
            type="button"
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
          >
            <span
              className={`block w-6 h-0.5 bg-primary transition-all duration-fast ${
                mobileOpen ? "rotate-45 translate-y-[5px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-primary transition-all duration-fast ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-primary transition-all duration-fast ${
                mobileOpen ? "-rotate-45 -translate-y-[5px]" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-normal ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(var(--color-bg), 0.98)" }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 pt-16">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href ?? "#"}
              onClick={() => setMobileOpen(false)}
              className="font-body text-primary hover:text-accent"
              style={{
                fontSize: "var(--text-lg)",
                textDecoration: "none",
                letterSpacing: "var(--tracking-wide)",
                transition: "color var(--duration-fast)",
              }}
            >
              {link.label}
            </a>
          ))}
          {ctaLabel && (
            <a
              href={ctaHref}
              onClick={() => setMobileOpen(false)}
              className="mt-4 font-body font-semibold"
              style={{
                padding: "var(--space-md, 16px) var(--space-xl, 32px)",
                borderRadius: btnRadius,
                background: "rgb(var(--color-accent))",
                color: "rgb(var(--color-on-accent))",
                textDecoration: "none",
              }}
            >
              {ctaLabel}
            </a>
          )}
        </div>
      </div>
    </>
  );
}
