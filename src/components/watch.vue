<template>
  <div>
          content: <input type="text" v-model="content">
          content1: <input type="text" v-model="content1">
  </div>
</template>

<script setup lang="ts">
import {ref,reactive,watch} from 'vue'
let  content = ref('')
let  content1 = ref('')
watch([content,content1],(newVal,oldVal)=>{
  console.log(newVal,oldVal)
},{
  // flush:"pre",   // 组件更新前调用  sync 同步执行 post 更新之后指向性
  //  immediate:true,  // 立即执行监听
  //  deep:true   // 深度监听
}) 
</script>

<style scoped>

</style>