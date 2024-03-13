<template>
  <div class="video-container">
    <div class="video-card" v-for="i in 6">
      <div class="overflow-hidden relative color-#fff  video-preview">
        <img src="/src/assets/images/author/recommend.png"
          class="w-100% border-rd-5px aspect-ratio-video object-cover preview-img" alt="">
        <div class="video-mask absolute bottom-2px font-s-13 box-border p6px flex justify-between w-100%">
          <div>
            <SvgIcon name="fe:play" />
            <span class="ml-3px">20</span>
          </div>
          <span>456</span>
        </div>
      </div>
      <h3 class="mt-6px mb-6px font-500 font-s-16">12313</h3>
      <div class="author flex justify-between items-center">
        <div class="author-info f_c">
          <img src="/src/assets/images/author/recommend.png" class="border-rd-50% object-cover h-15px w-15px" alt="">
          <span class=" font-s-14 ml-6px">我说的哈哈</span>
        </div>
        <el-dropdown trigger="click" size="default">
          <div class="author-operation pr-3px cursor-pointer">···</div>
          <template #dropdown>
            <div class="videoDropDown  p12px">
              <div class="dropdown-content box-border" v-for="(item, index) in props.dropdown">
                <h3 class="content-title mb-6px">{{ item.title }}:</h3>
                <ul class="cursor-pointer  color-#a3acbc font-s-14">
                  <li class="flex items-center hover:bg-#f8f8fa  ml--12px mr--12px p12px" v-if="item.content"
                    v-for="content in item.content">
                    <SvgIcon :name="content.icon" :size="16" />
                    <span class="ml-8px">{{ content.name }}</span>
                    <span v-if="content.name == '不看该作者'" class="ml-2px">:我说的哈哈</span>
                  </li>
                  <li class="line h-1px w-100% bg-#ebeced  ml--12px mr--12px pl-12px pr-12px   mb-12px"
                    v-if="index < props.dropdown.length - 1"></li>
                </ul>
              </div>
            </div>
          </template>
        </el-dropdown>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from 'S/components/SvgIcon.vue';
type DropDown = {
  title: string,
  content: Array<{
    name: string,
    icon: string
  }>
}
interface videoItem {
  id: number;
  title: string;
  cover: string;
  duration: number;
  playCount: number;
  commentCount: number;
  likeCount: number;
  dislikeCount: number;
  createTime: string;
  user: {
    id: number;
    username: string;
    avatar: string;
  };
  category: {
    id: number;
    name: string;
  };
  description: string;
  url: string;
}
const props = defineProps<{
  dropdown: DropDown[],
  list:videoItem[]
}>()
</script>

<style scoped lang="scss">
.video {
  &-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
   grid-template-rows: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
  }
  &-preview {
    border: 1px solid transparent;

    // transform: translate(-50%,-50%);
    &:hover {
      .preview-img {
        transform: scale(1.5);
        transform-origin: 50% 50%;
        transition: all 0.5s ease-out;
      }

      color: #ccc;
    }
  }
}</style>