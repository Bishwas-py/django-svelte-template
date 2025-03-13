<script lang="ts" module>
	export interface TablerAdFilledProps {
		display?: boolean;
		occupy?: boolean;
		size?: number;
		class?: string;
	}
</script>

<script lang="ts">
	const {
		display = false,
		occupy = true,
		size = 0.7,
		class: className = ''
	}: TablerAdFilledProps = $props();
</script>

{#if display}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="{size}em"
		height="{size}em"
		viewBox="0 0 24 24"
		class={className}
	>
		<path
			fill="currentColor"
			d="M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3M9 8a3 3 0 0 1 2.995 2.824L12 11v4a1 1 0 0 1-1.993.117L10 15v-1H8v1a1 1 0 0 1-1.993.117L6 15v-4a3 3 0 0 1 3-3m0 2a1 1 0 0 0-.993.883L8 11v1h2v-1a1 1 0 0 0-1-1m8-2a1 1 0 0 1 .993.883L18 9v6a1 1 0 0 1-.883.993L17 16h-1.5a2.5 2.5 0 1 1 .326-4.979l.174.029V9a1 1 0 0 1 .883-.993zm-1.41 5.008L15.5 13a.5.5 0 0 0-.09.992l.09.008h.5v-.5l-.008-.09a.5.5 0 0 0-.318-.379z"
		/>
	</svg>
{:else if occupy}
	<div style="height: {size}em; width: {size}em;"></div>
{/if}
