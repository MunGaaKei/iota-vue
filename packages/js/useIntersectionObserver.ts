export default function useIntersectionObserver(
	configs?: IntersectionObserverInit
) {
	const WM = new WeakMap();
	const IO = new IntersectionObserver((entries) => {
		entries.map((entry) => {
			const callback = WM.get(entry.target);

			callback?.call(entry.target, entry.isIntersecting);
		});
	}, configs);

	function observe(target: HTMLElement, callback: Function) {
		if (WM.get(target)) return;

		WM.set(target, callback);
		IO.observe(target);
	}

	function unobserve(target: HTMLElement) {
		WM.delete(target);
		IO.unobserve(target);
	}

	function disconnect() {
		IO.disconnect();
	}

	return {
		observe,
		unobserve,
		disconnect,
	};
}
