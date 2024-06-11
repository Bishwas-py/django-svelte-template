import type {Config} from "tailwindcss";

export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {
            fontFamily: {
                // extra fonts, optional, remove if not needed
                'work-sans': ['Work Sans', 'sans-serif'],
            }
        }
    },
    safelist: [
        {
            pattern: /(border|text)-(red|green|blue)-(400|500)/,
        },
    ],
    plugins: [require("@tailwindcss/typography")]
} as Config;