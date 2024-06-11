<script lang="ts">
    import {page} from '$app/stores';

    interface Props {
        name: string,
        index?: number,
        s_name?: boolean,
        className?: string,
        has_err?: boolean
    }

    let {
        name,
        index,
        has_err = $bindable(),
        s_name = false,
        className = ''
    }: Props = $props();

    type ValidationError = {
        type: string;
        loc: ['body', 'data', ...string[]];
        msg: string;
        ctx?: Record<string, string>;
    };

    function find_error_with_error_loc(
        error_loc: string,
        details: ValidationError[],
        from_index: number | null = null
    ): ValidationError | undefined {
        return details.find(detail => {
            if (from_index === null) {
                from_index = detail.loc.length - 1;
            }
            return detail.loc[from_index] === error_loc;
        });
    }

    function use_scroll(node: HTMLElement) {
        node.scrollIntoView({behavior: 'instant', block: 'center'});
    }


    let inline_text = $derived.by(
        () => {
            const detail = $page.form?.error;
            if ($page.form && $page.form?.inline) {
                console.log("$page.form.inline", $page.form.inline)
                let error_msg = $page.form.inline[name];
                if (error_msg) return [error_msg];
            } else if (detail) {
                const error = find_error_with_error_loc(name, detail, index);
                if (error?.ctx && error.ctx.error) return [error.ctx.error];
                if (error?.msg) return [error.msg];
            }
            return [];
        }
    )

    $effect(() => {
        if (inline_text.length) has_err = true;
        setTimeout(() => {
            has_err = false;
        }, 960);
    });
</script>

{#if inline_text?.length > 0}
    <div class="error {className}">
        {#if s_name}
            <span>{name}: </span>
        {/if}
        <div>
            {#each inline_text as text}
                <small use:use_scroll class:animate-shake={has_err}>
                    {text}
                </small>
            {/each}
        </div>
    </div>
{/if}

<style>
    .error {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
    }

    .error span {
        font-weight: bold;
        font-size: 0.875rem;
        color: red;
    }

    .error div {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .error div small {
        color: red;
    }

    @keyframes shake {
        10%, 90% {
            transform: translate3d(-1px, 0, 0);
        }

        20%, 80% {
            transform: translate3d(2px, 0, 0);
        }

        30%, 50%, 70% {
            transform: translate3d(-4px, 0, 0);
        }

        40%, 60% {
            transform: translate3d(4px, 0, 0);
        }
    }

    .animate-shake {
        animation: shake 0.5s cubic-bezier(.36, .07, .19, .97) both;
        color: red;
    }
</style>