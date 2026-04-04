<script lang="ts">
	type WorkEntry = {
		company: string;
		role: string;
		period: string;
		summary: string;
		via?: string;
		logo?: string;
		invertLogo?: boolean;
	};

	let { entry }: { entry: WorkEntry } = $props();
</script>

<div class="card work-card">
	<div class="work-header">
		<div class="company-badge">
			{#if entry.logo}
				<img src={entry.logo} alt={entry.company} class="company-logo" class:invert-dark={entry.invertLogo} />
			{:else}
				<span class="company-initial">{entry.company[0]}</span>
			{/if}
		</div>
		<div class="work-meta">
			<h3 class="company">
				{entry.company}
				{#if entry.via}
					<span class="via">via {entry.via}</span>
				{/if}
			</h3>
			<p class="role">{entry.role}</p>
		</div>
		<span class="period">{entry.period}</span>
	</div>
	<p class="summary">{entry.summary}</p>
</div>

<style>
	.work-card {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		transition: border-color var(--transition-base), transform var(--transition-slow), box-shadow var(--transition-base);
	}

	.work-card:hover {
		border-color: var(--color-border-hover);
		transform: translateY(-2px);
		box-shadow: 0 8px 32px var(--color-shadow);
	}

	.work-header {
		display: flex;
		align-items: flex-start;
		gap: var(--space-sm);
	}

	.company-badge {
		width: 36px;
		height: 36px;
		border-radius: 10px;
		background: var(--color-surface-hover);
		border: 1px solid var(--color-border);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.company-logo {
		width: 20px;
		height: 20px;
		object-fit: contain;
	}

	:global([data-theme='dark']) .company-logo.invert-dark {
		filter: invert(1);
	}

	.company-initial {
		font-family: var(--font-heading);
		font-size: 14px;
		font-weight: 600;
		color: var(--color-text);
	}

	.work-meta {
		flex: 1;
		min-width: 0;
	}

	.company {
		font-family: var(--font-heading);
		font-size: 15px;
		font-weight: 600;
		letter-spacing: -0.01em;
	}

	.via {
		font-weight: 400;
		color: var(--color-text-secondary);
		font-family: var(--font-body);
		font-size: 13px;
	}

	.role {
		font-size: 13px;
		color: var(--color-text-secondary);
		margin-top: 2px;
	}

	.period {
		font-size: 12px;
		color: var(--color-text-muted);
		white-space: nowrap;
		flex-shrink: 0;
		margin-top: 2px;
	}

	.summary {
		font-size: 14px;
		line-height: 1.6;
		color: var(--color-text-secondary);
	}
</style>
