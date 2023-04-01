<template>
    <i-container
        layout="menu"
        sider-width="300px"
        v-model="collapsed"
        @sider-toggle="setCollapsed"
        breakpoint="940px"
    >
        <template #sider>
            <div class="px-4 py-12">
                <h2 class="px-12 mb-20">IOTA V</h2>

                <i-menu :items="menus" seletable></i-menu>
            </div>
        </template>

        <template #header>
            <div class="py-8 px-12 flex align-center">
                <i-button size="thin" flat @click="setCollapsed(!collapsed)">
                    <i-icon :icon="MenuFilled"></i-icon>
                </i-button>

                <i-dropdown ref="$theme" body>
                    <template #trigger>
                        <i-button class="ml-auto" size="thin" flat>
                            <i-icon :icon="themeIcon"></i-icon>
                        </i-button>
                    </template>

                    <i-list type="option" class="pd-4 bg-blur">
                        <i-list-item
                            v-for="(item, key) in themes"
                            :key="key"
                            :active="theme === key"
                            @click="handleSelectTheme(key)"
                        >
                            <i-icon :icon="item"></i-icon>
                        </i-list-item>
                    </i-list>
                </i-dropdown>
            </div>
        </template>

        <template #footer>
            <i class="py-8 px-12 slight">CODES BY @IANN</i>
        </template>

        <div class="pd-12">
            <router-view></router-view>
        </div>
    </i-container>
</template>

<script lang="ts" setup>
import menu from "@d/config/menu";
import useTheme from "@d/store/theme";
import {
    iButton,
    iContainer,
    iDropdown,
    iIcon,
    iList,
    iListItem,
    iMenu,
} from "@p/components";
import { useState } from "@p/js/useState";
import {
    DarkModeTwotone,
    MenuFilled,
    TonalityRound,
    WbSunnyTwotone,
} from "@vicons/material";
import { storeToRefs } from "pinia";
import { computed, ref, shallowRef } from "vue";

const themeStore = useTheme();
const { theme } = storeToRefs(themeStore);
const { setTheme } = themeStore;
const [collapsed, setCollapsed] = useState<boolean>(false);
const menus = ref(menu);
const $theme = ref();
const themes = shallowRef({
    light: WbSunnyTwotone,
    dark: DarkModeTwotone,
    auto: TonalityRound,
});

const themeIcon = computed(() => {
    switch (theme.value) {
        case "light":
            return WbSunnyTwotone;
        case "dark":
            return DarkModeTwotone;
        default:
            return TonalityRound;
    }
});

const handleSelectTheme = (t: string) => {
    $theme.value.toggle(false);
    setTheme(t);
};
</script>
