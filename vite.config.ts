import { defineConfig } from 'vite'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
// import { presetUno, presetAttributify, presetIcons } from 'unocss'
import AutoImport from 'unplugin-auto-import/vite'
import Component from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueJsx from '@vitejs/plugin-vue-jsx'

import process from 'node:process'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
	define: {
		__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
	},
	server: {
		open: false,
		host: '0.0.0.0',
	},
	resolve: {
		alias: {
			S: path.resolve(__dirname, 'src'),
			C: path.resolve(__dirname, 'src/components'),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use "./src/index.scss" as *;`,
			},
		},
	},
	plugins: [
		vue(),
		VueJsx(),
		Unocss(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Component({
			resolvers: [ElementPlusResolver()],
		}),
		createSvgIconsPlugin({
			iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/')],
			symbolId: 'icon-[dir]-[name]',
			svgoOptions: false,
		}),
	],
})
