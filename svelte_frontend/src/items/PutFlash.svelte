<script lang="ts">
	import { page } from '$app/state';
	import { parse } from 'cookie';
	import { afterNavigate } from '$app/navigation';
	import { addToast, dismissToastAfter } from '$lib/stores/notifier.svelte';
	import { untrack } from 'svelte';

	function getProperMessage(msg_source: MessageFlux) {
		if (!msg_source || !msg_source.message) return;
		return {
			message_type: msg_source?.message_type || 'warning',
			alias: msg_source?.alias || 'system',
			message: msg_source.message,
			action: msg_source.action
		} as Message;
	}

	function triggerMessage(msg_source: MessageFlux) {
		const proper_msg = getProperMessage(msg_source);
		if (proper_msg) untrack(() => dismissToastAfter(addToast(proper_msg)));
	}

	$effect(() => {
		triggerMessage(page.form);
		triggerMessage(page.data as unknown as MessageFlux);
		triggerMessage(page.error as unknown as MessageFlux);
	});

	function assignFlashMessage() {
		try {
			const raw_flash_message = parse(document.cookie)[`flash_message`];
			if (raw_flash_message) {
				const flash_message = JSON.parse(atob(raw_flash_message) || '{}') as FlashMessage;
				if (flash_message.path !== page.url.pathname) return;
				triggerMessage(flash_message);
				document.cookie = `flash_message=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
			}
		} catch (e) {
			console.error(e);
		}
	}

	afterNavigate(() => {
		assignFlashMessage();
	});
</script>
