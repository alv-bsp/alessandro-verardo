<script lang="ts">
	import WorldMap from '../WorldMap.svelte';

	type Place = { name: string; lat: number; lng: number };
	let { places }: { places: Place[] } = $props();
</script>

<div class="card places-card">
	<p class="label">Places I've Explored</p>
	<WorldMap {places} />
</div>

<style>
	.places-card {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		transition: border-color var(--transition-base), transform var(--transition-slow), box-shadow var(--transition-base);
		overflow: hidden;
	}

	.places-card:hover {
		border-color: var(--color-border-hover);
		transform: translateY(-2px);
		box-shadow: 0 8px 32px var(--color-shadow);
	}

	.label {
		font-size: 13px;
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-weight: 500;
	}
</style>
