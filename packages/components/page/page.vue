<template>
	<div v-if="total > 1" class="i-pages">
		<a
			class="i-page i-page-prev"
			:class="{
				disabled: modelValue === 1,
			}"
			v-ripple="ripple"
		>
			<KeyboardArrowLeftRound></KeyboardArrowLeftRound>
		</a>

		<a class="i-page" v-ripple="ripple">1</a>

		<a class="i-page i-page-next" v-ripple="ripple">
			<KeyboardArrowRightRound></KeyboardArrowRightRound>
		</a>
	</div>
</template>

<script setup lang="ts" name="i-page">
import {
	KeyboardArrowLeftRound,
	KeyboardArrowRightRound,
} from "@vicons/material";
import { VNode, withDefaults } from "vue";
import "./page.scss";

export type IProps = {
	total?: number;
	modelValue?: number;
	prev?: string | VNode;
	next?: string | VNode;
	url?: string;
	ripple?: boolean;
};

const props = withDefaults(defineProps<IProps>(), {
	total: 0,
});

const emits = defineEmits<{
	(e: "update:modelValue", page: number): void;
}>();
</script>
