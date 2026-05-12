/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        app: {
          canvas: "#4f4e55",
          panel: "#181819",
          surface: "#2c2c32",
          surface2: "#34343b",
          line: "#3f3f46",
          text: "#f7f6f2",
          muted: "#a8a7ad",
          accent: "#c9eeee",
          violet: "#aaa4d8",
          danger: "#f3a6a6",
          dangerSoft: "#3b2225",
        },
      },
      borderRadius: {
        app: "20px",
        panel: "14px",
        field: "12px",
      },
      boxShadow: {
        app: "0 28px 70px rgb(18 18 20 / 0.36)",
        field: "inset 0 1px 0 rgb(255 255 255 / 0.04)",
      },
      height: {
        a4: "1123px",
      },
      minHeight: {
        a4: "1123px",
      },
      width: {
        a4: "794px",
      },
      fontFamily: {
        app: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        cv: "15px",
      },
      letterSpacing: {
        section: "0.18em",
        label: "0.2em",
        display: "0.24em",
      },
      gridTemplateColumns: {
        cvMinimal: "1fr 1.3fr",
        cvClassic: "180px 1fr",
        cvBold: "1fr 230px",
      },
    },
  },
  plugins: [],
};
