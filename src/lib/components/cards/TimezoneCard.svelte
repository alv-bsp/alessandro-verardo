<script lang="ts">
	import { onMount } from 'svelte';

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

<div class="card timezone-card">
	<p class="label">My Local Time</p>
	<div class="clock">
		<span class="time">{time}</span>
		<span class="tz">{tzLabel}</span>
	</div>
</div>

<style>
	.timezone-card {
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

	.timezone-card:hover {
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

	.clock {
		display: flex;
		align-items: baseline;
		gap: var(--space-xs);
	}

	.time {
		font-family: var(--font-heading);
		font-size: 32px;
		font-weight: 600;
		letter-spacing: -0.02em;
		font-variant-numeric: tabular-nums;
	}

	.tz {
		font-size: 14px;
		color: var(--color-text-secondary);
	}
</style>
