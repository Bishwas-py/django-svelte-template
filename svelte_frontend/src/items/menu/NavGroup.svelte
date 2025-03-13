<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';

	export interface NavGroupProps {
		labelArea: Snippet<[ClassValue]>;
		active?: boolean;
		children?: Snippet;
		class?: ClassValue;
	}
</script>

<script lang="ts">
	import clsx from 'clsx';
	import FluentChevronRight16Filled from '$icons/FluentChevronRight16Filled.svelte';
	import { getContext } from 'svelte';
	import type { MenuBar } from './menu-types';

	let {
		labelArea,
		children,
		class: className = '',
		active: isActive = $bindable(false)
	}: NavGroupProps = $props();

	function toggle() {
		isActive = !isActive;
	}

	function resetIsActive() {
		isActive = false;
	}

	const menubar: MenuBar = getContext('menubar');

	$effect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		menubar.collapsed;
		resetIsActive();
	});

	const navGroupClasses = $derived(
		clsx(
			`flex items-center gap-x-3 hover:bg-gray-950 p-1.5 rounded-md w-full text-gray-400 text-sm/6 text-left cursor-pointer`,
			{ 'font-semibold bg-gray-950': isActive, 'hover:bg-gray-950': !isActive },
			className
		)
	);

	const chevronIconClasses = $derived(
		clsx('size-4 text-gray-600 shrink-0', {
			'rotate-90': isActive,
			'-ml-2 xl:ml-auto': !menubar.collapsed,
			'-ml-2': menubar.collapsed
		})
	);

	const labelClasses = $derived(
		clsx('items-center gap-x-3', {
			hidden: menubar.collapsed,
			'hidden xl:flex': !menubar.collapsed
		})
	);

	const topDivClasses = $derived(
		clsx('overflow-hidden transition-all duration-200', {
			'fixed left-0 top-0 shadow-lg w-screen h-screen z-50 bg-gray-700/30 backdrop-blur': isActive,
			'xl:static xl:shadow-none xl:bg-transparent mt-0 xl:mt-1 xl:w-auto xl:h-auto':
				!menubar.collapsed
		})
	);

	const toggleButtonClasses = $derived(
		clsx('flex bg-slate-900 p-2 pl-3 w-72 h-8', {
			'xl:hidden': isActive && !menubar.collapsed
		})
	);

	const navUlClasses = $derived(
		clsx('w-52', {
			'bg-slate-900 w-72 h-[calc(100vh-32px)] p-2': isActive,
			'xl:h-auto xl:bg-transparent xl:p-0 xl:w-52 xl:ml-2': !menubar.collapsed
		})
	);
</script>

<svelte:window onresize={resetIsActive} />

<div>
	<button type="button" class={navGroupClasses} onclick={toggle}>
		{@render labelArea(labelClasses)}
		<FluentChevronRight16Filled class={chevronIconClasses} />
	</button>

	{#if isActive}
		<div class={topDivClasses}>
			<div class={toggleButtonClasses}>
				<button
					type="button"
					class="flex h-7 w-7 cursor-pointer items-center justify-center gap-x-3 rounded-md bg-slate-800 text-left text-sm/6 text-gray-700"
					onclick={toggle}
				>
					<FluentChevronRight16Filled class="size-4 shrink-0 -rotate-180 text-gray-600" />
				</button>
			</div>
			<ul class={navUlClasses}>
				{@render children?.()}
			</ul>
		</div>
	{/if}
</div>
