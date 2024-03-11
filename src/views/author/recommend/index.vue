<template>
  <div>
<ListItem v-for="item in list" :info="item"/>
  </div>
</template>

<script setup lang="ts">
import  ListItem  from '../components/ListItem.vue'
const list = [
  {
    title:'123',
    content:'weuwquehuqwuequesdsdsdsadadadadasdddddddddddddddddddddddduqueuqueqeuqeuq',
    comments_count:138,
    favorite_count:5558
  },
  {
    title:'123',
    content:'weuwquehuqwuequeuqueuqueqeuqeuq',
    comments_count:33,
    favorite_count:1231
  },
  {
    title:'123',
    content:'weuwquehuqwuequeuqueuqueqeuqeuq',
    comments_count:232,
    favorite_count:466
  }
]
</script>

<style scoped lang="scss">

</style>