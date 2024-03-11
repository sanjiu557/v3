let _actEffect:any;
export const effect = (fn: Function) => {
	let effectFn = () => {
		_actEffect = effectFn
		fn()
	}
	effectFn()
}

const  map = new WeakMap()
export const track = <T extends object,K extends string| Symbol>(target:T,key:K)=>{
    let  depsMap = map.get(target)
    if(!depsMap) {
      depsMap = new  Map()
      map.set(target,depsMap)
    }
    let depSet = depsMap.get(key)
    if(!depSet) {
      depSet = new Set()
      depsMap.set(depSet)
    }
    depSet.add(_actEffect)
}

export const trigger =<T extends object,K extends string| Symbol> (target:T,key:K) =>{
const depsMap = map.get(target)
const  activeEffect = depsMap.get(key)
activeEffect.forEach((effectFn:()=>any)=>{
  effectFn()
})
   
}
