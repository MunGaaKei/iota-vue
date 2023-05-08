<template>
	<i-container layout="menu" v-model="collapsed" breakpoint="940px">
		<template #sider>
			<div class="px-4 py-12" style="min-width: 300px">
				<h2 class="px-12 mb-20">
					<router-link to="/" class="color-main">IOTA V</router-link>
				</h2>

				<i-menu :items="menus" seletable></i-menu>
			</div>
		</template>

		<template #header>
			<div class="py-8 px-12 flex flex-1 align-center">
				<i-button square flat @click="setCollapsed(!collapsed)">
					<i-icon :icon="MenuFilled"></i-icon>
				</i-button>

				<i-dropdown v-model="theme" :options="themeOptions" body>
					<template #trigger>
						<i-button class="ml-auto" square flat>
							<i-icon :icon="themeIcon"></i-icon>
						</i-button>
					</template>
				</i-dropdown>

				<i-dropdown v-model="locale" :options="localeOptions" body>
					<template #trigger>
						<i-button class="ml-4" square flat>
							<i-icon :icon="TranslateRound"></i-icon>
						</i-button>
					</template>
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
import useGlobalSettings from "@d/store/settings";
import { iButton, iContainer, iDropdown, iIcon, iMenu } from "@p/components";
import { useState } from "@p/js/useState";
import {
	DarkModeTwotone,
	MenuFilled,
	TonalityRound,
	TranslateRound,
	WbSunnyTwotone,
} from "@vicons/material";
import { storeToRefs } from "pinia";
import { computed, h, ref } from "vue";

const [collapsed, setCollapsed] = useState<boolean>(false);
const menus = ref(menu);
const settingsStore = useGlobalSettings();
const { theme, locale } = storeToRefs(settingsStore);
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

const themeOptions = [
	{
		label: h(iIcon, { icon: WbSunnyTwotone }),
		value: "light",
	},
	{
		label: h(iIcon, { icon: DarkModeTwotone }),
		value: "dark",
	},
	{
		label: h(iIcon, { icon: TonalityRound }),
		value: "auto",
	},
];

const localeOptions = [
	{
		label: "简体中文",
		value: "zh-CN",
	},
	{
		label: "English",
		value: "en",
	},
];
</script>
