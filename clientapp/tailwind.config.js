/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        screens: {
            sm: "480px",
            md: "768px",
            lg: "1020px",
            xl: "1440px",
        },
        extend: {
            colors: {
                lightBlue: "hsl(215.02, 98.39%, 51.18%)",
                darkBlue: "hsl(213.86, 58.82%, 46.67%)",
                lightGreen: "hsl(156.62, 73.33%, 58.82%)",
            },
            fontFamily: {
                sans: ["Poppins", "sans-serif"],
            },
            spacing: {
                180: "32rem",
            },
            animation: {
                progress: "progress 1s infinite linear",
            },
            keyframes: {
                progress: {
                    "0%": { transform: " translateX(0) scaleX(0)" },
                    "40%": { transform: "translateX(0) scaleX(0.4)" },
                    "100%": { transform: "translateX(100%) scaleX(0.5)" },
                },
            },
            transformOrigin: {
                "left-right": "0% 50%",
            },
        },
    },
    plugins: [],
};
