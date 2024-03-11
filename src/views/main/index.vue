<template>
  <div>
    <button @click="openModal">打开模态框</button>
  <DefineModal @close="handleClose" @confirm="handleConfirm" :showClose="true" name="张三" :show="show">
    <div  class="text-red">我是一只猫</div>
    <!-- <template #footer>
      <button @click="handleClose">取消</button>
      <button @click="handleConfirm">确定</button>
    </template> -->
  </DefineModal>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import DefineModal from 'S/utils/DefineModal'
const personList = ref([{
  name: '张三',
  age: 18,
  sex: '男'
},
{
  name: '李四',
  age: 20,
  sex: '女'
}
])
const show = ref(false)
const openModal = () => {
 show.value = true
}
const handleClose=()=>{
 show.value = false
}
const handleConfirm =() =>{
 console.log(213);
  
}
</script>

<style scoped>

</style>