<template>
  <div class="video-container">
    <div class="video-card h-110px border-1 border-solid border-blue" v-for="i in 6">
     <div class="overflow-hidden relative">
      <img src="/src/assets/images/author/recommend.png" class="w-100% h-85px object-cover video-preview" alt="">
      <div class="video-mask absolute bottom-2px flex justify-between">
      <div>
        <SvgIcon name="fe:play"/>
        <span class="ml-3px">20</span>
      </div>
      <span>456</span>
      </div> 
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from 'S/components/SvgIcon.vue';


</script>

<style scoped lang="scss">
.video {
  &-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
  
    gap: 8px;
  }
  &-preview {
    // transform: translate(-50%,-50%);
    &:hover {
      transform: scale(1.5);
      transition: all 0.5s ease-out ;
    }
  }
}
</style>