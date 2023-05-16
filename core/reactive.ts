
import { track,trigger } from "./effect"
export const reactive =<T extends object>(object:T) =>{
return new Proxy(object,{
get(target,key,receiver) {
let res =Reflect.get(target,key,receiver)
track(target,key)
return res
},
set (target,key,value,receiver) {
  trigger(target,key)
  return  Reflect.set(target,key,receiver)
}
})
}