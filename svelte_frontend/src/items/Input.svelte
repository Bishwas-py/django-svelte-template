<script lang="ts" module>
  import type {Snippet} from "svelte";

  export interface InputProps {
    children?: Snippet,
    text: string,
    name: string,
    id?: string,
    class?: string,
    has_err?: boolean,
    type?: string,
    placeholder?: string
    value?: string
  }
</script>

<script lang="ts">
  import Error from "$items/Error.svelte";
  import {getContext} from "svelte";
  import {page} from "$app/stores";

  let {
    children,
    text,
    name,
    id,
    class: className = '',
    has_err = false,
    type = "text",
    placeholder,
    value = $bindable()
  }: InputProps = $props();
  if (!id) id = name;
  let input_elm: HTMLInputElement;
  $effect(() => {
    if (has_err) input_elm.focus();
  });

  let uniq = getContext('uniq') as number;
</script>

<div class={className ?? "flex flex-col gap-2"}>
 <div class="inp-wrap" class:has_err>
  <label for="{name}">{text}</label>
  <input id="{name}" {name} {placeholder} {type} bind:this={input_elm} bind:value={value}/>
 </div>
 <Error {name} {uniq} bind:has_err/>
 {#if children}
  {@render children()}
 {/if}
</div>
