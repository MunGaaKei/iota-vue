<template>
    <h3 class="mb-12">使用</h3>

    <Demo>
        <i-popup>
            <template #trigger>
                <i-button> HOVER ME</i-button>
            </template>
            <div class="pd-12 bg-blue">👋👋</div>
        </i-popup>
    </Demo>

    <!-- <i-button @click="setActive(!active)">toggle</i-button> -->

    <div style="height: 1000px"></div>
</template>

<script lang="ts" setup>
import Demo from "@d/components/Demo.vue";
import { iButton, iPopup } from "@p/components";
</script>
