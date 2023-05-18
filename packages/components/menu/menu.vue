<template>
	<div v-if="items.length" class="i-menu">
		<div
			v-for="(item, i) in items"
			:key="i"
			class="i-menu-item"
			:class="{
				'i-menu-expand': item.expanded,
			}"
		>
			<template v-if="item.type === 'subtitle'">
				<h4 class="i-menu-subtitle my-4 px-12" v-html="item.title"></h4>
			</template>

			<template v-else>
				<component
					:is="
						useLinkTag({
							tag: 'a',
							to: item.to,
						})
					"
					class="i-menu-item-header px-12 py-8"
					:class="headerClass(item)"
					active-class="i-menu-item-active"
					:to="item.to"
					:href="item.href"
					v-ripple="ripple"
					@click.native="handleClick($event, item)"
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
						:seletable="selectable"
					></i-menu>
				</div>
			</template>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { iIcon } from "@p/components";
import { vRipple } from "@p/directives";
import useLinkTag from "@p/js/useLinkTag";
import { KeyboardArrowDownRound } from "@vicons/material";
import { computed, withDefaults } from "vue";
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

const emits = defineEmits<{
	(e: "item-click", item: MenuItem): void;
}>();

const handleClick = (e: Event, item: MenuItem) => {
	if (item.disabled) {
		console.log(1);

		e.preventDefault();
		e.stopPropagation();
		return false;
	}

	emits("item-click", item);

	if (hasChildren(item)) {
		item.expanded = !item.expanded;
	}
};

const expand = (e: Event, item: MenuItem): void => {
	if (e) {
		e.preventDefault();
		e.stopPropagation();
	}

	if (hasChildren(item)) {
		item.expanded = !item.expanded;
	}
};

const hasChildren = (item: MenuItem): boolean => {
	return item.children?.length > 0;
};

const headerClass = (item: MenuItem) => {
	return {
		round: props.round,
		disabled: item.disabled,
		"i-menu-item-selected": item.selected,
	};
};

const IconStyle = computed(() => {
	return {
		"margin-left": `${props.depth * 1.5}em`,
	};
});
</script>
