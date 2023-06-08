<template>
	<div
		class="i-tab"
		:class="{
			flex: vertical,
		}"
	>
		<div
			class="i-tab-navs-container"
			:class="[
				navbarClass,
				{
					'flex-column': vertical,
				},
			]"
			@mousewheel="(e: WheelEvent) => e.preventDefault()"
		>
			<slot v-if="slots?.prefix" name="prefix"></slot>

			<i-dropdown v-if="hiddenTabs.length" ref="$dropdown">
				<template #trigger>
					<i-button plain square class="shrink-0 color-3">
						<i-icon :icon="PaddingOutlined"></i-icon>
					</i-button>
				</template>
				<i-list class="bg-blur" type="option">
					<i-list-item
						v-for="item in hiddenTabs"
						:key="item.key"
						:active="active === item.key"
						@click="handleClick(item, true)"
					>
						<StringOrVNode :content="item.title"></StringOrVNode>
					</i-list-item>
				</i-list>
			</i-dropdown>

			<div
				ref="$navsContainer"
				class="i-tab-navs"
				:class="{
					'i-tab-closable': closable,
				}"
				@mousewheel="handleMouseWheel"
			>
				<a
					v-for="item in tabs"
					ref="$navs"
					:key="item.key"
					:data-index="item.key"
					class="i-tab-nav"
					:class="{
						'i-tab-active': active === item.key,
					}"
					v-bind="{ ...item.props }"
					@click="handleClick(item)"
					v-ripple="ripple"
				>
					<StringOrVNode :content="item.title"></StringOrVNode>
					<span
						v-if="closable"
						class="i-tab-nav-close"
						@click.prevent="handleClose($event, item)"
					>
						<i-icon :icon="CloseRound" size="1.2em"></i-icon>
					</span>
				</a>

				<span
					v-if="!closable && animateBar"
					class="i-tab-navs-bar"
					:style="barStyle"
				></span>
			</div>

			<slot v-if="slots?.suffix" name="suffix"></slot>
		</div>

		<div class="i-tab-contents">
			<div
				v-for="item in tabs"
				:key="item.key"
				class="i-tab-content"
				:class="{
					'i-tab-active': active === item.key,
				}"
			>
				<StringOrVNode :content="item.content"></StringOrVNode>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { vRipple } from "@p/directives";
import { iButton, iDropdown, iIcon, iList, iListItem } from "@p/index";
import useIntersectionObserver from "@p/js/useIntersectionObserver";
import { warn } from "@p/js/useLog";
import { useState } from "@p/js/useState";
import { CloseRound, PaddingOutlined } from "@vicons/material";
import {
	computed,
	nextTick,
	onUnmounted,
	ref,
	watchEffect,
	withDefaults,
} from "vue";
import StringOrVNode from "../common/StringOrVNode.vue";
import "./tab.scss";
import type { Tab, TabItem } from "./types";

defineOptions({
	name: "i-tab",
});

const $navsContainer = ref<HTMLElement>();
const $navs = ref<HTMLElement[]>([]);
const $dropdown = ref();
const props = withDefaults(defineProps<Tab>(), {
	animateBar: true,
	ripple: true,
});

const emits = defineEmits<{
	(e: "tab-open", key: string, item: TabItem): void;
	(e: "tab-close", key: string, item: TabItem): void;
	(e: "tab-remove", key: string, item: TabItem): void;
}>();

const [active, setActive] = useState<string>(props.active);
const [bar, setBar] = useState<{
	left: number;
	top: number;
	width: number;
	height: number;
}>({
	left: 0,
	top: 0,
	width: 0,
	height: 0,
});
const slots = defineSlots<{
	default: () => any;
	prefix?: () => any;
	suffix?: () => any;
}>();
const tabs = ref<TabItem[]>([]);
const hiddenTabs = ref<TabItem[]>([]);
let prevDisconnect: () => void;

watchEffect(() => {
	prevDisconnect?.();
	const { observe, disconnect } = useIntersectionObserver({
		root: $navsContainer.value,
	});

	prevDisconnect = disconnect;

	const watchNode = ($node: HTMLElement) => {
		observe($node, (isIntersecting: boolean) => {
			const key = $node.dataset.index;
			const tab = tabs.value.find((t) => t.key === key);

			if (tab) {
				tab.visible = isIntersecting;
				hiddenTabs.value = tabs.value.filter((tab) => !tab.visible);
			}
		});
	};

	tabs.value = travelSlots(slots.default());

	nextTick(() => $navs.value.map(watchNode));
});

nextTick(() => {
	if (!props.closable && props.animateBar) {
		const $active = ($navsContainer.value as HTMLElement).querySelector(
			".i-tab-active"
		);
		$active && setBarPosition($active as HTMLElement);
	}
});

const barStyle = computed(() => {
	const { left, width, top, height } = bar.value;

	return props.vertical
		? {
				transform: `translate3d(0, ${top + 0.25 * height}px, 0)`,
				height: active.value !== "" ? `${height / 2}px` : 0,
		  }
		: {
				transform: `translate3d(${left + 0.25 * width}px, 0, 0)`,
				width: active.value !== "" ? `${width / 2}px` : 0,
		  };
});

const handleClick = (item: TabItem, isHidden?: boolean) => {
	const isActivated = props.clickToggle && active.value === item.key;
	const tar = $navsContainer.value?.querySelector(
		`.i-tab-nav[data-index="${String(item.key)}"]`
	) as HTMLElement;

	if (isActivated) {
		emits("tab-close", item.key, item);
		setActive("");
	} else {
		setActive(item.key);
		emits("tab-open", item.key, item);
	}

	isHidden && $dropdown.value?.toggle(false);
	tar && setBarPosition(tar, isHidden);
};

const handleClose = (e: Event, item: TabItem) => {
	e.stopPropagation();
	emits("tab-remove", item.key, item);
};

const handleMouseWheel = (e: WheelEvent) => {
	if (props.vertical) return;

	$navsContainer.value?.scrollBy({
		left: e.deltaY + e.deltaX,
	});
};

function setBarPosition(tar: HTMLElement, isHidden?: boolean) {
	const { closable, animateBar, vertical } = props;

	if ($navsContainer.value && isHidden) {
		$navsContainer.value.scrollTo({
			[vertical ? "top" : "left"]: vertical
				? tar.offsetTop
				: tar.offsetLeft,
			behavior: "smooth",
		});
	}

	if (!closable && animateBar) {
		setBar({
			top: tar.offsetTop,
			height: tar.offsetHeight,
			left: tar.offsetLeft,
			width: tar.offsetWidth,
		});
	}
}

function travelSlots(slots: any[], cursor: number = 0) {
	const results: TabItem[] = [];

	slots.map((slot) => {
		slot.props = slot.props || {};
		const { children, props } = slot;
		const { title, key, ...restProps } = props;

		if (children.default) {
			if (!key) {
				warn({
					text: 'Warning: Each <i-tab-item> should have a unique "key" prop.',
				});
			}

			results.push({
				key: key || cursor,
				title: title || children.title?.()[0] || "",
				content: children.default?.()[0] || "",
				props: restProps,
			});
			cursor += 1;
		} else if (Array.isArray(children)) {
			const childrenSlots = travelSlots(children, cursor);
			cursor += childrenSlots.length;
			results.push(...childrenSlots);
		}
	});

	return results;
}

onUnmounted(() => {
	prevDisconnect?.();
});

defineExpose<{
	active: string;
	setActive: Function;
}>({
	active: active.value,
	setActive,
});
</script>
