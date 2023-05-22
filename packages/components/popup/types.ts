import { Position } from "../@types";

export type Trigger = "hover" | "click" | "focus";

export interface Popup {
	trigger?: Trigger;
	position?: Position;
	gap?: number;
	touchable?: boolean;
	body?: boolean;
	delay?: number;
	disabled?: boolean;
	adjustWidth?: boolean;
}
