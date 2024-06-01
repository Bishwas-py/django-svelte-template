import {flash_redirect} from '@friendofsvelte/django-kit';


export const load = async ({locals, cookies}) => {
    if (!locals.current_user) {
        flash_redirect(cookies, {
            alias: 'error',
            message: 'You need to be logged in to access the dashboard.',
            message_type: 'error'
        }, 302, '/login')
    }
}