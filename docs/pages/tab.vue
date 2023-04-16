<template>
    <h3 class="mb-12">使用</h3>

    <i-tab active="t">
        <i-tab-item key="t">
            <template #title>title</template>
            <div class="pd-12">content</div>
        </i-tab-item>
    </i-tab>
</template>

<script setup lang="ts">
import { iTab, iTabItem } from "@p/components";
</script>
