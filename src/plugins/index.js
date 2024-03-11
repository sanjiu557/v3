export const regComponents = {
  install:(app,options)=> {
  options.forEach((option)=>{
    app.component(option.name,option) //注册全局组件
  })
}
}