<template>
<button class="customButton" :class="{'border-rd-5px':props.round}">
  <slot></slot>
</button>
</template>

<script setup lang="ts">
const props =   defineProps({
  color:{
    type:String,
    default:'#8491a5'
  },
  round:{
    type:Boolean,
    default:true
  }
})
</script>

<style scoped lang="scss">
.customButton {
  border:none;
  color:v-bind('props.color');
  padding: 6px 12px;
  margin-left: 8px;
}
</style>