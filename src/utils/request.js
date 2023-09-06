import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'

// 新axios实例
const instance = axios.create({
  // 设置基地址
  baseURL: 'http://geek.itheima.net/',
  timeout: 5000
})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = store.state.user.token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response
}, function (error) {
  console.dir(error)
  // 如果请求错误,统一返回提示
  if (error.response) {
    Toast.fail(error.response.data.message)
  }
  return Promise.reject(error)
})
export default instance
