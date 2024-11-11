import {type Actions, fail, redirect, type RequestEvent} from '@sveltejs/kit';
import {assign_cookies, get_headers} from '$lib/server/request';
import {putFlash} from '$lib/server/flash.js';
import {SERVER_ERROR_500} from '$lib/defaults/status';
import {SERVER_ERROR_MSG} from '$lib/defaults/messages';


export type BASE_METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type NamedActionInfo = {
  name: string,
  method: BASE_METHOD,
  allowCookies?: boolean
}

type Options = { djangoBaseApi?: string, allowCookies?: boolean, addHeaders?: boolean };

const default_options = {
  djangoBaseApi: '/api',
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
export const callViaRouteName =
  <T extends Partial<Message> = Partial<Message>>(proxyPaths: string | string[] | NamedActionInfo[], initialOptions: Options = {}) => {
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
          let url = `${initialOptions.djangoBaseApi}/trvun/?url_name=${proxyAction.name}`;
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