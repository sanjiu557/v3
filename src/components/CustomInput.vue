<template>
  <div ref="inputRef" class="flex mb-16px mt-16px">
    <el-image v-if="props.avator" class="h-43px w-43px m-r-6px border-rd-6px" :src="props.avator" fit="cover"
        :lazy="true"></el-image>
  <div ref="CustomInput"  class="flex-1 customInput pl-12px pr-12px border-1 border-#ebeced border-rd-5px border-solid" @click="controlShow">
<input  class="input h-40px  w-100%" v-model="inputValue"  type="text" :placeholder="props.placeholder" name="" id="">
    <div class="customAction mt-6px h-40px color-#9196a1 flex justify-between items-center" v-show="isInput">
<!-- <div class="action-total h-40px " > -->
<div class="expression-total flex">
  <div class="emoji-select">
  <SvgIcon class="cursor-pointer ml-6px mr-6px" :size="24" name="icon-park-outline:add-picture" color="currentColor" @click="uploadImage"/>
<el-dropdown  trigger="click" size="default">
  <SvgIcon class="ml-6px mr-6px cursor-pointer" :size="24" name="octicon:smiley-24" color="currentColor"/>
<template #dropdown>
<el-dropdown-menu>
 <div ref="emojisPanel" class="emojisPanel-container  p13px">
<div class="emojisPanel grid">
  <div  class="emoji-item cursor-pointer g_c" v-for="item in emojiList"> 
   <span class="emoji" @click="input(item.emoji)">{{ item.emoji }}</span>
  </div>
</div>
<div class="dots mt-10px mb-10px flex justify-center">
<div class="dot"></div>
<div class="dot"></div>
</div>
<div class="w-250px" style="margin:0 auto;">
<ul ref="scrollView" class="panel-tabs  overflow-x-scroll  bg-#f8f8fa w-100% list-none p0" @mouseup.prevent="handleUp" @mouseleave.prevent="handleUp"  @mousedown.prevent="handleEvent">
  <li v-for="pic in panelTabList" class="tab-item m-6px cursor-pointer ">
  <img :src="pic.src" alt="" class="object-cover w-50px h-30px">
  </li>
</ul>
</div>
 </div>
</el-dropdown-menu>
</template>
</el-dropdown>
</div>
  <div class="emoji-often flex">
    <div  class="emoji-item cursor-pointer flex justify-center items-center ml-8px" v-for="item in emojiOftenList"> 
     <span class="emoji" @click="input(item.emoji)">{{ item.emoji }}</span>
    </div>
  </div>
</div>
<div>
  <button class="btn btn--primary btn--primary-disable" >发布</button>
</div>
</div>
    <!-- </div> -->
  </div>

</div>
</template>

<script setup lang="ts">
import SvgIcon from './SvgIcon.vue';
import { ref,onMounted,computed,reactive } from 'vue';
import axios from 'S/utils/initAxios'
const inputRef = ref<HTMLElement>()
const isInput = ref(false)
const CustomInput = ref<HTMLElement>()
const emojisPanel = ref<HTMLElement>()
const scrollView = ref<HTMLElement>()
const emojiList = ref<any[]>([])
const  mouseObj = reactive({
      start:0,
      end:0,
})

const inputValue = ref('')
const props =withDefaults(defineProps<{
  placeholder:string,
  avator:string
}>(),{
placeholder:'请输入'
})

const panelTabList = ref<any[]>([
  {key:'one',src:'/src/assets/images/author/PanelTab/1.png'},
  {key:'two',src:'/src/assets/images/author/PanelTab/2.png'},
  {key:'three',src:'/src/assets/images/author/PanelTab/3.png'},
  {key:'four',src:'/src/assets/images/author/PanelTab/4.png'},
  {key:'five',src:'/src/assets/images/author/PanelTab/5.png'},
  {key:'six',src:'/src/assets/images/author/PanelTab/6.png'}
])

const emojiOftenList = computed(()=>{
  return emojiList.value.slice(0,6)
})

const handleEvent = (e:MouseEvent) => {

  mouseObj.start = e.clientX
  console.log(e.offsetX);
  
   scrollView.value?.addEventListener('mousemove',handleMove)  
}

const handleUp = (e:MouseEvent)=>{
  mouseObj.end = e.clientX
  scrollView.value?.removeEventListener('mousemove',handleMove)
}

const handleMove = (e:MouseEvent) => {
console.log((e.offsetX - mouseObj.start));

  
   scrollView.value?.scrollTo({
     left:scrollView.value.scrollLeft + (e.clientX - mouseObj.start),
     behavior:'smooth'
    })
}


const controlShow = ()=>{
  isInput.value = true
document.body.addEventListener('click',(e)=>{
  // console.log(emojisPanel.value,CustomInput.value);
  if (e.target !== CustomInput.value && !CustomInput.value?.contains(e.target as Node) && !emojisPanel.value?.contains(e.target as Node)) {
    isInput.value = false
  }else {
    isInput.value = true
  }
  
})


}
const uploadImage = ()=>{
  
  const input = document.createElement('input')
  input.type = 'file'
  document.body.appendChild(input)
  input.click()
  input.style.display = 'none'
  // document.body.removeChild(input)
}

const input = (value:string)=>{
if (!inputValue.value) {

  inputValue.value = value
}else 
inputValue.value += value
}

onMounted(()=>{
axios.get('/main/getEmojis').then((res)=>{
 if(res.data.code === 200) {
   const result =res.data.data[0].emojis
   emojiList.value = result.slice(0,35)

 }
  
  
})
})
defineExpose({
  inputRef
})
</script>

<style scoped lang="scss">

.btn {
  border:none;
  outline: none;
&--primary {
  @include btn--primary;
}
&--primary-disable {
  @include btn--primary-disable;
}
}
.emojisPanel-container {
  .dots {
        .dot {
          border: 2px solid #000;
          border-radius: 50%;
          width: 0px;
          height: 0px;
          &:nth-child(1) {
            border-color: red;
            margin-right: 8px;
          }
        }
      }
      .panel-tabs {
        white-space: nowrap;
        .tab-item {
          display: inline-block;
        }
      }
      .panel-tabs::-webkit-scrollbar {
        display: none;
      }

.emojisPanel {
        grid-template-rows: repeat(5, 24px);
        grid-template-columns: repeat(7, 24px);
        gap: 16px;
    justify-content: center;
    align-items: center;
    .emoji-item {
      width: 24px;
      height: 24px;
      .emoji {
        transform: scale(1.8);
      }
// background-image: url('/src/assets/images/author/emojis.png') 280px;
    // clip-path: circle(16px at 12px 12px);
    }
    .emoji-item:hover {
      background-color: #f8f8fa;


    }   
      }
    }

.customInput {
  transition: height .5s;
  .customAction{
    border-top: 1px solid #ebeced;
    .expression-total  .emoji-select {
      border-right: 1px solid #ebeced;

    }
  }
}
  .input {

    // border-radius: 5px;
    outline: none;
    border-top-style: groove;
    border-right-style: groove;
    border-bottom-style: groove;
    border-left-style: groove;
    border:none;
    // border-top: 1px solid #ebeced;
  }
</style>