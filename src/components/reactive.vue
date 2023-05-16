<template>
  <div>
      {{ animal.name }}
  </div>
  <button @click="change">change</button>
</template>

<script setup lang="ts">
// ref支持所有类型 （引用类型会隐式调用reactive） reactive只支持引用类型
// readonly() 只读，但是修改原对象会改变被readonly修饰过的值，因为readonly相当于对原对象进行了浅拷贝
import { reactive , isReactive ,shallowReactive, readonly  } from 'vue'
const play = (name:string):string=>{
    return `I like play ${name}`
}
const animal = reactive({
  name:'张三',
  age:18,
  action:play('ball')
})
const change = ()=>{
  animal.name = '李四'
}
</script>

<style scoped>

</style>