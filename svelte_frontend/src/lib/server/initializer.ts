import { redirect, type RequestEvent } from '@sveltejs/kit';
import type { User } from '$lib/interfaces/auth';
import { req } from '$lib/server/request';
import { resp } from '$lib/server/response';
import type { SiteData } from '$lib/interfaces/site-data';

export type InitData = {
	current_user?: User;
	site_data?: SiteData;
	// subscriptions?: CreditsResponse
};
type CheckoutSession = { redirect: string; id: string };
const CHECKOUT_API = '/api/striped/subs/create-checkout-session/';

export async function getInitialData(event: RequestEvent): Promise<InitData> {
	const response = await event.fetch(`/api/home/init-data/`);
	return await response.json();
}

export async function handlePayoutData(event: RequestEvent) {
	const product_id = event.cookies.get('product_id');
	if (product_id && product_id.startsWith('pro') && event.cookies.get('sessionid')) {
		event.cookies.delete('product_id', {
			path: '/'
		});
		const request: PyRequest<CheckoutSession> = event.fetch(CHECKOUT_API, {
			method: 'POST',
			body: new URLSearchParams({ product_id }),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});
		const response = await req(request);
		const data = await resp(response, {}, true);
		if (data && 'id' in data) {
			redirect(303, data.redirect);
		}
	}
}
