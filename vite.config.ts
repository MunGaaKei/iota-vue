import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { defineConfig } from "vite";
import { prismjsPlugin } from "vite-plugin-prismjs";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: 27149,
	},
	plugins: [
		vue(),

		prismjsPlugin({
			languages: ["js", "html", "css", "json", "bash"],
		}),
	],
	resolve: {
		alias: {
			"@p": resolve(__dirname, "./packages"),
			"@d": resolve(__dirname, "./docs"),
		},
	},
});
