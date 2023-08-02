import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import vue from "rollup-plugin-vue";

export default [
	{
		input: "packages/index.ts",
		output: [
			{
				name: "iota-v",
				file: `lib/index.esm.js`,
				format: "es",
			},
		],
		plugins: [
			vue(),
			typescript({
				tsconfigOverride: {
					compilerOptions: { declaration: true },
				},
			}),
			terser(),
			nodeResolve({
				extensions: [".ts"],
			}),
			postcss({
				extensions: [".css", ".scss"],
			}),
			commonjs({
				include: ["node_modules/**", "node_modules/**/*"],
			}),
		],
	},
];
