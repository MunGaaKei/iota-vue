import { InputOption } from "../@types";

type CheckboxType = "default" | "switch" | "button";

export interface Checkbox extends InputOption {
	type?: CheckboxType;
}

export interface CheckboxItem {
	type?: CheckboxType;
	modelValue?: boolean;
	checked?: boolean;
	name?: string;
	round?: boolean;
	disabled?: boolean;
}
