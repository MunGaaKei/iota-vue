<template>
    <div class="i-pages">
        <a class="i-page i-page-prev" :class="{}">
            <KeyboardArrowLeftRound></KeyboardArrowLeftRound>
        </a>

        <a class="i-page">1</a>

        <a class="i-page i-page-next">
            <KeyboardArrowRightRound></KeyboardArrowRightRound>
        </a>
    </div>
</template>

<script setup lang="ts" name="i-page">
import {
    KeyboardArrowLeftRound,
    KeyboardArrowRightRound,
} from "@vicons/material";
import { VNode, withDefaults } from "vue";
import "./page.scss";

export type IProps = {
    total?: number;
    modelValue?: number;
    prev?: string | VNode;
    next?: string | VNode;
    url?: string;
};

const props = withDefaults(defineProps<IProps>(), {
    total: 0,
    page: 0,
});

const emits = defineEmits<{
    (e: "update:modelValue", page: number): void;
}>();
</script>
