<script>
    const {display = false, occupy = true, size = 0.7, class: className = ''} = $props();
</script>

{#if display}
 <svg
   xmlns="http://www.w3.org/2000/svg"
   width="{size}em"
   height="{size}em"
   viewBox="0 0 16 16"
   class="{className}">
  <circle cx="8" cy="8" r="8" fill="currentColor"/>
 </svg>
{:else if occupy}
 <div style="height: {size}em; width: {size}em;"></div>
{/if}