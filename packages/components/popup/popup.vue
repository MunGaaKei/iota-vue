<template>
    <Trigger ref="$trigger"></Trigger>

    <Teleport v-if="body" to="body">
        <div
            ref="$popup"
            v-if="mounted"
            class="i-popup"
            :style="popupStyle"
            v-clickoutside="handleClickoutside"
        >
            <slot></slot>
        </div>
    </Teleport>

    <div
        v-if="!body && mounted"
        ref="$popup"
        class="i-popup"
        :style="popupStyle"
        v-clickoutside="handleClickoutside"
    >
        <slot></slot>
    </div>
</template>

<script setup lang="ts" name="i-popup">
import { vClickoutside } from "@p/directives";
import { TypePosition, usePosition } from "@p/js/usePosition";
import useResize from "@p/js/useResize";
import { useState } from "@p/js/useState";
import {
    StyleValue,
    VNode,
    computed,
    defineExpose,
    h,
    nextTick,
    onBeforeUnmount,
    ref,
    useSlots,
    withDefaults,
    withModifiers,
} from "vue";
import "./popup.scss";

type TypeTrigger = "hover" | "click" | "focus";
type IProps = {
    trigger?: TypeTrigger;
    position?: TypePosition;
    gap?: number;
    touchable?: boolean;
    body?: boolean;
    delay?: number;
};
type TypeTriggerEvents = Record<string, Function | Object>;

const props = withDefaults(defineProps<IProps>(), {
    trigger: "hover",
    gap: 4,
});

const [mounted, setMounted] = useState<boolean>(false);
const [show, setShow] = useState<boolean>(false);
const offsets = ref<string>("");
const $trigger = ref<HTMLElement>();
const $popup = ref<HTMLElement>();
const slots = useSlots();

const Trigger = (): VNode | undefined => {
    if (slots?.trigger) {
        const triggerSlots = slots.trigger();
        const events: TypeTriggerEvents = {};

        if (props.trigger === "click") {
            events["onClick"] = () => toggle();
        } else {
            const [eventShow, eventHide] = getNativeEventType(props.trigger);
            events[eventShow] = withModifiers(() => toggle(true), ["self"]);
            events[eventHide] = withModifiers(() => toggle(false), ["self"]);
        }

        const element = triggerSlots.find((slot: VNode) => {
            return slot.type !== "symbol" && typeof slot.children !== "string";
        }) as VNode;

        return h(element, {
            ...events,
        });
    } else {
        return undefined;
    }
};

const popupStyle = computed((): StyleValue => {
    return {
        pointerEvents: props.touchable ? "unset" : "none",
        opacity: show.value ? 1 : 0,
        transform: offsets.value,
    };
});

useResize(computePopupPos);
onBeforeUnmount(() => {
    useResize(computePopupPos, "unbind");
});

let toggling = false;
let timer: ReturnType<typeof setTimeout> | null = null;

function toggle(show?: boolean) {
    if (timer && show === false) {
        clearTimeout(timer);
        toggling = false;
        handleHide();
        return;
    }

    if (toggling) return;

    toggling = true;

    if (show !== undefined) {
        show ? handleShow() : handleHide();
    } else {
        mounted.value ? handleHide() : handleShow();
    }
}

function handleShow() {
    setMounted(true);
    nextTick(() => {
        computePopupPos();
        setShow(true);
    });
    timer = setTimeout(() => {
        toggling = false;
        timer && clearTimeout(timer);
    }, 160);
}

function handleHide() {
    setShow(false);
    timer = setTimeout(() => {
        setMounted(false);
        toggling = false;
        timer && clearTimeout(timer);
    }, 160);
}

function handleClickoutside() {
    if (props.trigger === "click") {
        toggle(false);
    }
}

function computePopupPos(): void {
    if (!$trigger.value || !$popup.value) return;

    const rectTrigger: DOMRect = $trigger.value.getBoundingClientRect();
    const rectPopup: DOMRect = $popup.value.getBoundingClientRect();

    const position =
        props.position ??
        (rectTrigger.top - rectPopup.height - props.gap * 2 >= 0
            ? "top"
            : "bottom");

    const [posLeft, posTop] = usePosition($trigger.value, $popup.value, {
        position,
        refBody: props.body,
        gap: props.gap,
    });

    offsets.value = `translate3d(${posLeft}px, ${posTop}px, 0)`;
}

function getNativeEventType<TypeTrigger extends string>(
    event: TypeTrigger
): string[] {
    switch (event) {
        case "hover":
            return ["onMouseenter", "onMouseleave"];
        case "focus":
            return ["onFocus", "onBlur"];
        default:
            return [`on${event}`, `on${event}`];
    }
}

defineExpose({
    toggle,
});
</script>
