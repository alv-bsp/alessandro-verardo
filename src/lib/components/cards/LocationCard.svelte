<script lang="ts">
	import { onMount } from 'svelte';

	let { label }: { label: string } = $props();

	let time = $state('');
	let tzLabel = $state('');

	function updateClock() {
		const now = new Date();
		const formatter = new Intl.DateTimeFormat('en-GB', {
			timeZone: 'Europe/Rome',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false
		});
		time = formatter.format(now);

		const tzFormatter = new Intl.DateTimeFormat('en-GB', {
			timeZone: 'Europe/Rome',
			timeZoneName: 'short'
		});
		const parts = tzFormatter.formatToParts(now);
		const tzPart = parts.find((p) => p.type === 'timeZoneName');
		tzLabel = tzPart?.value ?? 'CET';
	}

	onMount(() => {
		updateClock();
		const interval = setInterval(updateClock, 1000);
		return () => clearInterval(interval);
	});
</script>

<div class="card location-card">
	<div class="top">
		<div class="pin-icon">
			<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="var(--color-accent)" opacity="0.15"/>
				<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="var(--color-accent)" stroke-width="1.5" fill="none"/>
				<circle cx="12" cy="9" r="2.5" fill="var(--color-accent)"/>
			</svg>
		</div>
		<p class="location-label">{label}</p>
	</div>
	<div class="divider"></div>
	<div class="bottom">
		<span class="clock-label">Local time</span>
		<div class="clock">
			<span class="time">{time}</span>
			<span class="tz">{tzLabel}</span>
		</div>
	</div>
</div>

<style>
	.location-card {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: var(--space-md);
		transition: border-color var(--transition-base), transform var(--transition-slow), box-shadow var(--transition-base);
	}

	.location-card:hover {
		border-color: var(--color-border-hover);
		transform: translateY(-2px);
		box-shadow: 0 8px 32px var(--color-shadow);
	}

	.top {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.pin-icon {
		width: 36px;
		height: 36px;
		border-radius: 10px;
		background: rgba(200, 255, 0, 0.08);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	:global([data-theme='light']) .pin-icon {
		background: rgba(232, 97, 58, 0.08);
	}

	.location-label {
		font-size: 14px;
		color: var(--color-text-secondary);
		line-height: 1.4;
	}

	.divider {
		height: 1px;
		background: var(--color-border);
	}

	.bottom {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.clock-label {
		font-size: 11px;
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		font-weight: 500;
	}

	.clock {
		display: flex;
		align-items: baseline;
		gap: 6px;
	}

	.time {
		font-family: var(--font-heading);
		font-size: 22px;
		font-weight: 600;
		letter-spacing: -0.02em;
		font-variant-numeric: tabular-nums;
	}

	.tz {
		font-size: 12px;
		color: var(--color-text-secondary);
	}
</style>
