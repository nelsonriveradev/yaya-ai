/** @type {import('tailwindcss').Config} */
// prettier-ignore
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "spin-fast": "spin .5s linear ",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "old-pink": "#E29578",
        "pastel-white": "EDF6F9",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: "100%",

          }
        }
      })
    },
  },
  plugins: [require("@tailwindcss/typography"),
    function({addUtilities}) {
      const newUtilities = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "rgb(14 116 144 / 0.75) white"
        },
        ".scrollbar-md": {
          scrollbarWidth: "medium",
          scrollbarColor: "rgb(14 116 144 / 0.75) white"
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "8px",

          },
          "&::-webkit-scrollbar-track": {
            background: "gray"

          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgb(14 116 144 / 0.75)",
            borderRadius: "18px",
            border: "3px solid white"
          }


        }
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }

    
  ],
};
