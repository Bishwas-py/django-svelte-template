<script lang="ts">
    import {dayjs_} from "$lib";
    import Form from "$items/Form.svelte";
    import type {Todo} from "$lib/interfaces/todos";

    let {todo}: { todo: Todo } = $props();
</script>


<Form
        class="flex flex-row items-center gap-3 bg-white dark:bg-neutral-950/50 shadow
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
                <button type="submit" class="text-blue-500" formaction="?/delete_todo">edit</button>
            </div>
        </div>
    </div>
</Form>