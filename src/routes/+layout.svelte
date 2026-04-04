<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" />
</svelte:head>

<div class="page-wrapper">
	{@render children()}
</div>

<style>
	.page-wrapper {
		max-width: 1080px;
		margin: 0 auto;
		padding: var(--space-xl) var(--space-lg);
	}

	@media (max-width: 640px) {
		.page-wrapper {
			padding: var(--space-lg) var(--space-md);
		}
	}
</style>
