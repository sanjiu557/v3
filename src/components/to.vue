<template>
  <div>
{{man }}
  </div>
  <button @click="change"></button>
</template>

<script setup lang="ts">
// toRef只能修改响应式对象的值，对非响应式数据没有用处
// toRef内部实现函数没有做依赖的收集与更新，所以非响应式没有作用
// toRaw 将proxy代理对象转为普通对象，实际上是访问响应式对象上的[__v_raw]
import { toRef , toRefs , toRaw, reactive} from 'vue';
const man = {
  age:18,
  name:'李四',
  like:'女'
}
const man1 = reactive(man)
const like = toRef(man,'like')
const change = () =>{
like.value = '洛丽塔'
console.log(man1,toRaw(man1))
}
const myToRefs =<T extends object>(object:T) => {
  let map:any ={}
  for (let key in object) {
        map[key] = toRef(object,key)
  }
  return map
}
</script>

<style scoped>

</style>