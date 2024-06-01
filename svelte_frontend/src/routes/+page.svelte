<script lang="ts">
    import {page} from "$app/stores";
</script>

<h1>Welcome, {$page.data.current_user.username}</h1>


<style>
    :global(form) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2rem;
    }
</style>
