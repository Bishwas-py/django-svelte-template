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
  <path fill="currentColor" d="M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.493 2 11.953 2M13 17h-2v-2h2zm0-4h-2V7h2z"/>
</svg>
{:else if occupy}
  <div style="height: {size}em; width: {size}em;"></div>
{/if}