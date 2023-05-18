<template>
	<i-button @click="toggleDialog(!dialog)">打开/关闭</i-button>

	<i-dialog v-model="dialog">
		<template #title>🤓</template>
		<div
			style="
				background-image: linear-gradient(
					-225deg,
					#77ffd2 0%,
					#6297db 48%,
					#1eecff 100%
				);
				width: 600px;
				max-width: 100%;
				height: 200px;
			"
		></div>
	</i-dialog>

	<div style="height: 2000px"></div>
</template>

<script setup lang="ts">
import { iButton, iDialog } from "@p/components";
import { useState } from "@p/js/useState";

const [dialog, toggleDialog] = useState<boolean>(false);
</script>
