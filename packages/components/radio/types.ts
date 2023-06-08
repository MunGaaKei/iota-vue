import type { InputOption } from "../@types";

export type RadioType = "default" | "button";

export interface Radio extends InputOption {
	type?: RadioType;
	round?: boolean;
}
