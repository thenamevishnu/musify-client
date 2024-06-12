/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#303234",
                hover: "#404346",
                secondary: "crimson"
            }
        },
    },
    plugins: [],
}