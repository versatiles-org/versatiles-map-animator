import type { StyleSpecification } from 'maplibre-gl';

/** A piece of the attribution line: plain text, or a link when `href` is set. */
export type AttributionPart = { text: string; href?: string };

const SEPARATOR: AttributionPart = { text: ' · ' };

/**
 * The attribution line of a map style, collected from the `attribution` of
 * its sources in their order, each one once. The sources write it as HTML
 * (from their TileJSON); it is taken apart into text and http(s) links
 * rather than inserted as markup, so nothing else of it reaches the page.
 */
export function attributionParts(style: StyleSpecification): AttributionPart[] {
	const seen = new Set<string>();
	const parts: AttributionPart[] = [];
	for (const source of Object.values(style.sources)) {
		const html = (source as { attribution?: string }).attribution?.trim();
		if (!html || seen.has(html)) continue;
		seen.add(html);
		if (parts.length > 0) parts.push(SEPARATOR);
		parts.push(...parseHtml(html));
	}
	return parts;
}

function parseHtml(html: string): AttributionPart[] {
	const body = new DOMParser().parseFromString(html, 'text/html').body;
	const parts: AttributionPart[] = [];
	for (const node of body.childNodes) {
		const text = (node.textContent ?? '').replace(/\s+/g, ' ');
		if (!text.trim()) {
			if (text) parts.push({ text });
			continue;
		}
		const href = node instanceof HTMLAnchorElement ? node.getAttribute('href') : null;
		parts.push(href && /^https?:\/\//.test(href) ? { text, href } : { text });
	}
	return parts;
}
