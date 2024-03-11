const changeThis =function (thisArgs: any,otherArgs:any[],fn:Function) {
 thisArgs = thisArgs ==null ? window : Object(thisArgs)
  Object.defineProperty(thisArgs,'fn',{
    value:fn,
    enumerable:true,
    writable:false,
    configurable:true
  })
  thisArgs.fn(...otherArgs)
  delete thisArgs.fn
}
const bindThis = function (thisArgs: any,otherArgs: any[],fn:Function) {
  thisArgs = thisArgs ==null ? window : Object(thisArgs)
  Object.defineProperty(thisArgs,'fn',{
    value: fn,
    enumerable:true,
    writable:false,
    configurable:true
  })
  return (...newArgs: any[])=>{
    const allArgs = [...newArgs,...otherArgs]
    thisArgs.fn(...allArgs)
  }
}


Function.prototype.myCall = function (thisArgs: any,otherArgs: any) {
 changeThis(thisArgs,otherArgs,this)
}
Function.prototype.myBind = function (thisArgs: any,otherArgs: any) { 
  bindThis(thisArgs,otherArgs,this)
}