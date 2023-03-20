<template>
    <h3 class="mb-12">使用</h3>

    <Demo>
        <i-popup>
            <template #trigger>
                <!-- 12 -->
                <i-button>
                    HOVER <span>1</span>
                </i-button>
            </template>
            <div class="pd-12 bg-blue">hover 1</div>
        </i-popup>
    </Demo>

    <!-- <i-button @click="setActive(!active)">toggle</i-button> -->

    <div style="height: 1000px"></div>
</template>

<script lang="ts" setup>
import { useState } from '@p/js/useState';
import { iButton, iPopup } from "@p/components";
import Demo from "@d/components/Demo.vue";

const [active, setActive] = useState<boolean>(false)

</script>
