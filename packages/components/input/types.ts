import type { BaseInput, InputRule } from "../@types";

export interface Input extends BaseInput {
	rule?: InputRule;
	max?: number;
	min?: number;
	step?: number;
}

export interface Textarea extends BaseInput {
	resize?: boolean;
}
