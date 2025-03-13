<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import { tv } from 'tailwind-variants';

	export interface InputProps {
		children?: Snippet;
		text: string;
		name: string;
		id?: string;
		class?: string;
		has_err?: boolean;
		type?: string;
		placeholder?: string;
		value?: string;
	}
</script>

<script lang="ts">
	import Error from '$items/Error.svelte';
	import { getContext } from 'svelte';

	let {
		children,
		text,
		name,
		id,
		class: className = '',
		has_err = false,
		type = 'text',
		placeholder,
		value = $bindable()
	}: InputProps = $props();
	if (!id) id = name;
	let input_elm: HTMLInputElement;
	$effect(() => {
		if (has_err) input_elm.focus();
	});

	let uniq = getContext('uniq') as number;

	const inputWrapClass = tv({
		base: 'flex flex-col rounded-md border border-neutral-300 shadow-xs duration-500 focus-within:border-indigo-500 focus-within:ring focus-within:ring-cyan-500 dark:border-neutral-600 dark:bg-neutral-900/80 dark:text-neutral-300',
		variants: {
			has_err: {
				true: 'border-red-500 text-red-400 focus-within:ring-red-500 dark:border-red-500',
				false: ''
			}
		}
	});

	const labelClass = 'px-2 py-0 font-medium';
	const inputClass =
		'block w-full bg-transparent px-2 py-0.5 outline-0 [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_rgb(255,255,255,0)] [&:-webkit-autofill]:duration-[5000s] dark:[&:-webkit-autofill]:text-neutral-300 dark:[&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_rgb(23,23,23,0.8)]';
</script>

<div class={className ?? 'flex flex-col gap-2'}>
	<div class={inputWrapClass({ has_err })}>
		<label for={name} class={labelClass}>{text}</label>
		<input
			id={name}
			{name}
			{placeholder}
			{type}
			bind:this={input_elm}
			bind:value
			class={inputClass}
		/>
	</div>
	<Error {name} {uniq} bind:has_err />
	{#if children}
		{@render children()}
	{/if}
</div>
