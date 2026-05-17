import type { Config } from "tailwindcss";

/**
 * Tailwind v4: design tokens and theme extensions live in CSS
 * (`styles/tailwind-theme.css`, `@theme`, `@utility`, `@custom-variant`).
 *
 * Use this file for content globs, future plugins, and any JS-only options.
 */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
