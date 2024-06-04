import type {Config} from "tailwindcss";

export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],

    theme: {
        extend: {}
    },
    safelist: [
        {
            pattern: /(border|text)-(red|green|blue)-(400|500)/,
        },
    ],
    plugins: [require("@tailwindcss/typography")]
} as Config;