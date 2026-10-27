/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#07080b",
          900: "#0b0d11",
          850: "#0f1217",
          800: "#13161d",
          700: "#1a1e27",
        },
        mist: {
          50: "#f5f7fa",
          200: "#d5d9e0",
          400: "#a3aab7",
          500: "#7d8492",
        },
        cyan: { glow: "#5ee7f0", deep: "#22b8c7" },
        violet: { glow: "#a98bff", deep: "#7c5cff" },
        paper: "#f1ece2",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        hand: ["var(--font-hand)", "cursive"],
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(4%, -3%, 0) scale(1.08)" },
        },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        dash: { to: { strokeDashoffset: "-24" } },
        bob: {
          "0%, 100%": { transform: "translate(-50%, -50%)" },
          "50%": { transform: "translate(-50%, calc(-50% - 4px))" },
        },
      },
      animation: {
        drift: "drift 22s ease-in-out infinite",
        "spin-slow": "spin-slow 18s linear infinite",
        dash: "dash 1.6s linear infinite",
        bob: "bob 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
