<script lang="ts">
    import {dayjs_} from "$lib";
    import Form from "$items/Form.svelte";
    import type {Todo} from "$lib/interfaces/todos";

    let {todo}: { todo: Todo } = $props();
    let is_edit_popup_enabled = $state(false);

    function on_keydown(event: KeyboardEvent) {
        if (event.key === "Escape") {
            is_edit_popup_enabled = false;
        }
    }
</script>

<svelte:window on:keydown={on_keydown}/>


<Form class="flex flex-row items-center gap-3 bg-white dark:bg-neutral-950/50 shadow
            rounded p-3 w-full">
    <iconify-icon icon="bi:circle-fill" class="text-blue-500"/>
    <input type="hidden" name="todo_id" value={todo.id}/>
    <div class="flex flex-col w-full">
        <h3 class="text-lg font-bold">{todo.title}</h3>
        <div class="flex flex-row items-center justify-between w-full">
            <div class="flex flex-col sm:flex-row flex-wrap sm:space-x-3 sm:divide-x divide-gray-900 justify-between">
                <div
                        title="{dayjs_(todo.created_at).format('YYYY, MMMM D, dddd, HH:mm:ss')}"
                >{dayjs_(todo.created_at).fromNow()}</div>

                <div class="sm:pl-2"
                     title="{dayjs_(todo.completed_at).format('YYYY, MMMM D, dddd, HH:mm:ss')}">
                    {#if todo.completed_at}
                        <div class="text-green dark:text-green-400">completed</div>
                    {:else}
                        <div class="text-red-500 dark:text-red-400">not completed</div>
                    {/if}
                </div>
                <div class="sm:pl-2"
                     title="{dayjs_(todo.will_complete_at).format('YYYY, MMMM D, dddd, HH:mm:ss')}">
                    {#if todo.will_complete_at}
                        <div class="text-blue-500 dark:text-blue-400">Will be
                            completed {dayjs_(todo.will_complete_at).fromNow()}</div>
                    {:else}
                        <div class="text-red-500 dark:text-red-400">no deadline</div>
                    {/if}
                </div>
            </div>
            <div class="flex flex-wrap flex-row gap-1 md:gap-2">
                <button type="submit" class="text-red-500" formaction="?/delete_todo">delete</button>
                <button type="button" class="text-blue-500 pl-2" onclick={()=>{is_edit_popup_enabled=true}}>edit
                </button>
            </div>
        </div>
    </div>
</Form>

{#if is_edit_popup_enabled}
    <div class="fixed inset-0 bg-black/50 flex justify-center items-center backdrop-blur">
        <Form action="?/update_todo" method="post"
              class="flex flex-col gap-2 bg-white dark:bg-neutral-950 shadow rounded p-3 w-full max-w-xl outline outline-4 outline-sky-500/40">
            <h3 class="text-lg font-bold">Edit todo: {todo.title}</h3>

            <input type="hidden" name="todo_id" value={todo.id}/>
            <div class="input-group">
                <label for="title">Title</label>
                <input id="title" type="text" name="title" placeholder="What needs to be done?"
                       bind:value={todo.title}/>
            </div>
            <div class="input-group">
                <label for="completed_at">Completed at:</label>
                <input id="completed_at" type="datetime-local" name="completed_at"
                       value={dayjs_(todo.completed_at).format('YYYY-MM-DDTHH:mm:ss')}/>
            </div>
            <div class="input-group">
                <label for="will_complete_at">Will complete at</label>
                <input id="will_complete_at" type="datetime-local" name="will_complete_at"
                       value={dayjs_(todo.will_complete_at).format('YYYY-MM-DDTHH:mm:ss')}/>
            </div>
            <button type="submit" class="text-blue-500">save</button>
            <button type="button" class="text-red-500" onclick={()=>{is_edit_popup_enabled=false}}>cancel</button>
        </Form>
    </div>
{/if}