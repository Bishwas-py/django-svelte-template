<script lang="ts">
	import { fly } from 'svelte/transition';
	import BxsCheckCircle from '$icons/BxsCheckCircle.svelte';
	import BxsError from '$icons/BxsError.svelte';
	import BxsErrorCircle from '$icons/BxsErrorCircle.svelte';
	import BxsInfoCircle from '$icons/BxsInfoCircle.svelte';

	import {
		flashVariants,
		flashIconVariants,
		flashMessageVariants,
		flashActionVariants
	} from '$lib/helpers/variants/flash-variants';
	import { dismissToast, toasts } from '$lib/stores/notifier.svelte';
	import FluentDismiss20Filled from '$icons/FluentDismiss20Filled.svelte';

	const icons_ = {
		success: BxsCheckCircle,
		error: BxsError,
		warning: BxsErrorCircle,
		info: BxsInfoCircle
	};

	let lastToastRef: HTMLButtonElement | undefined = $state();
	$effect(() => {
		if (lastToastRef) {
			lastToastRef.scrollIntoView({ behavior: 'smooth', block: 'end' });
		}
	});
</script>

{#if toasts.length}
	<div
		class="absolute top-0 right-0 z-30 flex flex-col gap-2 px-0"
		in:fly={{ duration: 700, y: 100 }}
		out:fly={{ duration: 600, y: -100 }}
	>
		<div
			class="transition-spacing scrollbar-none flex max-h-56 w-full flex-col overflow-y-auto py-1 pr-7 pl-1 lg:max-h-64"
		>
			{#each toasts as toast (toast.id)}
				{@const FlashIcon = icons_[toast.message_type]}
				<button
					out:fly={{ duration: 600, y: -100 }}
					in:fly={{ duration: 700, y: 100 }}
					class={flashVariants({ type: toast.message_type })}
					bind:this={lastToastRef}
					onclick={() => dismissToast(toast.id)}
					aria-label="Toast display with dismiss"
				>
					<div class="flex items-center gap-2">
						<FlashIcon class={flashIconVariants({ type: toast.message_type })} display />
						<h3 class={flashMessageVariants({ type: toast.message_type })}>
							{toast.message}
						</h3>
						<FluentDismiss20Filled display class="ml-auto h-3 w-3 text-white/20" />
					</div>
					{#if toast.action}
						<a href={toast.action.path} class={flashActionVariants({ type: toast.message_type })}>
							{toast.action.label}
						</a>
					{/if}
				</button>
			{/each}
		</div>
	</div>
{/if}
