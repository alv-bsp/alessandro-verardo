<script lang="ts">
	import ThemeToggle from './ThemeToggle.svelte';

	type Filter = 'all' | 'about' | 'work';

	let { active = $bindable<Filter>('all') } = $props();

	const tabs: { id: Filter; label: string }[] = [
		{ id: 'all', label: 'All' },
		{ id: 'about', label: 'About' },
		{ id: 'work', label: 'Work' }
	];
</script>

<nav class="nav">
	<div class="tabs">
		{#each tabs as tab}
			<button
				class="nav-tab"
				class:active={active === tab.id}
				onclick={() => (active = tab.id)}
			>
				{tab.label}
			</button>
		{/each}
	</div>
	<ThemeToggle />
</nav>

<style>
	.nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--space-xl);
	}

	.tabs {
		display: flex;
		gap: var(--space-xs);
	}

	.nav-tab {
		font-family: var(--font-body);
		font-size: 14px;
		font-weight: 500;
		color: var(--color-text-secondary);
		background: transparent;
		border: 1px solid var(--color-border);
		border-radius: 100px;
		padding: 8px 20px;
		cursor: pointer;
		transition: all var(--transition-fast);
		user-select: none;
	}

	.nav-tab:hover {
		color: var(--color-text);
		border-color: var(--color-border-hover);
		background: var(--color-surface);
	}

	.nav-tab.active {
		color: var(--color-bg);
		background: var(--color-text);
		border-color: var(--color-text);
	}
</style>
