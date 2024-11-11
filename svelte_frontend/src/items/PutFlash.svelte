<script lang="ts">
  import {page} from '$app/stores';
  import {parse} from 'cookie';
  import {afterNavigate} from '$app/navigation';
  import {add_toast, dismiss_toast_after} from "$lib/stores/notifier.svelte";
  import {untrack} from "svelte";

  function flux_message_to_proper(msg_source: MessageFlux) {
    if (!msg_source || !msg_source.message) return;
    return {
      message_type: msg_source?.message_type || 'warning',
      alias: msg_source?.alias || 'system',
      message: msg_source.message,
      action: msg_source.action,
    } as Message;
  }

  function trigger_message(msg_source: MessageFlux) {
    const proper_msg = flux_message_to_proper(msg_source);
    if (proper_msg) untrack(() => dismiss_toast_after(add_toast(proper_msg)));
  }

  $effect(() => {
    trigger_message($page.form);
    trigger_message($page.data as unknown as MessageFlux);
    trigger_message($page.error as unknown as MessageFlux);
  });

  function assign_flash_message() {
    try {
      const raw_flash_message = parse(document.cookie)[`flash_message`];
      if (raw_flash_message) {
        const flash_message = JSON.parse(atob(raw_flash_message) || '{}') as FlashMessage;
        if (flash_message.path !== $page.url.pathname) return;
        trigger_message(flash_message);
        document.cookie = `flash_message=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    } catch (e) {
      console.error(e);
    }
  }

  afterNavigate(() => {
    assign_flash_message();
  });
</script>