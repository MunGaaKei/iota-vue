<template>
    <div style="width: 500px">
        <i-input label="XIAOXI" message="message error">
            <template #prefix>
                <i-icon
                    :icon="PersonalInjuryTwotone"
                    class="mx-8 my-auto green"
                ></i-icon>
            </template>
        </i-input>
    </div>
</template>

<script setup lang="ts">
import { iIcon, iInput } from "@p/components";
import { PersonalInjuryTwotone } from "@vicons/material";
</script>
