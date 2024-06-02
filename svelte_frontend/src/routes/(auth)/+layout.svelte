<script lang="ts">
    let {children} = $props();
</script>

<div class="h-screen min-w-full flex items-center justify-center bg-gray-200 dark:bg-gray-950">
    <div class="flex flex-col gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm w-full">
        {@render children()}
    </div>
</div>