<template>
  <Tag
    :tag="tag"
    :type="buttonType"
    :to="to"
    :href="href"
    class="i-btn"
    :class="btnClass"
    :disabled="disabled"
    i-ripple="ripple"
  >
    <span v-if="loading" class="i-loading-icon"></span>
    <span class="i-btn-content">
      <slot></slot>
    </span>
  </Tag>
</template>

<script lang="ts" setup name="i-button">
import { iRipple } from "@p/directives";
import { withDefaults, computed } from "vue";
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
    size?: "small" | "large" | "normal" | "thin";
    block?: boolean;
    round?: boolean;
  }>(),
  {
    tag: "button",
    buttonType: "button",
    ripple: true,
    size: "normal",
  }
);

const btnClass = computed(() => {
  return {
    "i-btn-flat": props.flat,
    "i-btn-block": props.block,
    "i-btn-loading": props.loading,
    "i-btn-outline": props.outline,
    rounded: props.round,
    [`i-btn-${props.size}`]: props.size !== "normal",
    disabled: props.disabled,
  };
});
</script>

<style lang="scss" src="./button.scss"></style>
