import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:            "rgb(var(--color-bg) / <alpha-value>)",
        "bg-alt":      "rgb(var(--color-bg-alt) / <alpha-value>)",
        surface:       "rgb(var(--color-surface) / <alpha-value>)",
        "surface-deep":"rgb(var(--color-surface-deep) / <alpha-value>)",
        primary:       "rgb(var(--color-text-primary) / <alpha-value>)",
        muted:         "rgb(var(--color-text-muted) / <alpha-value>)",
        dim:           "rgb(var(--color-text-dim) / <alpha-value>)",
        accent:        "rgb(var(--color-accent) / <alpha-value>)",
        "accent-light":"rgb(var(--color-accent-light) / <alpha-value>)",
        "accent-dark": "rgb(var(--color-accent-dark) / <alpha-value>)",
        "on-accent":   "rgb(var(--color-on-accent) / <alpha-value>)",
        border:        "rgb(var(--color-border) / <alpha-value>)",
        "border-soft": "rgb(var(--color-border-soft) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body:    ["var(--font-body)"],
        accent:  ["var(--font-accent)"],
      },
      // Multi-layer shadows z theme presetu (sharp/soft/rounded/pill/brutalist).
      // Klasy: shadow-xs/sm/md/lg/xl/accent. Nadpisuja Tailwind defaults.
      boxShadow: {
        xs:     "var(--shadow-xs)",
        sm:     "var(--shadow-sm)",
        md:     "var(--shadow-md)",
        lg:     "var(--shadow-lg)",
        xl:     "var(--shadow-xl)",
        accent: "var(--shadow-accent)",
      },
      // Radius scale z theme presetu. Tailwind defaults dla rounded/2xl/3xl
      // pozostaja - dodajemy tylko semantyczne aliasy + override sm/md/lg/xl.
      borderRadius: {
        sm:   "var(--radius-sm)",
        md:   "var(--radius-md)",
        lg:   "var(--radius-lg)",
        xl:   "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      // Spacing tokens z density preset — dodajemy custom keys (NIE nadpisujemy
      // calego scale Tailwind). Klasy: p-section, gap-space-md, my-space-2xl.
      spacing: {
        section:     "var(--space-section)",
        "space-xs":  "var(--space-xs)",
        "space-sm":  "var(--space-sm)",
        "space-md":  "var(--space-md)",
        "space-lg":  "var(--space-lg)",
        "space-xl":  "var(--space-xl)",
        "space-2xl": "var(--space-2xl)",
        "space-3xl": "var(--space-3xl)",
      },
      // Type scale z type-scale preset. Klasy: text-token-base, text-token-hero.
      // Tailwind defaults (text-base, text-xl) NIE sa nadpisywane — token-* prefix
      // pozwala uzywac obu rownolegle.
      fontSize: {
        "token-xs":   "var(--text-xs)",
        "token-sm":   "var(--text-sm)",
        "token-base": "var(--text-base)",
        "token-lg":   "var(--text-lg)",
        "token-xl":   "var(--text-xl)",
        "token-2xl":  "var(--text-2xl)",
        "token-3xl":  "var(--text-3xl)",
        "token-4xl":  "var(--text-4xl)",
        "token-hero": "var(--text-hero)",
      },
      lineHeight: {
        tight:   "var(--leading-tight)",
        normal:  "var(--leading-normal)",
        relaxed: "var(--leading-relaxed)",
      },
      letterSpacing: {
        tight:  "var(--tracking-tight)",
        normal: "var(--tracking-normal)",
        wide:   "var(--tracking-wide)",
      },
      transitionTimingFunction: {
        DEFAULT: "var(--ease-default)",
      },
      transitionDuration: {
        fast:   "var(--duration-fast)",
        normal: "var(--duration-normal)",
      },
    },
  },
  plugins: [],
};
export default config;
