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
                foreground: 'var(--foreground)',
                // warm greys for light mode surfaces
                sand: {
                    50: '#d1c6b0',
                    100: '#c7b9a2',
                    200: '#a8997f',
                    300: '#b8ab91',
                },
                // neutral greys with a subtle warm tint, for light mode text
                umber: {
                    400: '#9b938a',
                    500: '#70665d',
                    600: '#524942',
                    700: '#45392e',
                    800: '#2f251c',
                    900: '#251c14',
                    950: '#1e160f',
                },
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
