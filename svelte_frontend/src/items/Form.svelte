<script lang="ts">
    import {enhance} from "$app/forms";
    import type { Snippet } from 'svelte'
    interface Props {
        action: string;
        sending?: boolean;
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
        sending = false,
        children,
    }: Props = $props();

    let action_function = () => {
        sending = true;
        return ({update}) => {
            // Set invalidateAll to false if you don't want to reload page data when submitting
            update({invalidateAll: true}).finally(async () => {
                sending = false;
            });
        };
    }

</script>

<form {action} {method} use:enhance={action_function} class={className}>
    {@render children()}
</form>