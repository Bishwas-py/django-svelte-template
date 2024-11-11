<script lang="ts">
  import {dayjs_} from "$lib";
  import Form from "$items/Form.svelte";
  import type {Todo} from "$lib/interfaces/todos";
  import ViewDate from "$items/ViewDate.svelte";
  import {tv, type VariantProps} from "tailwind-variants";
  import BiCircleFill from "$icons/BiCircleFill.svelte";
  import Record from "$items/Record.svelte";

  // Props destructuring with type safety
  interface Props {
    todo: Todo;
  }

  let {todo} = $props<Props>();

  // State management
  let is_edit_popup_enabled = $state(false);

  // Tailwind Variants Definitions
  const todoCard = tv({
    base: "flex flex-row items-center gap-3 shadow rounded p-3 w-full h-full",
    variants: {
      theme: {
        light: "bg-white",
        dark: "bg-neutral-950/50"
      }
    },
    defaultVariants: {
      theme: "light"
    }
  });

  const todoStatus = tv({
    base: "text-xs border-l-4 pl-2",
    variants: {
      status: {
        success: "text-green-500 border-green-500",
        error: "text-red-500 border-red-500",
        warning: "text-blue-500 border-blue-500",
        neutral: "text-gray-500 border-gray-500"
      }
    },
    defaultVariants: {
      status: "neutral"
    }
  });

  const actionButton = tv({
    base: "text-xs",
    variants: {
      intent: {
        primary: "text-blue-500",
        danger: "text-red-500"
      },
      padding: {
        left: "pl-2",
        none: ""
      }
    },
    defaultVariants: {
      padding: "none"
    }
  });

  const modal = tv({
    base: "fixed inset-0 bg-black/50 flex justify-center items-center backdrop-blur",
    slots: {
      container: "flex flex-col gap-2 bg-white dark:bg-neutral-950 shadow rounded p-3 w-full max-w-xl outline outline-4 outline-sky-500/40",
      input: "inp-wrap"
    }
  });

  // Constants for status messages
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

  // Memoized current time
  const now = $derived(() => dayjs_());

  // Optimized status calculation with early returns and memoization
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

  // Event handlers
  const closePopup = () => is_edit_popup_enabled = false;
  const openPopup = () => is_edit_popup_enabled = true;

  function on_keydown(event: KeyboardEvent) {
    if (event.key === "Escape") closePopup();
  }

  // Memoized date formatting
  const created_at_formatted = $derived({
    relative: dayjs_(todo.created_at).fromNow(),
    full: dayjs_(todo.created_at).format('YYYY, MMMM D, dddd, HH:mm:ss')
  });

  const {container: modalContainer, input: modalInput} = modal();
</script>

<svelte:window on:keydown={on_keydown}/>

<Form class={todoCard({ theme: "dark", class: "dark" })}>
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
      <ViewDate date_at={todo.completed_at} text="(completed)" class="text-green-500 text-xs"/>
     {/if}
     <ViewDate date_at={todo.will_complete_at} text="(will complete)" class="text-purple-500 text-xs"/>
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
 <div class={modal()}>
  <Form
    action="?/call&s=/todos/update/{todo.id}/&m=post"
    method="post"
    class={modalContainer()}
  >
   <h3 class="text-lg font-bold">Edit todo: {todo.title}</h3>

   <div class={modalInput()}>
    <label for="title">Title</label>
    <input
      id="title"
      type="text"
      name="title"
      placeholder="What needs to be done?"
      bind:value={todo.title}
    />
   </div>

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
   <button type="button" class={actionButton({ intent: "danger" })} onclick={closePopup}>cancel</button>
  </Form>
 </div>
{/if}