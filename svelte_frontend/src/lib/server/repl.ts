import {type Actions, fail, redirect, type RequestEvent, type ActionFailure} from '@sveltejs/kit';
import {assign_cookies, get_headers} from '$lib/server/request';
import {putFlash} from '$lib/server/flash';
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

type ActionReturn = Promise<ActionFailure<Message> | Partial<Message>>;

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

function constructRequestUrl(url: string, method: string, formData: FormData): string {
  const isQueryMethod = ['GET', 'DELETE'].includes(method.toUpperCase());

  if (!isQueryMethod) {
    return url;
  }

  const queryString = formDataToString(formData);
  // Check if the URL already has query parameters
  const separator = url.includes('?') ? '&' : '?';

  // Only append formData if it's not empty
  return queryString ? `${url}${separator}${queryString}` : url;
}

async function r_push(
  {
    url,
    method,
    formData,
    event,
    allowCookies,
    addHeaders
  }: RequestOptions): ActionReturn {
  const uniq = formData.get('uniq');
  formData.delete('uniq');

  const finalUrl = constructRequestUrl(url, method, formData);

  const options: RequestInit = {
    method,
    ...(addHeaders && {headers: get_headers(event, false)}),
    ...((['POST', 'PUT'].includes(method.toUpperCase())) && {body: formData})
  };

  let response;
  let data;

  console.log(`[REPL] Fetching ${method} ${finalUrl}`);

  try {
    response = await event.fetch(finalUrl, options);
    if (allowCookies) {
      assign_cookies(event, response);
    }
    if (response.status === 204) {
      return {};
    }
    data = await response.json();
    console.log(`[REPL] Response for ${method} ${finalUrl}:`, data);
  } catch (e) {
    if (e instanceof Response) {
      throw e;
    }
    console.error(`[REPL] Error for ${method} ${finalUrl}:`, e);
    return fail(SERVER_ERROR_500, SERVER_ERROR_MSG);
  }

  triggerFlashMessage(event, data);

  return response.ok
    ? data
    : fail(response.status, {...data, uniq});
}

function normalizeProxyPaths(proxyPaths: string | string[] | NamedActionInfo[]): NamedActionInfo[] {
  const pathsArray = Array.isArray(proxyPaths) ? proxyPaths : [proxyPaths];

  return pathsArray.map(path =>
    typeof path === 'string'
      ? {
        name: path,
        method: 'POST' as BASE_METHOD,
        allowCookies: true
      }
      : path
  );
}

export const repl = (
  proxyPaths: string | string[] | NamedActionInfo[],
  initialOptions: Options = {}
): Actions => {
  const options = {...DEFAULT_OPTIONS, ...initialOptions};
  const actions: Actions = {};

  const normalizedPaths = normalizeProxyPaths(proxyPaths);

  // Create actions for each path
  for (const proxyAction of normalizedPaths) {
    actions[proxyAction.name] = async (event: RequestEvent): ActionReturn => {
      const formData = await event.request.formData();
      const url = `${options.djangoBaseApi}/${ReMod.NAME}?${ReMod.URL_NAME}=${proxyAction.name}`;
      console.log(proxyAction.allowCookies, options.allowCookies);

      return r_push({
        url,
        method: proxyAction.method,
        formData,
        event,
        allowCookies: proxyAction.allowCookies ?? options.allowCookies,
        addHeaders: options.addHeaders
      });
    };
  }

  // Generic 'call' action
  actions.call = async (event: RequestEvent): ActionReturn => {
    const initUrl = event.url.searchParams.get('s');
    const method = event.url.searchParams.get('m') as BASE_METHOD;
    if (!initUrl || !method) {
      return fail(400, {message: 'Missing required parameters'} as Message);
    }

    const formData = await event.request.formData();
    const url = `${SECRET_BASE_API}${initUrl}`;

    return r_push({
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