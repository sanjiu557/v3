<template>
  <div>
    <p>Counter: {{ counter }}</p>
  <button @click="update">
    Update
  </button>
<RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
import {customRef,watch,reactive,vModelText} from 'vue'

const state  = reactive({
   foo:1,
   bar:2
})

watch(state,(newValue,oldValue)=>{
  
},{
  
})
vModelText.beforeUpdate = (el,binding)=>{
  
}
const useLocalStorage = (key: string,initValue:any) => {
  const value = customRef<any>((track,trigger) => {
    return {
      get:()=>{
  track()
  return localStorage.getItem(key) ?? initValue
      },
      set:(newV)=>{
        trigger()
        localStorage.setItem(key,newV)
      }
    }
  })
  return value
}
const counter = useLocalStorage('counter','0')
const update = ()=>{
  counter.value++
}
</script>

<style scoped>

</style>