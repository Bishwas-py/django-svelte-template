<script lang="ts" module>
	export interface FluentDismiss20FilledProps {
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
	}: FluentDismiss20FilledProps = $props();
</script>

{#if display}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="{size}em"
		height="{size}em"
		viewBox="0 0 20 20"
		class={className}
	>
		<path
			fill="currentColor"
			d="m3.897 4.054l.073-.084a.75.75 0 0 1 .976-.073l.084.073L10 8.939l4.97-4.97a.75.75 0 0 1 .976-.072l.084.073a.75.75 0 0 1 .073.976l-.073.084L11.061 10l4.97 4.97a.75.75 0 0 1 .072.976l-.073.084a.75.75 0 0 1-.976.073l-.084-.073L10 11.061l-4.97 4.97a.75.75 0 0 1-.976.072l-.084-.073a.75.75 0 0 1-.073-.976l.073-.084L8.939 10l-4.97-4.97a.75.75 0 0 1-.072-.976l.073-.084z"
		/>
	</svg>
{:else if occupy}
	<div style="height: {size}em; width: {size}em;"></div>
{/if}
