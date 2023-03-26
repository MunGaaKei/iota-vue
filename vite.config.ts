import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import { prismjsPlugin } from "vite-plugin-prismjs";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 27149,
  },
  plugins: [
    vue(),

    // set component name on script tag
    VueSetupExtend(),

    prismjsPlugin({
      languages: ["js", "html", "css", "json"],
    }),
  ],
  resolve: {
    alias: {
      "@p": resolve(__dirname, "./packages"),
      "@d": resolve(__dirname, "./docs"),
    },
  },
});
