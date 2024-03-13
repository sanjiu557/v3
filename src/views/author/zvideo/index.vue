<template>
  <div>
 <video-card :dropdown="dropDownList" :list="videoList"></video-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VideoCard from '../components/VideoCard.vue';



const videoList = ref<any[]>([

])
const dropDownList= [
  {
    title:'不感兴趣',
    content:[
      {name:'减少相似内容推荐',icon:'lucide:heart-crack'},
      {name:'不看该作者',icon:'mi:user'}
    ]
  },
  {
    title:'内容反馈',
    content:[
      {name:'内容重复',icon:'lucide:copy'},
      {name:'内容质量差',icon:'mi:user'}
    ]
  }
]

</script>

<style scoped lang="scss">

</style>