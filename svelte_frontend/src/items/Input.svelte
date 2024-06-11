<script lang="ts">
    import Error from "$items/Error.svelte";
    import type {Snippet} from "svelte";

    let {children, text, name, id, class: className = '', has_err = false, type = "text"}: {
        children?: Snippet,
        text: string,
        name: string,
        id?: string,
        class?: string,
        has_err?: boolean,
        type?: string,
    } = $props();
    if (!id) id = name;
</script>

<div class={className ?? "flex flex-col gap-2"}>
    <div class="inp-wrap" class:has_err>
        <label for="{name}">{text}</label>
        <input id="{name}" {name} placeholder="iamwho12" {type}/>
    </div>
    <Error {name} bind:has_err/>
    {#if children}
        {@render children()}
    {/if}
</div>