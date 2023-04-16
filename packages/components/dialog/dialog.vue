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
                <div v-if="header" class="i-dialog-header">
                    <slot name="title"></slot>
                    <a class="i-dialog-close ml-auto" @click="handleHide">
                        <CloseRound style="height: 1.5em; width: 1.5em" />
                    </a>
                </div>

                <div class="i-dialog-content">
                    <slot></slot>
                </div>

                <div v-if="footer" class="i-dialog-footer">
                    <slot name="footer"></slot>
                    <i-button plain class="ml-auto mr-12" @click="handleCancel">
                        {{ cancel }}
                    </i-button>
                    <i-button @click="handleOk">{{ confirm }}</i-button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts" name="i-dialog">
import { iButton } from "@p/components";
import { useState } from "@p/js/useState";
import { CloseRound } from "@vicons/material";
import { computed } from "@vue/reactivity";
import { VNode, defineEmits, watchEffect, withDefaults } from "vue";

import "./dialog.scss";

interface IProps {
    modelValue?: boolean;
    closable?: boolean;
    backdropClosable?: boolean;
    title?: string | VNode;
    width?: string;
    height?: string;
    customized?: boolean;
    header?: boolean;
    footer?: boolean;
    closeBtn?: boolean;
    cancel?: string;
    confirm?: string;
}

const props = withDefaults(defineProps<IProps>(), {
    closable: true,
    backdropClosable: true,
    header: true,
    footer: true,
    closeBtn: true,
    confirm: "确定",
    cancel: "取消",
});
const [active, setActive] = useState<boolean>(props.modelValue);
const [bounced, setBounced] = useState<boolean>(false);
let togglable = true;

const emits = defineEmits<{
    (e: "update:modelValue", v: boolean): void;
    (e: "confirm"): void;
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

function handleCancel() {
    emits("cancel");
    handleHide();
}

function handleOk() {
    emits("confirm");
    handleHide();
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
