<script lang="ts" module>
	export interface FluentReadingListAdd16FilledProps {
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
	}: FluentReadingListAdd16FilledProps = $props();
</script>

{#if display}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="{size}em"
		height="{size}em"
		viewBox="0 0 16 16"
		class={className}
	>
		<path
			fill="currentColor"
			d="M3.5 3.88a.614.614 0 0 1 1.126-.34a.75.75 0 0 0 1.248-.833A2.113 2.113 0 0 0 2 3.88c0 1.055.773 1.93 1.784 2.089A.8.8 0 0 0 4 6h3.337c.895-.63 1.986-1 3.163-1c.542 0 1.065.078 1.56.224a.75.75 0 0 0-.75-.724h-7.1a1 1 0 0 0-.095-.006a.614.614 0 0 1-.614-.614M4.75 7h1.507a5.5 5.5 0 0 0-.882 1.5H4.75a.75.75 0 0 1 0-1.5m-2 2.5h2.34a5.5 5.5 0 0 0-.068 1.5H2.75a.75.75 0 0 1 0-1.5M4.745 12h.462c.152.538.384 1.043.683 1.5H4.745a.75.75 0 0 1 0-1.5M7.75 2a.75.75 0 1 0 0 1.5h5.5a.75.75 0 0 0 0-1.5zM15 10.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-4-2a.5.5 0 0 0-1 0V10H8.5a.5.5 0 0 0 0 1H10v1.5a.5.5 0 1 0 1 0V11h1.5a.5.5 0 0 0 0-1H11z"
		/>
	</svg>
{:else if occupy}
	<div style="height: {size}em; width: {size}em;"></div>
{/if}
