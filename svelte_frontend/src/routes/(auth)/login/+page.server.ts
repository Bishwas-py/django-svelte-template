import {via_route_name} from "@friendofsvelte/django-kit/server/actions";

const allow_cookies = true;
export const actions = via_route_name('login', {allow_cookies})
