/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#1d1d1d",
                hover: "#252525",
                bg: "#2d2d2d",
                secondary: "crimson"
            }
        },
    },
    plugins: [],
}