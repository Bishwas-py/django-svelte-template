import {via_route_name} from "@friendofsvelte/django-kit";

const allow_cookies = true;
export const actions = via_route_name(['register'], {allow_cookies})
