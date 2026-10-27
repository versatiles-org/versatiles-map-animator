import { describe, it, expect } from 'vitest';
import type { StyleSpecification } from 'maplibre-gl';
import { attributionParts } from './attribution';

const styleWith = (attributions: (string | undefined)[]): StyleSpecification => ({
	version: 8,
	sources: Object.fromEntries(
		attributions.map((attribution, i) => [`s${i}`, { type: 'vector', attribution }])
	),
	layers: []
});

const asText = (style: StyleSpecification) =>
	attributionParts(style)
		.map((p) => p.text)
		.join('');

describe('attributionParts', () => {
	it('turns the HTML of a source into text and links', () => {
		const html =
			'<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a> · <a href="http://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>';
		expect(attributionParts(styleWith([html]))).toEqual([
			{ text: '© OpenStreetMap contributors', href: 'https://www.openstreetmap.org/copyright' },
			{ text: ' · ' },
			{ text: 'CC BY 4.0', href: 'http://creativecommons.org/licenses/by/4.0/' }
		]);
	});

	it('joins the sources in their order, each one once, and skips those without', () => {
		const style = styleWith(['<b>Satellite</b>', undefined, 'OSM', ' ', 'OSM', 'Elevation']);
		expect(asText(style)).toBe('Satellite · OSM · Elevation');
	});

	it('keeps only http(s) links and drops every other markup', () => {
		const parts = attributionParts(
			styleWith(['<a href="javascript:alert(1)">A</a> <img src=x onerror="alert(1)"><i>B</i>'])
		);
		expect(parts).toEqual([{ text: 'A' }, { text: ' ' }, { text: 'B' }]);
	});

	it('is empty for a style without attribution', () => {
		expect(attributionParts(styleWith([]))).toEqual([]);
	});
});
