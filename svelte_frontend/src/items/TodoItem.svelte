<script lang="ts">
    import {dayjs_} from "$lib";
    import Form from "$items/Form.svelte";
    import type {Todo} from "$lib/interfaces/todos";
    import {derived} from "svelte/store";
    import ViewDate from "$items/ViewDate.svelte";

    let {todo}: { todo: Todo } = $props();
    let is_edit_popup_enabled = $state(false);

    function on_keydown(event: KeyboardEvent) {
        if (event.key === "Escape") {
            is_edit_popup_enabled = false;
        }
    }

    let todo_status = $derived.by(() => {
        const now = dayjs_();
        if (todo.completed_at && todo.will_complete_at) {
            if (dayjs_(todo.completed_at).isBefore(dayjs_(todo.will_complete_at))) {
                return {
                    text: "Exceptional! You completed the task ahead of the deadline.",
                    color: "green-500"
                };
            } else if (dayjs_(todo.completed_at).isSame(dayjs_(todo.will_complete_at))) {
                // return "Well done! You completed the task right on schedule.";
                return {
                    text: "Well done! You completed the task right on schedule.",
                    color: "green-500"
                };
            } else {
                // return "The task has been completed, albeit past the due date.";
                return {
                    text: "The task has been completed, albeit past the due date.",
                    color: "red-500"
                };
            }
        } else if (todo.will_complete_at && dayjs_(todo.will_complete_at).isBefore(now)) {
            // return "You were supposed to complete this task. It's now overdue.";
            return {
                text: "You were supposed to complete this task. It's now overdue.",
                color: "red-500"
            };
        } else if (todo.will_complete_at && dayjs_(todo.will_complete_at).isAfter(now)) {
            // return `You have until ${dayjs_(todo.will_complete_at).fromNow()} to complete the task.`;
            return {
                text: `You have until ${dayjs_(todo.will_complete_at).fromNow()} to complete the task.`,
                color: "blue-500"
            };
        }
        // return "The task has no deadline and is currently not completed.";
        return {
            text: "The task has no deadline and is currently not completed.",
            color: "gray-500"
        };
    });
</script>

<svelte:window on:keydown={on_keydown}/>


<Form class="flex flex-row items-center gap-3 bg-white dark:bg-neutral-950/50 shadow
            rounded p-3 w-full h-full">
    <iconify-icon icon="bi:circle-fill" class="text-blue-500 w-4"/>
    <input type="hidden" name="todo_id" value={todo.id}/>
    <div class="w-full">
        <div class="flex flex-wrap justify-between items-center w-full">
            <h3 class="text-lg font-bold">{todo.title}</h3>
            <span
                    class="text-neutral-600 dark:text-neutral-400 text-xs"
                    title="{dayjs_(todo.created_at).format('YYYY, MMMM D, dddd, HH:mm:ss')}">
                {dayjs_(todo.created_at).fromNow()}
            </span>
        </div>
        <div class="flex flex-col w-full">
            <div class="flex flex-col justify-between">
                <div class="flex flex-wrap flex-row justify-between gap-1 sm:gap-2">
                    {#if todo.completed_at}
                        <ViewDate date_at={todo.completed_at} text="(completed)"/>
                    {/if}
                    <ViewDate date_at={todo.will_complete_at} text="(will complete)"/>
                </div>

            <blockquote class="text-xs text-{todo_status.color} border-l-4 border-{todo_status.color} pl-2">
                    {todo_status.text}
                </blockquote>
            </div>
            <div class="text-xs flex flex-wrap flex-row gap-1 md:gap-2 ml-auto justify-between">
                <button type="submit" class="text-red-500" formaction="?/delete_todo">delete</button>
                <button type="button" class="text-blue-500 pl-2" onclick={()=>{is_edit_popup_enabled=true}}>edit
                </button>
            </div>
        </div>
    </div>
</Form>

{#if is_edit_popup_enabled}
    <div class="fixed inset-0 bg-black/50 flex justify-center items-center backdrop-blur">
        <Form action="?/todos/update&_sfx=/{todo.id}/" method="post"
              after={() => is_edit_popup_enabled = false}
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
                       value={dayjs_(todo.completed_at).format('YYYY-MM-DDTHH:mm')}/>
            </div>
            <div class="input-group">
                <label for="will_complete_at">Will complete at</label>
                <input id="will_complete_at" type="datetime-local" name="will_complete_at"
                       value={dayjs_(todo.will_complete_at).format('YYYY-MM-DDTHH:mm')}/>
            </div>
            <button type="submit" class="text-blue-500">save</button>
            <button type="button" class="text-red-500" onclick={()=>{is_edit_popup_enabled=false}}>cancel</button>
        </Form>
    </div>
{/if}