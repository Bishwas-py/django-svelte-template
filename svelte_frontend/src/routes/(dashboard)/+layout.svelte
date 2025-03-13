<script lang="ts">
	import FluentCompassNorthwest16Filled from '$icons/FluentCompassNorthwest16Filled.svelte';
	import FluentReadingListAdd16Filled from '$icons/FluentReadingListAdd16Filled.svelte';
	import FluentSettings16Filled from '$icons/FluentSettings16Filled.svelte';
	import FluentLinkMultiple20Filled from '$icons/FluentLinkMultiple20Filled.svelte';
	import SearchInput from '$items/SearchInput.svelte';
	import Sidebar from '$items/menu/Sidebar.svelte';
	import type { NavigationItem } from '$items/menu/menu-types';

	let { children, data } = $props();

	const navigationItems: NavigationItem[] = [
		{
			label: 'Dashboard',
			href: '/',
			Icon: FluentCompassNorthwest16Filled
		},
		{
			label: 'Features',
			Icon: FluentLinkMultiple20Filled,
			children: [
				{
					label: 'Todo List',
					href: '/todo',
					Icon: FluentReadingListAdd16Filled
				},
				{
					label: 'Settings',
					href: '/settings',
					Icon: FluentSettings16Filled
				}
			]
		},
		{ type: 'horizontal-divider' }
	];
</script>

<div class="flex min-h-screen bg-gray-50 dark:bg-neutral-950">
	<Sidebar
		items={navigationItems}
		logo={{
			src: '/favicon.png',
			title: data.site_data?.site.name ?? 'Dashboard'
		}}
	/>

	<div class="flex grow flex-col">
		<header
			class="sticky top-0 z-10 border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
		>
			<div class="flex h-16 items-center justify-between gap-4 px-6">
				<SearchInput />
				<div class="flex items-center gap-4">
					<button
						class="rounded-full bg-neutral-100 p-2 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
					>
						<FluentSettings16Filled class="h-5 w-5" />
					</button>
					<div class="h-8 w-8 rounded-full bg-teal-500"></div>
				</div>
			</div>
		</header>

		<main class="flex-1 p-6">
			{@render children()}
		</main>
	</div>
</div>
