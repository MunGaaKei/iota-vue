export default `<template></template>

<script setup lang="ts" name="i-{{lowername}}">
import './{{lowername}}.scss'
import { withDefaults } from "vue";

export type IProps = {
  type?: string
}

const props = withDefaults(
  defineProps<IProps>(),
  {}
);

</script>`;
