import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
// import { presetUno, presetAttributify, presetIcons } from 'unocss'
import   AutoImport from 'unplugin-auto-import/vite'
import Component from 'unplugin-auto-import/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
   resolve: {
    alias: {
      'S': path.resolve(__dirname,'src'),
      'C':path.resolve(__dirname, 'src/components')
    }
   },
  plugins: [
    vue(),
    Unocss(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Component({
      resolvers: [ElementPlusResolver()]
    })
  ],
})
