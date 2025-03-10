import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            animation: {
                oscillate: "oscillate 3s infinite ease-in-out",
            },
            keyframes: {
                oscillate: {
                  "0%, 100%": { transform: "translateY(0px)" },
                  "50%": { transform: "translateY(10px)" },
                },
            },
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)'
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            fontFamily: {
                montserrat: ['Montserrat', 'sans-serif'],
            },
        }
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;
