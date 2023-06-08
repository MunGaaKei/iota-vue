<template>
	<div v-if="items.length" class="i-menu">
		<div
			v-for="(item, i) in items"
			:key="item.key || i"
			class="i-menu-item"
			:class="{
				'i-menu-expand': item.expanded,
			}"
		>
			<template v-if="item.type === 'title'">
				<h4 class="i-menu-subtitle my-4 px-12" v-html="item.title"></h4>
			</template>

			<template v-else>
				<component
					:is="
						useLinkTag({
							to: item.to,
						})
					"
					class="i-menu-item-header px-12 py-8"
					:class="headerClass(item)"
					active-class="i-menu-item-active"
					:to="item.to"
					:href="item.href"
					v-ripple="ripple"
					@click="handleClick(item, $event)"
				>
					<span class="i-menu-item-icon" :style="IconStyle">
						<i-icon :icon="item.icon"></i-icon>
					</span>

					<span class="i-menu-item-title">
						{{ item.title }}
					</span>

					<span
						v-if="hasChildren(item)"
						class="i-menu-toggle"
						@click="expand($event, item)"
					>
						<KeyboardArrowDownRound></KeyboardArrowDownRound>
					</span>
				</component>

				<div v-if="hasChildren(item)" class="i-menu-item-content">
					<i-menu
						:items="item.children"
						:depth="depth + 1"
						:round="round"
						:selectable="selectable"
						:selected="selected"
						:ripple="ripple"
						@item-click="handlePassClick"
						@toggle="handlePassToggle"
					></i-menu>
				</div>
			</template>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { vRipple } from "@p/directives";
import { iIcon } from "@p/index";
import useLinkTag from "@p/js/useLinkTag";
import { KeyboardArrowDownRound } from "@vicons/material";
import { computed, ref, watchEffect, withDefaults } from "vue";
import iMenu from "./index";
import "./menu.scss";
import type { Menu, MenuItem } from "./types";

defineOptions({
	name: "i-menu",
});

const props = withDefaults(defineProps<Menu>(), {
	items: () => [],
	depth: 0,
	ripple: true,
});

const selected = ref<MenuItem | undefined>(props.selected);

watchEffect(() => {
	selected.value = props.selected;
});

const emits = defineEmits<{
	(e: "item-click", item: MenuItem, evt: Event): void;
	(e: "toggle", expanded: boolean, item: MenuItem): void;
}>();

const handleClick = (item: MenuItem, e: Event) => {
	if (item.disabled) {
		e.preventDefault();
		e.stopPropagation();
		return false;
	}

	handlePassClick(item, e);

	hasChildren(item) && expand(e, item);
};

const handlePassClick = (item: MenuItem, e: Event) => {
	if (props.selectable) {
		selected.value = item;
	}

	emits("item-click", item, e);
};

const handlePassToggle = (expanded: boolean, item: MenuItem) => {
	emits("toggle", expanded, item);
};

const expand = (e: Event, item: MenuItem): void => {
	if (e) {
		e.preventDefault();
		e.stopPropagation();
	}

	if (hasChildren(item)) {
		item.expanded = !item.expanded;
		emits("toggle", item.expanded, item);
	}
};

const hasChildren = (item: MenuItem): boolean => {
	return item.children?.length > 0;
};

const headerClass = (item: MenuItem) => {
	return {
		round: props.round,
		disabled: item.disabled,
		"i-menu-item-active": item === selected.value,
	};
};

const IconStyle = computed(() => {
	return {
		"margin-left": `${props.depth * 1.5}em`,
	};
});
</script>
