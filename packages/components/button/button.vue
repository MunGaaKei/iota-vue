<template>
	<component
		:is="Tag"
		:type="type"
		:to="to"
		:href="href"
		class="i-btn"
		:class="btnClass"
		ref="$btn"
		v-ripple="ripple"
	>
		<span v-if="loading" class="i-loading-icon"></span>
		<span class="i-btn-content">
			<slot></slot>
		</span>
	</component>
</template>

<script lang="ts" setup>
import { vRipple } from "@p/directives";
import useLinkTag from "@p/js/useLinkTag";
import { computed, ref } from "vue";
import "./button.scss";
import { Button } from "./types";

defineOptions({
	name: "i-button",
});

const props = withDefaults(defineProps<Button>(), {
	tag: "a",
	ripple: true,
	size: "normal",
});
const $btn = ref<HTMLElement>();
const Tag = useLinkTag({
	to: props.to,
	type: props.type,
});

const btnClass = computed(() => {
	return {
		"i-btn-flat": props.flat,
		"i-btn-block": props.block,
		"i-btn-loading": props.loading,
		"i-btn-outline": props.outline,
		"i-btn-square": props.square,
		"i-btn-plain": props.plain,
		rounded: props.round,
		[`i-btn-${props.size}`]: props.size !== "normal",
		disabled: props.disabled,
	};
});
</script>
