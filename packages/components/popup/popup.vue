<template>
	<component
		:is="triggerComponent"
		ref="$trigger"
		v-bind="$attrs"
	></component>

	<Teleport v-if="body" to="body">
		<div
			ref="$popup"
			v-if="mounted"
			class="i-popup"
			:style="popupStyle"
			v-clickoutside="handleClickoutside"
		>
			<slot></slot>
		</div>
	</Teleport>

	<div
		v-if="!body && mounted"
		ref="$popup"
		class="i-popup"
		:style="popupStyle"
		v-clickoutside="handleClickoutside"
	>
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import { vClickoutside } from "@p/directives";
import { error } from "@p/js/useLog";
import { usePosition } from "@p/js/usePosition";
import useResize from "@p/js/useResize";
import { useState } from "@p/js/useState";
import {
	StyleValue,
	VNode,
	computed,
	h,
	nextTick,
	onBeforeUnmount,
	ref,
	withDefaults,
	withModifiers,
} from "vue";
import "./popup.scss";
import type { Popup } from "./types";

const props = withDefaults(defineProps<Popup>(), {
	trigger: "hover",
	gap: 4,
});

defineOptions({
	name: "i-popup",
});

const [mounted, setMounted] = useState<boolean>(false);
const [show, setShow] = useState<boolean>(false);
const offsets = ref<string>("");
const $trigger = ref<HTMLElement>();
const $popup = ref<HTMLElement>();
const slots = defineSlots<{
	default: () => any;
	trigger: () => any;
}>();

const emits = defineEmits<{
	(e: "show"): void;
	(e: "hide"): void;
}>();

nextTick(() => {
	if (!$trigger.value) return;

	const $target = $trigger.value.querySelector(
		".i-popup-target"
	) as HTMLElement;

	if (!$target) return;

	$trigger.value = $target;
});

const triggerComponent = (): VNode | null => {
	if (slots.trigger) {
		const triggerSlots = slots.trigger();
		const events: Record<string, Function | Object> = {};

		if (!props.disabled) {
			if (props.trigger === "click") {
				events["onClick"] = () => toggle();
			} else {
				const [eventShow, eventHide] = getNativeEventType(
					props.trigger
				);
				events[eventShow] = withModifiers(() => toggle(true), ["self"]);
				events[eventHide] = withModifiers(
					() => toggle(false),
					["self"]
				);
			}
		}

		const element = triggerSlots.find((slot: VNode) => {
			return (
				Object.prototype.toString.call(slot.type) !== "[object Symbol]"
			);
		}) as VNode;

		if (element) {
			return h(element, {
				...events,
			});
		} else {
			error({
				text: `A text node cannot be a trigger.`,
			});
		}
	}

	return null;
};

const popupStyle = computed((): StyleValue => {
	return {
		pointerEvents: props.touchable ? "unset" : "none",
		opacity: show.value ? 1 : 0,
		transform: offsets.value,
	};
});

useResize(computePopupPos);
onBeforeUnmount(() => {
	useResize(computePopupPos, "unbind");
});

let toggling = false;
let timer: ReturnType<typeof setTimeout> | null = null;

function toggle(show?: boolean) {
	if (timer && show === false) {
		clearTimeout(timer);
		toggling = false;
		handleHide();
		return;
	}

	if (toggling) return;

	toggling = true;

	if (show !== undefined) {
		show ? handleShow() : handleHide();
	} else {
		mounted.value ? handleHide() : handleShow();
	}
}

function handleShow() {
	setMounted(true);
	nextTick(() => {
		emits("show");
		computePopupPos();
		setShow(true);
	});
	timer = setTimeout(() => {
		toggling = false;
		timer && clearTimeout(timer);
	}, 160);
}

function handleHide() {
	setShow(false);
	emits("hide");
	timer = setTimeout(() => {
		setMounted(false);
		toggling = false;
		timer && clearTimeout(timer);
	}, 160);
}

function handleClickoutside() {
	if (props.trigger === "click") {
		toggle(false);
	}
}

function computePopupPos(): void {
	let $t = $trigger.value;
	let $p = $popup.value;

	if (!$t || !$p) return;

	$t = ($t.querySelector(".i-popup-target") as HTMLElement) ?? $t;

	const rectTrigger: DOMRect = $t.getBoundingClientRect();
	const rectPopup: DOMRect = $p.getBoundingClientRect();

	const position =
		props.position ??
		(rectTrigger.top - rectPopup.height - props.gap * 2 >= 0
			? "top"
			: "bottom");

	const [posLeft, posTop] = usePosition($t, $p, {
		position,
		refBody: props.body,
		gap: props.gap,
	});

	offsets.value = `translate3d(${posLeft}px, ${posTop}px, 0)`;
}

function getNativeEventType<TypeTrigger extends string>(
	event: TypeTrigger
): string[] {
	switch (event) {
		case "hover":
			return ["onMouseenter", "onMouseleave"];
		case "focus":
			return ["onFocus", "onBlur"];
		default:
			return [`on${event}`, `on${event}`];
	}
}

defineExpose({
	toggle,
});
</script>
