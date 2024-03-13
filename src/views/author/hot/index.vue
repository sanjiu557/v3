<template>
  <div>
    <div class="listItem flex">
      <div class="itemDesc flex-1  mr-18px flex">
        <div class="hotRank mr-16px font-s-18 font-600 color-#f77a31">1</div>
<div class="desc flex-1 w-0px">
  <h3 class="descTitle mb-6px">新车 MEGA 被恶意 P 图，李想朋友圈发声「存在有组织的违法犯罪行为」，哪些信息值得关注？</h3>
         <div class="descContent font-s-15">
          近日，理想汽车发布新品理想MEGA，其外观引发一些讨论。对此，理想汽车CEO李想11日发朋友圈称，对于事件中存在的那些有组织的违法犯罪行为，我们已经在用法律的手段进行处理中；经过深思熟虑后，我们决定开始反击，用光明反击黑暗
         </div>
         <div class="bottom_operation color-#8491a5 mt-12px">
          <Button>
<div class="flex items-center">
  <SvgIcon name="nimbus:fire"/>
      <span class="m-r-3px m-l-3px">1000万热度</span>
</div>
          </Button>
    <Button>
<div class="flex items-center">
  <SvgIcon name="cib:telegram-plane"/>
      <span class="m-r-3px m-l-3px">分享</span>
</div>
    </Button>
         </div>
</div>
      </div>
      <div class="itemPreview w-160px">
        <img src="/src/assets/images/author/hot/hotItem.png" class="w-100% h-100% aspect-ratio-video border-rd-5px" alt="">
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import SvgIcon from 'S/components/SvgIcon.vue'
import Button from 'S/components/Button.vue'
</script>

<style scoped lang="scss">
.listItem {
//  display: grid;
//  grid-template-columns: 1fr 120px;
.descContent {
  white-space: nowrap;
  overflow:hidden;
  text-overflow: ellipsis;
}
}
</style>