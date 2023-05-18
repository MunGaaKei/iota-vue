import { debounce } from "lodash";

const handlers = new Set<Function>();

window.addEventListener(
	"resize",
	debounce(() => {
		for (const fn of handlers.values()) {
			fn?.();
		}
	}, 120)
);

const useResize = (callback: Function, action?: "bind" | "unbind") => {
	if (action === "unbind") {
		handlers.delete(callback);
	} else {
		handlers.add(callback);
	}
};

export default useResize;
