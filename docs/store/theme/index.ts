import { watchEffect } from "vue";
import { useState } from "@p/js/useState";
import { defineStore } from "pinia";

const themeStore = defineStore("theme", () => {
  const [theme, setTheme] = useState<string>();

  watchEffect(() => {
    const $html = document.documentElement as HTMLHtmlElement;

    $html.classList.toggle("theme-dark");
  });

  return {
    theme,
    setTheme,
  };
});

export default themeStore;
