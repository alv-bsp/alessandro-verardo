<script lang="ts">
	let { embedUrl }: { embedUrl: string } = $props();
</script>

<div class="card now-playing-card">
	<p class="label">Now Playing</p>
	<div class="embed-wrapper">
		<iframe
			title="Spotify Embed"
			src={embedUrl}
			width="100%"
			height="152"
			frameborder="0"
			allowfullscreen
			allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
			loading="lazy"
			style="border-radius: 12px;"
		></iframe>
	</div>
</div>

<style>
	.now-playing-card {
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

	.now-playing-card:hover {
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

	.embed-wrapper {
		border-radius: var(--radius-sm);
		overflow: hidden;
	}

	iframe {
		display: block;
	}
</style>
