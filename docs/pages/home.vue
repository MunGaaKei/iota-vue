<template>
    <div class="flex flex-column align-center justify-center h-100vh">
        <h1>IOTA</h1>
        <h4 class="black-5 mt-12 mb-60">VUE3 UI</h4>
        <div class="flex">
            <i-button flat size="large" square>
                <i-icon :icon="Github"></i-icon>
            </i-button>
            <i-button to="/docs/button" flat size="large" square class="ml-8">
                <i-icon :icon="CodeRound"></i-icon>
            </i-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { iButton, iIcon } from "@p/components";
import { Github } from "@vicons/fa";
import { CodeRound } from "@vicons/material";
</script>
