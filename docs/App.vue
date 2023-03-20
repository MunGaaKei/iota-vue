<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import DocumentLayout from "./layouts/document.vue";
import EmptyLayout from "./layouts/empty.vue";
import "@d/assets/common.scss";

const Route = useRoute();

const CurrentComponent = computed(() => {
    switch (Route.meta.layout) {
        case "docs":
            return DocumentLayout;
        default:
            return EmptyLayout;
    }
});
</script>

<template>
    <component :is="CurrentComponent">
        <router-view></router-view>
    </component>
</template>
