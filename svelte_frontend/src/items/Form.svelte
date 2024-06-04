<script lang="ts">
    import {enhance} from "$app/forms";
    import type {Snippet} from 'svelte'

    interface Props {
        action?: string;
        loading?: boolean;
        method?: string;
        class: string;
        action_function?: (e: Event) => void;
        children: Snippet;
        inval?: boolean,
        after?: () => void;
    }

    let {
        action = '',
        method = 'post',
        class: className = '',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        loading = $bindable(),
        inval: invalidateAll = true,
        children,
        after = () => {
        }
    }: Props = $props();
    let action_function = () => {
        loading = true;
        return ({update}: { update: ({invalidateAll}: { invalidateAll: boolean }) => Promise<void> }) => {
            update({invalidateAll}).finally(async () => {
                loading = false;
                after();
            });
        };
    }

</script>

<form {action} {method} use:enhance={action_function} class={className} class:loading>
    {@render children()}
</form>