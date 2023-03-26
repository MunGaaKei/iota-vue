<template>
  <h3 class="mb-12">种类</h3>

  <i-grid cols="4 3:1000 2:800" gap="12px" class="my-40" refer="container">
    <template v-for="color in names" :key="color">
      <div class="rounded-slight" style="overflow: hidden">
        <div class="pd-12" :class="`bg-${color}`">
          <b>.{{ color }}: {{ colors[color] }}</b>
        </div>
        <div class="pd-12" :class="`bg-${color}-1`">1</div>
        <div class="pd-12" :class="`bg-${color}-2`">2</div>
        <div class="pd-12" :class="`bg-${color}-slight`">slight</div>
      </div>
    </template>
  </i-grid>

  <h3 class="mt-12">按钮颜色</h3>
  <i-grid gap="12" cols="12">
    <i-button
      v-for="color in Object.keys(colors)"
      :key="color"
      :class="`bg-${color}`"
      >{{ color }}</i-button
    >
  </i-grid>
  <i-grid gap="12" cols="12">
    <i-button
      v-for="color in Object.keys(colors)"
      :key="color"
      :class="`bg-${color}-slight`"
      flat
      >{{ color }}</i-button
    >
  </i-grid>

  <h3 class="mb-12 mt-80">类名规则</h3>
  <i-list class="mt-12" label-width="60px">
    <i-list-item type="title">
      <code>.bg-[color]-[n]</code>
    </i-list-item>
    <i-list-item type="title">
      <code>.[color]-[n]</code>
    </i-list-item>
    <i-list-item label="[color]"> 颜色名称，可选值如上 </i-list-item>
    <i-list-item label="[n]">
      颜色程度，可选值为 <code>1</code>、<code>2</code>、<code>slight</code>
    </i-list-item>
  </i-list>
</template>

<script lang="ts" setup>
import { iGrid, iList, iListItem, iButton } from "@p/components";

const colors: Record<string, string> = {
  white: "#fff",
  black: "#000",
  red: "#dc143c",
  blue: "#1e90ff",
  green: "#419175",
  yellow: "#ffc549",
  grey: "#d7d7d7",
  pink: "#ff69b4",
  purple: "#8a2be2",
};
const names = Object.keys(colors);
</script>
