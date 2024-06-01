<script lang="ts">
    import Error from "$items/Error.svelte";
    import Form from "$items/Form.svelte";

    let loading = $state(false);
</script>

<Form action="?/login" method="post" bind:loading>
    <div style="display: flex; flex-direction: column;">
        <label for="username">Username</label>
        <input type="text" name="username" placeholder="Username">
        <Error name="username"/>
    </div>
    <div style="display: flex; flex-direction: column;">
        <label for="password">Password</label>
        <input type="password" name="password" placeholder="Password">
        <Error name="password"/>
    </div>
    <button type="submit" disabled={loading}>
        {#if loading}
            ......
        {:else}
            Login
        {/if}
    </button>
</Form>