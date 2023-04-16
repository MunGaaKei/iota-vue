<template>
    <component :is="icon" class="i-icon" :style="iconStyle"></component>
</template>

<script lang="ts" setup name="i-icon">
import type { Component } from "vue";
import { VNode, computed, withDefaults } from "vue";
import "./icon.scss";

interface IProps {
    icon: VNode | Component;
    size?: string;
    align?: string;
}

const props = withDefaults(defineProps<IProps>(), {
    size: "1.5em",
    align: "middle",
});

const iconStyle = computed(() => {
    return {
        width: `${props.size}`,
        height: `${props.size}`,
        verticalAlign: `${props.align}`,
    };
});
</script>
