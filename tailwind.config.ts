import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        mist: "#0a0a0a",
        primary: "#3b82f6",
        accent: "#8b5cf6",
        neon: "#06b6d4",
        darkglass: "rgba(20, 20, 20, 0.6)",
        cardborder: "rgba(255, 255, 255, 0.08)"
      },
      fontFamily: {
        display: ["var(--font-outfit)"],
        body: ["var(--font-inter)"]
      },
      boxShadow: {
        glow: "0 0 40px rgba(139, 92, 246, 0.15)",
        float: "0 24px 70px rgba(0, 0, 0, 0.5)"
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(15px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" }
        }
      },
      animation: {
        fadeInUp: "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        pulseGlow: "pulseGlow 3s ease-in-out infinite"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};

export default config;
