<script lang="ts" module>
	export interface FluentChevronRight16FilledProps {
		size?: number;
		class?: string;
	}
</script>

<script lang="ts">
	const { size = 0.7, class: className = '' }: FluentChevronRight16FilledProps = $props();
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
		d="M5.74 3.2a.75.75 0 0 0-.04 1.06L9.227 8L5.7 11.74a.75.75 0 1 0 1.1 1.02l4-4.25a.75.75 0 0 0 0-1.02l-4-4.25a.75.75 0 0 0-1.06-.04"
	/>
</svg>
