<template>
    <Teleport to="body">
        <div
            class="i-container i-backdrop"
            :class="{
                flex: modelValue,
                active,
            }"
            @click.self="handleBackDropClick"
        >
            <div
                class="i-dialog"
                :class="{
                    bounced,
                }"
                :style="dialogStyle"
            >
                <slot></slot>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts" name="i-dialog">
import { useState } from "@p/js/useState";
import { computed } from "@vue/reactivity";
import { defineEmits, watchEffect, withDefaults } from "vue";
import "./dialog.scss";

export type IProps = {
    modelValue?: boolean;
    closable?: boolean;
    backdropClosable?: boolean;
    title?: string;
    footer?: boolean;
    width?: string;
    height?: string;
};

const props = withDefaults(defineProps<IProps>(), {
    closable: true,
    backdropClosable: true,
});
const [active, setActive] = useState<boolean>(props.modelValue);
const [bounced, setBounced] = useState<boolean>(false);
let togglable = true;

const emits = defineEmits<{
    (e: "update:modelValue", v: boolean): void;
    (e: "ok"): void;
    (e: "cancel"): void;
    (e: "toggle", v: boolean): void;
}>();

watchEffect(() => {
    props.modelValue ? handleShow() : handleHide();
});

const dialogStyle = computed(() => {
    return {
        width: props.width,
        height: props.height,
    };
});

function handleBackDropClick() {
    props.backdropClosable && handleHide();
}

function handleHide() {
    if (!props.closable || !togglable) {
        notAllowToClose();
        return;
    }

    togglable = false;
    setActive(false);
    emits("toggle", false);

    const timer = setTimeout(() => {
        togglable = true;
        emits("update:modelValue", false);
        timer && clearTimeout(timer);
    }, 120);
}

function handleShow() {
    if (!togglable) return;

    togglable = false;
    emits("toggle", true);
    const timer = setTimeout(() => {
        togglable = true;
        setActive(true);
        emits("update:modelValue", true);
        timer && clearTimeout(timer);
    }, 0);
}

function notAllowToClose() {
    setBounced(true);
    setTimeout(() => {
        setBounced(false);
    }, 400);
}
</script>
