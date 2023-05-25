import { BaseInput } from "../@types";
import { Popup } from "../popup/types";

export interface Select extends BaseInput, Popup {
	options: any[];
	chip?: boolean;
	wrap?: boolean;
	maxDisplay?: number;
	body?: boolean;
}
