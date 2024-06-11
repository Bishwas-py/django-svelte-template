<script lang="ts">
    let {children} = $props();
</script>

<div class="h-screen min-w-full flex items-center justify-center bg-gradient-to-tr
dark:from-slate-900 dark:via-gray-900 dark:to-zinc-900">
    <div class="flex flex-col gap-4 bg-white text-lg dark:bg-neutral-950/90
    px-7 py-8 rounded-lg shadow-lg max-w-md w-full min-h-[50vh]">
        {@render children()}
    </div>
</div>

<!-- Importing External Fonts, optional, remove if not needed -->
<style>
    @import url('https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');
</style>

