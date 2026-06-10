import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fifa: {
          blue: '#1e40af',
          lightBlue: '#3b82f6',
        }
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
