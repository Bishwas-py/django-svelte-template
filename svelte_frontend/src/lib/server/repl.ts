import {type Actions, fail, redirect, type RequestEvent} from '@sveltejs/kit';
import {assign_cookies, get_headers} from '$lib/server/request';
import {putFlash} from '$lib/server/flash.js';
import {SERVER_ERROR_500} from '$lib/defaults/status';
import {SERVER_ERROR_MSG} from '$lib/defaults/messages';
import {Prox} from "$lib/interfaces/proxy";
import {SECRET_BASE_API} from "$env/static/private";

export type BASE_METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type NamedActionInfo = {
  name: string,
  method: BASE_METHOD,
  allowCookies?: boolean
}

type Options = { djangoBaseApi?: string, allowCookies?: boolean, addHeaders?: boolean };

const default_options = {
  djangoBaseApi: SECRET_BASE_API,
  allowCookies: true,
  addHeaders: true
} as Options;

const formDataToString = (formData: FormData) => {
  const entries = formData.entries();
  let result = '';
  for (const [key, value] of entries) {
    result += `${key}=${value}&`;
  }
  return result;
};

const triggerFlashMessage = (event: RequestEvent, data?: Partial<Message>) => {
  if (
    typeof data?.redirect === 'string' &&
    typeof data?.message === 'string') {
    const flashMessage: FlashMessage = {
      ...data as Message,
      alias: data.alias || 'default_alias', // Ensure alias is provided
      path: data.redirect
    };
    putFlash(event.cookies, flashMessage);
    redirect(303, flashMessage.path);
  }
};

/*
This function is used to create action triggers for Django's API endpoints via their names.
Example: path('do-something/', do_something, name='do_something_view_name'),
export the actions as via_route_name("do_something_view_name");
 */
export const proxy = <T extends Partial<Message> = Partial<Message>>(
  proxyPaths: string | string[] | NamedActionInfo[],
  initialOptions: Options = {}
) => {
  initialOptions = {...default_options, ...initialOptions};
  let actions: Actions = {};
  if (typeof proxyPaths === 'string') {
    proxyPaths = [proxyPaths];
  }
  proxyPaths.map((proxyAction) => {
    if (typeof proxyAction === 'string') {
      proxyAction = {name: proxyAction, method: 'POST', allowCookies: false};
    }
    const action: Actions = {
      [proxyAction.name]: async (event: RequestEvent) => {
        const formData = await event.request.formData();
        const proxyParamsArray = event.url.searchParams.get(Prox.PARAMS);
        let url = `${initialOptions.djangoBaseApi}/${Prox.NAME}?${Prox.URL_NAME}=${proxyAction.name}`;
        if (proxyParamsArray) {
          url = `${url}&params=${proxyParamsArray}`;
        }
        let options: RequestInit = {method: proxyAction.method};

        if (initialOptions.addHeaders) options = {...options, headers: get_headers(event, false)};

        if (proxyAction.method === 'POST' || proxyAction.method === 'PUT') {
          options = {...options, body: formData};
        } else {
          url = `${url}&${formDataToString(formData)}`;
        }

        let response: Response;
        let data: T = {} as T;
        try {
          response = await event.fetch(url, options);
          if (proxyAction.allowCookies || initialOptions.allowCookies) {
            assign_cookies(event, response);
          }
          if (response.status === 204) {
            return;
          }
          data = await response.json();
        } catch (e) {
          console.error(`Proxy call error \`${proxyAction.name}\`:`, e);
          return fail(SERVER_ERROR_500, SERVER_ERROR_MSG);
        }

        // Check if response has 'redirect' and 'message' properties and handle accordingly
        triggerFlashMessage(event, data);

        if (response.ok) {
          return data;
        }
        return fail(response.status, data);
      }
    };
    actions = {...actions, ...action};
  });
  return actions;
};

