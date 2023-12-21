import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        disappear: "disappear 4s both",
      },
      keyframes: {
        disappear: {
          "0%": {
            opacity: "0",
            transform: "translateY(-1rem)",
            visibility: "hidden",
          },
          "50%": {
            opacity: "1",
            transform: "translateY(0)",
            visibility: "visible",
          },
          "75%": {
            opacity: "1",
            transform: "translateY(0)",
            visibility: "visible",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(-1rem)",
            visibility: "hidden",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
  darkMode: ["class"],
};
export default config;
