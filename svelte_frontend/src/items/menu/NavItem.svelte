<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	export interface NavItemProps {
		href: string;
		active?: boolean;
		children: Snippet<[ClassValue]>;
		class?: ClassValue;
	}
</script>

<script lang="ts">
	import clsx from 'clsx';
	import { getContext } from 'svelte';
	import type { MenuBar } from './menu-types';

	let { href, children, active = false, class: className = '' }: NavItemProps = $props();

	const menubar: MenuBar = getContext('menubar');

	const navItemClasses = clsx([
		'group flex gap-x-3 p-2 rounded-md text-gray-400 text-sm/6',
		{ 'bg-gray-950 font-semibold': active, 'hover:bg-gray-950': !active },
		className
	]);
	const navChildrenClasses = $derived(
		clsx('flex-1 truncate', { hidden: menubar.collapsed, 'hidden xl:flex': !menubar.collapsed })
	);
</script>

<a {href} class={navItemClasses}>
	{@render children?.(navChildrenClasses)}
</a>
