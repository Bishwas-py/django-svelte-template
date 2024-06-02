import {assign_cookies} from "@friendofsvelte/django-kit/server/utils";
import {django_fetch_handle} from "@friendofsvelte/django-kit/server/handle";
import type {Handle, RequestEvent} from "@sveltejs/kit";
import {sequence} from "@sveltejs/kit/hooks";
import type {User} from "$lib/interfaces/auth";
import type {SiteData} from "$lib/interfaces/siteData";

export const handleFetch = django_fetch_handle;

async function get_init_data(event: RequestEvent): Promise<[Response, {
    current_user: User,
    site_data: SiteData
}]> {
    const response = await event.fetch(`$api/home/init-data/`);
    return [response, await response.json()];
}

const handleAuth = (async ({event, resolve}) => {
    try {
        const [response, init] = await get_init_data(event);
        assign_cookies(event, response);
        if (response.ok) {
            event.locals.current_user = init.current_user;
            event.locals.site_data = init.site_data;
        }
    } catch (e) {
        console.error("Error fetching user: ", e);
    }
    return resolve(event);
}) satisfies Handle;

export const handle = sequence(handleAuth,);
