<template>
    <h3 class="mb-12">使用</h3>
    <i-radio
        label="谁看了大家"
        v-model="value"
        :options="[
            { label: '1', value: 1 },
            { label: '2', value: 2 },
        ]"
        >选项</i-radio
    >
</template>

<script setup lang="ts">
import { iRadio } from "@p/components";
import { ref } from "vue";

const value = ref(1);
</script>
