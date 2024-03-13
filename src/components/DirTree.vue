<template>
  <div>
    <ul class="directory-item p12px color-#8491a5" v-for="item in props.dirList">
<li @click.stop="changeState(item)" class="cursor-pointer">
<div class="ml-10px">
  <SvgIcon :name="item.kind=='file'?'mdi:file':'octicon:file-directory-fill-16'"/> 
     <span class="ml-6px">{{ item.name }}</span>
   <DirTree v-show="item.isShow"  v-if="item.children" :dirList="item.children"/>
</div>
</li>
   </ul>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from 'S/components/SvgIcon.vue';
import { inject } from 'vue';
interface DirectoryList {
  name:string,isShow:boolean,preName:string,kind:string,children?:DirectoryList[]
}
const props = defineProps<{dirList:DirectoryList[]}>()

const getContent = inject<(item:{name:string,preName:string})=>void>('getContent',(item:{name:string,preName:string})=>{})
const changeShowState = inject<(item:{name:string,preName:string,state:boolean})=>void>('changeShowState',(item:{name:string,preName:string,state:boolean})=>{})
  


// const emit = defineEmits<{
//   (e:'OpenOrClose',item:{name:string,preName:string,state:boolean}):void,
//   (e:'getContent',name:string):void
// }>()

const changeState = (item:DirectoryList)=>{
   
  if(item.kind=='file') {
    getContent({name:`${item.preName}/${item.kind}`,preName:item.preName})
    
  //  emit('getContent',`${item.preName}/${item.kind}`)
  } else {
    // item.isShow = !item.isShow
    changeShowState({name:item.name,preName:item.preName,state:!item.isShow})
    // return {name:item.name,preName:item.preName,state:!item.isShow}
    // emit('OpenOrClose',{name:item.name,preName:item.preName,state:!item.isShow})
  }
}
</script>

<style scoped lang="scss">

</style>