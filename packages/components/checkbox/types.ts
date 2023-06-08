import { InputOption } from "../@types";

export type CheckboxType = "default" | "switch" | "button";

export interface Checkbox extends InputOption {
	type?: CheckboxType;
	round?: boolean;
}

export interface CheckboxItem {
	type?: CheckboxType;
	modelValue?: boolean;
	checked?: boolean;
	name?: string;
	round?: boolean;
	disabled?: boolean;
}
