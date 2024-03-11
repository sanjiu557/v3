<template>
  <div class="tab-line" :style="{padding:props.pad?props.pad:'0 16px',color:props.textColor?props.textColor:'#000'}">
            <div class="tab-item cursor-pointer" :style="{margin:props.tabMargin??'2px'}" :class="{ active: item.label === current,showLine:props.showLine && (item.label === current) }" v-for="item in tabList"
              @click="changeLgType(item?.label)" :key="item?.label">{{ item?.name }}
              <span v-if="item.count?.toString()" class="tab-meta color-#9196a1  font-s-14">{{ (item && item.count<=100)?item.count:'99+' }}</span>
            </div>
          </div>
</template>

<script setup lang="ts">
 import { ref ,onMounted,watch} from 'vue';
 type PropsType = {name:string,label:string,count?:number}
interface Ptype {
  tabList:PropsType[],
  tabMargin?:string,
  pad?:string,
  textColor?:string,
  showLine?:boolean,
  activeColor?:string,
  default?:string
}
   const current = ref('')
   const emits = defineEmits(['click-tab'])
   const props = withDefaults(defineProps<Ptype>(),{
    showLine:true,
    activeColor:'#000'
   })

   watch(current,(newVal,oldVal)=>{

    if(newVal !== oldVal && newVal) {
      emits('click-tab',newVal)
    }
   })
    const changeLgType = (label:string) =>{
      current.value = label

    }
     onMounted(() => {   
      if(props.default) {
        current.value = props.default
      } else   
      current.value = props.tabList[0]?.label})
</script>

<style scoped lang="scss">
  .TabPad {
    padding: 12px 0;
  }
  .tab-line {
    display: flex;
    // flex: 1;
    // padding: 12px 0;

    .tab-item {
      padding: 5px;

    }

    .active {
      font-weight: 700;
      margin-right: 5px;
      // color: #000;
      color: v-bind('$props.activeColor');
    }
  
    .showLine::after {
      content: '';
      display: block;
      height: 3px;
      background-color: #1772f6;
      width: 100%;
      margin-top: 8px;

    }
  }
</style>