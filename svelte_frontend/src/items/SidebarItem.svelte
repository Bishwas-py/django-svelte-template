<script lang="ts" module>
	export const sidebarItemVariant = tv({
		base: `px-3 py-2 rounded-lg font-normal text-sm flex gap-3 items-center justify-start`,
		variants: {
			active: {
				true: `bg-white dark:bg-emerald-950/20 shadow-sm dark:shadow-none dark:outline dark:outline-emerald-950/50 text-teal-800 dark:text-teal-200`,
				false: `hover:bg-white dark:hover:bg-emerald-950/20 text-gray-700 dark:text-gray-300`
			}
		}
	});

	export interface SidebarItemProps extends HasChildren {
		href: string;
		active?: boolean;
		title?: string;
	}
</script>

<script lang="ts">
	import { page } from '$app/state';
	import { tv } from 'tailwind-variants';

	let { href, children, active = false, title }: SidebarItemProps = $props();
	const computedActive = $derived(active || page.url.pathname === href);
</script>

{#if title}
	<span class="ml-2 text-xs font-light text-gray-500 uppercase dark:text-gray-400">{title}</span>
{/if}

<a {href} class={sidebarItemVariant({ active: computedActive })}>
	{@render children()}
</a>
