<template>
	<div class="flex">
		<i-select
			label="选择"
			:options="options"
			v-model="value"
			style="width: 300px"
			label-inline
		></i-select>

		<i-select
			label="选择"
			:options="options"
			v-model="values"
			placeholder="holder"
			style="width: 300px"
			class="mx-12"
			allow-clear
			wrap
			label-inline
		></i-select>
	</div>

	<p class="my-20">{{ value }}</p>
	<p>{{ values }}</p>
	<div style="height: 2000px"></div>
</template>

<script lang="ts" setup>
import { iSelect } from "@p/components";
import mock from "mockjs";
import { ref } from "vue";

const options = mock.mock({
	"array|20": [
		{
			label: "@ctitle",
			value: "@title",
			disabled: "@boolean",
		},
	],
}).array;
const value = ref("");
const values = ref([]);
</script>
