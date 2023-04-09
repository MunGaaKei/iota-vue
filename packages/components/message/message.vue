<template>
    <div
        :id="`i-message-${item.id}`"
        class="i-message px-12 py-4"
        :class="[
            {
                active: item.active,
            },
            item.classname,
        ]"
        :style="item.offsetTop"
        @click="handleClick"
    >
        <div
            v-if="typeof item.content === 'string'"
            v-html="item.content"
            class="i-message-content"
        ></div>
        <component v-else :is="renderStringOrVNode(item.content)"></component>
    </div>
</template>

<script lang="ts" setup name="i-message">
import { renderStringOrVNode } from "@p/js/utils";
import { withDefaults } from "vue";
import type { TypeMessage } from "./types";

const props = withDefaults(
    defineProps<{
        item: TypeMessage;
    }>(),
    {}
);

const handleClick = () => {
    props.item.close?.();
    props.item.onClose?.();
};
</script>
