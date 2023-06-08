<template>
	<div class="i-container" v-if="layout === 'default'">
		<header v-if="slots.header" :class="['i-header', headerClass]">
			<slot name="header"></slot>
		</header>

		<div class="flex">
			<div
				v-if="slots.sider"
				ref="$sider"
				class="i-sider bg-blur"
				:class="[
					{
						'i-sider-fixed': matchBreakpoint,
					},
					siderClass,
				]"
				:style="siderCSS"
				v-clickoutside="handleClickoutside"
			>
				<slot name="sider"></slot>
			</div>
			<div class="i-content" :class="contentClass" :style="contentCSS">
				<slot></slot>
			</div>
		</div>

		<footer
			v-if="slots.footer"
			class="i-footer bg-blur"
			:class="footerClass"
		>
			<slot name="footer"></slot>
		</footer>
	</div>

	<div v-else class="i-container flex">
		<div
			v-if="slots.sider"
			ref="$sider"
			class="i-sider bg-blur"
			:class="[
				{
					'i-sider-fixed': matchBreakpoint,
				},
				siderClass,
			]"
			:style="siderCSS"
			v-clickoutside="handleClickoutside"
		>
			<slot name="sider"></slot>
		</div>
		<div class="i-content" :class="contentClass" :style="contentCSS">
			<header v-if="slots.header" :class="['i-header', headerClass]">
				<slot name="header"></slot>
			</header>

			<slot></slot>

			<footer
				v-if="slots.footer"
				class="i-footer bg-blur"
				:class="footerClass"
			>
				<slot name="footer"></slot>
			</footer>
		</div>
	</div>
</template>

<script setup lang="ts">
import { vClickoutside } from "@p/directives";
import { useState } from "@p/js/useState";
import { computed, ref, useSlots, withDefaults } from "vue";
import "./container.scss";
import { Container } from "./types";

defineOptions({
	name: "i-container",
});

const props = withDefaults(defineProps<Container>(), {
	layout: "default",
	breakpoint: "980px",
	headerClass: "sticky-top bg-blur",
});

const slots = useSlots();
const $sider = ref();
const [matchBreakpoint, setMatchBreakpoint] = useState<boolean>(false);
const emits = defineEmits<{
	(e: "update:modelValue", v: boolean): void;
	(e: "sider-toggle", v: boolean): void;
}>();

const siderCSS = computed(() => {
	return {
		transform: props.modelValue ? "translate(-100%, 0)" : "",
	};
});
const contentCSS = computed(() => {
	const w = $sider.value?.offsetWidth;

	return {
		marginLeft:
			!matchBreakpoint.value && props.modelValue && $sider.value
				? `-${w}px`
				: 0,
		maxWidth: props.modelValue ? "unset" : "null",
	};
});

if (props.breakpoint) {
	const mql = window.matchMedia(`(max-width: ${props.breakpoint})`);

	mql.addEventListener("change", () => {
		triggerToggle(mql.matches);
		setMatchBreakpoint(mql.matches);
	});

	if (mql.matches) {
		triggerToggle(true);
		setMatchBreakpoint(true);
	}

	function triggerToggle(v: boolean) {
		emits("update:modelValue", v);
		emits("sider-toggle", v);
	}
}

const handleClickoutside = () => {
	if (matchBreakpoint.value) {
		emits("update:modelValue", true);
		emits("sider-toggle", true);
	}
};
</script>
