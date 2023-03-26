<template>
    <i-popup v-bind="props">
        <template #trigger>
            <Trigger></Trigger>
        </template>
        <slot></slot>
    </i-popup>
</template>

<script setup lang="ts" name="i-dropdown">
import "./dropdown.scss";
import { withDefaults, useSlots, VNode, h } from "vue";
import { iPopup } from "..";

type TypePosition = "left" | "top" | "right" | "bottom";
type TypeTrigger = "hover" | "click" | "focus" | "manual";
type TypeProps = {
    trigger?: TypeTrigger;
    modelValue?: boolean;
    position?: TypePosition;
    touchable?: boolean;
    gap?: number;
    body?: boolean;
};

const slots = useSlots();

const props = withDefaults(defineProps<TypeProps>(), {
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
</script>
