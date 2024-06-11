<script lang="ts">
    import Error from "$items/Error.svelte";
    import Form from "$items/Form.svelte";
    import Input from "$items/Input.svelte";

    let loading = $state(false);
</script>

<div class="flex flex-col gap-0">
    <h1 class="text-4xl font-bold">Login</h1>
    <span class="text-gray-500 dark:text-gray-400">Login to your account</span>
</div>
<Form action="?/login" method="post" bind:loading class="flex flex-col gap-3">
    <Input name="username" text="@Username" placeholder="iamwho12"/>
    <Input name="password" text="Password" type="password" placeholder="6xist€nC9"/>
    <button type="submit" disabled={loading} class="p-but font-black">
        {#if loading}
            ......
        {:else}
            Login
        {/if}
    </button>
</Form>


<div class="flex items-center gap-2 justify-between">
    <a href="#FrontendNotImplented" class="goto-button f-dotted" title="Not Implemented: SvelteKit">Forgot password</a>
    <a href="/register" class="goto-button f-dotted">Register</a>
</div>