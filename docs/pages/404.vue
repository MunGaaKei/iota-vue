<template>
	<div class="i-container flex flex-column justify-center">
		<h1 class="mb-80 mx-auto" style="font-size: 4em">404</h1>
		<i-button @click="$router.go(-1)" class="bg-pink">BACK BACK</i-button>
	</div>
</template>

<script setup lang="ts">
import useGlobalSettings from "@d/store/settings";
import { iButton } from "@p/index";

const settingsStore = useGlobalSettings();
</script>
