<template>
  <div :id="name" class="prop-guidence mb-20">
    <div class="flex" style="align-items: end">
      <b class="prop-name blue">{{ name }}</b>
      <span class="prop-type dim mx-40">{{ type }}</span>
      <code class="px-8">{{ defaultValue }}</code>
    </div>
    <div class="prop-desc mt-4"><slot></slot></div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from "vue";

const props = withDefaults(
  defineProps<{
    name?: string;
    type?: string;
    defaultValue?: string;
  }>(),
  {}
);
</script>

<style lang="scss" scoped>
.prop-guidence {
  &:hover {
    .prop-desc {
      opacity: 1;
    }
  }
}
.prop-desc {
  opacity: 0.6;
  transition: var(--transition);
}
</style>
