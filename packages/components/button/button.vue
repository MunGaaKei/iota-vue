<template>
    <Tag
        :tag="tag"
        :type="buttonType"
        :to="to"
        :href="href"
        class="i-btn"
        :class="btnClass"
        ref="$btn"
        v-ripple="ripple"
    >
        <span v-if="loading" class="i-loading-icon"></span>
        <span class="i-btn-content">
            <slot></slot>
        </span>
    </Tag>
</template>

<script lang="ts" setup name="i-button">
import { vRipple } from "@p/directives";
import { computed, ref, withDefaults } from "vue";
import "./button.scss";
import Tag from "./tag-name.vue";

const props = withDefaults(
    defineProps<{
        tag?: "button" | "a";
        to?: string;
        href?: string;
        outline?: boolean;
        flat?: boolean;
        loading?: boolean;
        buttonType?: "submit" | "reset" | "button";
        ripple?: boolean;
        disabled?: boolean;
        size?: "small" | "large" | "normal" | "extreme";
        block?: boolean;
        round?: boolean;
        square?: boolean;
    }>(),
    {
        tag: "a",
        ripple: true,
        size: "normal",
    }
);
const $btn = ref();

const btnClass = computed(() => {
    return {
        "i-btn-flat": props.flat,
        "i-btn-block": props.block,
        "i-btn-loading": props.loading,
        "i-btn-outline": props.outline,
        "i-btn-square": props.square,
        rounded: props.round,
        [`i-btn-${props.size}`]: props.size !== "normal",
        disabled: props.disabled,
    };
});
</script>
