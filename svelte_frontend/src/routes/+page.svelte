<script lang="ts">
    import {page} from "$app/stores";
    import Form from "$items/Form.svelte";
    import Error from "$items/Error.svelte";
</script>

<svelte:head>
    <title>Welcome, {$page.data.current_user.username} | {$page.data.site_data.title}</title>
</svelte:head>

<div class="flex flex-col p-7 items-center gap-12 w-full">
    <h1 class="text-4xl font-black text-center">Welcome, {$page.data.current_user.username}</h1>

    <Form action="?/create_todo" method="post"
          class="flex flex-col items-center justify-center rounded-lg w-full max-w-3xl gap-3">
        <h2 class="text-2xl font-bold">
            Add your todo
        </h2>
        <div class="flex flex-col md:flex-row items-center justify-center gap-3
                  bg-neutral-100 dark:bg-neutral-950 rounded
                 focus-within:ring-4 ring-blue-600 dark:ring-blue-400 w-full text-xl
                outline-dotted outline-slate-500 dark:outline-slate-400 p-3 outline-2 focus-within:outline-0 md:h-20">
            <div class="flex flex-col md:flex-row w-full items-center justify-center h-full">
                <div class="w-full flex flex-col h-full justify-between relative">
                    <input id="title" type="text" name="title" placeholder="What needs to be done?"
                           class="bg-transparent focus:outline-0 px-3 w-full h-full"/>
                    <Error name="title" className="md:absolute -top-2"/>
                </div>
                <div class="flex flex-col sm:flex-row gap-2 h-full relative w-full">
                    <div class="w-full flex flex-col h-full justify-between">
                        <input id="completed_at" type="datetime-local" name="completed_at"
                               class="bg-blue-500 text-xs rounded md:w-[9rem] pl-[2px] my-auto"
                               title="Completed at: Task is completed at this time"/>
                        <Error name="completed_at" className="md:absolute -top-2"/>
                    </div>
                    <div class="w-full flex flex-col h-full justify-between relative">
                        <input id="will_complete_at" type="datetime-local" name="will_complete_at"
                               class="bg-purple-500 rounded text-xs md:w-[9rem] pl-[2px] my-auto"
                               title="Will complete at: Task is expected to be completed at this time"/>
                        <Error name="will_complete_at" className="md:absolute -top-2"/>
                    </div>
                </div>
            </div>
            <button type="submit" class="whitespace-nowrap pr-3 text-orange-500">add todo</button>
        </div>
    </Form>

    <div class="flex flex-col gap-4 w-full items-center max-w-4xl">
        {#each $page.data.todos.items as todo}
            <Form action="?/delete_todo"
                  class="flex flex-row items-center gap-3 bg-white dark:bg-neutral-950/50 shadow
            rounded p-3 w-full max-w-3xl">
                <input type="hidden" name="todo_id" value={todo.id}/>
                <div class="flex flex-col">
                    <span>{todo.title}</span>
                    <span>{todo.created_at}</span>
                    <span>{todo.completed_at}</span>
                    <span>{todo.will_complete_at}</span>
                </div>
                <button type="submit" class="text-red-500">delete</button>
            </Form>
        {/each}
    </div>
</div>


<style>
</style>
