<script>
	import FluentKeyCommand16Filled from '$icons/FluentKeyCommand16Filled.svelte';

	import FluentSearch16Filled from '$icons/FluentSearch16Filled.svelte';
</script>

<label
	class="flex w-72 items-center gap-2 rounded-lg p-2 ring ring-gray-100 focus-within:ring-1 focus-within:ring-teal-500 dark:focus-within:ring-green-500"
>
	<FluentSearch16Filled class="h-5 w-5" />
	<input type="text" class="w-full bg-transparent focus:outline-none" placeholder="Search..." />
	<div class="flex items-center gap-0.5 select-none">
		<FluentKeyCommand16Filled class="h-3 w-3" />
		<span class="text-xs whitespace-nowrap">+ K</span>
	</div>
</label>
