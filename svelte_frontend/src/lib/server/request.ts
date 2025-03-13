import { error, type RequestEvent } from '@sveltejs/kit';
import { SERVER_ERROR_500 } from '$lib/defaults/status';

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

/*
Returns the options for the fetch request
 */
export const opts = (optsOrAction: Partial<FetchOptions> | string): FetchOptions => {
	const options = typeof optsOrAction === 'string' ? { verb: `'${optsOrAction}'` } : optsOrAction;
	return { ...DEFAULT_FETCH_OPTIONS, ...options };
};

type GetServerHeaders = (ServerHeaders & {
	'Content-Type'?: string;
}) &
	HeadersInit;

/*
Get headers for server requests
 */
export const gh = (event: RequestEvent, includeContentType = true): GetServerHeaders => {
	const userAgent = event.request.headers.get('User-Agent') || 'SvelteKit(Prime)';
	const headers: GetServerHeaders = {
		Referer: event.url.pathname,
		'X-Referer-URL': event.url.href,
		'Route-ID': event.route.id || '',
		Origin: event.url.origin || '',
		'User-Agent': userAgent
	};
	if (includeContentType) {
		headers['Content-Type'] = event.request.headers.get('Content-Type') || 'application/json';
	}
	return headers;
};

export const assignHeaders = (request: Request, headers: ServerHeaders) => {
	Object.keys(headers).forEach((key) => {
		if (!request.headers.has(key)) {
			request.headers.set(key, headers[key as keyof ServerHeaders]);
		}
	});
};

export const req = async <T = unknown>(
	requestPromise: Promise<T>,
	optionsOrAction: FetchOptions | string = DEFAULT_FETCH_OPTIONS
): Promise<T | undefined> => {
	try {
		return await requestPromise;
	} catch (e) {
		// Errors: Network failure, invalid URL, CORS (browser), AbortError, SSL issues (Node.js), redirect loops
		const options = opts(optionsOrAction);
		console.error(`Request error fetching data ${options.actionName}: `, e);
		if (!options.raiseError) {
			error(options.statusCode, `Error loading: ${options.actionName}.`); // LANG: loading means request
		}
		return;
	}
};
