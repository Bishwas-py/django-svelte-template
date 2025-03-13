import type { LayoutServerLoad, LayoutServerLoadEvent } from './$types';

export const load: LayoutServerLoad = async (event: LayoutServerLoadEvent) => {
	return {
		current_user: event.locals.init.current_user,
		site_data: event.locals.init.site_data
	};
};
