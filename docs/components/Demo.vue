<template>
    <div class="demo-content">
        <div class="demo-widget flex justify-center">
            <slot></slot>
        </div>
        <i-tab class="demo" click-toggle>
            <i-tab-item v-if="slots.config">
                <template #title>
                    <i-icon :icon="AutoAwesomeMosaicTwotone"></i-icon>
                </template>
                <slot name="config"></slot>
            </i-tab-item>
            <i-tab-item>
                <template #title>
                    <i-icon :icon="CodeRound"></i-icon>
                </template>
                <Codes type="html" :code="code"></Codes>
            </i-tab-item>
            <i-tab-item class="ml-auto" @click="handleCopy" prevent-click>
                <template #title>
                    <i-icon :icon="CopyAllTwotone"></i-icon>
                </template>
            </i-tab-item>
        </i-tab>
    </div>
</template>

<script setup lang="ts">
import Codes from "./Codes.vue";
import { vTab, vTabItem, vIcon } from "@p/components";
import { withDefaults, useSlots } from "vue";
import {
    AutoAwesomeMosaicTwotone,
    CodeRound,
    CopyAllTwotone,
} from "@vicons/material";

const slots = useSlots();

const props = withDefaults(
    defineProps<{
        code?: string;
    }>(),
    {
        code: "",
    }
);

const handleCopy = async () => {
    try {
        navigator.clipboard.writeText(props.code);
    } catch (err) {
        console.log(err);
    }
};
</script>

<style scoped lang="scss">
.demo-content {
    border-radius: var(--radius);
}
.demo-widget {
    min-height: 120px;
}
</style>
