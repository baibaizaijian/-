import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 新axios实例
const instance = axios.create({
  baseURL: 'http://geek.itheima.net/',
  timeout: 5000
})

// 导出一个新axios实例调用接口的函数，返回值promise
export default ({ url, method = 'get', params, data, headers }) => {
  const promise = instance({ url, method, params, data, headers })
  return promise
}
// 请求拦截器
instance.interceptors.request.use(config => {
  const token = store.state.user.token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
}, err => Promise.reject(err))
// 响应拦截器
instance.interceptors.response.use(res => res, err => {
  if (err.response && err.response.status === 401) {
    // token失效
    store.commit('user/setToken', '')
    router.push('/login?returnUrl=' + encodeURIComponent(router.currentRoute.fullPath))
  }
  return Promise.reject(err)
})
