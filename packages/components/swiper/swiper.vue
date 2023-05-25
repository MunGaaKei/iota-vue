<template></template>

<script setup lang="ts">
import './swiper.scss'
import type { Swiper } from './types';
import { withDefaults } from "vue";

defineOptions({
  name: 'i-swiper'
});

const props = withDefaults(
  defineProps<Swiper>(),
  {}
);

</script>