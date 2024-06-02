<script lang="ts">
    import {fade} from "svelte/transition";
    import {flip} from "svelte/animate";
    import {quintOut} from "svelte/easing";
    import {dismiss_toast, notifier} from "@friendofsvelte/django-kit/notifier";

    const icons_ = {
        success: 'bxs:check-circle',
        error: 'bxs:error',
        warning: 'fa6-solid:exclamation-triangle',
        info: 'bxs:info-circle'
    };
</script>

<div class="absolute top-0 right-0 z-30 p-3 gap-2 flex flex-col">
    {#each notifier.toasts as toast (toast.id)}
        <div transition:fade animate:flip={{easing: quintOut, duration: 500}}
             class="tn_ animate-shake {toast.message_type}">
            <div class="tn__head">
                <iconify-icon class="tn__icon" icon="{icons_[toast.message_type]}"/>
                <h3 class="tn_msg">{toast.message}</h3>
                <button class="tn_exit" on:click={() => dismiss_toast(toast.id)}>
                    <iconify-icon icon="fa6-solid:xmark"/>
                </button>
            </div>
            {#if toast.action}
                <a href="{toast.action.path}"
                   class="action">{toast.action.label}</a>
            {/if}
        </div>
    {/each}
</div>


<style lang="postcss">
    .tn_ {
        @apply w-[80vw] sm:w-96 py-3 px-2 rounded backdrop-filter backdrop-blur-sm
        flex flex-col gap-2 border-b-2 select-none hover:shadow-lg relative;
    }

    .tn_.success {
        @apply border-green-500 bg-green-800;
    }

    .tn_.error {
        @apply border-red-800 bg-red-950;
    }

    .tn_.warning {
        @apply border-orange-500 bg-orange-700;
    }

    .tn_.info {
        @apply border-cyan-800 bg-cyan-950;
    }

    .tn__head {
        @apply flex items-center gap-2;
    }

    .tn__icon {
        @apply flex justify-start align-middle items-start text-stone-400;
    }

    .tn_.success .tn__icon {
        @apply text-green-400;
    }

    .tn_.error .tn__icon {
        @apply text-red-400;
    }

    .tn_.warning .tn__icon {
        @apply text-yellow-400;
    }

    .tn_.info .tn__icon {
        @apply text-cyan-400;
    }

    .tn_exit {
        @apply flex items-center mt-1 justify-center h-4 w-4 text-xs focus:scale-75 duration-200 ml-auto absolute -right-2 -top-2 rounded-full;
    }

    .tn_.success .tn_exit {
        @apply text-green-400 hover:text-green-300 bg-green-700;
    }

    .tn_.error .tn_exit {
        @apply text-red-400 hover:text-red-300 bg-red-700;
    }

    .tn_.warning .tn_exit {
        @apply text-yellow-400 hover:text-yellow-300 bg-yellow-700;
    }

    .tn_.info .tn_exit {
        @apply text-cyan-400 hover:text-cyan-300 bg-cyan-700;
    }

    .tn_msg {
        @apply text-sm font-medium text-left;
    }

    .tn_.success .tn_msg {
        @apply text-green-200;
    }

    .tn_.error .tn_msg {
        @apply text-red-200;
    }

    .tn_.warning .tn_msg {
        @apply text-yellow-200;
    }

    .tn_.info .tn_msg {
        @apply text-cyan-200;
    }

    .action {
        @apply text-sm text-center underline cursor-pointer ml-auto;
    }

    .tn_.success .action {
        @apply text-green-200 hover:text-green-100;
    }

    .tn_.error .action {
        @apply text-red-200 hover:text-red-100;
    }

    .tn_.warning .action {
        @apply text-yellow-200 hover:text-yellow-100;
    }

    .tn_.info .action {
        @apply text-cyan-200 hover:text-cyan-100;
    }
</style>