<script lang="ts">
	import { tick, onMount } from 'svelte';
	import IntroCard from './cards/IntroCard.svelte';
	import LocationCard from './cards/LocationCard.svelte';
	import SocialsCard from './cards/SocialsCard.svelte';
	import NowPlayingCard from './cards/NowPlayingCard.svelte';
	import NowWatchingCard from './cards/NowWatchingCard.svelte';
	import PlacesExploredCard from './cards/PlacesExploredCard.svelte';
	import InterestsCard from './cards/InterestsCard.svelte';
	import WorkCard from './cards/WorkCard.svelte';

	type Filter = 'all' | 'about' | 'work';

	let { data, filter }: { data: any; filter: Filter } = $props();

	type CardDef = {
		id: string;
		section: 'about' | 'work' | 'fun';
		size: 'small' | 'medium' | 'wide' | 'large' | 'full';
	};

	function buildCards(): CardDef[] {
		const workCard = (i: number): CardDef => ({
			id: `work-${i}`,
			section: 'work',
			size: 'medium'
		});

		return [
			{ id: 'intro', section: 'about', size: 'wide' },
			workCard(0),                                          // WeTransfer
			{ id: 'now-watching', section: 'about', size: 'medium' },
			workCard(2),                                          // Bending Spoons — Web Platform
			{ id: 'location', section: 'about', size: 'small' },
			{ id: 'places', section: 'about', size: 'large' },
			workCard(4),                                          // Awwwards
		{ id: 'now-playing', section: 'about', size: 'medium' },
		{ id: 'interests', section: 'about', size: 'wide' },
			workCard(1),                                          // Evernote
			workCard(3),                                          // Bending Spoons — PD
			workCard(5),                                          // Freelance
			{ id: 'socials', section: 'about', size: 'small' },
			workCard(6),                                          // RedLime
		];
	}

	let cards = $state<CardDef[]>(buildCards());

	function matches(section: string, f: Filter): boolean {
		return f === 'all' || f === section;
	}

	// renderedFilter lags behind `filter` so leaving cards stay in the DOM
	// long enough to animate out before being removed.
	let renderedFilter = $state<Filter>('all');
	let leavingIds = $state(new Set<string>());
	let animating = false;

	let shownCards = $derived(() => {
		const shown = new Set<string>();
		for (const c of cards) {
			if (matches(c.section, renderedFilter)) shown.add(c.id);
		}
		for (const id of leavingIds) {
			shown.add(id);
		}
		return shown;
	});

	// ── DOM refs ──
	let gridEl: HTMLDivElement | undefined = $state();
	let cellMap = new Map<string, HTMLDivElement>();

	function registerCell(node: HTMLDivElement, id: string) {
		cellMap.set(id, node);
		return { destroy() { cellMap.delete(id); } };
	}

	// ── Animation constants ──
	const DURATION = 400;
	const EXIT_DURATION = 220;
	const EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';

	// ── Entrance animation on mount ──
	onMount(() => {
		requestAnimationFrame(() => {
			let delay = 0;
			for (const card of cards) {
				if (!matches(card.section, filter)) continue;
				const el = cellMap.get(card.id);
				if (!el) continue;
				el.animate(
					[
						{ opacity: 0, transform: 'translateY(16px) scale(0.96)' },
						{ opacity: 1, transform: 'translateY(0) scale(1)' }
					],
					{ duration: 450, easing: EASING, delay, fill: 'both' }
				);
				delay += 40;
			}
		});
	});

	// ── Filter change with exit → reflow → enter ──
	let prevFilter: Filter = 'all';

	$effect(() => {
		const f = filter;
		if (f === prevFilter) return;
		const oldFilter = prevFilter;
		prevFilter = f;
		animateFilterChange(oldFilter, f);
	});

	async function animateFilterChange(oldF: Filter, newF: Filter) {
		if (animating) return;
		animating = true;

		try {
			const leaving: CardDef[] = [];
			const entering: CardDef[] = [];
			const staying: CardDef[] = [];

			for (const c of cards) {
				const wasIn = matches(c.section, oldF);
				const willBeIn = matches(c.section, newF);
				if (wasIn && !willBeIn) leaving.push(c);
				else if (!wasIn && willBeIn) entering.push(c);
				else if (wasIn && willBeIn) staying.push(c);
			}

			// Phase 1: animate leaving cards out (they're still in DOM)
			leavingIds = new Set(leaving.map((c) => c.id));

			await tick();

			const exitAnims: Animation[] = [];
			for (const c of leaving) {
				const el = cellMap.get(c.id);
				if (!el) continue;
				exitAnims.push(el.animate(
					[
						{ opacity: 1, transform: 'scale(1)' },
						{ opacity: 0, transform: 'scale(0.92)' }
					],
					{ duration: EXIT_DURATION, easing: EASING, fill: 'forwards' }
				));
			}

			// Snapshot positions of staying cards before reflow
			const rects = new Map<string, DOMRect>();
			for (const c of staying) {
				const el = cellMap.get(c.id);
				if (el) rects.set(c.id, el.getBoundingClientRect());
			}

			await Promise.all(exitAnims.map((a) => a.finished.catch(() => {})));

			// Phase 2: remove leaving cards from DOM, cancel their animations
			for (const el of cellMap.values()) {
				el.getAnimations().forEach((a) => a.cancel());
			}
			leavingIds = new Set();
			renderedFilter = newF;

			await tick();

			// Phase 3: FLIP staying cards from old position to new
			for (const c of staying) {
				const el = cellMap.get(c.id);
				const oldR = rects.get(c.id);
				if (!el || !oldR) continue;
				const newR = el.getBoundingClientRect();
				const dx = oldR.left - newR.left;
				const dy = oldR.top - newR.top;
				if (Math.abs(dx) < 1 && Math.abs(dy) < 1) continue;
				el.animate(
					[
						{ transform: `translate(${dx}px, ${dy}px)` },
						{ transform: 'translate(0, 0)' }
					],
					{ duration: DURATION, easing: EASING }
				);
			}

			// Phase 4: fade + scale in entering cards
			let d = 0;
			for (const c of entering) {
				const el = cellMap.get(c.id);
				if (!el) continue;
				el.animate(
					[
						{ opacity: 0, transform: 'scale(0.92)' },
						{ opacity: 1, transform: 'scale(1)' }
					],
					{ duration: DURATION, easing: EASING, delay: d, fill: 'both' }
				);
				d += 30;
			}
		} finally {
			animating = false;
		}
	}

	// ── Drag and drop ──
	let dragId = $state<string | null>(null);
	let dropTargetId = $state<string | null>(null);
	let ghostStyle = $state({ x: 0, y: 0, w: 0, h: 0, visible: false });

	let dragOffsetX = 0;
	let dragOffsetY = 0;
	let ptrId = -1;

	let visibleCards = $derived(
		cards.filter((c) => matches(c.section, renderedFilter))
	);

	function onPointerDown(e: PointerEvent, cardId: string) {
		if (e.button !== 0 || animating) return;
		const target = e.target as HTMLElement;
		if (target.closest('a, button, iframe, input, textarea')) return;

		const cell = cellMap.get(cardId);
		if (!cell) return;

		const rect = cell.getBoundingClientRect();
		dragOffsetX = e.clientX - rect.left;
		dragOffsetY = e.clientY - rect.top;
		ptrId = e.pointerId;

		dragId = cardId;
		ghostStyle = {
			x: e.clientX - dragOffsetX,
			y: e.clientY - dragOffsetY,
			w: rect.width,
			h: rect.height,
			visible: true
		};

		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
		e.preventDefault();
	}

	function onPointerMove(e: PointerEvent) {
		if (!dragId || e.pointerId !== ptrId) return;

		ghostStyle = {
			...ghostStyle,
			x: e.clientX - dragOffsetX,
			y: e.clientY - dragOffsetY
		};

		const cx = e.clientX;
		const cy = e.clientY;
		let closest: string | null = null;
		let closestDist = Infinity;

		for (const card of visibleCards) {
			if (card.id === dragId) continue;
			const el = cellMap.get(card.id);
			if (!el) continue;
			const r = el.getBoundingClientRect();
			const mx = r.left + r.width / 2;
			const my = r.top + r.height / 2;
			const dist = Math.hypot(cx - mx, cy - my);
			if (dist < closestDist) {
				closestDist = dist;
				closest = card.id;
			}
		}
		dropTargetId = closest;
	}

	async function onPointerUp(e: PointerEvent) {
		if (!dragId || e.pointerId !== ptrId) return;

		const fromId = dragId;
		const toId = dropTargetId;

		dragId = null;
		dropTargetId = null;
		ghostStyle = { ...ghostStyle, visible: false };

		if (!toId || fromId === toId) return;

		const rects = new Map<string, DOMRect>();
		for (const c of visibleCards) {
			const el = cellMap.get(c.id);
			if (el) rects.set(c.id, el.getBoundingClientRect());
		}

		const fromIdx = cards.findIndex((c) => c.id === fromId);
		const toIdx = cards.findIndex((c) => c.id === toId);
		if (fromIdx === -1 || toIdx === -1) return;

		const reordered = [...cards];
		const [moved] = reordered.splice(fromIdx, 1);
		reordered.splice(toIdx, 0, moved);
		cards = reordered;

		await tick();

		for (const c of visibleCards) {
			const el = cellMap.get(c.id);
			const oldR = rects.get(c.id);
			if (!el || !oldR) continue;
			const newR = el.getBoundingClientRect();
			const dx = oldR.left - newR.left;
			const dy = oldR.top - newR.top;
			if (Math.abs(dx) < 1 && Math.abs(dy) < 1) continue;
			el.animate(
				[{ transform: `translate(${dx}px,${dy}px)` }, { transform: 'translate(0,0)' }],
				{ duration: DURATION, easing: EASING }
			);
		}
	}

	function onPointerCancel(e: PointerEvent) {
		if (e.pointerId !== ptrId) return;
		dragId = null;
		dropTargetId = null;
		ghostStyle = { ...ghostStyle, visible: false };
	}
</script>

<div class="bento-grid" bind:this={gridEl}>
	{#each cards as card (card.id)}
		{#if shownCards().has(card.id)}
			<div
				class="cell size-{card.size}"
				class:dragging={dragId === card.id}
				class:drop-target={dropTargetId === card.id && dragId !== null}
				class:leaving={leavingIds.has(card.id)}
				use:registerCell={card.id}
				onpointerdown={(e) => onPointerDown(e, card.id)}
				onpointermove={onPointerMove}
				onpointerup={onPointerUp}
				onpointercancel={onPointerCancel}
				role="listitem"
			>
				{#if card.id === 'intro'}
					<IntroCard name={data.intro.name} headline={data.intro.headline} bio={data.intro.bio} />
				{:else if card.id === 'location'}
					<LocationCard label={data.location.label} />
				{:else if card.id === 'socials'}
					<SocialsCard socials={data.socials} />
				{:else if card.id === 'now-playing'}
					<NowPlayingCard embedUrl={data.nowPlaying.embedUrl} />
				{:else if card.id === 'now-watching'}
					<NowWatchingCard
						title={data.nowWatching.title}
						poster={data.nowWatching.poster}
						oneLiner={data.nowWatching.oneLiner}
					/>
				{:else if card.id === 'places'}
					<PlacesExploredCard places={data.placesExplored} />
				{:else if card.id === 'interests'}
				<InterestsCard interests={data.interests} />
			{:else if card.id.startsWith('work-')}
				<WorkCard entry={data.work[parseInt(card.id.split('-')[1])]} />
			{/if}
			</div>
		{/if}
	{/each}
</div>

{#if ghostStyle.visible && dragId}
	{@const dragCard = cards.find((c) => c.id === dragId)}
	{#if dragCard}
		<div
			class="drag-ghost"
			style="
				left: {ghostStyle.x}px;
				top: {ghostStyle.y}px;
				width: {ghostStyle.w}px;
				height: {ghostStyle.h}px;
			"
		>
			{#if dragCard.id === 'intro'}
				<IntroCard name={data.intro.name} headline={data.intro.headline} bio={data.intro.bio} />
			{:else if dragCard.id === 'location'}
				<LocationCard label={data.location.label} />
			{:else if dragCard.id === 'socials'}
				<SocialsCard socials={data.socials} />
			{:else if dragCard.id === 'now-playing'}
				<NowPlayingCard embedUrl={data.nowPlaying.embedUrl} />
			{:else if dragCard.id === 'now-watching'}
				<NowWatchingCard
					title={data.nowWatching.title}
					poster={data.nowWatching.poster}
					oneLiner={data.nowWatching.oneLiner}
				/>
			{:else if dragCard.id === 'places'}
				<PlacesExploredCard places={data.placesExplored} />
			{:else if dragCard.id === 'interests'}
			<InterestsCard interests={data.interests} />
		{:else if dragCard.id.startsWith('work-')}
			<WorkCard entry={data.work[parseInt(dragCard.id.split('-')[1])]} />
		{/if}
		</div>
	{/if}
{/if}

<style>
	.bento-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-md);
		position: relative;
	}

	.cell {
		will-change: transform, opacity;
		transform-origin: center center;
		cursor: grab;
		touch-action: none;
		user-select: none;
	}

	.cell:active {
		cursor: grabbing;
	}

	.cell > :global(*) {
		height: 100%;
		pointer-events: none;
	}

	.cell > :global(*) :global(a),
	.cell > :global(*) :global(button),
	.cell > :global(*) :global(iframe) {
		pointer-events: auto;
	}

	.cell.dragging {
		opacity: 0.25;
		transform: scale(0.98);
		transition: opacity 0.2s ease, transform 0.2s ease;
	}

	.cell.drop-target {
		box-shadow: 0 0 0 2px var(--color-accent);
		border-radius: var(--radius-lg);
		transition: box-shadow 0.15s ease;
	}

	.cell.leaving {
		pointer-events: none;
	}

	.size-large {
		grid-column: span 2;
		grid-row: span 2;
	}

	.size-wide {
		grid-column: span 2;
	}

	.size-full {
		grid-column: 1 / -1;
	}

	.size-medium {
		grid-column: span 1;
	}

	.size-small {
		grid-column: span 1;
	}

	.drag-ghost {
		position: fixed;
		z-index: 9999;
		pointer-events: none;
		opacity: 0.85;
		border-radius: var(--radius-lg);
		box-shadow: 0 20px 60px var(--color-shadow), 0 0 0 1px var(--color-accent);
		transform: scale(1.02);
		overflow: hidden;
	}

	.drag-ghost > :global(*) {
		height: 100%;
	}

	@media (max-width: 860px) {
		.bento-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.size-large {
			grid-column: span 2;
			grid-row: span 1;
		}
	}

	@media (max-width: 640px) {
		.bento-grid {
			grid-template-columns: 1fr;
		}

		.size-large,
		.size-wide,
		.size-full,
		.size-medium,
		.size-small {
			grid-column: 1;
			grid-row: auto;
		}
	}
</style>
