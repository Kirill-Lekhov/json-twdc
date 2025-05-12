import { resolve } from "path"

import { defineConfig } from "vite"
import dts from "vite-plugin-dts"


export default defineConfig({
	build: {
		lib: {
			entry: {
				"json-twdc": resolve(__dirname, "src/index.ts"),
				"json-twdc/field": resolve(__dirname, "src/field/index.ts"),
				"json-twdc/modifier": resolve(__dirname, "src/modifier/index.ts"),
			},
			fileName: (format, entryName) => `json-twdc-${entryName}.${format}.js`,
		},
		rollupOptions: {
			input: {
				main: resolve(__dirname, "src/index.ts"),
				field: resolve(__dirname, "src/field/index.ts"),
				modifier: resolve(__dirname, "src/modifier/index.ts"),
			},
		},
	},
	plugins: [dts()],
})
