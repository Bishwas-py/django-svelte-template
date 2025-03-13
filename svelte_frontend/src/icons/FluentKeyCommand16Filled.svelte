<script lang="ts" module>
	export interface FluentKeyCommand16FilledProps {
		size?: number;
		class?: string;
	}
</script>

<script lang="ts">
	const { size = 0.7, class: className = '' }: FluentKeyCommand16FilledProps = $props();
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
		d="M1.5 4a2.5 2.5 0 0 1 5 0v1h3V4A2.5 2.5 0 1 1 12 6.5h-1v3h1A2.5 2.5 0 1 1 9.5 12v-1h-3v1A2.5 2.5 0 1 1 4 9.5h1v-3H4A2.5 2.5 0 0 1 1.5 4m9.5 7v1a1 1 0 1 0 1-1zM9.5 9.5v-3h-3v3zM12 5a1 1 0 1 0-1-1v1zm-7 6H4a1 1 0 1 0 1 1zm0-7a1 1 0 1 0-1 1h1z"
	/>
</svg>
