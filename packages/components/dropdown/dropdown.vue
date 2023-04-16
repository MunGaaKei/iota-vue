<template>
    <i-popup v-bind="restProps" ref="$popup">
        <template #trigger>
            <component :is="triggerComponent"></component>
        </template>
        <i-list v-if="options" class="bg-blur" type="option">
            <i-list-item
                v-for="option in options"
                :key="option.value"
                :active="modelValue === option.value"
                @click="handleSelect(option)"
            >
                <template v-if="typeof option.label === 'string'">
                    {{ option.label }}
                </template>
                <component v-else :is="option.label"></component>
            </i-list-item>
        </i-list>
        <slot v-else></slot>
    </i-popup>
</template>

<script setup lang="ts" name="i-dropdown">
import {
    VNode,
    defineEmits,
    defineExpose,
    h,
    ref,
    useSlots,
    withDefaults,
} from "vue";
import { iList, iListItem, iPopup } from "..";
import { InputOption } from "../common";
import "./dropdown.scss";

type TypePosition = "left" | "top" | "right" | "bottom";
type TypeTrigger = "hover" | "click" | "focus";
interface IProps {
    modelValue?: any;
    trigger?: TypeTrigger;
    position?: TypePosition;
    touchable?: boolean;
    gap?: number;
    body?: boolean;
    options?: InputOption[];
}

const slots = useSlots();
const $popup = ref();

const props = withDefaults(defineProps<IProps>(), {
    trigger: "click",
    position: "bottom",
    touchable: true,
});
const { modelValue: _mv, options: _opts, ...restProps } = props;
const emits = defineEmits<{
    (e: "update:modelValue", v: string | number): void;
    (e: "select", v: InputOption): void;
}>();

const triggerComponent = (): VNode | undefined => {
    if (slots?.trigger) {
        const triggerSlots = slots.trigger();
        const element = triggerSlots.find((slot: VNode) => {
            return slot.type !== "symbol" && typeof slot.children !== "string";
        }) as VNode;
        return h(element);
    }

    return undefined;
};

const handleSelect = (option: InputOption) => {
    emits("select", option);
    emits("update:modelValue", option.value);
    $popup.value.toggle(false);
};

defineExpose({
    toggle: (show?: boolean) => {
        $popup.value.toggle(show);
    },
});
</script>
