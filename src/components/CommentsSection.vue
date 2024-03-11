<template>
  <div>
    <!-- <div class="comment_input flex mb-16px mt-16px">
      <el-image class="h-43px w-43px m-r-6px border-rd-6px" src="src/assets/images/people/avator.jpg" fit="cover"
        :lazy="true"></el-image>

<CustomInput class="flex-1" placeholder="欢迎参与讨论"/>
    </div> -->
<CustomInput  placeholder="欢迎参与讨论"  avator="src/assets/images/people/avator.jpg"/>


    <div class="comment-area border-b-#fefefe border-1px">
    <div class="area_header comment-standard flex">
      <div class="comment-total flex-1 font-600">
        100条评论
      </div>
      <div class="comment-tabs flex-1 flex justify-end items-center  " >
        <div class="font-s-14 tabs flex items-center cursor-pointer h-30px bg-#f8f8fa border-#f8f8fa border-2px box-border">
          <div class="box-border border-rd-6px border-1 border-#f8f8fa pl-8px pr-8px bg-#fff">默认</div>
          <div class="box-border border-rd-6px  pl-8px pr-8px">最新</div>
        </div>
      </div>
    </div>
    <div class="area_content comment-standard mt-12px relative">
      <Comment :commentList="commentList"/>
      <div class="sole-action color-#8491a5 f_c mt-10px mb-10px">
        <span class="font-s-15">点击加载全部评论</span>
       <SvgIcon  name="fluent:ios-arrow-right-24-filled" color="currentColor" :size="18"/>
      </div>


    </div>
    <div ref="customInput" class="sticky bottom-0">
        <CustomInput   placeholder="欢迎参与讨论" avator="src/assets/images/people/avator.jpg" />
      </div>
</div>
  </div>
</template>

<script setup lang="ts">
import Comment from './Comment.vue'
import CustomInput from './CustomInput.vue';
import SvgIcon from './SvgIcon.vue';
import { ref ,onMounted, computed} from 'vue';


const  commentList = [
  {author:'张三',content:'评论内容',time:'2023-03-21 12:00:00',children:[
    {author:'李四',content:'评论内容123',time:'2023-03-21 12:00:00'}
  ]},
  {author:'张三',content:'评论内容',time:'2023-03-21 12:00:00',children:[
    {author:'李四',content:'评论内容123',time:'2023-03-21 12:00:00'}
  ]},
  {author:'张三',content:'评论内容',time:'2023-03-21 12:00:00',children:[
    {author:'李四',content:'评论内容123',time:'2023-03-21 12:00:00'}
  ]},
  {author:'张三',content:'评论内容',time:'2023-03-21 12:00:00',children:[
    {author:'李四',content:'评论内容123',time:'2023-03-21 12:00:00'}
  ]},
  {author:'张三',content:'评论内容',time:'2023-03-21 12:00:00',children:[
    {author:'李四',content:'评论内容123',time:'2023-03-21 12:00:00'}
  ]},
  {author:'张三',content:'评论内容',time:'2023-03-21 12:00:00',children:[
    {author:'李四',content:'评论内容123',time:'2023-03-21 12:00:00'}
  ]}
]
const isShow = ref<boolean>(true)

const  customInputStyle = computed(()=>{
  return isShow.value ? {position:'sticky',bottom:'0px'}:{display:'none'}
})

const customInput = ref<HTMLElement>()

// const  initObserver = ()=>{
//   // console.log(customInput.value?.inputRef);
  
//   const observe = new IntersectionObserver((entries)=>{
//      if(entries[0].isIntersecting) {
//         isShow.value = false
//      }else {
//       isShow.value = true
//      }
     
//   })
//   if(!customInput.value) {
//     observe.unobserve(customInput.value!)
//   }
//   observe.observe(customInput.value!)
// }
// onMounted(()=>{
//   initObserver()
// })
</script>

<style scoped lang="scss">

.comment_input {
  .input {
    border-radius: 5px;
    outline: none;
    border-top-style: groove;
    border-right-style: groove;
    border-bottom-style: groove;
    border-left-style: groove;
    border: 1px solid #ebeced;
  }
}
.comment-area {
  border: 1px solid #ebeced;
   .comment-standard {
    padding: 0 16px;
   }
  .area_header {
    line-height: 45px;
    border-bottom: 1px solid #f6f6f7;
  }
}
</style>