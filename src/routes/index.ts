import {createRouter, createWebHashHistory} from 'vue-router'
import type {RouteRecordRaw,RouteComponent} from 'vue-router'
import {formatDir,formatRoute} from '../utils'
import { ElMessage } from 'element-plus'
interface routerItem {
  path:string
  name?:string
  component:RouteComponent,
  sensitive?:boolean

}
const routes:RouteRecordRaw[] = [
  {
    // path: '/:userId(\\d+)', //路由只匹配数字,且参数key为userId
    path: '/:userId(\\d+)?',   // 参数可选
    component: ()=>import('S/views/home/index.vue'),
   sensitive:true  // 敏感模式，严格区分大小写
  }
]

// const files = import.meta.glob('../components/*.vue')
// const files = import.meta.glob('../views/**')
// console.log(files,formatRoute(files));

// Object.entries(files).forEach(([k,v])=>{
// let obj:RouteRecordRaw = {path:'',component:'' as unknown as RouteComponent}
//   obj.path = formatDir(k)
//   obj.component = v
//   routes.push(obj)
// })


 const router = createRouter({
  history: createWebHashHistory(),
  routes:formatRoute(import.meta.glob('../views/**')),
  strict:true,  // 严格模式，不会匹配末尾的斜杠  匹配 user/:id 不匹配 user/:id/
  scrollBehavior(to,from,savedPosition) { // 控制滚动行为
    return {top:0}
  }
})

router.beforeEach((to,from) =>{
 if(to.path=='/' && localStorage.getItem('token')) {
  router.replace('/main')
 }
  
    if(to.path!=='/login' && !localStorage.getItem('token')) {
      ElMessage.info('未登录或登录信息过期，请重新登录！')
       router.push('/login')
    }
    
})
export default router