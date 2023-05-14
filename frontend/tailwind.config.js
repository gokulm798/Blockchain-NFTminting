/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}/"],
  theme: {
    extend: {
      colors: {
        primary: "rgba(3, 23, 16, 0.93)",
        secondary: "rgb(9, 40, 18,0.98)",
      },
      keyframes: {
        wave: {
          "0%": { transform: "rotate(0.0deg)" },
          "10%": { transform: "rotate(14deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "30%": { transform: "rotate(14deg)" },
          "40%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(10.0deg)" },
          "60%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },
        lineR: {
          "0%": { transform: "translateX(-100%)" },
          "50%, 100%": { transform: " translateX(100%)" },
        },
        lineL: {
          "0%": { transform: "translateX(100%)" },
          "50%, 100%": { transform: " translateX(-140%)" },
        },
        lineB: {
          "0%": { transform: "translateY(-100%)" },
          "50%, 100%": { transform: " translateY(100%)" },
        },
        lineT: {
          "0%": { transform: "translateY(100%)" },
          "50%, 100%": { transform: " translateY(-120%)" },
        },
      },
      animation: {
        lineL: "lineL 2s infinite",
        lineR: "lineR 2s infinite",
        lineB: "lineB 2s infinite",
        lineT: "lineT 2s infinite",
        waving: "wave 1.5s infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
