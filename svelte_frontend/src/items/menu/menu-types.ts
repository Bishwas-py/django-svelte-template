export type MenuBar = {
	collapsed: boolean;
};

import type { Component } from 'svelte';

interface BaseNavigationItem {
	label: string;
}

interface WithIcon {
	Icon?: Component;
}

interface Activatable {
	active?: boolean;
}

interface LinkItem extends BaseNavigationItem, WithIcon, Activatable {
	href: string;
	meta?: string;
}

interface ParentItem extends BaseNavigationItem, WithIcon, Activatable {
	children: LinkItem[];
}

interface DividerItem {
	type: 'horizontal-divider';
}

export type NavigationItem = LinkItem | ParentItem | DividerItem;

export type LogoType = {
	src?: string;
	title: string;
};
