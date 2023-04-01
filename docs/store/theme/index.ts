import { useState } from "@p/js/useState";
import { defineStore } from "pinia";
import { watchEffect } from "vue";

const themeStore = defineStore("theme", () => {
    const [theme, setTheme] = useState<string>("auto");

    watchEffect(() => {
        const $html = document.documentElement as HTMLHtmlElement;

        for (const item of ["dark", "auto"]) {
            if (item === theme.value) {
                $html.classList.add(`theme-${item}`);
            } else {
                $html.classList.remove(`theme-${item}`);
            }
        }
    });

    return {
        theme,
        setTheme,
    };
});

export default themeStore;
