import { DirectiveBinding } from "vue";

const Handlers = new Map();

document.addEventListener("mousedown", (e: MouseEvent) => {
    const target = e.target;

    for (const [$el, listener] of Handlers.entries()) {
        if (!$el.contains(target)) {
            listener?.();
        }
    }
});

function handleMounted($el: HTMLElement, binding: DirectiveBinding) {
    Handlers.set($el, binding.value);
}

function handleUpdated($el: HTMLElement, binding: DirectiveBinding) {
    Handlers.set($el, binding.value);
}

function handleUnMounted($el: HTMLElement) {
    Handlers.delete($el);
}

export default {
    mounted: handleMounted,
    updated: handleUpdated,
    beforeUnmount: handleUnMounted,
};
