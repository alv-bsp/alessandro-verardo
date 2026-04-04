<script lang="ts">
	type Interest = { emoji: string; label: string };
	let { interests }: { interests: Interest[] } = $props();
</script>

<div class="card interests-card">
	<p class="label">What I'm Into</p>
	<div class="tags">
		{#each interests as interest}
			<span class="tag">
				<span class="tag-emoji">{interest.emoji}</span>
				{interest.label}
			</span>
		{/each}
	</div>
</div>

<style>
	.interests-card {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		transition: border-color var(--transition-base), transform var(--transition-slow), box-shadow var(--transition-base);
	}

	.interests-card:hover {
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

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
	}

	.tag {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 8px 14px;
		background: var(--color-bg);
		border: 1px solid var(--color-border);
		border-radius: 100px;
		font-size: 13px;
		color: var(--color-text-secondary);
		transition: all var(--transition-fast);
	}

	.tag:hover {
		border-color: var(--color-border-hover);
		color: var(--color-text);
	}

	.tag-emoji {
		font-size: 15px;
	}
</style>
