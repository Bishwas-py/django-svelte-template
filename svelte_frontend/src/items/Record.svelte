<script lang="ts">
  const {...restParams}: Record<string, string> = $props();
</script>

{#each Object.entries(restParams) as [key, value]}
 <input name="{key}" type="hidden" value="{value}"/>
{/each}
