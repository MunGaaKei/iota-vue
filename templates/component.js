export default `<template></template>

<script setup lang="ts">
import './{{lowername}}.scss'
import type { {{name}} } from './types';

defineOptions({
  name: 'i-{{lowername}}'
});

const props = withDefaults(
  defineProps<{{name}}>(),
  {}
);

</script>`;
