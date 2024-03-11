import type { RouteRecordRaw } from 'vue-router'
const format = (k: string): string => {
	if (k.length > 0) {
		return '/' + k.split('/').at(-1)?.split('.').at(0)
	}
	return '/'
}

const formatDir = (k: string): string => {
	if (k.length > 0) {
		return '/' + k.split('/').at(-2)
	}
	return '/'
}
// interface importMeta {
// 	[key: string]:() => Promise<any>
// }
const filterCompare = <T>(compare: T[], value: T[]): T[] => {
	return value.filter((v) => !compare.includes(v))
}
interface RouteInfo {
	path: string
	component: () => Promise<any>
	name?: string
	children?: RouteInfo[]
}
const genRoutes = (routeArray: Array<string | (() => Promise<unknown>)>[]) => {
	const routeInfo = ['path', 'component']
	return routeArray.map((item) =>
		item.reduce<any[]>((pre, cur, i) => {
			
			pre.push([routeInfo[i], routeInfo[i] == 'path' ? `/${cur}` : cur])
			return pre
		}, [])
	)
}
const recurrenceIndex: () => Function = () => {
	let level: number[] = []
	const recurrence = function (val: RouteRecordRaw[], cur: RouteRecordRaw) {
		val.forEach((item, i) => {
			if (item.children) {
				level.push(i)
				recurrence(item.children, cur)
			}
		})
		const result = val.findIndex((v) => cur.path.startsWith(v.path))
		return { result, level }
	}
	return recurrence
}

const recursion = (routes: RouteRecordRaw[]): RouteRecordRaw[] => {
	const res = routes
		.sort((a, b) => a.path.length - b.path.length)
		.reduce<RouteRecordRaw[]>((pre, cur) => {
			// let childIndex: number = -1
			// let level: number[] = []
			if (pre.length > 0) {
				const index = pre.findIndex((v) => {
					// if (v.children) {
					// 	// childIndex =	v.children.findIndex((vc)=>cur.path.startsWith(vc.path))
					// 	const creater = recurrenceIndex()
					// 	;({ result: childIndex, level } = creater(v.children, cur))
					// }
					return cur.path.startsWith(v.path)
				})

				if (index > -1) {
					pre[index].children
						? pre[index].children!.push(cur)
						: (pre[index].children = [cur])
				} else pre.push(cur)
			} else {
				pre.push(cur)
			}

			return pre
		}, [])
	res.forEach((ri) => {
		if (ri.children) ri.children = recursion(ri.children)
	})
	return res
} 
const dealChildren = (routes:RouteRecordRaw[],flag:boolean = false)=>{
routes.forEach((route,index,_this)=>{
	     route.path = flag ? route.path.split('/').at(-1) ?? ' ':route.path;
if(index==0 && flag) route.alias = '';  // 默认显示子路由的第一个路由 
		if(route.children) dealChildren(route.children,true);
		
	})

	 
	return routes  
}
const formatRoute = (
	importMap: Record<string, () => Promise<unknown>>
): RouteRecordRaw[] => {
	//  const mappedRoutes:{[key:string]:any} = {}
	// {path:'',component:()=>Promise.resolve(1),children:[{path:'',component:()=>Promise.resolve(2)}]
	// const result = Object.keys(importMap).map((v) =>  v.split('/'))
	// const compareArray = result[0].filter(v=>v!==result[0].at(-2))
	// const filterArray = result.map(r=>r.filter(ri=>!compareArray.includes(ri)))
	//  const mappedRoutes = filterArray.reduce<{[key:string]:any[]}>((acc, cur)=> {
	//   if(!acc[`lv${cur.length}`]) {
	// 		acc[`lv${cur.length}`] = []
	// 	}
	// 	acc[`lv${cur.length}`].push(cur)
	// 	 return acc
	//  },{})
	const entriesMap = Object.entries(importMap).filter(item=>!(item[0].includes('component') ||  item[0].includes('components')))
	// const preCompare = entriesMap[0][0].split('/')
	// const compare = preCompare.filter((v) => v !== preCompare.at(-2))

	const result = entriesMap.map(([path,comp],index)=>{
		return [
			path.replace('../views/','').replace('/index.vue',''),
			comp
		]
	})
  
	// const result = entriesMap.map(([path,resolve], i) => {
	// 	return [filterCompare<string>(compare, path.split('/')).join('/'),resolve] 
		
		
	// })


	
	const routes = genRoutes(result).map((item) =>
	Object.fromEntries(item)
) as RouteRecordRaw[]
// console.log(dealChildren(recursion(routes)));

	return dealChildren(recursion(routes))
}
interface IteratorInstance<T> extends ArrayLike<T> {
	next: () => { value: any; done: boolean }
}

const resetToArray = (
	likeArray: Iterable<string | number | boolean>
): Array<string | number | boolean> => {
	let array = ([] = [...likeArray])
	return array
}
interface SpliceArg {
	start: number
	deleteCount?: number
	items?: any[]
}
//  type parameterType = Parameters<typeof resetToArray>  // Parameters 取出函数参数的类型

const spliceRtnArray = <T extends any[]>(
	arr: T,
	...args: [number, number, any[] | any]
): T => {
	let array: T = ([] = arr)
	array.splice(...args)
	return array
}
const rmBlank = (arr: any[]) => arr.filter((v) => v && v.trim())
const formatArray = (first: any, ...args: any[]): any[] => {
	if (Array.isArray(first)) {
		if (args.length > 0) {
			return rmBlank(first).concat(...args)
		}
		return rmBlank(first)
	} else {
		return Array.of(first, ...args)
	}
}

const setToken = <T extends {auth:string,refresh_auth:string}>(data:T) => {
  localStorage.setItem('token', data.auth)
	localStorage.setItem('refresh_token', data.refresh_auth)
}


// 导出一个axios对象
const MyAxios = {
	// 定义一个get方法，接收一个url参数，返回一个Promise对象
	get<T>(url: string): Promise<T> {
		// 返回一个Promise对象
		return new Promise((resolve) => {
			// 创建一个XMLHttpRequest对象
			const xhr = new XMLHttpRequest()
			// 使用open方法，发送GET请求，url为参数url
			xhr.open('GET', url)
			// 监听readystatechange事件，当readyState为4，status为200时，解析Promise对象
			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4 && xhr.status === 200) {
					resolve(JSON.parse(xhr.responseText))
				}
			}
			// 发送请求
			xhr.send(null)
		})
	},
}
const useType ='offline'
// defineAsyncComponent   异步组件   import {defineAsyncComponent} from 'vue'
//  异步组件需要使用 defineAsyncComponent 进行注册
export {
	format,
	formatDir,
	resetToArray,
	spliceRtnArray,
	formatArray,
	formatRoute,
	setToken,
	MyAxios,
	useType
}
