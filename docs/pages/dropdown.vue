<template>
    <h3 class="mb-12">使用</h3>
    <Demo>
        <i-dropdown :options="options">
            <template #trigger>
                <i-button>下拉框</i-button>
            </template>
        </i-dropdown>
    </Demo>

    <div style="height: 2000px"></div>
</template>

<script lang="ts" setup>
import Demo from "@d/components/Demo.vue";
import { iButton, iDropdown } from "@p/components";

const options = [
    {
        label: "选项 A",
        value: 1,
    },
    {
        label: "选项 B",
        value: 2,
    },
];
</script>
