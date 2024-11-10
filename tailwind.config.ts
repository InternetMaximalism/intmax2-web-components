import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        inter: "var(--font-inter)",
        montserrat: "var(--font-montserrat)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        yellow: {
          DEFAULT: "#A58845",
          border: "#E9E0C9",
          bg: "#FFFCF4",
        },
        red: {
          DEFAULT: "#D26161",
          border: "#F7DCDC",
          bg: "#FFF6F6",
        },
        green: {
          DEFAULT: "#70BD92",
          bg: "#DBEFE4",
        },
        gray: {
          "50": "#F9FAFB",
          "250": "#DBDEE3",
        },
        blue: {
          DEFAULT: "#458FB9",
          border: "#C8E0EE",
          bg: "#F4FBFF",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "toast-in": {
          "0%": {
            transform: "var(--elm-translate) scale(0.7)",
            opacity: "0.7",
          },
          "80%": { transform: "translate(0px) scale(0.7)", opacity: "0.7" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "toast-out": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "20%": { transform: "translate(0px) scale(0.7)", opacity: "0.7" },
          "100%": {
            transform: "var(--elm-translate) scale(0.7)",
            opacity: "0.7",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "toast-in": "toast-in .8s both",
        "toast-out": "toast-out .8s both",
      },
    },
  },
};
export default config;
