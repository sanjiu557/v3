<template>
  <div class="flex content-actions color-#1772f6 items-center">
    <el-button type="primary" size="default" plain @click="">
      <SvgIcon name="ion:caret-up"/>
      <span class="m-r-3px m-l-3px">赞同</span>
       {{ $props.actionInfo.favorite_count }}
    </el-button>
    <el-button type="primary" size="default" plain @click="">
      <SvgIcon name="ion:caret-down"/>
    </el-button>
<div class="actionBtns m-l-35px flex items-center">
   <div class="inline-block action-dropdown m-l-12px" v-for="item in actionList">
    <el-dropdown v-if="item.desc=='分享'" trigger="click" size="default" type="primary" @command="">
      <el-button type="info" link size="default"   @click="item.handler(item)">
           <SvgIcon :name="item.icon" :size="18"/>
           <span class="m-l-3px">{{item.desc}}</span>
         </el-button>
    <template #dropdown>
    <el-dropdown-menu>
<el-dropdown-item  v-for="shareItem in shareList">
  <SvgIcon  :name="shareItem.icon" :color="shareItem.iconColor"/>
<span class="color-#8491a5 m-l-5px">{{ shareItem.name }}</span>
</el-dropdown-item>
    
<el-dropdown-item>
          <div class="flex justify-center w-100%">
            <el-image src="src/assets/images/author/qrCode.png" class="w-65px h-65px" fit="cover" ></el-image>
            
          </div>
        </el-dropdown-item>
    </el-dropdown-menu>
  </template>
    </el-dropdown>
    

     <el-button type="info" link size="default" v-else  @click="item.handler(item)">
           <SvgIcon :name="item.icon" :size="18"/>

           <span class="m-l-3px">{{item.desc=='评论'?`${props.actionInfo.comments_count}条评论`:item.desc}}</span>
         </el-button>
   </div>
</div>
      <el-dropdown  trigger="click" size="default"  type="primary" @command="">
       <div class="cursor-pointer m-l-20px flex justify-center items-center">
       <div>···</div>
       </div>
      <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in dropList">
        <span class="m-r-6px" :style="{color:item.iconColor}">{{ item.name }}</span>
        <SvgIcon v-if="item.icon"  :name="item.icon" :size="20" :color="item.iconColor"/>
        </el-dropdown-item>        
      </el-dropdown-menu>
    </template>
      </el-dropdown>
      
    <Modal  @close="handleClose"  :showClose="true" width="500px" :showFooter="false" name="张三" :show="show">
     
        <div class="collect_modal flex flex-col items-center color-#000" v-if="!isGenerated">
          <h3 >添加收藏</h3>
          <div class="color-#8491a5 font-s-13">你可以创建多个收藏夹，将答案分类收藏</div>
 <button class="btn genBtn w-200px bg-#1772f6 m-t-60px" @click="isGenerated = true">创建收藏夹</button>
 <button class="btn cancelBtn w-200px color-#8491a5 mt-18px" @click="handleClose">取消</button>
        </div>    
      <!-- <template #footer></template> -->
        <div v-else class="add_collect flex flex-col items-center w-h-100 color-#000">
          <h2 class="mb-26px">创建新收藏夹</h2>
        <el-input size="" placeholder="收藏标题" class="mb-26px"></el-input>
        <el-input class="mb-6px" type="textarea"   placeholder="收藏描述(可选)" 
        :maxlength="-1" :show-word-limit="false" :autosize="{ minRows: 5, maxRows: 8}">
        </el-input>
        <div class="genCollect_radioGroup flex flex-col flex-start w-100%">
        <div class="flex items-center">
          <el-radio label="公开" @change=""></el-radio>
          <div class="color-#8491a5 font-s-13 inline-block">有其他人关注此收藏夹时不可设置为私密</div>
        </div>
        <div class="flex items-center">
          <el-radio label="私密" @change=""></el-radio>
          <div class="color-#8491a5 font-s-13 inline-block">只有你自己可以查看这个收藏夹 </div>
        </div>
        </div>
          <div class="footer_btn flex justify-center w-100% h-40px mt-30px">
            <button class="btn cancelBtn w-160px color-#8491a5 mr-12px" @click="isGenerated=false">取消</button>
            <button class="btn genBtn w-160px bg-#1772f6 ml-12px">创建</button>
          </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from './SvgIcon.vue';
import {ref} from 'vue'
import Modal from 'S/utils/DefineModal';


const show =ref(false)
const  showComment = ref(false)
const isGenerated = ref(false)

const props = defineProps<{
  actionInfo:{  
  comments_count:number,
  favorite_count:number}
}>()
const emits = defineEmits(['controlComment'])

const handleClose = ()=>{
  show.value =false
  isGenerated.value = false
}
const handleConfirm = ()=>{
  
}
const likeAction = (item:any)=>{
  item.desc = item.desc=='喜欢'?'取消喜欢':'喜欢'
  
}
const controlComment  = (item:any)=>{
  showComment.value = !showComment.value
item.desc = !showComment.value ? `${props.actionInfo.comments_count}条评论`:'收起评论' 
emits('controlComment',showComment.value)
}
const actionList = ref([
  {icon:'flowbite:messages-solid',desc:'评论',handler:controlComment},
  {icon:'cib:telegram-plane',desc:'分享',handler:()=>{}},
  {icon:'iconamoon:star-fill',desc:'收藏',handler:()=>{show.value = true}},
  {icon:'flowbite:heart-solid',desc:'喜欢',handler:likeAction}
])

const shareList = [
  {name:'复制链接',icon:'mingcute:link-line',iconColor:'#c3ccdc'},
  {name:'新浪微博',icon:'ri:weibo-fill',iconColor:'#fb6622'},
  {name:'微信扫一扫',icon:'uiw:weixin',iconColor:'#07c160'}
]
// #f8f8fa
const dropList = [
  {name:'举报'},
  {name:'禁止转载'},
  {name:'不感兴趣'},
  {name:'设置屏蔽词',icon:'quill:vip',iconColor:'#ce994f'}
]

</script>

<style scoped lang="scss">
.content-actions :deep(.el-button--primary) {
  &:hover {
    background-color: #1772f626;
  }
  border:none;
  color:currentColor
}
.actionBtns :deep(.el-button--text) {
  color:#8491a5;
  margin-left: 18px;
}
:deep(.el-dropdown-menu__item) {
  &:focus {
    background-color: #f8f8fa;
  }
}
.genCollect_radioGroup :deep(.el-radio) {
    margin-right: 6px;
  }
.collect_modal,.add_collect {

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
}
</style>