<template>
	<div
		class="i-tab"
		:class="{
			flex: vertical
		}"
	>
		<div
			ref="navs"
			class="i-tab-navs"
			:class="[
				navbarClass,
				{
					'flex-column': vertical
				}
			]"
		>
			<i-tab-item
				v-for="item in tabs"
				:key="item.key"
				:class="{
					'i-tab-active': active === item.key
				}"
				v-bind="{ ...item.props }"
				@click="handleClick($event, item)"
				v-ripple="ripple"
			>
				<render-title :title="item.title"></render-title>
			</i-tab-item>

			<span
				v-if="animateBar"
				class="i-tab-navs-bar"
				:style="barStyle"
			></span>
		</div>

		<div class="i-tab-contents">
			<div
				v-for="item in tabs"
				:key="item.key"
				class="i-tab-content"
				:class="{
					'i-tab-active': active === item.key
				}"
			>
				<component :is="item.content"></component>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="i-tab">
import { withDefaults, useSlots, computed, ref, nextTick, h } from 'vue';
import type { VNode } from 'vue';
import { vRipple } from '@p/directives';
import { useState } from '@p/js/useState';
import { iTabItem } from '.';
import './tab.scss';

type TypeActive = string | number | symbol;
type TypeTabItem = {
	key: TypeActive;
	title: string | Function;
	content: string | Function;
	props?: Object;
};
type TypeTitleProp = {
	title: string | Object;
};

const navs = ref<HTMLElement>();
const props = withDefaults(
	defineProps<{
		active?: TypeActive;
		vertical?: boolean;
		animateBar?: boolean;
		clickToggle?: boolean;
		navbarClass?: string;
		ripple?: boolean;
	}>(),
	{
		animateBar: true,
		ripple: true
	}
);

props.animateBar &&
	nextTick((): void => {
		const $active = (navs.value as HTMLElement).querySelector('.v-tab-active');
		if ($active) {
			setBarPosition($active as HTMLElement);
		}
	});

const emits = defineEmits<{
	(e: 'tab-open', key: TypeActive, item: TypeTabItem): void;
}>();

const [active, setActive] = useState<TypeActive>(props.active);
const [bar, setBar] = useState<{
	left: number;
	top: number;
	width: number;
	height: number;
}>({
	left: 0,
	top: 0,
	width: 0,
	height: 0
});

const slots = useSlots().default?.();

const tabs = computed(() => {
	return slots
		?.map((slot, index): TypeTabItem => {
			slot.props = slot.props || {};
			const { title, key } = slot.props as { title: string; key: string };
			const { children, props }: any = slot;

			return {
				key: key || index,
				title: title || children.title || '',
				content: children.default,
				props
			};
		})
		.filter((tab: TypeTabItem) => {
			return tab.title;
		});
});

const barStyle = computed(() => {
	const { left, width, top, height } = bar.value;

	return props.vertical
		? {
				transform: `translate3d(0, ${top + 0.25 * height}px, 0)`,
				height: active.value !== '' ? `${height / 2}px` : 0
		  }
		: {
				transform: `translate3d(${left + 0.25 * width}px, 0, 0)`,
				width: active.value !== '' ? `${width / 2}px` : 0
		  };
});

const handleClick = (e: Event, item: TypeTabItem) => {
	const isActivated = props.clickToggle && active.value === item.key;
	const p = item.props;
	let tar = e.target as HTMLElement;

	if (p?.hasOwnProperty('prevent-click')) return;

	setBarPosition(tar);
	setActive(isActivated ? '' : item.key);
	emits('tab-open', item.key, item);
};

const renderTitle = (prop: TypeTitleProp): VNode => {
	const { title } = prop;

	if (typeof title === 'string') {
		return h('', title);
	} else {
		return h(title);
	}
};

function setBarPosition(tar: HTMLElement) {
	if (props.animateBar) {
		while (!tar.matches('.i-tab-nav')) {
			tar = tar.parentNode as HTMLElement;
		}

		setBar({
			top: tar.offsetTop,
			height: tar.offsetHeight,
			left: tar.offsetLeft,
			width: tar.offsetWidth
		});
	}
}

defineExpose<{
	active: TypeActive;
	setActive: Function;
}>({
	active: active.value,
	setActive
});
</script>
