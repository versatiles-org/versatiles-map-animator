<script lang="ts">
	/**
	 * The attribution of the map data as a line of small text for the corner
	 * of the map: no box, half transparent and with a faint halo, so it stays
	 * legible on any map and the eye still passes over it. `onDark` turns it
	 * light for the dark maps.
	 */
	import type { AttributionPart } from '../../attribution';

	let { parts, onDark = false }: { parts: AttributionPart[]; onDark?: boolean } = $props();
</script>

<div class="attribution" class:on-dark={onDark}>
	{#each parts as part, i (i)}
		{#if part.href}
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- a page of the data's source, not of this app -->
			<a href={part.href} target="_blank" rel="noopener noreferrer">{part.text}</a>
		{:else}
			{part.text}
		{/if}
	{/each}
</div>

<style>
	.attribution {
		font-family: 'DejaVu Sans', system-ui, sans-serif;
		line-height: 1.25;
		color: rgba(0, 0, 0, 0.5);
		text-shadow: 0 0 2px rgba(255, 255, 255, 0.6);

		&.on-dark {
			color: rgba(255, 255, 255, 0.55);
			text-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
		}
	}
	a {
		color: inherit;
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}
</style>
