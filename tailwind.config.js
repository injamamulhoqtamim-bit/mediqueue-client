/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Professional consistent readability typography
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#0d9488",      // Teal-600 premium brand accent
          secondary: "#4f46e5",    // Indigo-600 contrast action element
          accent: "#0f766e",
          neutral: "#1f2937",
          "base-100": "#ffffff",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#14b8a6",      // Teal-500 brighter neon contrast for dark backdrop
          secondary: "#6366f1",    // Indigo-500
          accent: "#2dd4bf",
          neutral: "#111827",
          "base-100": "#1f2937",   // Slate-800 soft dark mode frame
          "base-content": "#f3f4f6",
        },
      },
    ],
  },
}