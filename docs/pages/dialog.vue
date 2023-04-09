<template>
    <i-button @click="toggleDialog(!dialog)">打开/关闭</i-button>

    {{ dialog }}

    <i-dialog v-model="dialog">
        <div class="pd-20">CONTENT</div>
    </i-dialog>
</template>

<script setup lang="ts">
import { iButton, iDialog } from "@p/components";
import { useState } from "@p/js/useState";

const [dialog, toggleDialog] = useState<boolean>(false);
</script>
