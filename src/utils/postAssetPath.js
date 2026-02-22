import fs from 'node:fs';
import path from 'node:path';
function isAbsoluteOrExternalPath(value = '') {
	return /^(?:[a-z]+:|\/|#)/i.test(value);
}

function normalizeRelativePath(value = '') {
	return value.replace(/^\.\//, '');
}

function toDateParts(pubDate) {
	const date = pubDate instanceof Date ? pubDate : new Date(pubDate);

	if (Number.isNaN(date.getTime())) {
		return null;
	}

	const year = String(date.getFullYear());
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return { year, month, day };
}

export function getPostBasePath(pubDate, category) {
	if (!pubDate || !category) {
		return null;
	}

	const dateParts = toDateParts(pubDate);
	if (!dateParts) {
		return null;
	}

	return `/post/${dateParts.year}/${category}/${dateParts.month}-${dateParts.day}`;
}

export function resolvePostFilePath({ src, pubDate, category, type = 'assets' }) {
	if (!src || isAbsoluteOrExternalPath(src)) {
		return src;
	}

	const basePath = getPostBasePath(pubDate, category);
	if (!basePath) {
		return src;
	}

	return `${basePath}/${type}/${normalizeRelativePath(src)}`;
}

export function hasPostAssetFile({ src, pubDate, category, type = 'assets' }) {
	if (!src || isAbsoluteOrExternalPath(src)) {
		return false;
	}

	const resolvedPath = resolvePostFilePath({ src, pubDate, category, type });
	if (!resolvedPath || !resolvedPath.startsWith('/')) {
		return false;
	}

	const absolutePath = path.join(process.cwd(), 'public', resolvedPath.slice(1));
	return fs.existsSync(absolutePath);
}
