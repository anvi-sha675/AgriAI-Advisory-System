/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#166534",
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#166534",
          800: "#14532d",
          900: "#0f3d23",
          950: "#082815",
        },
        secondary: {
          DEFAULT: "#22C55E",
          50: "#f0fdf4",
          100: "#dcfce7",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
        },
        accent: {
          DEFAULT: "#0EA5E9",
          50: "#f0f9ff",
          100: "#e0f2fe",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
        },
        surface: "#F8FAFC",
        ink: "#111827",
        earth: {
          50: "#fdf8f0",
          100: "#f7ecd9",
          200: "#ecd5ad",
          400: "#c99a4a",
          600: "#92651f",
        },
      },
      fontFamily: {
        display: ["Fraunces", "ui-serif", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        furrow: "repeating-linear-gradient(180deg, currentColor 0px, currentColor 1px, transparent 1px, transparent 14px)",
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgb(17 24 39 / 0.06), 0 1px 2px -1px rgb(17 24 39 / 0.04)",
        card: "0 4px 16px -4px rgb(17 24 39 / 0.08), 0 2px 4px -2px rgb(17 24 39 / 0.04)",
        lift: "0 12px 32px -8px rgb(17 24 39 / 0.12), 0 4px 8px -4px rgb(17 24 39 / 0.06)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        growIn: {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-8px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease-out forwards",
        growIn: "growIn 0.4s ease-out forwards",
        pulseSoft: "pulseSoft 1.6s ease-in-out infinite",
        slideIn: "slideIn 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};
