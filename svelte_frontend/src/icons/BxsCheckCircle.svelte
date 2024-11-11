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
  <path fill="currentColor" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2m-1.999 14.413l-3.713-3.705L7.7 11.292l2.299 2.295l5.294-5.294l1.414 1.414z"/>
</svg>
{:else if occupy}
  <div style="height: {size}em; width: {size}em;"></div>
{/if}