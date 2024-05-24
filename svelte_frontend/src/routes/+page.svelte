<script>
    import Error from "$items/Error.svelte";
    import {enhance} from "$app/forms";
</script>

<form action="?/login" method="post" use:enhance>
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
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2rem;
    }
</style>
