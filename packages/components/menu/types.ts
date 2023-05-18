export interface MenuItem {
	type?: string;
	title: string;
	icon?: any;
	[key: string]: any;
}

export interface Menu {
	items: MenuItem[];
	depth?: number;
	selectable?: boolean;
	round?: boolean;
	ripple?: boolean;
}
