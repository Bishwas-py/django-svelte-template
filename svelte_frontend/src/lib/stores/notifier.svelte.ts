import type {BaseMessage, Toast} from "$lib/types.js";


const AUTO_DISMISS_DURATION = 7777;

/*
Notifier is a global store that manages toast notifications
- toasts: a list of toast notifications
- error_: a flag to indicate if any error has occurred; implementation is up to the developer
 */
export let notifier = $state({
    toasts: [] as Toast[],
    error_: false,
})

/*
Add a toast to the notifier
 */
export function add_toast(message: BaseMessage, auto_dismiss_duration = AUTO_DISMISS_DURATION) {
    const toast: Toast = {...message, auto_dismiss_duration, id: crypto.randomUUID(),};
    notifier.toasts.push(toast);
    return toast;
}

/*
Dismiss a toast, given its id
 */
export function dismiss_toast(toastId: string) {
    const index = notifier.toasts.findIndex((toast) => toast && toast.id === toastId);
    notifier.toasts.splice(index, 1);
}

/*
Dismiss a toast after a given duration
 */
export function dismiss_toast_after(toast: Toast) {
    setTimeout(() => {
        dismiss_toast(toast.id);
    }, toast.auto_dismiss_duration);
}

/*
Dismiss all toasts
 */
export function dismiss_all_toasts() {
    notifier.toasts.splice(0, notifier.toasts.length);
}