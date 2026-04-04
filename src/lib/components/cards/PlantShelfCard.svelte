<script lang="ts">
	type Plant = { name: string; emoji: string };
	let { plants }: { plants: Plant[] } = $props();
</script>

<div class="card plant-card">
	<p class="label">Plant Shelf</p>
	<div class="plants">
		{#each plants as plant}
			<div class="plant">
				<span class="plant-emoji">{plant.emoji}</span>
				<span class="plant-name">{plant.name}</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.plant-card {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		transition: border-color var(--transition-base), transform var(--transition-slow), box-shadow var(--transition-base);
	}

	.plant-card:hover {
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

	.plants {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-xs);
	}

	.plant {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		padding: var(--space-sm);
		background: var(--color-bg);
		border-radius: var(--radius-sm);
		transition: transform var(--transition-fast);
	}

	.plant:hover {
		transform: translateY(-2px);
	}

	.plant-emoji {
		font-size: 24px;
	}

	.plant-name {
		font-size: 11px;
		color: var(--color-text-secondary);
		text-align: center;
		line-height: 1.2;
	}

	@media (max-width: 640px) {
		.plants {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
