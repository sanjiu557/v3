<template>
  <div>
    <el-dropdown :trigger="props.trigger" size="default" placement="bottom"   @command="">      
     <slot></slot>
   <template #dropdown>
   <!-- <el-dropdown-menu> -->
       <div class="profile_drop_container p6px">
     <div class="profile-title relative flex items-center">
      <img src="src/assets/images/people/avator.jpg" class=" w-50px h-50px ml-25px"  alt="">
      <div class="title-info m-l-20px flex-1">
          <div>整个羊村我最膻</div>
          <div>清早起来去~</div>
      </div>
     </div>
     <div class="profile-content flex mt-18px">
       <div class="flex-1 ">
        <div class=" flex-col f_c">
          <span>回答</span>
          <span class="font-700">100</span>
        </div>
       </div>
       <div class="flex-1">
        <div class=" flex-col  f_c">
          <span>文章</span>
          <span  class="font-700">100</span>
        </div>
       </div>
       <div class="flex-1">
        <div class="flex-col  f_c">
          <span>关注</span>
          <span  class="font-700">100</span>
        </div>
       </div>

     </div>
     <div class="profile-action mt-18px mb-12px">
       <button class="btn genBtn w-120px bg-#1772f6 ml-12px">
<div class="f_c">
  <SvgIcon name="mingcute:add-line"/>
        <span class="ml-2px">关注他</span>
</div>
       </button>
       <button class="btn cancelBtn w-120px color-#8491a5 mr-12px ml-18px" >
<div class="f_c">
  <SvgIcon name="tabler:message-circle-2-filled"/>

<span class="ml-2px">发私信</span>
</div>
       </button>
     </div>
       </div>
   <!-- </el-dropdown-menu> -->
  </template>
   </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from './SvgIcon.vue';
const props = defineProps<{trigger:'hover'|'click'}>()
</script>

<style scoped lang="scss">
.btn {
    cursor: pointer;
    border-radius: 2px;
    padding:10px 8px;
    min-width: 160px;
   }
  .genBtn {
   border: none; 
   color: #fff;
   &:hover {
     background-color: #0965ea;
   }
  }
  .cancelBtn {
    background-color: #fff;
    border: 1px solid #dcdfe6;
  }
</style>