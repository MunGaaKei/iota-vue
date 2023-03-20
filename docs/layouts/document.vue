<template>
	<i-container
		layout="menu"
		sider-width="300px"
		i-model="collapsed"
		@sider-toggle="setCollapsed"
		breakpoint="940px"
	>
		<template #sider>
			<div class="px-4 py-12">
				<h2 class="px-12 mb-20">IVORY</h2>

				<i-menu
					:items="menus"
					seletable
				></i-menu>
			</div>
		</template>

		<template #header>
			<div class="py-8 px-12 flex">
				<i-button
					size="thin"
					flat
					@click="setCollapsed(!collapsed)"
				>
					<i-icon :icon="MenuFilled"></i-icon>
				</i-button>
				<i-checkbox
					@change="setTheme"
					class="ml-auto"
					type="switch"
					round
				>
					<i-icon :icon="NightsStayRound"></i-icon>
				</i-checkbox>
			</div>
		</template>

		<template #footer>
			<i
				@click="post('post by iann')"
				class="py-8 px-12 slight"
				>codes by iann</i
			>
		</template>

		<div class="pd-12">
			<router-view></router-view>
		</div>
	</i-container>
</template>

<script lang="ts" setup>
import { MenuFilled, NightsStayRound } from '@vicons/material';
import { vContainer, vButton, vIcon, vMenu, vCheckbox } from '@p/components';
import { useState } from '@p/js/useState';
import { ref } from 'vue';
import menu from '@d/config/menu';
import useTheme from '@d/store/theme';
import { useMessage } from '@p/components';

const [collapsed, setCollapsed] = useState<boolean>(false);
const { setTheme } = useTheme();
const menus = ref(menu);
const [post] = useMessage();
</script>
