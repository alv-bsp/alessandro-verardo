<script lang="ts">
	type Colophon = { stack: string; deploy: string; design: string; vibes: string };
	let { colophon }: { colophon: Colophon } = $props();
</script>

<div class="card colophon-card">
	<p class="label">Built With</p>
	<div class="items">
		<div class="item">
			<span class="item-key">Stack</span>
			<span class="item-val">{colophon.stack}</span>
		</div>
		<div class="item">
			<span class="item-key">Deploy</span>
			<span class="item-val">{colophon.deploy}</span>
		</div>
		<div class="item">
			<span class="item-key">Design</span>
			<span class="item-val">{colophon.design}</span>
		</div>
		<div class="item">
			<span class="item-key">Vibes</span>
			<span class="item-val">{colophon.vibes}</span>
		</div>
	</div>
</div>

<style>
	.colophon-card {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		transition: border-color var(--transition-base), transform var(--transition-slow), box-shadow var(--transition-base);
	}

	.colophon-card:hover {
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

	.items {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 6px 0;
		border-bottom: 1px solid var(--color-border);
	}

	.item:last-child {
		border-bottom: none;
	}

	.item-key {
		font-size: 13px;
		color: var(--color-text-muted);
	}

	.item-val {
		font-size: 13px;
		color: var(--color-text-secondary);
		font-weight: 500;
	}
</style>
