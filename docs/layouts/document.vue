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
      <div class="py-8 px-12 flex">
        <i-button size="thin" flat @click="setCollapsed(!collapsed)">
          <i-icon :icon="MenuFilled"></i-icon>
        </i-button>
        <i-button>
          <i-icon :icon="NightsStayRound"></i-icon>
        </i-button>
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
import { MenuFilled, NightsStayRound } from "@vicons/material";
import { iContainer, iButton, iIcon, iMenu, iCheckbox } from "@p/components";
import { useState } from "@p/js/useState";
import { ref } from "vue";
import menu from "@d/config/menu";
import useTheme from "@d/store/theme";

const [collapsed, setCollapsed] = useState<boolean>(false);
const { setTheme } = useTheme();
const menus = ref(menu);
</script>
