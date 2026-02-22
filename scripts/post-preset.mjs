import fs from 'node:fs/promises';
import path from 'node:path';

const BLOG_DIR = path.resolve('src/content/blog');
const POST_DIR = path.resolve('public/post');

function stripQuotes(value = '') {
	return value.trim().replace(/^['"]|['"]$/g, '');
}

function getFrontmatter(markdown) {
	const match = markdown.match(/^---\n([\s\S]*?)\n---/);
	return match ? match[1] : null;
}

function getFrontmatterValue(frontmatter, key) {
	const regex = new RegExp(`^${key}:\\s*(.+)$`, 'm');
	const match = frontmatter.match(regex);
	return match ? stripQuotes(match[1]) : '';
}

async function getMarkdownFiles(dir) {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	const files = await Promise.all(
		entries.map(async (entry) => {
			const fullPath = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				return getMarkdownFiles(fullPath);
			}

			if (entry.isFile() && fullPath.endsWith('.md')) {
				return [fullPath];
			}

			return [];
		})
	);

	return files.flat();
}

async function ensurePostDirectories({ pubDate, category }) {
	const [year, month, day] = pubDate.split('-');
	const dateFolder = `${month}-${day}`;
	const targetRoot = path.join(POST_DIR, year, category, dateFolder);

	await fs.mkdir(path.join(targetRoot, 'assets'), { recursive: true });
	await fs.mkdir(path.join(targetRoot, 'example'), { recursive: true });

	return targetRoot;
}

function isCategoryScopedPost(filePath) {
	const relativePath = path.relative(BLOG_DIR, filePath);
	return relativePath.split(path.sep).length >= 2;
}

async function run() {
	const markdownFiles = await getMarkdownFiles(BLOG_DIR);
	let createdCount = 0;

	if (!markdownFiles.length) {
		console.log('No markdown posts found in src/content/blog.');
		return;
	}

	for (const filePath of markdownFiles) {
		if (!isCategoryScopedPost(filePath)) {
			console.warn(`Skipping (category folder required): ${path.relative(process.cwd(), filePath)}`);
			continue;
		}

		const markdown = await fs.readFile(filePath, 'utf-8');
		const frontmatter = getFrontmatter(markdown);

		if (!frontmatter) {
			console.warn(`Skipping (missing frontmatter): ${path.relative(process.cwd(), filePath)}`);
			continue;
		}

		const pubDate = getFrontmatterValue(frontmatter, 'pubDate');
		const category = getFrontmatterValue(frontmatter, 'category');

		if (!pubDate || !/^\d{4}-\d{2}-\d{2}$/.test(pubDate)) {
			console.warn(`Skipping (invalid pubDate): ${path.relative(process.cwd(), filePath)}`);
			continue;
		}

		if (!category) {
			console.warn(`Skipping (missing category): ${path.relative(process.cwd(), filePath)}`);
			continue;
		}

		const targetRoot = await ensurePostDirectories({ pubDate, category });
		createdCount += 1;
		console.log(`Prepared: ${path.relative(process.cwd(), targetRoot)}`);
	}

	console.log(`\nDone. Prepared ${createdCount} post folder set(s).`);
}

run().catch((error) => {
	console.error(error);
	process.exit(1);
});
