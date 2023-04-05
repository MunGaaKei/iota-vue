import { useState } from "@p/js/useState";
import { defineStore } from "pinia";
import { watchEffect } from "vue";

const settingsStore = defineStore("settings", () => {
    const { language } = navigator;
    const [theme, setTheme] = useState<string>("auto");
    const [locale, setLocale] = useState<string>(language);

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
        locale,
        theme,
        setTheme,
    };
});

export default settingsStore;
