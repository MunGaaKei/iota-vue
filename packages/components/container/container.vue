<template>
    <div class="i-container" v-if="layout === 'default'">
        <header v-if="slots.header" class="i-header bg-blur sticky">
            <slot name="header"></slot>
        </header>

        <div class="flex">
            <div
                v-if="slots.sider"
                ref="$sider"
                class="i-sider bg-blur"
                :class="{
                    'i-sider-fixed': matchBreakpoint,
                }"
                :style="siderCSS"
                v-clickoutside="handleClickoutside"
            >
                <slot name="sider"></slot>
            </div>
            <div class="v-content" :style="contentCSS">
                <slot></slot>
            </div>
        </div>

        <footer
            v-if="slots.footer"
            class="i-footer bg-blur"
            :class="{
                sticky: stickyFooter,
            }"
        >
            <slot name="footer"></slot>
        </footer>
    </div>

    <div v-else class="i-container flex">
        <div
            v-if="slots.sider"
            ref="$sider"
            class="i-sider bg-blur"
            :class="{
                'i-sider-fixed': matchBreakpoint,
            }"
            :style="siderCSS"
            v-clickoutside="handleClickoutside"
        >
            <slot name="sider"></slot>
        </div>
        <div class="i-content" :style="contentCSS">
            <header v-if="slots.header" class="i-header bg-blur sticky">
                <slot name="header"></slot>
            </header>

            <slot></slot>

            <footer
                v-if="slots.footer"
                class="i-footer bg-blur"
                :class="{
                    sticky: stickyFooter,
                }"
            >
                <slot name="footer"></slot>
            </footer>
        </div>
    </div>
</template>

<script setup lang="ts" name="i-container">
import { vClickoutside } from "@p/directives";
import { useState } from "@p/js/useState";
import { computed, ref, useSlots, withDefaults } from "vue";
import "./container.scss";

const props = withDefaults(
    defineProps<{
        layout?: "default" | "menu";
        modelValue?: boolean;
        breakpoint?: string;
        stickyFooter?: boolean;
        contentStyle?: Object;
        siderStyle?: Object;
    }>(),
    {
        layout: "default",
        hideSider: false,
        breakpoint: "980px",
        stickyFooter: false,
    }
);

const slots = useSlots();
const $sider = ref();
const [matchBreakpoint, setMatchBreakpoint] = useState<boolean>(false);
const emits = defineEmits<{
    (e: "update:modelValue", v: boolean): void;
}>();

const siderCSS = computed(() => {
    return {
        transform: props.modelValue ? "translate(-100%, 0)" : "",
        ...props.siderStyle,
    };
});
const contentCSS = computed(() => {
    const w = $sider.value?.offsetWidth;

    return {
        marginLeft:
            !matchBreakpoint.value && props.modelValue && $sider.value
                ? `-${w}px`
                : 0,
        ...props.contentStyle,
        maxWidth: props.modelValue ? "unset" : "null",
    };
});

if (props.breakpoint) {
    const mql = window.matchMedia(`(max-width: ${props.breakpoint})`);

    mql.addEventListener("change", () => {
        triggerToggle(mql.matches);
        setMatchBreakpoint(mql.matches);
    });

    if (mql.matches) {
        triggerToggle(true);
        setMatchBreakpoint(true);
    }

    function triggerToggle(v: boolean) {
        emits("update:modelValue", v);
    }
}

const handleClickoutside = () => {
    if (matchBreakpoint.value) {
        emits("update:modelValue", true);
    }
};
</script>
