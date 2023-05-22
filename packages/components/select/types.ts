import { BaseInput } from "../@types";

export interface Select extends BaseInput {
	options: any[];
	chip?: boolean;
	wrap?: boolean;
	maxDisplay?: number;
	body?: boolean;
}
