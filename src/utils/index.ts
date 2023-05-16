export const  format = (k:string):string =>{
  if(k.length>0) {
    return '/' +k.split('/').at(-1)?.split('.').at(0)
  }
   return '/'
}

export const formatDir =(k:string):string =>{
  if(k.length>0) {
    return '/' +k.split('/').at(-2)
  }
   return '/'
}