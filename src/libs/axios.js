import axios from 'axios'
import config from '@/config'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

let request = axios.create({
  baseURL: baseUrl
})

request.interceptors.request.use((config) => {
  // TODO:
  // 判断请求路径 登录注册路径不需要去带token头
  return config
}, err => {
  console.log(err)
  return Promise.reject(err)
})

request.interceptors.response.use((response) => {
  console.log(response)
  const { data, status } = response
  return { data, status }
}, (err) => {
  return Promise.reject(err)
})

export default request
