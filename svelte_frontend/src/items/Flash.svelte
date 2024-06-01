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
             class="toast-notification animate-shake {toast.message_type}">
            <div class="toast-notification__head">
                <iconify-icon class="toast-notification__icon" icon="{icons_[toast.message_type]}"/>
                <h3 class="toast-notification__message">{toast.message}</h3>
                <button class="toast-notification__close" on:click={() => dismiss_toast(toast.id)}>
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
    .toast-notification {
        @apply w-[80vw] sm:w-96 py-3 px-2 rounded backdrop-filter backdrop-blur-sm
        flex flex-col gap-2 border-b-2 select-none hover:shadow-lg relative;
    }

    .toast-notification.success {
        @apply border-green-500 bg-green-800;
    }

    .toast-notification.error {
        @apply border-red-800 bg-red-950;
    }

    .toast-notification.warning {
        @apply border-orange-500 bg-orange-700;
    }

    .toast-notification.info {
        @apply border-cyan-800 bg-cyan-950;
    }

    .toast-notification__head {
        @apply flex items-center gap-2;
    }

    .toast-notification__icon {
        @apply flex justify-start align-middle items-start text-stone-400;
    }

    .toast-notification.success .toast-notification__icon {
        @apply text-green-400;
    }

    .toast-notification.error .toast-notification__icon {
        @apply text-red-400;
    }

    .toast-notification.warning .toast-notification__icon {
        @apply text-yellow-400;
    }

    .toast-notification.info .toast-notification__icon {
        @apply text-cyan-400;
    }

    .toast-notification__close {
        @apply flex items-center mt-1 justify-center h-4 w-4 text-xs focus:scale-75 duration-200 ml-auto absolute -right-2 -top-2 rounded-full;
    }

    .toast-notification.success .toast-notification__close {
        @apply text-green-400 hover:text-green-300 bg-green-700;
    }

    .toast-notification.error .toast-notification__close {
        @apply text-red-400 hover:text-red-300 bg-red-700;
    }

    .toast-notification.warning .toast-notification__close {
        @apply text-yellow-400 hover:text-yellow-300 bg-yellow-700;
    }

    .toast-notification.info .toast-notification__close {
        @apply text-cyan-400 hover:text-cyan-300 bg-cyan-700;
    }

    .toast-notification__message {
        @apply text-sm font-medium text-left;
    }

    .toast-notification.success .toast-notification__message {
        @apply text-green-200;
    }

    .toast-notification.error .toast-notification__message {
        @apply text-red-200;
    }

    .toast-notification.warning .toast-notification__message {
        @apply text-yellow-200;
    }

    .toast-notification.info .toast-notification__message {
        @apply text-cyan-200;
    }

    .action {
        @apply text-sm text-center underline cursor-pointer ml-auto;
    }

    .toast-notification.success .action {
        @apply text-green-200 hover:text-green-100;
    }

    .toast-notification.error .action {
        @apply text-red-200 hover:text-red-100;
    }

    .toast-notification.warning .action {
        @apply text-yellow-200 hover:text-yellow-100;
    }

    .toast-notification.info .action {
        @apply text-cyan-200 hover:text-cyan-100;
    }
</style>