<template>
    <h3 class="mb-12">使用</h3>

    <Demo :code="configCode">
        <i-button
            :loading="config.loading"
            :disabled="config.disabled"
            :block="config.block"
            :round="config.round"
            :outline="config.outline"
            :flat="config.flat"
        >
            BUTTON
        </i-button>

        <template #config>
            <div class="pd-20">
                <i-grid cols="4 3:800 2:600" gap="12px" refer="container">
                    <i-checkbox v-model="config.loading" type="switch">
                        loading
                    </-checkbox>
                    <i-checkbox v-model="config.disabled" type="switch">
                        disabled
                    </-checkbox>
                    <i-checkbox v-model="config.round" type="switch">
                        round
                    </-checkbox>
                    <i-checkbox v-model="config.block" type="switch">
                        block
                    </-checkbox>
                    <i-checkbox v-model="config.outline" type="switch">
                        outline
                    </-checkbox>
                    <i-checkbox v-model="config.flat" type="switch">
                        flat
                    </-checkbox>
                </v-grid>
            </div>
        </template>
    </Demo>

    <h3 class="mt-80 mb-12">颜色</h3>
    <Demo :code="colorCode">
        <i-button flat class="green">Green</i-button>
        <i-button outline class="red mx-12">
            <i-icon :icon="WarningRound" size="1.2em"></i-icon>
            Red
        </i-button>
        <i-button class="bg-blue">Blue</i-button>
        <i-button class="bg-blue-slight">Black Slight</i-button>
    </Demo>

    <h3 class="mt-80 mb-20">属性设置</h3>

    <prop
        v-for="(p, i) in propsGuidence"
        :key="i"
        :name="p.name"
        :type="p.type"
        :default-value="p.defaultValue"
        >{{ p.desc }}</prop
    >
</template>

<script setup lang="ts" name="page-button">
import { WarningRound } from "@vicons/material";
import Prop from "@d/components/Prop.vue";
import { computed, reactive } from "@vue/reactivity";
import { iButton, iCheckbox, iGrid, iIcon } from "@p/components";
import Demo from "@d/components/Demo.vue";

const config = reactive<{
    loading: boolean;
    disabled: boolean;
    round: boolean;
    block: boolean;
    outline: boolean;
    flat: boolean;
}>({
    loading: false,
    disabled: false,
    round: false,
    block: false,
    outline: false,
    flat: false,
});

const propsGuidence = [
    {
        name: "tag",
        type: "'a' | 'button'",
        defaultValue: "'button'",
        desc: "按钮标签名",
    },
    {
        name: "to",
        type: "string",
        defaultValue: "",
        desc: "使用为<router-link>",
    },
    {
        name: "outline",
        type: "boolean",
        defaultValue: "false",
        desc: "按钮为中空带边框",
    },
    {
        name: "flat",
        type: "boolean",
        defaultValue: "false",
        desc: "按钮无背景色和边框",
    },
    {
        name: "loading",
        type: "boolean",
        defaultValue: "false",
        desc: "按钮呈加载状态",
    },
    {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        desc: "按钮呈无效状态",
    },
    {
        name: "size",
        type: "'normal' | 'thin' | 'small' | 'large'",
        defaultValue: "'normal'",
        desc: "按钮尺寸，'thin'和'small'的区别在于左右内间距",
    },
    {
        name: "block",
        type: "boolean",
        defaultValue: "false",
        desc: "按钮100%宽度",
    },
    {
        name: "round",
        type: "boolean",
        defaultValue: "false",
        desc: "按钮圆角",
    },
    {
        name: "ripple",
        type: "boolean",
        defaultValue: "true",
        desc: "按钮点击波纹效果",
    },
    {
        name: "button-type",
        type: "'submit' | 'reset' | 'button'",
        defaultValue: "'button'",
        desc: "当按钮为<button>标签时，它的原生[type]属性",
    },
];

const configCode = computed(() => {
    return `
<i-button :loading="${config.loading}"
    :disabled="${config.disabled}"
    :block="${config.block}"
    :outline="${config.outline}"
    :flat="${config.flat}"
    :round="${config.round}">
    按钮
</i-button>

`;
});

const colorCode = computed(() => {
    return `
<i-button flat class="black">Black</i-button>
<i-button outline class="red mx-12">
    <i-icon :icon="WarningRound" size="1.2em"></i-icon>
    Red
</i-button>
<i-button class="bg-blue">Blue</i-button>

`;
});
</script>