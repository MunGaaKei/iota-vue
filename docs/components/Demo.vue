<template>
	<div class="demo-content">
		<div class="demo-widget flex justify-center">
			<slot></slot>
		</div>
		<i-tab
			@tab-open="handleOpen"
			class="demo"
			click-toggle
			:active="active"
		>
			<i-tab-item v-if="slots.config" key="config">
				<template #title>
					<i-icon :icon="AutoAwesomeMosaicTwotone"></i-icon>
				</template>
				<slot name="config"></slot>
			</i-tab-item>
			<i-tab-item key="html">
				<template #title>
					<b>Html</b>
				</template>
				<Codes type="html" :code="html"></Codes>
			</i-tab-item>
			<i-tab-item v-if="js" key="js">
				<template #title>
					<b>Javascript</b>
				</template>
				<Codes type="js" :code="js"></Codes>
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
import { iButton, iIcon, iTab, iTabItem, useMessage } from "@p/index";
import { AutoAwesomeMosaicTwotone, CopyAllTwotone } from "@vicons/material";
import { ref, useSlots, withDefaults } from "vue";
import Codes from "./Codes.vue";

const slots = useSlots();
const message = useMessage();

const props = withDefaults(
	defineProps<{
		js?: string;
		html?: string;
		active?: string;
	}>(),
	{
		html: "",
		js: "",
		active: "",
	}
);
const active = ref<string>(props.active);

const handleOpen = (key: string) => {
	active.value = key;
};

const handleCopy = async () => {
	try {
		navigator.clipboard.writeText(
			active.value === "js" ? props.js : props.html
		);
		message({
			content: "👌👌 已复制",
			classname: "bg-blue",
			max: 1,
		});
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
	padding: 40px 0;
}
</style>
