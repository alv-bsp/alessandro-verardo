<script lang="ts">
	let { name, headline, bio }: { name: string; headline: string; bio: string } = $props();
</script>

<div class="card intro-card">
	<div class="intro-content">
		<p class="greeting">Hi, I'm</p>
		<h1 class="name">{name}<span class="dot">.</span></h1>
		<p class="headline">{headline}</p>
		<p class="bio">{bio}</p>
	</div>
</div>

<style>
	.intro-card {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-xl);
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		min-height: 320px;
		transition: border-color var(--transition-base), transform var(--transition-slow), box-shadow var(--transition-base);
	}

	.intro-card:hover {
		border-color: var(--color-border-hover);
		transform: translateY(-2px);
		box-shadow: 0 8px 32px var(--color-shadow);
	}

	.greeting {
		font-size: 16px;
		color: var(--color-text-secondary);
		margin-bottom: var(--space-xs);
	}

	.name {
		font-family: var(--font-heading);
		font-size: 48px;
		font-weight: 600;
		letter-spacing: -0.03em;
		line-height: 1.1;
		margin-bottom: var(--space-xs);
	}

	.dot {
		color: var(--color-accent);
	}

	.headline {
		font-size: 18px;
		color: var(--color-accent);
		font-weight: 500;
		margin-bottom: var(--space-lg);
	}

	.bio {
		font-size: 15px;
		line-height: 1.6;
		color: var(--color-text-secondary);
		max-width: 480px;
	}

	@media (max-width: 640px) {
		.name {
			font-size: 36px;
		}

		.intro-card {
			min-height: 260px;
			padding: var(--space-lg);
		}
	}
</style>
