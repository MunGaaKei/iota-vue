<template>
    <ul class="i-list" :class="ulClass" :style="ulStyle">
        <slot></slot>
    </ul>
</template>

<script lang="ts" setup name="i-list">
import { computed, withDefaults } from "vue";
import "./list.scss";

type IProps = {
    labelWidth?: string;
    type?: "option" | "number" | "circle";
    prefix?: string;
};

const props = withDefaults(defineProps<IProps>(), {});

const ulStyle = computed(() => {
    return {
        "--label-width": props.labelWidth,
    };
});

const ulClass = computed(() => {
    return {
        [`i-list-${props.type}`]: props.type,
    };
});
</script>
