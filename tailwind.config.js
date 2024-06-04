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
                "primary-purple": "rgb(76 29 149 / 1)"
            }
        },
    },
    plugins: [],
}