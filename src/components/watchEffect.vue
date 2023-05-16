<template>
  <div>
<el-input v-model="content" placeholder="请输入" clearable  :disabled="content.length>=10"></el-input>
  </div>
</template>

<script setup lang="ts">
import {onUnmounted, ref} from 'vue'
let content = ref('')
let content1 = ref('')
// const stop =  watchEffect((before)=>{
// before(()=>{
        
// })
//       console.log(content.value)
//       console.log(content1.value)
// },{
//    flush:"post"
// })
// let  timer = setTimeout(stop,1000)
// onUnmounted(()=>{
//   clearTimeout(timer)
// })

</script>

<style scoped lang="sass">
$primary-color: #4a90e2
$secondary-color: #f5a623
$font-size: 16px
$padding: 10px
</style>