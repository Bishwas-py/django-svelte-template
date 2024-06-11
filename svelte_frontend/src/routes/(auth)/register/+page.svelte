<script lang="ts">
    import Error from "$items/Error.svelte";
    import Form from "$items/Form.svelte";

    let loading = $state(false);
</script>

<Form action="?/register" method="post" bind:loading class="flex flex-col gap-2">
    <div class="inp-wrap">
        <label for="username">Username</label>
        <input id="username" type="text" name="username" placeholder="username1"/>
        <Error name="username"/>
    </div>
    <div class="inp-wrap">
        <label for="email">Email</label>
        <input id="email" type="text" name="email" placeholder="your@mail.com"/>
        <Error name="email"/>
    </div>
    <div class="inp-wrap">
        <label for="password">Password</label>
        <input id="password" type="password" name="password" placeholder="Password"/>
        <Error name="password"/>
    </div>
    <button type="submit" disabled={loading} class="p-but font-black">
        {#if loading}
            ......
        {:else}
            Register
        {/if}
    </button>
</Form>

<div class="flex items-center gap-2 justify-between">
    <a href="/login" class="goto-button f-dotted">Login</a>
    <a href="/register" class="goto-button f-dotted">Register</a>
</div>