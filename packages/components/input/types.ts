import type { BaseInput, InputRule } from "../@types";

export interface Input extends BaseInput {
	type?: string;
	trigger?: string | string[];
	rule?: InputRule;
	max?: number;
	min?: number;
	step?: number;
}

export interface Textarea extends BaseInput {
	type?: string;
	trigger?: string | string[];
	resize?: boolean;
}
