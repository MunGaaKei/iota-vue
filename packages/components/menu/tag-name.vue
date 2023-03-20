<template>
    <router-link v-if="to" :to="to">
        <slot></slot>
    </router-link>
    <a v-else :href="href">
        <slot></slot>
    </a>
</template>

<script lang="ts" setup>
import { withDefaults } from "vue";

withDefaults(
    defineProps<{
        href?: string;
        to?: string;
    }>(),
    {}
);
</script>
