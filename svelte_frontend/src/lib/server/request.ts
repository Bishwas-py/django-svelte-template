import {type Cookies, error, type RequestEvent} from '@sveltejs/kit';
import {parseString, splitCookiesString} from 'set-cookie-parser';
import {SERVER_ERROR_500} from '$lib/defaults/status';

export interface FetchOptions {
  actionName?: string;
  statusCode: number;
  raiseError?: boolean;
}

export const DEFAULT_FETCH_OPTIONS: FetchOptions = {
  actionName: '',
  statusCode: SERVER_ERROR_500,
  raiseError: false
};

export const get_opts = (optsOrAction: Partial<FetchOptions> | string): FetchOptions => {
  const options = typeof optsOrAction === 'string' ? {verb: `'${optsOrAction}'`} : optsOrAction;
  return {...DEFAULT_FETCH_OPTIONS, ...options};
};

export const assign_cookies = (event: { cookies: Cookies } | RequestEvent, response?: Response) => {
  if (!response) return;
  const cookiesHeader = response.headers.get('set-cookie');
  if (!cookiesHeader) return;
  for (const str of splitCookiesString(cookiesHeader)) {
    const {name, value, ...options} = parseString(str);
    event.cookies.set(name, value, {...options} as { path: string });
  }
};

type GetServerHeaders = (ServerHeaders & {
  'Content-Type'?: string;
}) & HeadersInit;

export const get_headers = (event: RequestEvent, includeContentType = true): GetServerHeaders => {
  const userAgent = event.request.headers.get('User-Agent') || 'SvelteKit(Prime)';
  const csrfToken = event.cookies.get('csrftoken') || '';
  const headers: GetServerHeaders = {
    'Referer': event.url.pathname,
    'X-Referer-URL': event.url.href,
    'Route-ID': event.route.id || '',
    'Origin': event.url.origin || '',
    'User-Agent': userAgent,
    'X-CSRFToken': csrfToken,
  };
  if (includeContentType) {
    headers['Content-Type'] = event.request.headers.get('Content-Type') || 'application/json';
  }
  return headers;
};

export const assign_headers = (request: Request, headers: ServerHeaders) => {
  Object.keys(headers).forEach((key) => {
    if (!request.headers.has(key)) {
      request.headers.set(key, headers[key as keyof ServerHeaders]);
    }
  });
};
