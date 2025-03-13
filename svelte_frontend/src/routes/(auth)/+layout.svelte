<script lang="ts">
	let { children } = $props();
</script>

<div
	class="flex h-screen min-w-full items-center justify-center bg-gradient-to-tr dark:from-slate-900 dark:via-gray-900 dark:to-zinc-900"
>
	<div
		class="flex min-h-[50vh] w-full max-w-md flex-col gap-4 rounded-lg bg-white px-7 py-8 text-lg shadow-lg dark:bg-neutral-950/90"
	>
		{@render children()}
	</div>
</div>
