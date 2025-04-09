/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        frenzy: {
          dark: "#0a0a0a",
          primary: "#c5a47e",
          secondary: "#1f1f1f",
          accent: "#2d2d2d",
          text: "#ffffff",
        },
        primary: {
          DEFAULT: "#FFD700",
          dark: "#FFC300",
        },
        secondary: {
          DEFAULT: "#000000",
          light: "#1A1A1A",
        },
        accent: {
          DEFAULT: "#666666",
          light: "#999999",
        },
        neutral: {
          DEFAULT: "#F5F5F5",
          dark: "#E5E5E5",
        },
        purple: "#6A0DAD",
        danger: {
          DEFAULT: "#DC2626",
          light: "#FECACA",
        },
      },
      fontFamily: {
        sans: ["Helvetica Neue", "Arial", "sans-serif"],
        serif: ["Georgia", "serif"],
      },
      fontSize: {
        "2xs": "0.625rem",
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        md: "1.125rem",
        lg: "1.25rem",
        xl: "1.5rem",
        "2xl": "2rem",
        "3xl": "3rem",
      },
      spacing: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        8: "2rem",
        10: "2.5rem",
        12: "3rem",
        16: "4rem",
        24: "6rem",
      },
      maxWidth: {
        content: "1200px",
        narrow: "800px",
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      borderRadius: {
        sm: "0.125rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
