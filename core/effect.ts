let effectiveFn
export const effect = (fn:Function) =>{
   const _effect = function () {
    effectiveFn  = _effect 
    fn()
   }
   _effect()
}
let map = new WeakMap()
export const track = (target,key) =>{
 let depsMap = map.get(target)
 if(!depsMap){
  depsMap = new Map()
  map.set(target,depsMap)
 }
 let deps = depsMap.get(key)
 if(!deps) {
  deps = new Set()
   depsMap.set(deps)
 }
  deps.add(effectiveFn)
}

export const trigger = (target,key)=>{
   const depsMap = map.get(target)
   const deps = depsMap.get(key)
   deps.forEach(effect=>effect())
}