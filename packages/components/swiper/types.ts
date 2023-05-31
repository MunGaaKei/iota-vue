import type { TypeStringOrVNode } from "../@types";

export interface Swiper {
	type?: "normal" | "fade" | "card";
	display?: number;
	scroll?: number;
	duration?: number;
	autoplay?: boolean;
	interval?: number;
	itemHeight?: number;
	loop?: boolean;
	indicator?: boolean;
	draggable?: boolean;
	dragOffset?: number;
	pauseOnHover?: boolean;
	vertical?: boolean;
	initial?: number;
	gap?: number;
	prev?: boolean | TypeStringOrVNode;
	next?: boolean | TypeStringOrVNode;
}

export type SwipeOption = {
	direction?: boolean;
	force?: boolean;
};
