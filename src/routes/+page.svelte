<script lang="ts">
	import content from '$lib/content.json';
	import Nav from '$lib/components/Nav.svelte';
	import BentoGrid from '$lib/components/BentoGrid.svelte';

	let filter = $state<'all' | 'about' | 'work'>('all');
</script>

<Nav bind:active={filter} />
<BentoGrid data={content} {filter} />
