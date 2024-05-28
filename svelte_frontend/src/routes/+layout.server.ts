import type {LayoutServerLoad} from "./$types";
import {assign_cookies} from "@friendofsvelte/django-kit/utils";
import type {SiteData} from "$lib/interfaces/siteData";

const DEFAULT_SITE_DATA: SiteData = {
    title: 'Djapy Based Todo',
    description: 'Todo app based on Djapy, SvelteKit, and Django.',
    keywords: 'todo, sveltekit, djapy, django',
    subtitle: 'Simple todo app based on Djapy, SvelteKit, and Django.',
    ads_on: true,
    thumbnail: '/og/banner.png',
    site: {
        name: 'Todo',
        domain: 'todo.com'
    },
    email: 'info@todohunk.com'
};


export const load: LayoutServerLoad = async (event) => {
    let site_data: SiteData;
    try {
        const response = await event.fetch(`$api/home/site-data/`);
        assign_cookies(event, response);
        site_data = await response.json();
    } catch (e) {
        console.log(e);
        site_data = DEFAULT_SITE_DATA;
    }
    return {
        user: event.locals.user,
        site_data
    };
};

