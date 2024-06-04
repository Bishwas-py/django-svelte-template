import {redirect} from '@sveltejs/kit'
import type {Actions, PageServerLoad} from './$types'

export const load: PageServerLoad = async () => {
    redirect(302, '/');
}

export const actions: Actions = {
    default({cookies}) {
        cookies.delete('sessionid', {
            path: '/'
        })
        cookies.delete('csrftoken', {
            path: '/'
        })
        redirect(302, '/login');
    },
}
