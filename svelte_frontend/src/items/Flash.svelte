<script lang="ts">
  import {fade} from "svelte/transition";
  import {flip} from "svelte/animate";
  import {quintOut} from "svelte/easing";
  import BxsCheckCircle from "$icons/BxsCheckCircle.svelte";
  import BxsError from "$icons/BxsError.svelte";
  import BxsErrorCircle from "$icons/BxsErrorCircle.svelte";
  import BxsInfoCircle from "$icons/BxsInfoCircle.svelte";
  import BxsXCircle from "$icons/BxsXCircle.svelte";
  import {
    flashVariants,
    flashIconVariants,
    flashExitButtonVariants,
    flashMessageVariants,
    flashActionVariants
  } from '$lib/helpers/variants/flash-variants';
  import {dismiss_toast, notifier} from "$lib/stores/notifier.svelte";

  const icons_ = {
    success: BxsCheckCircle,
    error: BxsError,
    warning: BxsErrorCircle,
    info: BxsInfoCircle
  };
</script>

<div class="absolute top-0 right-0 z-30 p-3 gap-2 flex flex-col">
 {#each notifier.toasts as toast (toast.id)}
  {@const FlashIcon = icons_[toast.message_type]}
  <div
    transition:fade
    animate:flip={{easing: quintOut, duration: 500}}
    class={flashVariants({ type: toast.message_type })}
  >
   <div class="flex items-center gap-2">
    <FlashIcon
      class={flashIconVariants({ type: toast.message_type })}
      display
    />
    <h3 class={flashMessageVariants({ type: toast.message_type })}>
     {toast.message}
    </h3>
    <button
      class={flashExitButtonVariants({ type: toast.message_type })}
      onclick={() => dismiss_toast(toast.id)}
    >
     <BxsXCircle display class="h-full w-full"/>
    </button>
   </div>
   {#if toast.action}
    <a
      href={toast.action.path}
      class={flashActionVariants({ type: toast.message_type })}
    >
     {toast.action.label}
    </a>
   {/if}
  </div>
 {/each}
</div>