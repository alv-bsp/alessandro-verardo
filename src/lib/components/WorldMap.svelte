<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';

	type Place = { name: string; lat: number; lng: number };
	let { places }: { places: Place[] } = $props();
	let hoveredPlace = $state<string | null>(null);

	const COLS = 120;
	const ROWS = 60;
	const SVG_W = 800;
	const SVG_H = Math.round(SVG_W * (ROWS / COLS));
	const DOT_SPACING_X = SVG_W / COLS;
	const DOT_SPACING_Y = SVG_H / ROWS;

	let landDots = $state<{ x: number; y: number }[]>([]);

	onMount(() => {
		const img = new Image();
		img.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = COLS;
			canvas.height = ROWS;
			const ctx = canvas.getContext('2d')!;
			ctx.drawImage(img, 0, 0, COLS, ROWS);
			const imageData = ctx.getImageData(0, 0, COLS, ROWS);
			const pixels = imageData.data;

			const dots: { x: number; y: number }[] = [];
			for (let r = 0; r < ROWS; r++) {
				for (let c = 0; c < COLS; c++) {
					const idx = (r * COLS + c) * 4;
					const alpha = pixels[idx + 3];
					if (alpha > 40) {
						dots.push({
							x: c * DOT_SPACING_X + DOT_SPACING_X / 2,
							y: r * DOT_SPACING_Y + DOT_SPACING_Y / 2
						});
					}
				}
			}
			landDots = dots;
		};
		img.src = `${base}/images/world-map.svg`;
	});

	function project(lat: number, lng: number): { x: number; y: number } {
		const x = ((lng + 180) / 360) * 100;
		const LAT_TOP = 83;
		const LAT_BOTTOM = -56;
		const y = ((LAT_TOP - lat) / (LAT_TOP - LAT_BOTTOM)) * 100;
		return { x, y };
	}
</script>

<div class="map-container">
	<svg viewBox="0 0 {SVG_W} {SVG_H}" xmlns="http://www.w3.org/2000/svg" class="dot-map">
		<defs>
			<radialGradient id="placeGlow">
				<stop offset="0%" stop-color="var(--color-accent)" stop-opacity="0.5" />
				<stop offset="100%" stop-color="var(--color-accent)" stop-opacity="0" />
			</radialGradient>
		</defs>

		{#each landDots as dot}
			<circle cx={dot.x} cy={dot.y} r="1.8" fill="var(--color-text-muted)" opacity="0.3" />
		{/each}

		{#each places as place}
			{@const pos = project(place.lat, place.lng)}
			{@const px = (pos.x / 100) * SVG_W}
			{@const py = (pos.y / 100) * SVG_H}
			<circle cx={px} cy={py} r="18" fill="url(#placeGlow)" />
			<circle
				cx={px}
				cy={py}
				r="8"
				fill="none"
				stroke="var(--color-accent)"
				stroke-width="1"
				opacity="0.3"
			/>
			<circle
				cx={px}
				cy={py}
				r="3.5"
				fill="var(--color-accent)"
				class="place-dot"
				role="img"
				aria-label={place.name}
				onmouseenter={() => (hoveredPlace = place.name)}
				onmouseleave={() => (hoveredPlace = null)}
			/>
			{#if hoveredPlace === place.name}
				<g class="tooltip">
					<rect
						x={px - place.name.length * 3.2 - 8}
						y={py - 28}
						width={place.name.length * 6.4 + 16}
						height="20"
						rx="6"
						fill="var(--color-text)"
					/>
					<text
						x={px}
						y={py - 15}
						text-anchor="middle"
						fill="var(--color-bg)"
						font-size="10"
						font-weight="600"
						font-family="var(--font-body)"
					>
						{place.name}
					</text>
				</g>
			{/if}
		{/each}
	</svg>
</div>

<style>
	.map-container {
		width: 100%;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.dot-map {
		width: 100%;
		height: auto;
	}

	.place-dot {
		cursor: pointer;
		transition: r 0.15s ease;
	}

	.place-dot:hover {
		r: 5;
	}

	.tooltip {
		pointer-events: none;
	}
</style>
