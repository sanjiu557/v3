<template>
  <div class="h-100%  flex flex-justify-center flex-items-center flex-1 flex-nowrap m-r-5">
     <span class="inline-block m-l-8 m-r-8 pa-2 hover-border-b-1  hover-border-b-solid hover-cursor-pointer  hover-bg-purple border-rd-3 flex-shrink-0" v-for="item in props.tabs" :key="item.key" @click="handleClick(item)">{{item.name}}</span>
  </div>
</template>

<script setup lang="ts">
interface  TabsProp {
  name:string,
  key:string|number,
  cb?:Function,
  meta?:any
}
interface Props {
  tabs:TabsProp[],
}


const props = withDefaults(defineProps<Props>(),{
tabs:()=>{
  return [
    {
      name: 'Tab 1',
      key: 1
    },
    {
      name: 'Tab 2',
      key: 2
    },
    {
      name: 'Tab 3',
      key: 3
    }
  ]
}
})
const emits = defineEmits(['clickTab'])
const handleClick = (item:TabsProp)=>{
     emits('clickTab',item.key)
}
</script>

<style scoped lang="scss"> 

</style>