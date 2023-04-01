<template>
    <h3 class="mb-12">使用</h3>
    <Demo>
        <i-dropdown>
            <template #trigger>
                <i-button>下拉框</i-button>
            </template>
            <div class="pd-12 bg-blue">下拉内容</div>
        </i-dropdown>
    </Demo>

    <!-- <a ref="target" v-clickoutside="bar">123</a> -->

    <div style="height: 2000px"></div>
</template>

<script lang="ts" setup>
import Demo from "@d/components/Demo.vue";
import { iDropdown, iButton } from "@p/components";
import { onMounted, ref } from "vue";

const target = ref<HTMLElement | null>(null);

onMounted(() => {
    console.log(target.value);
});
</script>
