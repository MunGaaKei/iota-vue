import { BaseInput } from "../@types";
import { Popup } from "../popup/types";

export interface Select extends Omit<BaseInput, "trigger">, Popup {
	options: any[];
	chip?: boolean;
	wrap?: boolean;
	maxDisplay?: number;
}
