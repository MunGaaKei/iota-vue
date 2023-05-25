type TypeOptions = {
	to?: string;
	type?: string;
};

export default function useLinkTag({ to, type }: TypeOptions) {
	if (to) {
		return "router-link";
	} else if (type) {
		return "button";
	} else {
		return "a";
	}
}
