import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — warm, archival, museum
        ivory: "#F5F0E4",        // warm ivory background
        cream: "#FAF6EC",        // soft cream
        parchment: "#EDE6D3",    // slightly deeper cream / card background
        umber: "#3A2E22",        // dark umber — primary text
        charcoal: "#221C16",     // near-black for emphasis
        olive: "#7A8260",        // muted olive accent
        botanical: "#5C6B4A",    // faded botanical green
        rust: "#9C5B3D",         // warm rust accent
        stone: "#8B8275",        // muted neutral
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.22em",
      },
      maxWidth: {
        "8xl": "88rem",
      },
    },
  },
  plugins: [],
};

export default config;
