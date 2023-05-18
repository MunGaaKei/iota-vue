export interface Button {
	tag?: "button" | "a";
	to?: string;
	href?: string;
	outline?: boolean;
	flat?: boolean;
	loading?: boolean;
	buttonType?: "submit" | "reset" | "button";
	ripple?: boolean;
	disabled?: boolean;
	size?: "small" | "large" | "normal" | "extreme";
	block?: boolean;
	round?: boolean;
	square?: boolean;
	plain?: boolean;
}
