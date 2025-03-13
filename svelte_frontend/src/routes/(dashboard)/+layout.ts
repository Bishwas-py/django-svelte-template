import type { LayoutLoad } from './$types';
import FluentArrowImport16Regular from '$icons/FluentArrowImport16Regular.svelte';
import FluentCompassNorthwest16Filled from '$icons/FluentCompassNorthwest16Filled.svelte';
import FluentReadingListAdd16Filled from '$icons/FluentReadingListAdd16Filled.svelte';
import FluentSettings16Filled from '$icons/FluentSettings16Filled.svelte';
import type { LogoType, NavigationItem } from '$items/menu/menu-types';

const navigationItems: NavigationItem[] = [
	{
		label: 'Dashboard',
		href: '/',
		Icon: FluentCompassNorthwest16Filled,
		active: false
	},
	{
		label: 'Browse SOPs',
		href: '/todo',
		Icon: FluentReadingListAdd16Filled,
		active: false
	},
	{
		label: 'Manage',
		Icon: FluentArrowImport16Regular,
		active: false,
		children: [
			{
				label: 'Settings',
				href: '/settings',
				active: false,
				Icon: FluentSettings16Filled
			},
			{
				label: 'Policies Manage',
				href: '/policies',
				active: false,
				Icon: FluentReadingListAdd16Filled
			}
		]
	},
	{ type: 'horizontal-divider' },
	{
		label: 'Previous on 7 days',
		href: '/last-7-days',
		meta: '12 total'
	},
	{
		label: 'Next 30 days',
		href: '/last-30-days',
		meta: '12 total'
	}
];

const logo: LogoType = {
	title: 'GrowthSaaS'
};

export const load: LayoutLoad = () => {
	return {
		navigationItems,
		logo
	};
};
