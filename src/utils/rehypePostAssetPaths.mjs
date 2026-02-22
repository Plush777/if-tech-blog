import { resolvePostFilePath } from './postAssetPath.js';

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
			if (tagName === 'img') {
				node.properties.src = resolvePostFilePath({
					src: node.properties.src,
					pubDate,
					category,
					type: 'assets'
				});
			}

			if (tagName === 'video' || tagName === 'source') {
				node.properties.src = resolvePostFilePath({
					src: node.properties.src,
					pubDate,
					category,
					type: 'assets'
				});
			}

			if (tagName === 'iframe') {
				node.properties.src = resolvePostFilePath({
					src: node.properties.src,
					pubDate,
					category,
					type: 'example'
				});
			}
		});
	};
}
