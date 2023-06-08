<template>
	<div class="flex flex-column items-center justify-center h-100vh">
		<h1>IOTA</h1>
		<h4 class="black-5 mt-12 mb-60">VUE3 UI</h4>
		<div class="flex">
			<i-button
				flat
				square
				href="https://github.com/MunGaaKei/iota-vue"
				target="_blank"
			>
				<i-icon :icon="Github"></i-icon>
			</i-button>
			<i-button to="/docs/button" flat square class="mx-8">
				<i-icon :icon="CodeRound"></i-icon>
			</i-button>
			<i-dropdown v-model="theme" :options="themeOptions" body>
				<template #trigger>
					<i-button class="ml-auto" square flat>
						<i-icon :icon="themeIcon"></i-icon>
					</i-button>
				</template>
			</i-dropdown>
		</div>
	</div>
</template>

<script setup lang="ts">
import useGlobalSettings from "@d/store/settings";
import { iButton, iDropdown, iIcon } from "@p/index";
import { Github } from "@vicons/fa";
import {
	CodeRound,
	DarkModeTwotone,
	TonalityRound,
	WbSunnyTwotone,
} from "@vicons/material";
import { storeToRefs } from "pinia";
import { computed, h } from "vue";

const settingsStore = useGlobalSettings();
const { theme } = storeToRefs(settingsStore);
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
</script>
