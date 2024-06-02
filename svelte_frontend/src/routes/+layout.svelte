<script>
    import "../app.css";
    import "iconify-icon";
    import PutFlash from "@friendofsvelte/django-kit/components/PutFlash.svelte";
    import Flash from "$items/Flash.svelte";

    let {children} = $props();
</script>

<PutFlash/>
<Flash/>

{@render children()}
