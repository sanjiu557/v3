import {createRouter, createWebHashHistory,RouteRecordRaw} from 'vue-router'
import {formatDir} from '../utils'
interface routerItem {
  path:string
  name?:string
  component:any
}
const routes:RouteRecordRaw[] = []
// const files = import.meta.glob('../components/*.vue')
const files = import.meta.glob('../views/**')
Object.entries(files).forEach(([k,v])=>{
let obj:routerItem = {path:'',component:''}
  obj.path = formatDir(k)
  obj.component = v
  routes.push(obj)
})
 const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router