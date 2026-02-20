import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
// https://www.freecodecamp.org/news/how-to-add-google-analytics-to-your-astro-website/
export default defineConfig({
  site: "https://plush-tech.netlify.app/",
  integrations: [mdx(), sitemap()],
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
});
