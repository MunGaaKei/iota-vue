export default `<template></template>

<script setup lang="ts">
import './{{lowername}}.scss'
import type { {{name}} } from './types';
import { withDefaults } from "vue";

defineOptions({
  name: 'i-{{lowername}}'
});

const props = withDefaults(
  defineProps<{{name}}>(),
  {}
);

</script>`;
