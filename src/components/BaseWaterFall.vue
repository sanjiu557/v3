<template>
  <div>
   <div class="relative" v-bind="$attrs">
    <div class="absolute w-120px" v-for="fall in waterFallList" :style="{top:fall.top+'px',left:fall.left+'px',height:fall.height+'px',backgroundColor:fall.backgroundColor}"></div>
   </div>
  </div>
</template>

<script setup lang="ts">
import {reactive,onMounted,inject} from 'vue'
type PropType = {
  fallList:any[]
}
// type FuncType =  Function & {_esm?:Function}
// const tes:FuncType = {_esm() {}}
const test = inject('test')
const waterFallList =reactive<any[]>([])
const heightList =reactive<Array<number>>([])
const props = withDefaults( defineProps<PropType>(),
{
  fallList:()=>[]
}
)
const emits = defineEmits<{
  (e:'doubleClick',item:number):void
}>()
const init =() =>{
  const clientWidth = document.body.clientWidth
  const width = 130
  const lineCount = Math.floor(clientWidth / width) 
  const  propFalls:Record<string,any>[] = props.fallList.slice()
  for (let i = 0; i < propFalls.length; i++) {
   if(i < lineCount) {
       propFalls[i].left = i *width
       propFalls[i].top = 20
       waterFallList.push(propFalls[i])
       heightList.push(propFalls[i].height+20)
   }else {
    let current = heightList[0]
    let index = 0
heightList.forEach((h,ind)=>{
  if(current> h) {
    current = heightList[ind]
    index =ind
}
})
propFalls[i].left = propFalls[index].left
propFalls[i].top =  20 + current
waterFallList.push(propFalls[i])
heightList[index] = heightList[index] + propFalls[i].height + 20
  }  
}
}
onMounted(()=>{
init()
window.addEventListener('resize',()=>{
  init()
})
console.log(test,'test');
emits('doubleClick',123)
})
</script>

<style scoped lang="scss">

</style>