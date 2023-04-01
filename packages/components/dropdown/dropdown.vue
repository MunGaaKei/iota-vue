<template>
    <i-popup v-bind="props" ref="$popup">
        <template #trigger>
            <Trigger></Trigger>
        </template>
        <slot></slot>
    </i-popup>
</template>

<script setup lang="ts" name="i-dropdown">
import { VNode, defineExpose, h, ref, useSlots, withDefaults } from "vue";
import { iPopup } from "..";
import "./dropdown.scss";

type TypePosition = "left" | "top" | "right" | "bottom";
type TypeTrigger = "hover" | "click" | "focus";
type IProps = {
    trigger?: TypeTrigger;
    position?: TypePosition;
    touchable?: boolean;
    gap?: number;
    body?: boolean;
};

const slots = useSlots();
const $popup = ref();

const props = withDefaults(defineProps<IProps>(), {
    trigger: "click",
    position: "bottom",
    touchable: true,
});

const Trigger = (): VNode | undefined => {
    if (slots?.trigger) {
        const triggerSlots = slots.trigger();
        const element = triggerSlots.find((slot: VNode) => {
            return slot.type !== "symbol" && typeof slot.children !== "string";
        }) as VNode;
        return h(element);
    }

    return undefined;
};

defineExpose({
    toggle: (show?: boolean) => {
        $popup.value.toggle(show);
    },
});
</script>
