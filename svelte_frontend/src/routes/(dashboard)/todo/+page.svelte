<script lang="ts">
	import { page } from '$app/state';
	import Form from '$items/Form.svelte';
	import Error from '$items/Error.svelte';
	import TodoItem from '$items/TodoItem.svelte';
	import { quintOut } from 'svelte/easing';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
</script>

<svelte:head>
	<title>Welcome, {page.data.current_user.username} | {page.data.site_data.title}</title>
</svelte:head>

<div class="flex w-full flex-col items-center gap-12 p-7">
	<div class="flex w-full max-w-4xl flex-row items-center justify-between gap-4">
		<h1 class="ml-auto text-center text-4xl font-black">
			Welcome, {page.data.current_user.username}
		</h1>
		<form
			action="/logout"
			method="POST"
			class="mr-4 ml-auto flex h-6 items-center justify-center rounded-lg bg-neutral-100 px-1 text-sm font-normal whitespace-nowrap text-neutral-700 shadow outline outline-1 outline-indigo-900 focus:ring focus:outline-none sm:h-8 sm:px-2 dark:bg-neutral-800 dark:text-white dark:outline-0"
		>
			<button type="submit"> Logout </button>
		</form>
	</div>

	<Form
		action="?/create_todo"
		method="post"
		class="flex w-full max-w-3xl flex-col items-center justify-center gap-3 rounded-lg"
	>
		{#snippet children(uniq)}
			<h2 class="text-2xl font-bold">Add your todo</h2>
			<div
				class="flex w-full flex-col items-center justify-center gap-3 rounded bg-neutral-100 p-3 text-xl ring-blue-600 outline-2 outline-slate-500 outline-dotted focus-within:ring-4 focus-within:outline-0 md:h-20 md:flex-row dark:bg-neutral-950 dark:ring-blue-400 dark:outline-slate-400"
			>
				<div class="flex h-full w-full flex-col items-center justify-center md:flex-row">
					<div class="relative flex h-full w-full flex-col justify-between">
						<input
							id="title"
							type="text"
							name="title"
							placeholder="What needs to be done?"
							class="h-full w-full bg-transparent px-3 focus:outline-0"
						/>
						<Error name="title" className="-top-2 md:absolute" />
					</div>
					<div class="relative flex h-full w-full flex-col gap-2 sm:flex-row">
						<div class="flex h-full w-full flex-col justify-between">
							<input
								id="completed_at"
								type="datetime-local"
								name="completed_at"
								class="my-auto rounded bg-blue-500 pl-[2px] text-xs md:w-[9rem]"
								title="Completed at: Task is completed at this time"
							/>
							<Error name="completed_at" className="-top-2 md:absolute" {uniq} />
						</div>
						<div class="relative flex h-full w-full flex-col justify-between">
							<input
								id="will_complete_at"
								type="datetime-local"
								name="will_complete_at"
								class="my-auto rounded bg-purple-500 pl-[2px] text-xs md:w-[9rem]"
								title="Will complete at: Task is expected to be completed at this time"
							/>
							<Error name="will_complete_at" className="-top-2 md:absolute" {uniq} />
						</div>
					</div>
				</div>
				<button type="submit" class="pr-3 whitespace-nowrap text-orange-500">add todo</button>
			</div>
			<small class="text-xs text-gray-500 dark:text-gray-400">
				<span class="text-green-500">9 hours</span> is the default time for the deadline.
			</small>
		{/snippet}
	</Form>

	<div class="grid w-full max-w-6xl grid-cols-2 items-center gap-3">
		{#each page.data.todos.items as todo (todo.id)}
			<div transition:fade animate:flip={{ easing: quintOut, duration: 500 }}>
				<TodoItem {todo} />
			</div>
		{/each}
	</div>
</div>

<style>
</style>
