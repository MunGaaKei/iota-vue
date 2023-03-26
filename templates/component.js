export default `<template></template>

<script setup lang="ts" name="i-{{lowername}}">
import './{{lowername}}.scss'
import { withDefaults } from "vue";

const props = withDefaults(
  defineProps<{
    type?: string
  }>(),
  {}
);

</script>`;
