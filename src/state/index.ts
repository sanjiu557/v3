import {defineStore} from 'pinia'
export const useLocalState = defineStore('localState',{
  state:():piniaState=>({
    count:0,
    name:'张三',
    age:18,
    gender:'男'
   }),
  getters:{
    getCount:state=>state.count
  },
  actions:{
    double(state:piniaState):void{
      state.count*2
    }
  }
})