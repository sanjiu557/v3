<template>
  <div class="basic-box overflow-auto">
    <div class="top-bar flex flex-items-center z-10">
      <div class="logoBox h-100% m-l-10 flex flex-items-center  flex-1">
        <el-image :src="logoUrl" loading="lazy" class="logo">
          <template #placeholder>
            <div class="image-slot">Loading<span class="dot">...</span></div>
          </template>
        </el-image>
      </div>
      <Tabs :tabs="tabline" @clickTab="clickTab"></Tabs>
    </div>
    <div class="middle-content flex flex-items-center mt-40">
      <div class="describe flex-1 m-l-50px m-r-50px">
        <h1 class="mTitle">山水相依，自然之美</h1>
        <h4 class="subTitle">清流潺潺，绿树成荫</h4>
        <p class="sub-content"> 这张风景图展现了一片美丽的山林，绿树成荫，

          清澈的溪水从山间流淌而过。在画面的中央，有一座古老的木桥横跨在溪水上，两旁是茂密的树林和青翠的草地。桥上有几个年轻人手牵手走过，他们欢声笑语，充满了青春活力的气息。远处是一座高山，山顶被云雾缭绕，显得格外神秘。整个画面充满了自然的美丽和宁静的气息，令人心旷神怡。
        </p>
      </div>
      <div class="swiper-card relative border-rd-6  b-b-1 flex-1  m-l-50px m-r-50px   overflow-hidden">
        <div ref="parent" class="coverBox w-h-100 absolute z-2 flex justify-center items-center" :style="{left}">
          <div  ref="swiper" :class="{'transition-all  duration-200 ease-linear':!isSwiping}" class="i-mingcute-arrow-right-fill text-6xl   hover:cursor-pointer  font-700" ></div>
        </div>
        <div class="border-rd-6 w-730px h-498px relative" >
          <img :src="imgUrl" class="w-h-100 object-cover" alt="" :style="{opacity}">
          <img :src="getImage(picture[index<3?index+1:0])" class="w-h-100 object-cover absolute top-0 left-0 transition-all" alt="" :style="{opacity:(1-opacity)}">
        </div>
        
        <!-- <el-image  class="border-rd-6 w-730px h-498px"   :src="imgUrl" :style="{opacity}">
           <img :src="imgUrl" alt="" slot="placeholder">
        </el-image> -->
      </div>

    </div>
    <div class="opera flex justify-center items-center m-40">
      <el-button size="large" ref="animateBtn" class="conic" data-name="conic gradient">
      </el-button>
      <!-- <button size="large" class="conic">conic gradient</button> -->

    </div>
  </div>
</template>

<script setup lang="ts">
import logoUrl from 'S/assets/images/logo.png'
import Tabs from 'S/components/Tabs.vue'
import { ref, reactive, computed,onMounted, nextTick, watch } from 'vue'
import {usePointerSwipe ,useAnimate} from '@vueuse/core'
// publish: 添加滑动层图片，修复滑动切换图片白屏问题
enum picture {
  'swiper-1',
  'swiper-2',
  'swiper-3',
  'swiper-4',
}
// import type { TabsPaneContext } from 'element-plus'
const random = (): number => (Math.random())
const tabline = reactive([
  { name: 'Home', key: 1, cb: random },
  { name: 'Explore', key: 2 },
  { name: ' Item Details', key: 3 },
  { name: 'Author', key: 4 },
])
const swiper = ref<HTMLDivElement|null>(null)
const parent = ref<HTMLDivElement|null>(null)
const animateBtn = ref<HTMLButtonElement|null>(null)
const imgUrl = ref<string>('')
const isHidden = ref<boolean>(false)
const left = ref('0')
const index = ref(0)
const opacity = ref(1)

const  offsetWidth = computed(()=>parent.value?.offsetWidth)

onMounted(()=>{
  imgUrl.value = getImage(picture[index.value])
})


const reset = () =>{
  left.value = '0'
  opacity.value = 1
}
watch(index,(newV,oldV)=>{
  if(newV && newV>=3) {
    isHidden.value = true
  }
})
const getImage = (name: string):string => {
  return new URL(`../../assets/images/${name}.jpg`,import.meta.url).href
}

const next = ()=>{
  if(index.value<3) {
    index.value++
  }else {
    index.value = 0
  }

  imgUrl.value =getImage(picture[index.value])
    reset()

}

const keyframes = [
  {backgroundImage:'conic-gradient(from 0deg at 50% 50%,rgba(255,255,255,.5) 0deg,rgba(255,255,255,0) 60deg,rgba(255,255,255,0) 310deg,rgba(255,255,255,.5) 360deg)'},
  {backgroundImage:'conic-gradient(to 360deg at 50% 50%,rgba(255,255,255,.5) 0deg,rgba(255,255,255,0) 60deg,rgba(255,255,255,0) 310deg,rgba(255,255,255,.5) 360deg)'}
]

useAnimate(animateBtn,keyframes,2000)

const { distanceX,isSwiping, direction } = usePointerSwipe(swiper,{
  onSwipe(e:PointerEvent) {
    if(offsetWidth.value) {
        if(distanceX.value<0 && direction.value == 'right') {
          left.value = `${Math.abs(distanceX.value)}px`
          // 1-- 0   offsetWidth/2   
         opacity.value = 1-(Math.abs(distanceX.value)/(offsetWidth.value/2))
        }
        else  {
          reset()
        }
      
    }
    // console.log(e,isSwiping,direction);
      
  },
  onSwipeEnd(e:PointerEvent, direction) {
if(distanceX.value<0 &&  distanceX.value && (Math.abs(distanceX.value)/ (offsetWidth.value as number))>0.4) {
left.value = '100%'
next()
}else {
reset()
}     
  },
})

const clickTab = (cbParams:Object|string = ' ')=>{
  console.log(cbParams);
  
}

</script>

<style scoped lang="scss">
$baseFont:16px;
$shadow:#738d96;
$rotate:0deg;
.basic-box {
  position: relative;
  height: 100%;
  background: rgba($color: #fff, $alpha: 0.8) url('../../assets/images/bg.jpg') no-repeat;
  background-size: cover;
  margin: 0;
  &::-webkit-scrollbar {
  width: 10px;
}
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: rgba(0,0,0,0.2);
}
  &::-webkit-scrollbar-track {
    border-radius: 0;
    background: rgba(0,0,0,0.1);
}
//  &::-webkit-scrollbar-track-piece {
//  }
&::-webkit-scrollbar-corner  {
  background-color: transparent;
}
}


.top-bar {
  height: 90px;
  margin: 20px 50px;
  border: 1px solid #ccc;
  border-radius: 45px;
  box-shadow: 0px 6px 20px #ccc;

  .logo {
    width: 65px;
    height: 65px;
  }
}

.middle-content {
  .describe {
    text-indent: 2em;
    .sub-content {
      font-size: 16px;
      line-height: 24px;
      color: #333;
      opacity:0.9;
      margin-bottom: 20px;
      text-align:start;
      // text-indent: 2em;
    }
  }
  .swiper-card {
    box-shadow: 0 2px 30px #a5d1ac;
    ::deep .el-image {
      width: 100%;
      height: 100%;
      img {
        object-fit: cover;
      }
    }
  }
}
.opera  {
  .conic {
    position: relative;
    background-color: transparent;
    padding: 30px 40px;
    font-weight: 700;
    border-radius: 8px;
    // animation: gradient  2s   infinite;
    &:after {
      display: block;
      content: attr(data-name);
      position: absolute;
     left: 0;
     top: 0;
     display: flex;
     justify-content: center;
     align-items: center;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.2);
      // z-index: -1;

    }
  }
}
// @keyframes gradient {
//   0% {
//     background-image: conic-gradient(from 0deg at 50% 50%,rgba(255,255,255,.5) 0deg,rgba(255,255,255,0) 60deg,rgba(255,255,255,0) 310deg,rgba(255,255,255,.5) 360deg);
//   }
//   100% {
//     background-image: conic-gradient(from 360deg at 50% 50%,rgba(255,255,255,.5) 0deg,rgba(255,255,255,0) 60deg,rgba(255,255,255,0) 310deg,rgba(255,255,255,.5) 360deg);

//   }
// }
// @keyframes  test {
//   0% {
//     rotate: 0deg;
//   }
//   100%  {
//     rotate: 360deg;
//   }
// }
</style>