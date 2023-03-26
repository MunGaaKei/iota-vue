<template>
  <component :is="icon" class="i-icon" :style="iconStyle"></component>
</template>

<script lang="ts" setup name="i-icon">
import { withDefaults, computed, VNode } from "vue";
import type { Component } from "vue";
import "./icon.scss";

const props = withDefaults(
  defineProps<{
    icon: VNode | Component;
    size?: string;
    align?: string;
  }>(),
  {
    size: "1.5em",
    align: "middle",
  }
);

const iconStyle = computed(() => {
  return {
    width: `${props.size}`,
    height: `${props.size}`,
    verticalAlign: `${props.align}`,
  };
});
</script>
