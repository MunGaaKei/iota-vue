<template>
	<div
		class="i-container"
		v-if="layout === 'default'"
	>
		<header
			v-if="slots.header"
			class="i-header bg-blur sticky"
		>
			<slot name="header"></slot>
		</header>

		<div class="flex">
			<div
				v-if="slots.sider"
				class="i-sider"
				:style="siderCSS"
			>
				<slot name="sider"></slot>
			</div>
			<div
				class="v-content"
				:style="contentCSS"
			>
				<slot></slot>
			</div>
		</div>

		<footer
			v-if="slots.footer"
			class="i-footer bg-blur"
			:class="{
				sticky: stickyFooter
			}"
		>
			<slot name="footer"></slot>
		</footer>
	</div>

	<div
		v-else
		class="i-container flex"
	>
		<div
			v-if="slots.sider"
			class="i-sider"
			:style="siderCSS"
		>
			<slot name="sider"></slot>
		</div>
		<div
			class="i-content"
			:style="contentCSS"
		>
			<header
				v-if="slots.header"
				class="i-header bg-blur sticky"
			>
				<slot name="header"></slot>
			</header>

			<slot></slot>

			<footer
				v-if="slots.footer"
				class="i-footer bg-blur"
				:class="{
					sticky: stickyFooter
				}"
			>
				<slot name="footer"></slot>
			</footer>
		</div>
	</div>
</template>

<script setup lang="ts" name="i-container">
import { withDefaults, computed, useSlots } from 'vue';
import './container.scss';

const props = withDefaults(
	defineProps<{
		layout?: 'default' | 'menu';
		modelValue?: boolean;
		siderWidth?: string;
		breakpoint?: string;
		stickyFooter?: boolean;
		contentStyle?: Object;
		siderStyle?: Object;
	}>(),
	{
		layout: 'default',
		siderWidth: '',
		hideSider: false,
		breakpoint: '980px',
		stickyFooter: false
	}
);

const slots = useSlots();
const emits = defineEmits<{
	(e: 'sider-toggle', v: boolean): void;
	(e: 'update:modelValue', v: boolean): void;
}>();

const siderCSS = computed(() => {
	return {
		width: props.siderWidth,
		transform: props.modelValue ? 'translate(-100%, 0)' : '',
		...props.siderStyle
	};
});
const contentCSS = computed(() => {
	return {
		marginLeft: props.modelValue ? `-${props.siderWidth}` : 0,
		...props.contentStyle,
		maxWidth: props.modelValue ? 'unset' : 'null'
	};
});

if (props.breakpoint) {
	const mql = window.matchMedia(`(max-width: ${props.breakpoint})`);

	mql.addEventListener('change', () => {
		triggerToggle(mql.matches);
	});

	mql.matches && triggerToggle(mql.matches);

	function triggerToggle(v: boolean) {
		emits('sider-toggle', v);
		emits('update:modelValue', v);
	}
}
</script>
