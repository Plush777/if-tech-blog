import { resolvePostFilePath } from './postAssetPath.js';

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.avif']);
const VIDEO_EXTENSIONS = new Set(['.mp4', '.webm', '.ogg', '.mov', '.m4v']);
const HTML_EXTENSIONS = new Set(['.html', '.htm']);

function getPathType({ src, tagName }) {
	if (typeof src !== 'string') {
		return null;
	}

	const cleanedSrc = src.split('?')[0].split('#')[0].toLowerCase();
	const extensionMatch = cleanedSrc.match(/\.[a-z0-9]+$/);
	const extension = extensionMatch ? extensionMatch[0] : '';

	if (tagName === 'img') {
		return IMAGE_EXTENSIONS.has(extension) ? 'assets/images' : 'assets';
	}

	if (tagName === 'video' || tagName === 'source') {
		return VIDEO_EXTENSIONS.has(extension) ? 'assets/videos' : 'assets';
	}

	if (tagName === 'iframe') {
		return HTML_EXTENSIONS.has(extension) ? 'example/html' : 'example';
	}

	return null;
}

function visit(node, callback) {
	callback(node);
	if (!node || !Array.isArray(node.children)) {
		return;
	}
	for (const child of node.children) {
		visit(child, callback);
	}
}

export default function rehypePostAssetPaths() {
	return (tree, file) => {
		const frontmatter = file?.data?.astro?.frontmatter ?? {};
		const { pubDate, category } = frontmatter;

		visit(tree, (node) => {
			if (node.type !== 'element' || !node.properties) {
				return;
			}

			const { tagName } = node;
			if (tagName === 'img' || tagName === 'video' || tagName === 'source' || tagName === 'iframe') {
				const type = getPathType({ src: node.properties.src, tagName });

				if (!type) {
					return;
				}

				node.properties.src = resolvePostFilePath({
					src: node.properties.src,
					pubDate,
					category,
					type
				});
			}
		});
	};
}
