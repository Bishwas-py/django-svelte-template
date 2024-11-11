<script>
  const {display = false, occupy = true, size = 0.7, class: className = '' } = $props();
</script>

{#if display}
  <svg
   xmlns="http://www.w3.org/2000/svg"
   width="{size}em"
   height="{size}em"
   viewBox="0 0 24 24"
   class="{className}">
  <path fill="currentColor" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2m1 15h-2v-6h2zm0-8h-2V7h2z"/>
</svg>
{:else if occupy}
  <div style="height: {size}em; width: {size}em;"></div>
{/if}