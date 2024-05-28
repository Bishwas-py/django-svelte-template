import {django_fetch_handle} from "@friendofsvelte/django-kit";
import type {Handle, RequestEvent} from "@sveltejs/kit";
import {sequence} from "@sveltejs/kit/hooks";
import type {User} from "$lib/interfaces/auth";

export const handleFetch = django_fetch_handle;

async function get_user(event: RequestEvent): Promise<User | null> {
    try {
        const response = await event.fetch(`$api/auth/current-user/`);
        if (response.ok) return await response.json();
    } catch (e) {
        console.log(e);
        return null;
    }
    return null;
}

const handleAuth = (async ({event, resolve}) => {
    const user = await get_user(event);
    if (user && 'id' in user) {
        event.locals.user = user;
    }
    return resolve(event);
}) satisfies Handle;

export const handle = sequence(handleAuth,);
