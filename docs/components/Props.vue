<template>
    <div class="props-guidence">
        <div class="props-item" v-for="item in props" :key="item.name">
            {{ item.name }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { withDefaults } from "vue";

export type IProps = {
    name?: string;
    type?: string;
    defaultValue?: string;
};

withDefaults(
    defineProps<{
        props: IProps[];
    }>(),
    {}
);
</script>

<style lang="scss" scoped></style>
