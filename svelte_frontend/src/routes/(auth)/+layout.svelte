<script lang="ts">
    let {children} = $props();
</script>

<div class="h-screen min-w-full flex items-center justify-center">
    <div class="flex flex-col gap-4 bg-white text-lg dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm w-full min-h-[40vh]">
        {@render children()}
    </div>
</div>

<!-- Importing External Fonts, optional, remove if not needed -->
<style>
    @import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');
</style>

