<template>
	<h3 class="mb-12">使用</h3>

	<Demo :html="configCode">
		<i-button
			:loading="config.loading"
			:disabled="config.disabled"
			:block="config.block"
			:round="config.round"
			:outline="config.outline"
			:flat="config.flat"
			:plain="config.plain"
		>
			BUTTON
		</i-button>

		<template #config>
			<i-grid
				cols="4 3:800 2:600"
				gap="12px"
				refer="container"
				class="pd-12"
			>
				<i-checkbox v-model="config.loading" type="switch">
					loading
				</i-checkbox>
				<i-checkbox v-model="config.disabled" type="switch">
					disabled
				</i-checkbox>
				<i-checkbox v-model="config.round" type="switch">
					round
				</i-checkbox>
				<i-checkbox v-model="config.block" type="switch">
					block
				</i-checkbox>
				<i-checkbox v-model="config.outline" type="switch">
					outline
				</i-checkbox>
				<i-checkbox v-model="config.flat" type="switch">
					flat
				</i-checkbox>
				<i-checkbox v-model="config.plain" type="switch">
					plain
				</i-checkbox>
			</i-grid>
		</template>
	</Demo>

	<h3 class="mt-80 mb-12">颜色</h3>
	<p>
		<router-link to="/docs/colors" class="blue">颜色选项参考</router-link>
	</p>
	<Demo :html="colorCode">
		<i-button plain class="mr-12">Ghost</i-button>
		<i-button outline class="blue">Blue</i-button>
		<i-button class="bg-yellow mx-12">
			<i-icon :icon="FlashOnRound" size="1.2em"></i-icon>
			Yellow
		</i-button>
		<i-button square class="bg-red">
			<i-icon :icon="WarningRound" size="1.2em"></i-icon>
		</i-button>
		<i-button class="pink ml-12" flat>Pink</i-button>
	</Demo>

	<h3 class="mt-80 mb-20">属性设置</h3>
	<Props :props="propsGuidence"></Props>
</template>

<script setup lang="ts" name="page-button">
import Demo from "@d/components/Demo.vue";
import Props from "@d/components/Props.vue";
import { iButton, iCheckbox, iGrid, iIcon } from "@p/index";
import { FlashOnRound, WarningRound } from "@vicons/material";
import { computed, reactive } from "@vue/reactivity";

const config = reactive<{
	loading: boolean;
	disabled: boolean;
	round: boolean;
	block: boolean;
	outline: boolean;
	flat: boolean;
	plain: boolean;
}>({
	loading: false,
	disabled: false,
	round: false,
	block: false,
	outline: false,
	flat: false,
	plain: false,
});

const propsGuidence = [
	{
		name: "tag",
		type: "'a' | 'button'",
		defaultValue: "'a'",
		desc: "按钮标签名",
	},
	{
		name: "to",
		type: "string",
		defaultValue: "",
		desc: "使用为<router-link>",
	},
	{
		name: "outline",
		type: "boolean",
		defaultValue: "false",
		desc: "按钮为中空带边框",
	},
	{
		name: "flat",
		type: "boolean",
		defaultValue: "false",
		desc: "按钮无背景色和边框",
	},
	{
		name: "loading",
		type: "boolean",
		defaultValue: "false",
		desc: "按钮呈加载状态",
	},
	{
		name: "disabled",
		type: "boolean",
		defaultValue: "false",
		desc: "按钮呈无效状态",
	},
	{
		name: "size",
		type: "'normal' | 'thin' | 'small' | 'large'",
		defaultValue: "'normal'",
		desc: "按钮尺寸，'thin'和'small'的区别在于左右内间距",
	},
	{
		name: "block",
		type: "boolean",
		defaultValue: "false",
		desc: "按钮100%宽度",
	},
	{
		name: "square",
		type: "boolean",
		defaultValue: "false",
		desc: "按钮呈正方形，通常用于只显示图标，可搭配 round 使用",
	},
	{
		name: "round",
		type: "boolean",
		defaultValue: "false",
		desc: "按钮圆角值更大",
	},
	{
		name: "ripple",
		type: "boolean",
		defaultValue: "true",
		desc: "按钮点击波纹效果",
	},
	{
		name: "type",
		type: "'submit' | 'reset' | 'button'",
		defaultValue: "",
		desc: "当按钮为<button>标签时，它的原生[type]属性",
	},
];

const configCode = computed(() => {
	return `
<i-button :loading="${config.loading}"
    :disabled="${config.disabled}"
    :block="${config.block}"
    :outline="${config.outline}"
    :flat="${config.flat}"
    :plain="${config.plain}"
    :round="${config.round}">
    BUTTON
</i-button>

`;
});

const colorCode = computed(() => {
	return `
<i-button plain>Ghost</i-button>
<i-button outline class="blue">Blue</i-button>
<i-button class="bg-yellow">
	<i-icon :icon="FlashOnRound" size="1.2em"></i-icon>
	Yellow
</i-button>
<i-button square class="bg-red">
	<i-icon :icon="WarningRound" size="1.2em"></i-icon>
</i-button>
<i-button class="pink" flat>Pink</i-button>

`;
});
</script>
