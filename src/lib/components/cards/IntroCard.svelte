<script lang="ts">
	import { asset } from '$app/paths';

	let { name, headline, bio }: { name: string; headline: string; bio: string } = $props();
</script>

<div class="card intro-card">
	<img
		src={asset('/images/alessandro-verardo.png')}
		alt={name}
		class="avatar"
		draggable="false"
		loading="eager"
		width="110"
		height="110"
	/>
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
		justify-content: flex-start;
		min-height: 320px;
		position: relative;
		overflow: hidden;
		transition: border-color var(--transition-base), transform var(--transition-slow), box-shadow var(--transition-base);
	}

	.intro-card:hover {
		border-color: var(--color-border-hover);
		transform: translateY(-2px);
		box-shadow: 0 8px 32px var(--color-shadow);
	}

	.avatar {
		position: absolute;
		top: var(--space-xl);
		right: var(--space-xl);
		width: 110px;
		height: 110px;
		border-radius: 50%;
		object-fit: cover;
		border: 2px solid var(--color-border-hover);
		box-shadow: 0 4px 16px var(--color-shadow);
		will-change: transform;
		transition: border-color var(--transition-base), transform var(--transition-slow), box-shadow var(--transition-base);
	}

	.intro-card:hover .avatar {
		border-color: var(--color-accent);
		transform: scale(1.04);
		box-shadow: 0 6px 24px var(--color-shadow);
	}

	.intro-content {
		padding-right: 130px;
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
		margin-bottom: var(--space-sm);
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
	}

	@media (max-width: 860px) {
		.avatar {
			width: 88px;
			height: 88px;
		}

		.intro-content {
			padding-right: 108px;
		}
	}

	@media (max-width: 640px) {
		.name {
			font-size: 36px;
		}

		.intro-card {
			min-height: 260px;
			padding: var(--space-lg);
		}

		.avatar {
			top: var(--space-lg);
			right: var(--space-lg);
			width: 72px;
			height: 72px;
		}

		.intro-content {
			padding-right: 92px;
		}
	}
</style>
