import {type Actions, fail, redirect, type RequestEvent, type ActionFailure} from '@sveltejs/kit';
import {assign_cookies, get_headers} from '$lib/server/request';
import {putFlash} from '$lib/server/flash.js';
import {SERVER_ERROR_500} from '$lib/defaults/status';
import {SERVER_ERROR_MSG} from '$lib/defaults/messages';
import {ReMod} from "$lib/interfaces/repl-modes";
import {SECRET_BASE_API} from "$env/static/private";

export type NamedActionInfo = {
  name: string;
  method: BASE_METHOD;
  allowCookies?: boolean;
  direct?: boolean;
}

type Options = {
  djangoBaseApi?: string;
  allowCookies?: boolean;
  addHeaders?: boolean;
}

type RequestOptions = {
  url: string;
  method: BASE_METHOD;
  formData: FormData;
  event: RequestEvent;
  allowCookies?: boolean;
  addHeaders?: boolean;
}

// Define specific return type for SvelteKit actions
type ActionReturn = Promise<ActionFailure<Message> | { success: true; data: Message }>;

const DEFAULT_OPTIONS: Options = {
  djangoBaseApi: SECRET_BASE_API,
  allowCookies: true,
  addHeaders: true
};

const formDataToString = (formData: FormData): string =>
  Array.from(formData.entries())
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

const triggerFlashMessage = (event: RequestEvent, data?: Partial<Message>): void => {
  if (typeof data?.redirect === 'string' && typeof data?.message === 'string') {
    const flashMessage: FlashMessage = {
      ...data as Message,
      alias: data.alias || 'default_alias',
      path: data.redirect
    };
    putFlash(event.cookies, flashMessage);
    throw redirect(303, flashMessage.path);
  }
};

async function handleRequest(
  {
    url,
    method,
    formData,
    event,
    allowCookies,
    addHeaders
  }: RequestOptions): ActionReturn {
  const finalUrl = (method === 'GET' || method === 'DELETE')
    ? `${url}&${formDataToString(formData)}`
    : url;

  const options: RequestInit = {
    method,
    ...(addHeaders && {headers: get_headers(event, false)}),
    ...((['POST', 'PUT'].includes(method.toUpperCase())) && {body: formData})
  };

  try {
    const response = await event.fetch(finalUrl, options);

    if (allowCookies) {
      assign_cookies(event, response);
    }

    if (response.status === 204) {
      return {success: true, data: {} as Message};
    }

    const data = await response.json() as Message;
    triggerFlashMessage(event, data);

    return response.ok
      ? {success: true, data}
      : fail(response.status, data);
  } catch (e) {
    if (e instanceof Response) {
      throw e; // Rethrow redirect responses
    }
    console.error(`Proxy call error for URL ${url}:`, e);
    return fail(SERVER_ERROR_500, SERVER_ERROR_MSG);
  }
}

export const repl = (
  proxyPaths: string | string[] | NamedActionInfo[],
  initialOptions: Options = {}
): Actions => {
  const options = {...DEFAULT_OPTIONS, ...initialOptions};
  const actions: Actions = {};

  // Convert string input to NamedActionInfo array
  const normalizedPaths: NamedActionInfo[] = (Array.isArray(proxyPaths) ? proxyPaths : [proxyPaths])
    .map(path => typeof path === 'string'
      ? {name: path, method: 'POST' as BASE_METHOD, allowCookies: false}
      : path
    );

  // Add named actions
  for (const proxyAction of normalizedPaths) {
    actions[proxyAction.name] = async (event: RequestEvent): ActionReturn => {
      const formData = await event.request.formData();
      const url = `${options.djangoBaseApi}/${ReMod.NAME}?${ReMod.URL_NAME}=${proxyAction.name}`;

      return handleRequest({
        url,
        method: proxyAction.method,
        formData,
        event,
        allowCookies: proxyAction.allowCookies ?? options.allowCookies,
        addHeaders: options.addHeaders
      });
    };
  }

  // Add generic 'call' action
  actions.call = async (event: RequestEvent): ActionReturn => {
    const initUrl = event.url.searchParams.get('s');
    const method = event.url.searchParams.get('m') as BASE_METHOD;
    if (!initUrl || !method) {
      return fail(400, {message: 'Missing required parameters'} as Message);
    }

    const formData = await event.request.formData();
    const url = `${SECRET_BASE_API}${initUrl}`;

    return handleRequest({
      url,
      method,
      formData,
      event,
      allowCookies: options.allowCookies,
      addHeaders: options.addHeaders
    });
  };

  return actions;
};