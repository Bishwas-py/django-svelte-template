import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			$items: './src/items',
			$icons: './src/icons',
			$fonts: './src/fonts',
			$utils: './src/utils',
			$styles: './src/styles'
		}
	}
};

export default config;
