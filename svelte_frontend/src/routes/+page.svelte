<script lang="ts">
    import {page} from "$app/stores";
    import Form from "$items/Form.svelte";
    import Error from "$items/Error.svelte";
</script>

<h1>Welcome, {$page.data.current_user.username}</h1>

<Form action="?/create_todo" method="post" className="flex flex-col items-center justify-center rounded-lg">
    Add your todo
    <div class="flex flex-row items-center gap-3">
        <div class="flex flex-col">
            <input id="title" type="text" name="title" placeholder="What needs to be done?" class="input" required/>
            <Error name="title"/>
        </div>
        <div class="flex flex-col">
            <input id="completed" type="checkbox" name="completed" class="accent-amber-500"/>
            <Error name="title"/>
        </div>
        <button type="submit" class="submit-button">Add</button>
    </div>
</Form>

{#each $page.data.todos.items as todo}
    <div>
        <input type="checkbox" checked={todo.completed}/>
        <span>{todo.title}</span>
    </div>
{/each}


<style>
    :global(form) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2rem;
    }
</style>
