import { VNode, h } from "vue";

export function debounce<T extends Function>(fn: T, timeout: number = 160) {
    let t: ReturnType<typeof setTimeout>;
    return (...args: any) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), timeout);
    };
}

export function throttle<T extends Function>(fn: T, timeout: number = 160) {
    let t: ReturnType<typeof setTimeout> | null;
    return (...args: any) => {
        if (!t) {
            t = setTimeout(() => {
                fn(...args);
                t && clearTimeout(t);
                t = null;
            }, timeout);
        }
    };
}

export function isMobile(): boolean {
    return "ontouchend" in document;
}

export function uuid(digit: number = 8): string {
    let dt = new Date().getTime();
    return "x".repeat(digit).replace(/[xy]/g, function () {
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return r.toString(16);
    });
}

export function renderStringOrVNode(node: string | VNode, props: Object = {}) {
    if (typeof node === "string") {
        return h("span", Object, node);
    } else {
        return h(node, props);
    }
}
