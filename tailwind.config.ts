/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      colors: {
        black: "#1D1D1D",
        white: "#FFFFFF",
        background: "#F3F3F3",
        btn: {
          background: "#F3F3F3",
        },
        "font-grey": "#818181",
        icon: "#505050",
        red: "#FF4343",
        border: "#D0D0D0",
      },
      boxShadow: {
        out: "3px 3px 5px rgba(0,0,0,0.2), -1.5px -1.5px 4px rgba(255,255,255)",
        in: "inset 3px 3px 5px rgba(0,0,0,0.2), inset -1.5px -1.5px 1px rgba(255,255,255)",
        borderBottom: "0 1px 1px rgba(255,255,255)",
      },
    },
  },
  plugins: [],
};
