<script lang="ts" module>
  import type {FormActionResult} from '$lib/interfaces';
  import type {Snippet} from 'svelte';
  import type {ActionResult} from '@sveltejs/kit';
  import type {HTMLFormAttributes} from "svelte/elements";

  export interface FormProps {
    action?: string;
    loading?: boolean;
    method?: HTMLFormAttributes['method'];
    class?: string;
    action_function?: () => void;
    children: Snippet<[number]>;
    ivl?: boolean,
    reset?: boolean,
    after?: (result: FormActionResult) => void;
    enctype?: HTMLFormAttributes['enctype'];
  }

  export interface FormActionArgs {
    result: ActionResult;
    update: (options: { invalidateAll: boolean; reset?: boolean }) => Promise<void>;
  }
</script>

<script lang="ts">
  import {enhance} from '$app/forms';
  import {setContext} from 'svelte';

  let {
    action = '',
    method = 'post',
    class: className = '',
    loading = $bindable(false),
    ivl: invalidateAll = true,
    children,
    after,
    reset = true,
    enctype,
    action_function = actionFunction,
  }: FormProps = $props();


  async function actionFunction() {
    loading = true;

    return async ({result, update}: FormActionArgs) => {
      await update({invalidateAll, reset}).finally(async () => {
        loading = false;
        if (after && typeof after === 'function') {
          after(result as unknown as FormActionResult);
        }
      });
    };
  }

  const uniq = Math.random();
  setContext('uniq', uniq);
</script>

<form
  {action}
  use:enhance={action_function}
  {method}
  class={className}
  class:loading
  {enctype}>
 {@render children(uniq)}
 <input type="hidden" name="uniq" value="{uniq}"/>
</form>
