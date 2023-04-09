type TypeOptions = {
    tag: string;
    to?: string;
    href?: string;
};

export default function useLinkTag({ tag, to, href }: TypeOptions) {
    if (to) {
        return "router-link";
    } else if (tag === "a" || href) {
        return "a";
    } else {
        return "button";
    }
}
