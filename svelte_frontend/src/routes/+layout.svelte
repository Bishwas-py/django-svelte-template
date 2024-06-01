<script>
    import Flash from "@friendofsvelte/django-kit/components/Flash.svelte";
    import {add_toast} from "@friendofsvelte/django-kit/notifier";
    import "@friendofsvelte/django-kit/styles/toast.css";

    let {children} = $props();
</script>

<Flash/>

{@render children()}

<button onclick={()=>{
    add_toast({message: 'Hello World',message_type: 'success', alias: 'hello_world'})
}}>
    Add Toast
</button>