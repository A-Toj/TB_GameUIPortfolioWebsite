import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        xbox: {
          green: "#92C83E", // classic 360 blade lime
          deep: "#107C10",  // modern Xbox green
          glow: "#1FB814",
        },
        ink: {
          950: "#070b08",
          900: "#0b0f0c",
          800: "#11160f",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        tile: "0 10px 24px -14px rgba(0,0,0,0.45)",
        glow: "0 0 22px -4px rgba(146,200,62,0.55)",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.55", transform: "translate(-50%, -50%) scale(1)" },
          "50%": { opacity: "1", transform: "translate(-50%, -50%) scale(1.06)" },
        },
        sweep: {
          "0%": { transform: "translateX(-120%) skewX(-12deg)" },
          "100%": { transform: "translateX(320%) skewX(-12deg)" },
        },
      },
      animation: {
        glow: "pulseGlow 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
