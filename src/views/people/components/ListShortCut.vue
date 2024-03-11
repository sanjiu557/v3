<template>
  <div class="list">
    <div class="list_title">
      <span>我的{{props.current.name}}</span>
    </div>
    <div class="list_body">

    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
     current:{
      name: string;
   label: string;
    count?:string;
     }
}
const props = withDefaults(defineProps<Props>(),{
  current:{
    name:'',
    label:''
  }
}) 
</script>

<style scoped lang="scss">
.list {
  &_title {
    height: 50px;
    line-height: 50px;
    border-top: 1px solid #f8f8fa;
    border-bottom: 1px solid #f8f8fa;
    span {
      padding-left: 20px;
      font-weight:700;
    }
  }
}
</style>