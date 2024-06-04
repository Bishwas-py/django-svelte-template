<script lang="ts">
    import Error from "$items/Error.svelte";
    import Form from "$items/Form.svelte";

    let loading = $state(false);
</script>

<Form action="?/login" method="post" bind:loading class="flex flex-col gap-2">
    <div class="input-group">
        <label for="username">Username</label>
        <input id="username" type="text" name="username" placeholder="Username"/>
        <Error name="username"/>
    </div>
    <div class="input-group">
        <label for="password">Password</label>
        <input id="password" type="password" name="password" placeholder="Password"/>
        <Error name="password"/>
    </div>
    <button type="submit" disabled={loading} class="submit-button">
        {#if loading}
            ......
        {:else}
            Login
        {/if}
    </button>
    <div class="flex">
        <a href="/register" class="ml-auto text-blue-600 dark:text-blue-300 text-sm hover:text-blue-500">Register</a>
    </div>
</Form>