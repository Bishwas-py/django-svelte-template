<script lang="ts">
    import {enhance} from "$app/forms";
    import type {Snippet} from 'svelte'

    interface Props {
        action: string;
        loading?: boolean;
        method?: string;
        className?: string;
        action_function?: (e: Event) => void;
        children: Snippet;
    }

    let {
        action = '',
        method = 'post',
        className = '',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        loading = $bindable(),
        children,
    }: Props = $props();

    let action_function = () => {
        loading = true;
        return ({update}) => {
            // Set invalidateAll to false if you don't want to reload page data when submitting
            update({invalidateAll: true}).finally(async () => {
                loading = false;
            });
        };
    }

</script>

<form {action} {method} use:enhance={action_function} class={className}>
    {@render children()}
</form>