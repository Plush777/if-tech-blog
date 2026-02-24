import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import astrobook from 'astrobook';

import tailwindcss from '@tailwindcss/vite';
import rehypePostAssetPaths from './src/utils/rehypePostAssetPaths.mjs';

// https://astro.build/config
// https://www.freecodecamp.org/news/how-to-add-google-analytics-to-your-astro-website/
export default defineConfig({
	site: 'https://ifcommunity-tech.netlify.app/',
	integrations: [mdx(), sitemap()],
	output: 'static',
	markdown: {
		rehypePlugins: [rehypePostAssetPaths]
	},
	vite: {
		plugins: [tailwindcss()]
	},
	integrations: [
		astrobook({
			subpath: '/components',
			directory: 'src/stories',
			head: './src/components/astrobook/preview/CodePreview.astro',

			css: ['public/styles/guide/astrobook.css', 'public/lib/highlight/highlight.min.css']
		})
	]
});
