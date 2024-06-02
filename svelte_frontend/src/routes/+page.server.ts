import {flash_redirect} from '@friendofsvelte/django-kit';
import type {OffsetPaginated} from "$lib/interfaces";
import type {Todo} from "$lib/interfaces/todos";
import type {PageServerLoad, PageServerLoadEvent} from './$types';
import {get_paginator} from "$lib";
import {via_route_name} from "@friendofsvelte/django-kit/server/actions";

const allow_cookies = true;
export const actions = via_route_name('create_todo', {allow_cookies})

const get_todos = async (event: PageServerLoadEvent) => {
    const paginator = get_paginator(event.url);
    const query = `limit=${paginator.limit}&offset=${paginator.offset}&search=${paginator.search}&order_by=${paginator.order_by}`;
    const response = await event.fetch(`$api/todos/?${query}`);
    return await response.json() as OffsetPaginated<Todo>;
}

export const load: PageServerLoad = async (event) => {
    if (!event.locals.current_user) {
        flash_redirect(event.cookies, {
            alias: 'error',
            message: 'You need to be logged in to access the dashboard.',
            message_type: 'error'
        }, 302, '/login')
    }
    return {
        todos: await get_todos(event)
    }
}