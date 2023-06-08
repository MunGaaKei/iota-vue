<template>
	<div v-if="total > 1" class="i-pages">
		<a
			class="i-page i-page-prev"
			:class="{
				disabled: current === 1,
			}"
			@click="handlePageClick(current - 1)"
			v-ripple="ripple"
		>
			<StringOrVNode :content="prev"></StringOrVNode>
		</a>

		<a
			v-if="start > 1"
			class="i-page"
			@click="handlePageClick(1)"
			v-ripple="ripple"
		>
			1
		</a>

		<MoreHorizRound v-if="start > 2" class="i-page i-page-more">
		</MoreHorizRound>

		<template v-for="p in siblings">
			<a
				class="i-page"
				:class="{
					active: p + start - 1 === current,
				}"
				@click="handlePageClick(p + start - 1)"
				v-ripple="ripple"
			>
				{{ p + start - 1 }}
			</a>
		</template>

		<MoreHorizRound v-if="end < total - 1" class="i-page i-page-more">
		</MoreHorizRound>

		<a
			v-if="end < total"
			class="i-page"
			@click="handlePageClick(total)"
			v-ripple="ripple"
		>
			{{ total }}
		</a>

		<a
			class="i-page i-page-next"
			:class="{
				disabled: current === total,
			}"
			@click="handlePageClick(current + 1)"
			v-ripple="ripple"
		>
			<StringOrVNode :content="next"></StringOrVNode>
		</a>
	</div>
</template>

<script setup lang="ts">
import { vRipple } from "@p/directives";
import {
	KeyboardArrowLeftRound,
	KeyboardArrowRightRound,
	MoreHorizRound,
} from "@vicons/material";
import { computed, withDefaults } from "vue";
import StringOrVNode from "../common/StringOrVNode.vue";
import "./page.scss";
import type { Page } from "./types";

defineOptions({
	name: "i-page",
});

const props = withDefaults(defineProps<Page>(), {
	total: 0,
	sibling: 2,
	ripple: true,
	prev: KeyboardArrowLeftRound,
	next: KeyboardArrowRightRound,
});

const current = computed(() => {
	return props.modelValue || props.page || 1;
});

const start = computed(() => {
	const { sibling } = props;
	return Math.max(1, current.value - sibling);
});

const end = computed(() => {
	const { total, sibling } = props;
	return Math.min(total, current.value + sibling);
});

const siblings = computed(() => {
	return end.value - start.value + 1;
});

const emits = defineEmits<{
	(e: "update:modelValue", page: number): void;
	(e: "page-click", page: number): void;
}>();

const handlePageClick = (p: number) => {
	if (p < 1 || p > props.total) return;

	emits("update:modelValue", p);
	emits("page-click", p);
};
</script>
