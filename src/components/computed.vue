<template>
  <div>
<table  border style="width: 800px">
  <thead>
    <tr>
      <th>名称</th>
      <th>数量</th>
      <th>单价</th>
      <th>操作</th>
    </tr>
  </thead>
  <tbody>
    <tr :key="item.name" v-for="item,index in shopList">
      <td>{{ item.name }}</td>
      <td><button @click="shop(item,false)">-</button>{{ item.num }}<button @click="shop(item,true)" >+</button></td>
      <td>{{ item.price}}</td>
      <td><button @click="del(index)">删除</button></td>
    </tr>
  </tbody>
  <tfoot>
    <td></td>
    <td></td>
    <td></td>
    <td>总价:&nbsp;{{ total }}</td>
  </tfoot>
</table>
  </div>
</template>

<script setup lang="ts">
import {reactive,computed,ref} from 'vue'
type Shop = {
  num:number,
  price:string|number,
  name:string
}
const  shopList = reactive<Shop[]>([
{
  num:1,
  price:302,
  name:'裤子'
},
{
  num:1,
  price:204,
  name:'衣服'
},
{
  num:1,
  price:603,
  name:'鞋靴'
}
])
let total = computed(()=>{
  return shopList.reduce((prev,curr)=>{return prev+(curr.num*~~curr.price)},0)
})
const del = (index:number) => {
   shopList.splice(index,1)
}
const shop = (item:Shop,type:boolean) => {
    if(item.num>1 && !type) {
       item.num--
    }
    if(item.num<99 && type) {
      item.num++
    }
}
</script>

<style scoped>

</style>