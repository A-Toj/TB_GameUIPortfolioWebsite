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
        },
        ink: {
          950: "#070b08",
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
    },
  },
  plugins: [],
};

export default config;
