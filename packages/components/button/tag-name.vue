<template>
  <router-link v-if="to" :to="to">
    <slot></slot>
  </router-link>
  <a v-else-if="tag === 'a' || href" :href="href">
    <slot></slot>
  </a>
  <button v-else>
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { withDefaults } from "vue";

withDefaults(
  defineProps<{
    to?: string;
    tag?: "button" | "a";
    href?: string;
  }>(),
  {
    tag: "a",
  }
);
</script>
