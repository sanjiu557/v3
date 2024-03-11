<template>
  <div class="h-100%  flex flex-justify-center flex-items-center flex-1 flex-nowrap m-r-5">
     <span class="inline-block m-l-8 m-r-8 pa-2 hover-border-b-1  hover-border-b-solid hover-cursor-pointer   border-rd-3 flex-shrink-0" :class="{'bg-purple':tabName===item.name?true:false}" v-for="item in props.tabs" :key="item.key" @click="handleClick(item)">{{item.name}}</span>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref,isRef,isReactive, computed} from 'vue'
import { useRoute,onBeforeRouteLeave,onBeforeRouteUpdate } from 'vue-router';
interface  TabsProp {
  name:string,
  key:string|number,
  cb?:Function,
  meta?:any
}
interface Props {
  tabs:TabsProp[],
}

const route = useRoute()
onBeforeRouteLeave((to,from)=>{
  // TODO 需要一个函数式弹窗组件
})
const tabName = computed(()=>{
 const res =  route.path.replace('/','').split('')?.map((item,index)=>{
    if(index===0){
      return item.toUpperCase()
    }else{
      return item
    }
  })
  return res.length==0?'Home':res.join('')
})
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
     emits('clickTab',item.name)
}

</script>

<style scoped lang="scss"> 

</style>