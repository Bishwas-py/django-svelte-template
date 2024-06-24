<script lang="ts">
    import {dayjs_} from "$lib";
    import {fade} from "svelte/transition";

    const {
        date_at,
        text = 'completed',
        class: class_ = ''
    }: {
        date_at: string,
        text: string,
        class?: string
    } = $props();
    let show_from_now = $state(false);
    let clk_trig = $state(false);
    // eslint-disable-next-line no-undef
    let timeout: NodeJS.Timeout | number | undefined = $state();

    const ondblclick = () => {
        clearTimeout(timeout);
        show_from_now = !show_from_now;
        timeout = setTimeout(() => show_from_now = false, 2000);
    };

    const onclick = () => {
        clk_trig = !clk_trig;
        setTimeout(() => clk_trig = false, 75);
    }
</script>

{#key show_from_now}
    <button type="button" class="{class_} {clk_trig ? 'scale-95' : ''} duration-100"
            title="Double click to toggle between from now and formatted date."
            {onclick} {ondblclick} in:fade>
        {#if show_from_now}
            {dayjs_(date_at).fromNow()}
        {:else}
            {dayjs_(date_at).format('YYYY, MMMM D, dddd, HH:mm:ss')}
        {/if}
        <strong>{text}</strong>
    </button>
{/key}