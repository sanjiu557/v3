import Axios from 'axios'
import router from 'S/routes/index'
import { setToken } from './index'
import { ElMessage } from 'element-plus'
import { isArray } from 'element-plus/es/utils'

const stoppedRequests: string[] = []


const instance = Axios.create({
	// baseURL: 'http://127.0.0.1:80',
	baseURL: 'http://192.168.31.8:80',
	timeout: 5000,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		// 'Content-Type':'application/json',
	},
})

// 请求拦截器
instance.interceptors.request.use(
	(config) => {

if(!config.headers['Content-Type']) {
	if(config.method === 'post') {
		config.headers['Content-Type'] = 'application/json;charset=UTF-8'
	}else {
		config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
	}
}
		const token = localStorage.getItem('token')
		if (token) {
			config.headers.Authorization = token
		}

		return config
	},
	(err) => {
		return Promise.reject(err)
	}
)

//  响应拦截器
instance.interceptors.response.use(
	(response) => {
		return Object.assign(response, {
			data: { code: response.data.code, ...response.data.data },
		})
	},
	(err) => {
		console.log(err);
		
		if (err.response.status === 401 && localStorage.getItem('refresh_token')) {
			// 401的接口收集
			stoppedRequests.push(err.config.url!)
			instance
				.post('/refresh_token', {
					refresh_auth: localStorage.getItem('refresh_token'),
				})
				.then((res) => {
					console.log(res);
					
					if (res.status === 200 && res.data.code === 200) {
						setToken(res.data)
					} else if (res.data.code === 400 && res.data.need_quit) {
						if (router.currentRoute.value.path !== '/login')
							router.push('/login')
						localStorage.clear()
							ElMessage.info('登录信息失效，请重新登录')
					}
          
				})
		} else return Promise.reject(err?.response)
	}
)

export default instance
