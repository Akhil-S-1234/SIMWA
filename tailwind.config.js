/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "#faf8ff",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f2f3ff",
        "surface-container": "#eaedff",
        "surface-container-high": "#e2e7ff",
        "surface-container-highest": "#dae2fd",
        "on-surface": "#131b2e",
        "on-surface-variant": "#464555",
        outline: "#777587",
        "outline-variant": "#c7c4d8",
        primary: {
          DEFAULT: "#3525cd",
          container: "#4f46e5",
          fixed: "#e2dfff",
        },
        "on-primary": "#ffffff",
        secondary: {
          DEFAULT: "#0058be",
          container: "#2170e4",
        },
        "on-secondary": "#ffffff",
        tertiary: {
          DEFAULT: "#005338",
          container: "#006e4b",
          fixed: "#6ffbbe",
        },
        "on-tertiary": "#ffffff",
        "on-tertiary-fixed": "#002113",
        error: {
          DEFAULT: "#ba1a1a",
          container: "#ffdad6",
        },
        "inverse-surface": "#283044",
        "inverse-on-surface": "#eef0ff",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        heading: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
