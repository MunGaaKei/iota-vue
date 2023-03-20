<template>
    <div v-if="items.length" class="i-menu">
        <div
            v-for="(item, i) in items"
            :key="i"
            class="i-menu-item"
            :class="{
                'v-menu-expand': item.expanded,
            }"
        >
            <template v-if="item.type === 'subtitle'">
                <h4 class="i-menu-subtitle my-4 px-12" v-html="item.title"></h4>
            </template>

            <template v-else>
                <Tag
                    class="i-menu-item-header px-12 py-8"
                    :class="headerClass(item)"
                    active-class="i-menu-item-active"
                    :to="item.to"
                    :href="item.href"
                    @click="handleClick(item)"
                    v-ripple
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
                </Tag>

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

<script lang="ts" setup name="i-menu">
import { iIcon } from "@p/components";
import { KeyboardArrowDownRound } from "@vicons/material";
import { withDefaults, computed } from "vue";
import { TypeMenuItem } from "./types";
import { vRipple } from "@p/directives";
import Tag from "./tag-name.vue";

const props = withDefaults(
    defineProps<{
        items: TypeMenuItem[];
        depth?: number;
        selectable?: boolean;
        round?: boolean;
    }>(),
    {
        items: () => [],
        depth: 0,
    }
);

const emits = defineEmits<{
    (e: "item-click", item: TypeMenuItem): void;
}>();

const handleClick = (item: TypeMenuItem): void => {
    emits("item-click", item);

    if (hasChildren(item)) {
        item.expanded = !item.expanded;
    }
};

const expand = (e: Event, item: TypeMenuItem): void => {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    if (hasChildren(item)) {
        item.expanded = !item.expanded;
    }
};

const hasChildren = (item: TypeMenuItem): boolean => {
    return item.children?.length > 0;
};

const headerClass = (item: TypeMenuItem) => {
    return {
        "i-menu-item-round": props.round,
        "i-menu-item-selected": item.selected,
    };
};

const IconStyle = computed(() => {
    return {
        "margin-left": `${props.depth * 1.5}em`,
    };
});
</script>

<style lang="scss" scoped src="./menu.scss"></style>
