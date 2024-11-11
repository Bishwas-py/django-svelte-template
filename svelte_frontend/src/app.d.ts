// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import {type Cookies, redirect} from "@sveltejs/kit";
import type {Snippet} from "svelte";

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      current_user: import('$lib/interfaces/auth').User;
      site_data: import('$lib/interfaces/site-data').SiteData;
    }

    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }

  interface ServerHeaders {
    Referer: string;
    'X-Referer-URL': string;
    'Route-ID': string;
    Origin: string;
    'User-Agent': string;
  }

  type MessageType = 'success' | 'error' | 'warning' | 'info';

  interface ActionPathRequired {
    action?: {
      path: string;
      label: string;
    };
  }

  interface BaseMessage extends ActionPathRequired {
    message_type: MessageType;
    message: string;
    alias?: string;
  }

  interface Message extends BaseMessage, Record<string, unknown> {
    alias: string;
  }

  type MessageFlux = {
    message_type?: MessageType
    alias?: string;
    message: string;
  } & ActionPathRequired;

  type BASE_METHOD = 'GET' | 'POST' | 'PUT' | 'DELETE';

  type RedirectStatus = 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308;

  type FlashRedirect = (
    cookies: Cookies,
    message: Message,
    status: RedirectStatus,
    location: string | URL
  ) => ReturnType<typeof redirect>;

  type FlashMessage = { path: string; } & Message;

  interface BaseToast extends BaseMessage {
    auto_dismiss_duration: number;
  }

  interface Toast extends BaseToast {
    id: string;
  }

  interface Inline {
    inline: Record<string, string | string[]>;
  }


  interface ValidationError {
    type: string;
    loc: ['body', 'data', ...string[]];
    msg: string;
    ctx?: Record<string, string>;
  }

  interface EmailTimeMessage extends Record<string, unknown> {
    time_left: number | null;
  }

  type ErrorResponseData = Message | ValidationError;

  interface OkResponse<T> extends Response {
    ok: true;
    json: () => Promise<T>;
  }

  interface BadResponse<U = ErrorResponseData> extends Response {
    ok: false;
    json: () => Promise<U>;
  }

  type PyResponse<T, U = ErrorResponseData> = OkResponse<T> | BadResponse<U>;
  type PyRequest<T> = Promise<PyResponse<T>>;
  type FormActionBasic = { [x: string]: unknown; };

  interface PageProps<T, U extends FormActionBasic | null = FormActionBasic> {
    /**
     * Data available to use in the page
     */
    data: T;
    form?: U;
  }

  interface HasChildren {
    children: Snippet
  }

  interface GenericObject<T = unknown> extends T {
    [key: string]: unknown;
  }
}

export {};
