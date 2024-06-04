<script lang="ts">
    import {dayjs_} from "$lib";
    import {fade} from "svelte/transition";


    const {date_at, text = 'completed', class: class_ = ''}: {
        date_at: string,
        text: string,
        class?: string
    } = $props();
    let show_from_now = $state(false);
    let timeout = $state();
</script>

{#key show_from_now}
    <button type="button" class={class_}
            title="Double click to toggle between from now and formatted date."
            in:fade
            ondblclick={() => {
                clearTimeout(timeout);
                show_from_now = !show_from_now;
                timeout = setTimeout(() => show_from_now = false, 2000);
            } }>
        {#if show_from_now}
            {dayjs_(date_at).fromNow()}
        {:else}
            {dayjs_(date_at).format('YYYY, MMMM D, dddd, HH:mm:ss')}
        {/if}
        <strong>{text}</strong>
    </button>
{/key}