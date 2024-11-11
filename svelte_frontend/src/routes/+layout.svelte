<script>
    import "../app.css";
    import Flash from "$items/Flash.svelte";
    import PutFlash from "$items/PutFlash.svelte";

    let {children} = $props();
</script>

<PutFlash/>
<Flash/>

{@render children()}
