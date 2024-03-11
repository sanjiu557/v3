<template>
  <div>
    <div class="recommend_list-item m-b-12px">
      <h3>{{ info.title}}</h3>
      <div class="tem-content flex">
        <img src="/src/assets/images/author/recommend.png" alt="">
        <div class="flex-1  ml-6px pl-2px">
          <div class="recommend-msg dh-ellipse" :class="{ noLimit: isShow }">
            <span>{{  info.content }}</span>
            <span>...</span>
            <span class="text-center cursor-pointer m-l-5px  color-#095ebd" @click="develop">
              阅读全文
              <SvgIcon name="mingcute:down-fill" :size="18" class="align-bottom" color="currentColor" />
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 评论收藏组件 -->
    <ContentActions @controlComment="controlComment" :commentsCount="5000" :actionInfo="{comments_count:info.comments_count,favorite_count:info.favorite_count}" />
    <!-- 评论区组件 -->
    <CommentsSection v-if="isCommentShow" />

  </div>
</template>

<script setup lang="ts">
import ContentActions from 'S/components/ContentActions.vue';
import CommentsSection from 'S/components/CommentsSection.vue';
import SvgIcon from 'S/components/SvgIcon.vue';
import { ref, onMounted } from 'vue';
const isShow = ref(false)
const isCommentShow = ref(false)

interface PropList {
  title:string,
  content:string,
  comments_count:number,
  favorite_count:number
}

const props =  defineProps<{
info:PropList
}>()

const develop = () => {
  isShow.value = !isShow.value
}
const controlComment = (show: boolean) => {
  isCommentShow.value = show
}

onMounted (()=>{
  console.log(props.info);
  
})

</script>

<style scoped lang="scss">
.noLimit {
  -webkit-line-clamp: none;
}

.overflow-ellipse {
  word-break: break-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dh-ellipse {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.recommend-msg {
  line-height: 1.5;
  height: 3em;
  overflow: hidden;
  word-break: break-all;
  // &::before {
  //   content: '';
  //   float: right;
  //   width: 10px;
  //   height: 10px;
  //   background-color: red;
  // }
}
</style>