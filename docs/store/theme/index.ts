import { watchEffect } from 'vue';
import { useState } from '@p/js/useState';
import { defineStore } from "pinia"

const themeStore = defineStore('theme', () => {
    const [theme, setTheme] = useState<boolean>(false);

    watchEffect(() => {
        const $html = document.documentElement as HTMLHtmlElement;
        $html.classList[theme.value? 'add': 'remove']('theme-dark');
    })

    return {
        theme,
        setTheme
    }
})

export default themeStore