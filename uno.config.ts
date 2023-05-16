import {defineConfig,presetIcons,presetUno,presetAttributify} from 'unocss'

export default defineConfig({
  rules: [['f_c',{display:'flex',justifyContent:'center',alignItems:'center'}],
  ['w-h-100',{width:'100%',height:'100%'}]

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