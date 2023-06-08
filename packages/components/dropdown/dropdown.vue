<template>
	<i-popup
		v-bind="props"
		ref="$popup"
		@show="emits('show')"
		@hide="emits('hide')"
	>
		<template #trigger>
			<component :is="triggerComponent"></component>
		</template>
		<i-list v-if="options" class="bg-blur" type="option">
			<i-list-item
				v-for="option in options"
				:key="option.value"
				:active="modelValue === option.value"
				@click="handleSelect(option)"
			>
				<StringOrVNode :content="option.label"></StringOrVNode>
			</i-list-item>
		</i-list>
		<slot v-else></slot>
	</i-popup>
</template>

<script setup lang="ts">
import { iList, iListItem, iPopup } from "@p/index";
import { VNode, h, ref, withDefaults } from "vue";
import { Option } from "../@types";
import StringOrVNode from "../common/StringOrVNode.vue";
import "./dropdown.scss";
import type { Dropdown } from "./types";

defineOptions({
	name: "i-dropdown",
});

const slots = defineSlots<{
	default: () => any;
	trigger: () => any;
}>();
const $popup = ref();

const props = withDefaults(defineProps<Dropdown>(), {
	trigger: "click",
	position: "bottom",
	touchable: true,
});

const emits = defineEmits<{
	(e: "update:modelValue", v: string | number): void;
	(e: "select", v: Option): void;
	(e: "show"): void;
	(e: "hide"): void;
}>();

const triggerComponent = (): VNode | undefined => {
	if (slots.trigger) {
		const triggerSlots = slots.trigger();
		const element = triggerSlots.find((slot: VNode) => {
			return slot.type !== "symbol" && typeof slot.children !== "string";
		}) as VNode;
		return h(element);
	}

	return undefined;
};

const handleSelect = (option: Option) => {
	emits("select", option);
	emits("update:modelValue", option.value);
	$popup.value.toggle(false);
};

defineExpose({
	toggle: (show?: boolean) => {
		$popup.value.toggle(show);
	},
});
</script>
