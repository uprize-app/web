import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import containerQueries from "@tailwindcss/container-queries";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        paper: {
          DEFAULT: "#FAFAF7",
          2: "#F2F1EC",
          3: "#E9E7DF",
        },
        line: {
          DEFAULT: "#E1DED2",
          2: "#D4D0C2",
        },
        ink: {
          DEFAULT: "#0E0E0C",
          90: "#1A1A17",
          80: "#2A2A26",
          70: "#3D3D38",
          60: "#5A5A52",
          50: "#7C7C73",
          40: "#9D9D95",
          30: "#BCBCB4",
        },
        burn: {
          50: "#FBEFE5",
          100: "#FCDFCC",
          200: "#F8B795",
          300: "#F08956",
          400: "#E66B36",
          500: "#D4541F",
          600: "#B0451A",
          700: "#8A3A0F",
        },

        background: "#FAFAF7",
        foreground: "#0E0E0C",
        border: "#E1DED2",
        input: "#E1DED2",
        ring: "#0E0E0C",
        primary: {
          DEFAULT: "#0E0E0C",
          foreground: "#FAFAF7",
        },
        secondary: {
          DEFAULT: "#F2F1EC",
          foreground: "#0E0E0C",
        },
        accent: {
          DEFAULT: "#D4541F",
          foreground: "#FAFAF7",
        },
        destructive: {
          DEFAULT: "#B0451A",
          foreground: "#FAFAF7",
        },
        muted: {
          DEFAULT: "#F2F1EC",
          foreground: "#7C7C73",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#0E0E0C",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#0E0E0C",
        },
      },
      fontFamily: {
        sans: ["var(--font-noto)", "var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-instrument)", "var(--font-noto)", "Georgia", "serif"],
        mono: ["ui-monospace", "JetBrains Mono", "Menlo", "monospace"],
      },
      fontSize: {
        eyebrow: ["11px", { lineHeight: "1.2", letterSpacing: "0.16em" }],
      },
      letterSpacing: {
        eyebrow: "0.16em",
        "tight-display": "-0.02em",
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "6px",
        lg: "10px",
        xl: "16px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(14,14,12,.04), 0 8px 24px rgba(14,14,12,.05)",
        lift: "0 2px 4px rgba(14,14,12,.05), 0 28px 60px rgba(14,14,12,.09)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.22, 1, 0.36, 1)",
        "in-out-quint": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "page-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-bg": {
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        "fade-up": "fade-up .5s cubic-bezier(0.22, 1, 0.36, 1)",
        "page-in": "page-in .8s cubic-bezier(0.22, 1, 0.36, 1) both",
        "pulse-bg": "pulse-bg 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [animate, containerQueries],
};

export default config;
