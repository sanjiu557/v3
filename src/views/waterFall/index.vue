<template>
  <div>
    <input type="text" v-model="inputValue" v-focus>
   <base-water-fall @double-click="doubleClick" :fallList="falls" class="underline-dashed bg-blue" ></base-water-fall>
  </div>
</template>

<script setup lang="ts">
import BaseWaterFall from 'S/components/BaseWaterFall.vue';
import {reactive,computed,provide,ref} from 'vue'
import type {ComponentPublicInstance,VNodeTypes} from 'vue'
type Fall = {
  height: number,
  backgroundColor:string,
}
interface Binding {
  value: string;
  oldValue?: string;
  instance: ComponentPublicInstance;
  dir:Object;
  arg?: string;
  modifiers?: Object;
}
interface propType {
  name: string;
  value: string;
}
const test = provide<string>('test', 'Hello!')
const inputValue = ref<string>('')

const  falls =reactive<Fall[]>([{
  height:80,
  backgroundColor:'#45B39D'
},
{
  height:120,
  backgroundColor:'#16A085'
},
{
  height:230,
  backgroundColor:'#239B56'
},
{
  height:30,
  backgroundColor:'#0E6655'
},
{
  height:150,
  backgroundColor:'#21618C'
},
{
  height:190,
  backgroundColor:'#873600'
},
{
  height:60,
  backgroundColor:'#F0B27A'
},
{
  height:162,
  backgroundColor:'#633974'
},{
  height:381,
  backgroundColor:'#5D6D7E'
},
{
  height:135,
  backgroundColor:'#7B241C'
},
{
  height:80,
  backgroundColor:'#FFC107'
},
{
  height:38,
  backgroundColor:'#76D7C4'
},
{
  height:99,
  backgroundColor:'#58D68D'
},{
  height:26,
  backgroundColor:'#D35400'
},
{
  height:76,
  backgroundColor:'#6C3483'
},
{
  height:169,
  backgroundColor:'#ECF0F1'
},
{
  height:201,
  backgroundColor:'#2C3E50'
},

]
)
const vFocus = {
  mounted: (el: HTMLInputElement,binding:Binding,vnode:VNodeTypes) => {
    el.focus();
    console.log(binding,vnode)  
  }

  // (el,binding)=>{}
  // 函数形式定义的指令会在组件mounted和updated时都执行一次
}

const  TestArr = computed(()=>{
  return   falls.reduce((prev,cur)=>prev+cur.height,0)
})
const doubleClick = (res:number)=>{
console.log(res)
}
</script>

<style scoped lang="scss">

</style>