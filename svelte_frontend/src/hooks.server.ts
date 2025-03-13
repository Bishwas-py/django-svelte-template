import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import { env } from '$env/dynamic/private';
import { getInitialData } from '$lib/server/initializer';
import { DEFAULT_SITE_DATA } from '$lib/defaults/sitedata';
import { generateCacheControl } from '$lib/server/cache';

/*
Simply elegant! No logging, and response is returned as it is. Priority#1st
 */
export const handleApi: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/api')) {
		event.url.pathname = event.url.pathname.replace('/api', '');
		const prepared_url = event.url.href.replace(event.url.origin, env.API_URL);

		const response = await event.fetch(prepared_url, {
			headers: event.request.headers,
			method: event.request.method,
			signal: event.request.signal,
			keepalive: event.request.keepalive,
			body: ['GET', 'HEAD'].includes(event.request.method) ? undefined : await event.request.text()
		});

		const req_content_type = event.request.headers.get('content-type') || 'application/json';
		const content_type = response.headers.get('content-type') || req_content_type;
		const set_cookie = response.headers.get('set-cookie') || '';

		const cache_control = generateCacheControl({
			headers: response.headers,
			method: event.request.method
		});

		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers: {
				'content-type': content_type,
				'set-cookie': set_cookie,
				'cache-control': cache_control
			}
		});
	}
	return resolve(event);
};

export const handleInitialData: Handle = async ({ event, resolve }) => {
	if (event.cookies.get('sessionid') || !event.cookies.get('csrftoken')) {
		event.locals.init = await getInitialData(event);
		console.log(JSON.stringify(event.locals.init, null, 2));
		
	} else {
		event.locals.init = {
			site_data: DEFAULT_SITE_DATA,
			current_user: undefined
			// subscriptions: undefined
		};
	}
	return resolve(event);
};

export const handle = sequence(handleApi, handleInitialData);
