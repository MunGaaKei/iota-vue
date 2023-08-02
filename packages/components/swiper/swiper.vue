<template>
	<div
		class="i-swiper"
		:class="{
			'i-swiper-vertical': vertical,
			'i-swiper-initialized': initialized,
		}"
		@mouseover="handleMouseOver"
		@mouseleave="handleMouseLeave"
	>
		<div class="i-swiper-track" :style="trackStyle">
			<div
				ref="$list"
				class="i-swiper-list"
				:class="{
					'i-swiper-fade': type === 'fade',
				}"
				:style="{
					[vertical ? 'height' : 'width']: listSize,
					transform: position,
					transition,
				}"
				@mousedown.stop="handleMouseDown"
			>
				<div
					v-for="(item, i) in swiperItems"
					class="i-swiper-item"
					:class="{
						'i-swiper-active': i - extra === current,
					}"
					:style="itemStyle(i)"
				>
					<component :is="item"></component>
				</div>
			</div>

			<a
				class="i-swiper-dir i-swiper-prev"
				@click="swipePrev"
				@mousedown.stop
			>
				<StringOrVNodeVue :content="prev"></StringOrVNodeVue>
			</a>
			<a
				class="i-swiper-dir i-swiper-next"
				@click="swipeNext"
				@mousedown.stop
			>
				<StringOrVNodeVue :content="next"></StringOrVNodeVue>
			</a>
		</div>

		<div v-if="indicator" class="i-swiper-indicators">
			<a
				v-for="i in loop
					? size
					: Math.ceil((size - display) / scroll) + 1"
				:key="i"
				:data-swiper="i - 1"
				class="i-swiper-indicator"
				:class="{
					'i-swiper-active': i - 1 === (current + size) % size,
				}"
				@click.stop="swipeTo((i - 1) * scroll)"
			>
				{{ i }}
			</a>
		</div>
	</div>
</template>

<script setup lang="ts">
import {
	KeyboardArrowDownRound,
	KeyboardArrowLeftRound,
	KeyboardArrowRightRound,
	KeyboardArrowUpRound,
} from "@vicons/material";
import { nextTick } from "process";
import { VNode, computed, onUnmounted, ref } from "vue";
import StringOrVNodeVue from "../common/StringOrVNode.vue";
import "./swiper.scss";
import type { Swiper } from "./types";

type MEvent = MouseEvent | TouchEvent;

defineOptions({
	name: "i-swiper",
});

const emits = defineEmits<{
	(e: "init"): void;
	(e: "beforeSwipe", i: number): void;
	(e: "afterSwipe", i: number): void;
}>();

const props = withDefaults(defineProps<Swiper>(), {
	initial: 0,
	type: "normal",
	display: 1,
	scroll: 1,
	loop: true,
	gap: 0,
	duration: 600,
	interval: 3000,
	dragOffset: 40,
	pauseOnHover: true,
	indicator: true,
});
const slots = defineSlots<{
	default: () => any;
}>();
const current = ref<number>(props.initial);
const transition = ref<string>(
	props.type === "fade" ? "none" : `all ${props.duration / 1000}s`
);
const $list = ref<HTMLElement>();
const initialized = ref<boolean>(false);
let swipable = true;
let dragging = false;
let dragStart = 0;
let touchable = false;
let listWidth = 0;
let autoplayTimer: ReturnType<typeof setTimeout>;

const rawItems = computed(() => {
	return travelSlots(slots.default());
});
const swiperItems = computed(() => {
	const items = rawItems.value.slice();

	if (extra.value > 0) {
		const head = items.slice(0, extra.value);
		const tail = items.slice(-extra.value);

		return [...tail, ...items, ...head];
	}

	return items;
});
const total = computed(() => swiperItems.value.length);
const size = computed(() => rawItems.value.length);
const extra = computed(() => {
	const { display, loop, type } = props;
	if (type === "normal" && loop && size.value > display) {
		return display + 1;
	}
	return 0;
});

const prev = computed(() => {
	if (props.prev === false) return;
	if (props.prev) return props.prev;
	return props.vertical ? KeyboardArrowUpRound : KeyboardArrowLeftRound;
});

const next = computed(() => {
	if (props.next === false) return;
	if (props.next) return props.next;
	return props.vertical ? KeyboardArrowDownRound : KeyboardArrowRightRound;
});

const listSize = computed(() => {
	const { loop, display } = props;

	if (loop && size.value > display) {
		return (total.value / display) * 100 + "%";
	}

	return `${(size.value / display) * 100}%`;
});

const trackStyle = computed(() => {
	const { vertical, itemHeight, display } = props;
	if (!vertical || !itemHeight) return;

	return {
		height: `${itemHeight * display}px`,
	};
});

const offsetPercent = computed(() => {
	return (-100 * (current.value + extra.value)) / total.value;
});

const position = computed(() => {
	const { display, type, vertical } = props;

	if (size.value <= display || type === "fade") return "";

	const offset = vertical
		? `0, ${offsetPercent.value}%`
		: `${offsetPercent.value}%, 0`;

	return `translate3d(${offset}, 0)`;
});

nextTick(() => {
	const { autoplay, draggable } = props;
	autoplay && startAutoPlay();

	touchable = "ontouchend" in document;

	if (draggable) {
		const RO = new ResizeObserver((entries) => {
			entries.map((entry) => {
				listWidth = (entry.target as HTMLElement).offsetWidth || 0;
			});
		});

		$list.value && RO.observe($list.value);

		document.addEventListener(
			touchable ? "touchend" : "mouseup",
			handleMouseUp
		);
		document.addEventListener(
			touchable ? "touchmove" : "mousemove",
			handleMouseMove
		);
	}

	initialized.value = true;
});

onUnmounted(() => {
	const { draggable } = props;

	autoplayTimer && clearTimeout(autoplayTimer);

	if (draggable) {
		document.addEventListener(
			touchable ? "touchend" : "mouseup",
			handleMouseUp
		);
		document.addEventListener(
			touchable ? "touchmove" : "mousemove",
			handleMouseMove
		);
	}
});

const handleMouseOver = () => {
	if (!props.pauseOnHover || !props.autoplay) return;
	autoplayTimer && clearTimeout(autoplayTimer);
};

const handleMouseLeave = () => {
	if (!props.pauseOnHover || !props.autoplay) return;
	startAutoPlay();
};

const handleMouseDown = (e: MEvent) => {
	const { draggable, vertical } = props;
	if (!draggable || !swipable) return;

	if (e instanceof TouchEvent) {
		const evt = e.touches[0];
		dragStart = vertical ? evt.clientY : evt.clientX;
	} else {
		dragStart = vertical ? e.clientY : e.clientX;
	}

	dragging = true;
	transition.value = "none";
};

const handleMouseMove = (e: MEvent) => {
	if (!dragging || !$list.value) return;
	e.preventDefault();

	const { vertical } = props;
	let dragEnd = 0;

	if (e instanceof TouchEvent) {
		const evt = e.touches[0];
		dragEnd = vertical ? evt.clientY : evt.clientX;
	} else {
		dragEnd = vertical ? e.clientY : e.clientX;
	}

	const offset = ((dragEnd - dragStart) * 61.8) / listWidth;

	$list.value.style.transform = `translate(${
		vertical
			? `0 ${offsetPercent.value + offset}%`
			: `${offsetPercent.value + offset}%, 0`
	})`;
};

const handleMouseUp = (e: MEvent) => {
	if (!dragging) return;

	const { duration, vertical, dragOffset } = props;
	let dragEnd = 0;

	if (e instanceof TouchEvent) {
		const evt = e.touches[0];
		dragEnd = vertical ? evt.clientY : evt.clientX;
	} else {
		dragEnd = vertical ? e.clientY : e.clientX;
	}

	const offset = (dragEnd - dragStart) * 0.618;
	const part = listWidth / total.value;
	const absOffset = Math.abs(offset);

	if (absOffset > dragOffset) {
		const base = Math.floor(absOffset / part);
		const mod = (absOffset % part) - dragOffset > 0 ? 1 : 0;
		const p = base + mod;

		const to = current.value + (offset > 0 ? -p : p);

		swipeTo(to);
	}

	dragging = false;
	transition.value = `all ${duration / 1000}s`;
};

function startAutoPlay() {
	autoplayTimer = setTimeout(() => {
		swipeNext();
		startAutoPlay();
	}, props.interval);
}

function itemStyle(i: number) {
	const { type, gap, duration, vertical, itemHeight } = props;

	if (type === "normal") {
		return {
			[vertical ? "paddingBlock" : "paddingInline"]: `${gap / 2}px`,
			height: `${itemHeight}px`,
		};
	}

	const offset = vertical ? `0, -${i * 100}%` : `-${i * 100}%, 0`;

	return {
		transform: `translate(${offset})`,
		transition: `all ${duration / 1000}s`,
	};
}

function swipeNext() {
	const { scroll, loop, display } = props;
	let next = current.value + scroll;

	if (!loop && next > size.value - display) {
		next = size.value - display;
	}

	swipeTo(next);
}

function swipePrev() {
	const { scroll, loop } = props;
	let prev = current.value - scroll;

	if (!loop && prev < 0) {
		prev = 0;
	}

	swipeTo(prev);
}

function swipeTo(i: number) {
	if (!swipable || i === current.value) return;
	swipable = false;
	emits("beforeSwipe", current.value);

	const { loop, type, duration } = props;
	let reset = false;
	let next = i;

	if (loop && (i >= size.value || i < 0)) {
		reset = true;
		next = (i + size.value) % size.value;
	}

	setTimeout(() => {
		swipable = true;
	}, duration + 16);

	if (type === "fade") {
		current.value = next;
		emits("afterSwipe", next);
		return;
	}

	current.value = i;

	if (reset) {
		setTimeout(() => {
			transition.value = "none";
			current.value = next;
			emits("afterSwipe", next);
			setTimeout(() => {
				transition.value = `all ${duration / 1000}s`;
			}, 16);
		}, duration + 12);
	}
}

function travelSlots(slots: VNode[]) {
	const items: VNode[] = [];

	slots.map((slot) => {
		const { children } = slot;

		if (Array.isArray(children)) {
			items.push(...(children as VNode[]));
		} else {
			items.push(slot);
		}
	});

	return items;
}
</script>
