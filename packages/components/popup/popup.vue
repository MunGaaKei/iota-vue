<template>
	<Trigger ref="$trigger"></Trigger>

	<Teleport
		v-if="body"
		to="body"
	>
		<div
			ref="$popup"
			v-if="active"
			class="i-popup"
			:style="popupStyle"
		>
			<slot></slot>
		</div>
	</Teleport>

	<div
		v-if="!body && active"
		ref="$popup"
		class="i-popup"
		:style="popupStyle"
	>
		<slot></slot>
	</div>
</template>

<script setup lang="ts" name="i-popup">
import {
	useSlots,
	h,
	withDefaults,
	VNode,
	withModifiers,
	computed,
	ref,
	nextTick,
	StyleValue
} from 'vue';
import { useState } from '@p/js/useState';
import './popup.scss';

type TypePosition = 'left' | 'top' | 'right' | 'bottom';
type TypeTrigger = 'hover' | 'click' | 'focus' | 'manual';
type TypeProps = {
	trigger?: TypeTrigger;
	modelValue?: boolean;
	position?: TypePosition;
	gap?: number;
	touchable?: boolean;
	body?: boolean;
};
type TypeTriggerEvents = {
	[key: string]: Function | Object;
};

const props = withDefaults(defineProps<TypeProps>(), {
	trigger: 'hover',
	modelValue: false,
	gap: 4
});

const [active, setActive] = useState<boolean>(props.modelValue);
const [toggling, setToggling] = useState<boolean>(false);
const [show, setShow] = useState<boolean>(false);
const offsets = ref<string>('');
const $trigger = ref<HTMLElement>();
const $popup = ref<HTMLElement>();
const slots = useSlots();

const Trigger = (): VNode | undefined => {
	if (slots?.trigger) {
		const triggerSlots = slots.trigger();
		const events: TypeTriggerEvents = {};
		const [eventShow, eventHide] = getNativeEventType(props.trigger);

		if (props.trigger === 'manual' || props.modelValue) {
			// do nothing
		} else if (props.trigger === 'click') {
			events['onClick'] = () => toggle();
		} else {
			events[eventShow] = withModifiers(() => toggle(true), ['self']);
			events[eventHide] = withModifiers(() => toggle(false), ['self']);
		}

		const element = triggerSlots.find((slot: VNode) => {
			return slot.type !== 'symbol' && typeof slot.children !== 'string';
		}) as VNode;

		return h(element, {
			...events
		});
	} else {
		return undefined;
	}
};

const popupStyle = computed((): StyleValue => {
	return {
		pointerEvents: props.touchable ? 'unset' : 'none',
		opacity: show.value ? 1 : 0,
		transform: offsets.value
	};
});

function toggle(show?: boolean) {
	if (toggling.value) return;

	setToggling(true);

	if (show !== undefined) {
		show ? handleShow() : handleHide();
	} else {
		active.value ? handleHide() : handleShow();
	}
}

function handleShow(): void {
	setActive(true);
	nextTick(() => {
		computePopupPos();
		setShow(true);
	});
	setTimeout(() => {
		setToggling(false);
	}, 160);
}

function handleHide(): void {
	setShow(false);
	setTimeout(() => {
		setActive(false);
		setToggling(false);
	}, 160);
}

function computePopupPos(): void {
	if (!$trigger.value || !$popup.value) return;

	const rectTrigger: DOMRect = $trigger.value.getBoundingClientRect();
	const rectPopup: DOMRect = $popup.value.getBoundingClientRect();
	let posLeft = 0;
	let posTop = 0;

	if (props.position) {
		[posLeft, posTop] = computePosWithDirection(
			props.position,
			rectPopup,
			rectTrigger,
			$trigger.value
		);
	} else {
		let preferPosition: TypePosition =
			rectTrigger.top - rectPopup.height - props.gap * 2 >= 0
				? 'top'
				: 'bottom';
		[posLeft, posTop] = computePosWithDirection(
			preferPosition,
			rectPopup,
			rectTrigger,
			$trigger.value
		);
	}

	offsets.value = `translate3d(${posLeft}px, ${posTop}px, 0)`;
}

function computePosWithDirection(
	direction: TypePosition,
	rectPopup: DOMRect,
	rectTrigger: DOMRect,
	$trigger: HTMLElement
): [number, number] {
	let w = 0;
	let h = 0;
	let {
		left: tl,
		top: tt,
		right: tr,
		bottom: tb,
		width: tw,
		height: th
	} = rectTrigger;

	if (props.body) {
		w = window.innerWidth;
		h = window.innerHeight;
	} else {
		const rectPa = $trigger.offsetParent?.getBoundingClientRect() as DOMRect;
		w = rectPa.width;
		h = rectPa.height;
		tl = $trigger.offsetLeft;
		tt = $trigger.offsetTop;
		tr = tl + rectTrigger.width;
		tb = tt + rectTrigger.height;
	}

	const { height: ph, width: pw } = rectPopup;
	const gap = props.gap;

	let offestTop = 0;
	let offsetLeft = 0;

	switch (direction) {
		case 'left':
		case 'right':
			offestTop = computeOffset({
				totalSize: h,
				targetSize: th,
				targetOffset: tt,
				popupSize: ph,
				gap
			});
			offsetLeft = direction === 'left' ? tl - gap - pw : tr + gap;
			break;
		case 'top':
		case 'bottom':
			offsetLeft = computeOffset({
				totalSize: w,
				targetOffset: tl,
				targetSize: tw,
				popupSize: pw,
				gap
			});
			offestTop = direction === 'top' ? tt - gap - ph : tb + gap;
			break;
		default:
			break;
	}

	return [offsetLeft, offestTop];
}

function computeOffset(
	{
		totalSize,
		targetSize,
		targetOffset,
		popupSize,
		gap
	}: {
		totalSize: number;
		targetSize: number;
		targetOffset: number;
		popupSize: number;
		gap: number;
	},
	alignCenter: boolean = true
): number {
	let left = targetOffset + targetSize / 2 - popupSize / 2;

	if (left > gap && alignCenter) {
		return left;
	} else if (targetOffset + popupSize + gap < totalSize) {
		return targetOffset;
	} else {
		return targetOffset + targetSize - popupSize;
	}
}

function getNativeEventType<TypeTrigger extends string>(
	event: TypeTrigger
): string[] {
	switch (event) {
		case 'hover':
			return ['onMouseenter', 'onMouseleave'];
		case 'focus':
			return ['onFocus', 'onBlur'];
		default:
			return [`on${event}`, `on${event}`];
	}
}
</script>
