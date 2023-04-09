<template>
    <div style="width: 500px">
        <i-input
            label="姓名"
            message="message error"
            v-model="text"
            @input="handleInput"
            allow-clear
        >
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
import { ref } from "vue";

const text = ref("");

const handleInput = (e: Event) => {
    console.log(e);
};
</script>
