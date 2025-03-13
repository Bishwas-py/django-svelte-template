<script lang="ts" module>
	import type { NavigationItem, LogoType } from './menu-types';

	export interface SidebarProps {
		items?: NavigationItem[];
		logo: LogoType;
	}
</script>

<script lang="ts">
	import NavGroup from './NavGroup.svelte';
	import NavItem from './NavItem.svelte';
	import FluentLineHorizontal324Filled from '$icons/FluentLineHorizontal324Filled.svelte';
	import { setContext } from 'svelte';
	import type { MenuBar } from './menu-types';
	import clsx from 'clsx';

	let { items = [], logo }: SidebarProps = $props();

	function createSidebarItems(items: NavigationItem[]): NavigationItem[] {
		const itemsData = items.map((item) => {
			if ('type' in item) {
				return item;
			}

			if ('children' in item) {
				return {
					...item,
					active: item.active ?? false,
					children: item.children.map((child) => ({
						...child,
						active: child.active ?? false
					}))
				};
			}

			return {
				...item,
				active: item.active ?? false
			};
		});
		const stateItems = $state(itemsData);
		return stateItems;
	}
	const navigationItems = createSidebarItems(items);

	let menubar: MenuBar = $state({
		collapsed: false
	});
	setContext('menubar', menubar);

	function toggle() {
		menubar.collapsed = !menubar.collapsed;
	}

	const sidebarClasses = $derived(
		clsx(
			'flex flex-col gap-y-1 bg-neutral-900 px-3 border-neutral-800 border-r min-h-screen max-h-screen overflow-y-auto overflow-y-auto duration-300',
			{
				'w-16': menubar.collapsed,
				'w-16 xl:w-72': !menubar.collapsed
			}
		)
	);

	const logoTextClasses = $derived(
		clsx('hidden font-semibold text-white text-xl', { 'xl:block': !menubar.collapsed })
	);

	const logoWrapperClasses = $derived(
		clsx('flex flex-col justify-between items-center mt-3 shrink-0', {
			'xl:mt-0 xl:h-16 flex-row': !menubar.collapsed
		})
	);
</script>

<div class={sidebarClasses}>
	<div class={logoWrapperClasses}>
		<div class="flex items-center gap-x-1">
			{#if logo.src}
				<img src={logo.src} alt={logo.title} class="size-8 shrink-0" />
			{/if}
			{#if logo.title}
				<h1 class={logoTextClasses}>{logo.title}</h1>
			{/if}
		</div>
		<button onclick={toggle} class="hidden cursor-pointer xl:block">
			<FluentLineHorizontal324Filled class="size-6 shrink-0 text-neutral-600" />
		</button>
	</div>

	<nav class="flex flex-1 flex-col">
		<ul role="list" class="flex flex-1 flex-col gap-y-1">
			{#each navigationItems as item, index (index)}
				{#if 'type' in item && item.type === 'horizontal-divider'}
					<li class="my-3 border-t border-neutral-700"></li>
				{:else if 'children' in item}
					<NavGroup bind:active={item.active}>
						{#snippet labelArea(classes)}
							{#if item.Icon}
								{@const Icon = item.Icon}
								<Icon class="size-6 shrink-0 text-neutral-600" />
							{/if}
							<span class={classes}>{item.label}</span>
						{/snippet}
						{#each item.children as child (child.label)}
							<NavItem href={child.href}>
								{#if child.Icon}
									{@const Icon = child.Icon}
									<Icon class="size-6 shrink-0 text-neutral-600" />
								{/if}
								<span class="truncate">{child.label}</span>
							</NavItem>
						{/each}
					</NavGroup>
				{:else if 'href' in item}
					<NavItem href={item.href}>
						{#snippet children(classes)}
							{#if item.Icon}
								{@const Icon = item.Icon}
								<Icon class="size-6 shrink-0 text-neutral-600" />
							{/if}
							<span class={classes}>{item.label}</span>
						{/snippet}
					</NavItem>
				{/if}
			{/each}
		</ul>
	</nav>
</div>
