import { InputRule, ValidState } from "@p/index/@types";

interface Config {
	rule?: InputRule;
	message?: string;
	state?: ValidState;
}

export default function useValidation(config: Config) {
	const { rule, message, state } = config;

	if (!rule || !state) return;

	const { invalid, status = "error" } = rule;

	return function validate(value: any) {
		const isInvalid = invalid(value);

		Object.assign(
			state,
			isInvalid
				? { status, message: isInvalid }
				: { status: "normal", message }
		);

		return !isInvalid;
	};
}
