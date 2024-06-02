<script lang="ts">
    import Error from "$items/Error.svelte";
    import Form from "$items/Form.svelte";

    let loading = $state(false);
</script>

<Form action="?/register" method="post" bind:loading className="flex flex-col gap-2">
    <div class="input-group">
        <label for="username">Username</label>
        <input id="username" type="text" name="username" placeholder="username1"/>
        <Error name="username"/>
    </div>
    <div class="input-group">
        <label for="email">Email</label>
        <input id="email" type="text" name="email" placeholder="your@mail.com"/>
        <Error name="email"/>
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
            Register
        {/if}
    </button>
    <div class="flex">
        <a href="/login" class="ml-auto text-blue-600 dark:text-blue-300 text-sm hover:text-blue-500">Login</a>
    </div>
</Form>