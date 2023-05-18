<template>
	<div class="demo-content">
		<div class="demo-widget flex justify-center">
			<slot></slot>
		</div>
		<i-tab class="demo" click-toggle>
			<i-tab-item v-if="slots.config" key="config">
				<template #title>
					<i-icon :icon="AutoAwesomeMosaicTwotone"></i-icon>
				</template>
				<slot name="config"></slot>
			</i-tab-item>
			<i-tab-item key="code">
				<template #title>
					<i-icon :icon="CodeRound"></i-icon>
				</template>
				<Codes type="html" :code="code"></Codes>
			</i-tab-item>
			<template #suffix>
				<i-button @click="handleCopy" plain square class="color-4">
					<i-icon :icon="CopyAllTwotone"></i-icon>
				</i-button>
			</template>
		</i-tab>
	</div>
</template>

<script setup lang="ts">
import { iButton, iIcon, iTab, iTabItem } from "@p/components";
import {
	AutoAwesomeMosaicTwotone,
	CodeRound,
	CopyAllTwotone,
} from "@vicons/material";
import { useSlots, withDefaults } from "vue";
import Codes from "./Codes.vue";

const slots = useSlots();

const props = withDefaults(
	defineProps<{
		code?: string;
	}>(),
	{
		code: "",
	}
);

const handleCopy = async () => {
	try {
		navigator.clipboard.writeText(props.code);
	} catch (err) {
		console.log(err);
	}
};
</script>

<style scoped lang="scss">
.demo-content {
	border-radius: var(--radius);
}
.demo-widget {
	min-height: 120px;
}
</style>
