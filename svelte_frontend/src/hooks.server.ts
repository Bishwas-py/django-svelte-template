import type {Handle, RequestEvent} from "@sveltejs/kit";
import {sequence} from "@sveltejs/kit/hooks";
import type {User} from "$lib/interfaces/auth";
import type {SiteData} from "$lib/interfaces/site-data";
import {assign_headers, get_headers, assign_cookies} from "$lib/server/request";
import {SECRET_BASE_API} from "$env/static/private";

export const handleFetch = async ({request, fetch, event}) => {
  const is_api_req = request.url.includes(`$api/`);

  if (is_api_req) {
    const headers = get_headers(event, true);
    assign_headers(request, headers);

    const req_url = `${SECRET_BASE_API}/${request.url.split('$api/')[1]}`;

    const options = {
      method: request.method,
      headers: request.headers,
      cache: request.cache,
      credentials: request.credentials,
      mode: request.mode,
      referrer: request.referrer,
      referrerPolicy: request.referrerPolicy,
      integrity: request.integrity,
      keepalive: request.keepalive,
      signal: request.signal,
      redirect: request.redirect
    } as RequestInit;

    if (request.method === 'POST' || request.method === 'PUT') {
      options['body'] = await request.text();
    }
    return fetch(req_url, options);
  }
  return fetch(request);
};

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
