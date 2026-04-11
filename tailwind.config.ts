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
    },
  },
  plugins: [],
};
export default config;
