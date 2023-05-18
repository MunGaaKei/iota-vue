import { Option } from "../@types";
import type { Popup } from "../popup";

export interface Dropdown extends Popup {
	modelValue?: any;
	options?: Option[];
}
