<script lang="ts" module>
	export interface FluentSearch16FilledProps {
		size?: number;
		class?: string;
	}
</script>

<script lang="ts">
	const { size = 0.7, class: className = '' }: FluentSearch16FilledProps = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width="{size}em"
	height="{size}em"
	viewBox="0 0 16 16"
	class={className}
>
	<path
		fill="currentColor"
		d="M9.107 10.168a4.5 4.5 0 1 1 1.06-1.06l3.613 3.612a.75.75 0 1 1-1.06 1.06zM9.5 6.5a3 3 0 1 0-6 0a3 3 0 0 0 6 0"
	/>
</svg>
