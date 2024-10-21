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
        "background-modal": "#424446cf",
        "font-grey": "#818181",
        "font-grey-bold": "#505050",
        liked: "#FF4343",
        "border-grey": "#D0D0D0",
        "font-hover": "#87A4AB",
        primary: "#D5E6EA",
        secondary: "#F2F7F8",
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
