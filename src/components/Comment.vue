<template>
  <div>
  <div class="comment-container flex m-t-18px" v-for="item in props.commentList">
    <ProfileDropDown trigger="hover">
  <el-image src="src/assets/images/people/avator.jpg" class="w-24px h-24px border-rd-3px cursor-pointer" fit="cover" :lazy="true"></el-image>
</ProfileDropDown>
   
   
 <div class="comment-info flex-1 ml-10px">
    <div class="comment-author  flex justify-between ">
      <ProfileDropDown trigger="hover">
        <div class="cursor-pointer font-600">{{ item.author }}</div>
      </ProfileDropDown>
      <el-dropdown trigger="click" size="default"  @command="">
        <div class="cursor-pointer color-#8491a5">···</div>
      <template #dropdown>
      <el-dropdown-menu>
     <el-dropdown-item v-for="opera in comandOperations">
    <div class="min-w-80px text-center cursor-pointer m-6px">{{ opera.name}}</div>
    </el-dropdown-item>
     
      </el-dropdown-menu>
    </template>
      </el-dropdown>
      
    </div>
    <div class="comment-msg font-s-15 mt-5px mb-tpx">
      <span>{{ item.content }}</span>
    </div>
      <div class="comment-footer flex mt-4px mb-4px">
        <div class="comment-tag flex-1 color-#9196a1 font-s-14">
          <span>{{CommentTag.ip}}</span>
          <span class="dot">·</span>
          <span>{{new Date(CommentTag.date).toLocaleDateString()}}</span>
          <span class="dot">·</span>
          <span v-if="CommentTag.isHot" class="color-#ff9917">热评</span>
        </div>
        <div class="comment-action flex-1 flex justify-end">
          <button class="acBtn  f-i-c ">
            <SvgIcon name="flowbite:messages-solid" :size="16" color="#8491a5"/>
            <span class="color-#8491a5 m-l-5px align-base font-s-14 mb-1px">回复</span>
          </button>
          <button class="acBtn f-i-c  ml-12px">
            <SvgIcon name="flowbite:heart-solid" :size="16" color="#8491a5"/>
            <span class="color-#8491a5 m-l-5px font-s-14">1000</span>
          </button>
        </div>
      </div>
<!-- 递归组件 -->
      <Comment  v-if="item.children" :commentList="item.children"/>
   </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from './SvgIcon.vue';
import ProfileDropDown from './ProfileDropDown.vue'
const props =defineProps<{commentList:any[]}>()
const CommentTag = {
  ip:'IP属地广东',
  date:'2022-09-01 12:00:00',
  isHot:true
}
const comandOperations = [
  { name:'屏蔽',key:''},
  { name:'举报',key:''},
  { name:'踩评论',key:''},
  { name:'复制',key:''}
]
</script>

<style scoped lang="scss">
.acBtn {
  cursor: pointer;
  border: none;
  outline: none;
  background-color: #fff;
}
.dot {
  margin: 0 5px;
}

:deep(.el-dropdown-menu__item) {
  &:focus {
    background-color: #f8f8fa;
    color: #000;
  }
}
.comment-msg {
  line-height: 15px;
  height: 30px;
  overflow: hidden;
}
</style>