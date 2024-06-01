import type {LayoutServerLoad} from "./$types";

export const load: LayoutServerLoad = async (event) => {
    return {
        current_user: event.locals.current_user,
        site_data: event.locals.site_data
    };
};

