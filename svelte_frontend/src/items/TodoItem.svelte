<script lang="ts" module>
  import type {Todo} from "$lib/interfaces/todos";

  export interface TodoItemProps {
    todo: Todo;

  }
</script>

<script lang="ts">
  import {dayjs_} from "$lib";
  import Form from "$items/Form.svelte";
  import ViewDate from "$items/ViewDate.svelte";
  import BiCircleFill from "$icons/BiCircleFill.svelte";
  import Input from "$items/Input.svelte";
  import {todoStatus, actionButton, modal} from '$lib/helpers/variants/todo-variants';
  import type {FormActionResult} from "$lib/interfaces";

  let {todo}: TodoItemProps = $props();

  let is_edit_popup_enabled = $state(false);

  const STATUS = {
    AHEAD: {
      text: "Exceptional! You completed the task ahead of the deadline.",
      variant: "success" as const
    },
    ON_TIME: {
      text: "Well done! You completed the task right on schedule.",
      variant: "success" as const
    },
    LATE: {
      text: "The task has been completed, albeit past the due date.",
      variant: "error" as const
    },
    OVERDUE: {
      text: "You were supposed to complete this task. It's now overdue.",
      variant: "error" as const
    },
    PENDING: {
      text: "The task has no deadline and is currently not completed.",
      variant: "neutral" as const
    }
  };

  // Computed values
  const now = $derived(() => dayjs_());

  let todo_status = $derived.by(() => {
    const {completed_at, will_complete_at} = todo;

    if (!completed_at || !will_complete_at) {
      if (!will_complete_at) return STATUS.PENDING;
      return dayjs_(will_complete_at).isBefore(now())
        ? STATUS.OVERDUE
        : {
          text: `You have until ${dayjs_(will_complete_at).fromNow()} to complete the task.`,
          variant: "warning" as const
        };
    }

    const completedDate = dayjs_(completed_at);
    const deadlineDate = dayjs_(will_complete_at);

    if (completedDate.isBefore(deadlineDate)) return STATUS.AHEAD;
    if (completedDate.isSame(deadlineDate)) return STATUS.ON_TIME;
    return STATUS.LATE;
  });

  const created_at_formatted = $derived({
    relative: dayjs_(todo.created_at).fromNow(),
    full: dayjs_(todo.created_at).format('YYYY, MMMM D, dddd, HH:mm:ss')
  });

  const closePopup = () => is_edit_popup_enabled = false;
  const openPopup = () => is_edit_popup_enabled = true;

  function onkeydown(event: KeyboardEvent) {
    if (event.key === "Escape") closePopup();
  }

  function handleModalAfter(res: FormActionResult<{}>) {
    if (res.type === "success") {
      closePopup();
    }
  }

  const {container: modalContainer, input: modalInput, base: modalBase} = modal();
</script>

<svelte:window {onkeydown}/>

<Form class="flex flex-row items-center gap-3 shadow rounded
p-3 w-full h-full bg-white dark:bg-neutral-950/50">
 <BiCircleFill class="text-blue-500 w-4" display/>
 <input type="hidden" name="todo_id" value={todo.id}/>

 <div class="w-full">
  <div class="flex flex-wrap justify-between items-center w-full">
   <h3 class="text-lg font-bold">{todo.title}</h3>
   <span
     class="text-neutral-600 dark:text-neutral-400 text-xs"
     title={created_at_formatted.full}>
        {created_at_formatted.relative}
      </span>
  </div>

  <div class="flex flex-col w-full">
   <div class="flex flex-col justify-between">
    <div class="flex flex-wrap flex-row justify-between gap-1 sm:gap-2">
     {#if todo.completed_at}
      <ViewDate
        date_at={todo.completed_at}
        text="(completed)"
        class="text-green-500 text-xs"
      />
     {/if}
     <ViewDate
       date_at={todo.will_complete_at}
       text="(will complete)"
       class="text-purple-500 text-xs"
     />
    </div>

    <blockquote class={todoStatus({ status: todo_status.variant })}>
     {todo_status.text}
    </blockquote>
   </div>

   <div class="text-xs flex flex-wrap flex-row gap-1 md:gap-2 ml-auto justify-between">
    <button
      type="submit"
      class={actionButton({ intent: "danger" })}
      formaction="?/delete_todo"
    >
     delete
    </button>
    <button
      type="button"
      class={actionButton({ intent: "primary", padding: "left" })}
      onclick={openPopup}
    >
     edit
    </button>
   </div>
  </div>
 </div>
</Form>

{#if is_edit_popup_enabled}
 <div class="{modalBase()}">
  <Form
    action="?/call&s=/todos/update/{todo.id}/&m=post"
    method="post"
    class={modalContainer()}
    after={handleModalAfter}
  >
   <h3 class="text-lg font-bold">Edit todo: {todo.title}</h3>

   <Input name="title" text="Title" bind:value={todo.title}/>

   <div class={modalInput()}>
    <label for="completed_at">Completed at:</label>
    <input
      id="completed_at"
      type="datetime-local"
      name="completed_at"
      value={dayjs_(todo.completed_at).format('YYYY-MM-DDTHH:mm')}
    />
   </div>

   <div class={modalInput()}>
    <label for="will_complete_at">Will complete at</label>
    <input
      id="will_complete_at"
      type="datetime-local"
      name="will_complete_at"
      value={dayjs_(todo.will_complete_at).format('YYYY-MM-DDTHH:mm')}
    />
   </div>

   <button type="submit" class={actionButton({ intent: "primary" })}>save</button>
   <button
     type="button"
     class={actionButton({ intent: "danger" })}
     onclick={closePopup}
   >
    cancel
   </button>
  </Form>
 </div>
{/if}
