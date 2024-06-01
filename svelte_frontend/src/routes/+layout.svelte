<script>
    import "../app.css";
    import "iconify-icon";
    import {add_toast} from "@friendofsvelte/django-kit/notifier";
    import PutFlash from "@friendofsvelte/django-kit/components/PutFlash.svelte";
    import Flash from "$items/Flash.svelte";

    let {children} = $props();
</script>

<PutFlash/>
<Flash/>

{@render children()}

<button onclick={()=>{
    add_toast({message: 'Hello World',message_type: 'success', alias: 'hello_world'})
}}>
    Add Toast
</button>