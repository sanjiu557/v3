<template>
  <div>
 {{ person.name}}
  </div>
  <div>
 {{ person2.name}}
  </div>
  <div ref="zs">这是在ref上的内容</div>
  <button @click="change">change</button>
  <router-view></router-view>
</template>

<script setup lang="ts">
//  shallowRef 浅层响应ref，如果多层嵌套数组或对象只代理一层
//  ref不要和shallowRef写在一块，依赖更新时会影响shallowRef页面更新
// ref传入的如果是引用类型的数据底层会调用reactive，shallowRef不会
//  triggerRef() 强制收集依赖更新
// customRef自定义ref 接收一个回调函数，有track和trigger两个参数，要求要返回一个包含get和set方法的对象
 import {ref, isRef,shallowRef,triggerRef,customRef} from 'vue'
 import type { Ref } from 'vue';
 interface Name {
  name:string
 }
  const person= ref<Name>({
    name:'小'
  })
  const person2= shallowRef({
    name:'浅层ref'
  })
  const person3 = {name:'小'}
  const zs = ref<HTMLDivElement>()
  console.log(isRef(person2))

  // 函数
  const change = () =>{
    person2.value.name ='大'
    triggerRef(person2)
    console.log(zs.value?.textContent)
  }
  function myRef<T>(value:T) {
return customRef((track,trigger)=>{
  return {
    get() {
        track()
        return value
    },
    set(newVal) {
   value = newVal
   trigger()
    }
  }
})
  }
</script>

<style scoped>

</style>