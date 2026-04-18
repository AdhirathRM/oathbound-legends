/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Void (dark) palette
        void: {
          bg: "#0a0812",
          surface: "#110d1e",
          card: "#16122a",
          border: "#2a2248",
          accent: "#7c3aed",
          glow: "#a855f7",
          blue: "#3b82f6",
          text: "#e2d9f3",
          muted: "#7c6fa0",
        },
        // Ancient Scroll (light) palette
        scroll: {
          bg: "#f5ecd7",
          surface: "#ede0c4",
          card: "#fdf6e3",
          border: "#c9a96e",
          accent: "#8b4513",
          warm: "#d4813a",
          text: "#3d2b1f",
          muted: "#8b7355",
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', "monospace"],
        serif: ['"Cinzel"', '"Georgia"', "serif"],
        body: ['"Crimson Text"', "Georgia", "serif"],
        mono: ['"Share Tech Mono"', "monospace"],
      },
      boxShadow: {
        "pixel-void":
          "4px 0 0 0 #7c3aed, -4px 0 0 0 #7c3aed, 0 4px 0 0 #7c3aed, 0 -4px 0 0 #7c3aed",
        "pixel-void-hover":
          "4px 0 0 0 #a855f7, -4px 0 0 0 #a855f7, 0 4px 0 0 #a855f7, 0 -4px 0 0 #a855f7, 0 0 20px 4px rgba(168,85,247,0.3)",
        "pixel-scroll":
          "4px 0 0 0 #c9a96e, -4px 0 0 0 #c9a96e, 0 4px 0 0 #c9a96e, 0 -4px 0 0 #c9a96e",
        "glow-purple": "0 0 30px rgba(168,85,247,0.4)",
        "glow-blue": "0 0 20px rgba(59,130,246,0.3)",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "star-pulse": {
          "0%, 100%": { filter: "brightness(1)" },
          "50%": { filter: "brightness(1.5)" },
        },
      },
      animation: {
        flicker: "flicker 3s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        scanline: "scanline 8s linear infinite",
        "star-pulse": "star-pulse 2s ease-in-out infinite",
      },
      backgroundImage: {
        "noise-light":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
