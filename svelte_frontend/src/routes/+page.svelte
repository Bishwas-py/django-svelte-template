<script>
    import Error from "$items/Error.svelte";
    import {enhance} from "$app/forms";
    import Form from "$items/Form.svelte";
    let loading = $state(false);

</script>

<Form action="?/login" method="post">
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
    <input type="submit" value="login"/>
    {loading}
</Form>

<style>
    :global(form) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2rem;
    }
</style>
