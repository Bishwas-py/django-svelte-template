const AUTO_DISMISS_DURATION = 7777;

/*
Notifier is a global store that manages toast notifications
- toasts: a list of toast notifications
- error_: a flag to indicate if any error has occurred; implementation is up to the developer
 */
export const toasts = $state([] as Toast[]);

/*
Add a toast to the notifier
 */
export function addToast(message: Message) {
	const prev_messages = getPreviousMessages(message);
	if (prev_messages.length) return;
	return addToastEnforced(message);
}

/*
Find all toasts with the same message
 */
export function getPreviousMessages(message: BaseMessage) {
	return toasts.filter((toast) => toast.message === message.message);
}

/*
Add a toast to the notifier, no unique check
 */
export function addToastEnforced(message: BaseMessage, dismissDuration = AUTO_DISMISS_DURATION) {
	const toast: Toast = { ...message, dismissDuration, id: crypto.randomUUID() };
	toasts.push(toast);
	return toast;
}

/*
Dismiss a toast, given its id
 */
export function dismissToast(toastId: string) {
	const index = toasts.findIndex((toast) => toast && toast.id === toastId);
	toasts.splice(index, 1);
}

/*
Dismiss toast list
 */
export function dismissToasts(toastList: Toast[]) {
	toastList.forEach((toast) => {
		const index = toasts.findIndex((t) => t.id === toast.id);
		if (index !== -1) {
			toasts.splice(index, 1);
		}
	});
}

/*
Dismiss a toast after a given duration
 */
export function dismissToastAfter(toast?: Toast) {
	if (!toast) return;
	setTimeout(() => {
		dismissToast(toast.id);
	}, toast.dismissDuration);
}
