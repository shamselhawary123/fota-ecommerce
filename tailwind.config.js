import tailwindcssRtl from "tailwindcss-rtl";

export default {
  content: [
    "./app/**/*.{vue,js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.25rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "2.5rem",
      },
    },
    extend: {
      colors: {
        brand: {
          50: "#f3f6fb",
          100: "#e7edf7",
          200: "#d0deef",
          300: "#aac3e1",
          400: "#7b9fd0",
          500: "#5a7fba",
          600: "#46659a",
          700: "#39507a",
          800: "#314463",
          900: "#1e2f49",
          950: "#0d1726",
        },
        accent: {
          50: "#fff7ed",
          100: "#ffedd4",
          200: "#ffd7a8",
          300: "#ffbb71",
          400: "#fb9741",
          500: "#f5791a",
          600: "#e66010",
          700: "#be4710",
          800: "#973915",
          900: "#7a3114",
          950: "#421608",
        },
        surface: {
          base: "#f6f7fb",
          raised: "#ffffff",
          muted: "#eef2f8",
          inverted: "#0d1726",
        },
        neutral: {
          25: "#fcfdff",
          50: "#f8fafc",
          100: "#eef2f6",
          200: "#dde5ed",
          300: "#c5d0dc",
          400: "#94a4b6",
          500: "#64748b",
          600: "#49586b",
          700: "#364152",
          800: "#1f2937",
          900: "#111827",
          950: "#0b1120",
        },
        success: {
          50: "#edfdf4",
          500: "#16a34a",
          600: "#15803d",
        },
        warning: {
          50: "#fffbeb",
          500: "#d97706",
          600: "#b45309",
        },
        danger: {
          50: "#fef2f2",
          500: "#dc2626",
          600: "#b91c1c",
        },
      },
      fontFamily: {
        sans: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Fraunces", "Georgia", "serif"],
      },
      maxWidth: {
        site: "1200px",
        wide: "1380px",
        prose: "68ch",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.06)",
        card: "0 18px 48px rgba(15, 23, 42, 0.08)",
        floating: "0 24px 60px rgba(15, 23, 42, 0.12)",
        glow: "0 0 0 1px rgba(255,255,255,0.8), 0 22px 60px rgba(37, 56, 88, 0.18)",
      },
      backgroundImage: {
        "hero-mesh":
          "radial-gradient(circle at top left, rgba(90,127,186,0.18), transparent 36%), radial-gradient(circle at bottom right, rgba(245,121,26,0.18), transparent 30%), linear-gradient(135deg, rgba(255,255,255,0.95), rgba(237,241,247,0.92))",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        shimmer: "shimmer 1.8s linear infinite",
      },
    },
  },
  plugins: [tailwindcssRtl],
};
