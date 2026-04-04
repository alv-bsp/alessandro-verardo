<script lang="ts">
	import { base } from '$app/paths';

	let { title, poster, oneLiner }: { title: string; poster: string; oneLiner?: string } = $props();
</script>

<div class="card now-watching-card">
	<p class="label">Now Watching</p>
	<div class="show-info">
		<div class="poster-wrapper">
			<img src="{base}{poster}" alt="{title} poster" class="poster-img" />
		</div>
		<div class="show-details">
			<h3 class="show-title">{title}</h3>
			{#if oneLiner}
				<p class="one-liner">{oneLiner}</p>
			{/if}
		</div>
	</div>
</div>

<style>
	.now-watching-card {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		transition: border-color var(--transition-base), transform var(--transition-slow), box-shadow var(--transition-base);
	}

	.now-watching-card:hover {
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

	.show-info {
		display: flex;
		gap: var(--space-md);
		align-items: center;
	}

	.poster-wrapper {
		flex-shrink: 0;
	}

	.poster-img {
		width: 96px;
		height: 144px;
		border-radius: var(--radius-sm);
		object-fit: cover;
	}

	.show-title {
		font-family: var(--font-heading);
		font-size: 18px;
		font-weight: 600;
		letter-spacing: -0.01em;
		margin-bottom: 4px;
	}

	.one-liner {
		font-size: 13px;
		color: var(--color-text-secondary);
		font-style: italic;
	}
</style>
