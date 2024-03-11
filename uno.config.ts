import {defineConfig,presetIcons,presetUno,presetAttributify} from 'unocss'

export default defineConfig({
  rules: [['f_c',{display:'flex','justify-content':'center','align-items':'center'}],
  ['g_c',{display:'grid','justify-content':'center','align-items':'center'}],
  ['w-h-100',{width:'100%',height:'100%'}],
  [/^font-s-(\d+)$/,([,d])=>({'font-size':`${d}px`})],
  ['f-i-c',{display:'flex','align-items':'center'}]
],
presets: [
  presetAttributify(),
  presetUno(),
  presetIcons({
   collections: {
    logos:()=>
      import('@iconify-json/logos').then(i=>i.icons as any),
    mingcute:() => import('@iconify-json/mingcute').then(i=>i.icons as any)
   }
  })
]
})