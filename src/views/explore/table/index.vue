<template>
  <div>
table组件
<CustomInput v-model.capitalize="text"/>
<input type="text" v-model="value.name">
  </div>
</template>

<script setup lang="ts">
import CustomInput from "./components/customInput.vue";
import {ref,reactive, watch} from "vue";
const text = ref("");
const value = ref({name:"张三"})
watch(()=>value,(newV)=>{
  console.log(newV);
  
},{deep:true})

</script>

<style scoped>

</style>