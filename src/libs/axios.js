import axios from 'axios'
import store from '@/store'
// import { Spin } from 'iview'
import config from '@/config'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

const addErrorLog = errorInfo => {
  const { statusText, status, request: { responseURL } } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

let request = axios.create({
  baseURL: baseUrl
})

request.interceptors.request.use((config) => {
  // TODO:
  // 判断请求路径 登录注册路径不需要去带token头
  console.log(config)
  return config
}, err => {
  // 添加ErrorLog
  addErrorLog(err)
  return Promise.reject(err)
})

request.interceptors.response.use((response) => {
  const { data, status } = response
  return { data, status }
}, (err) => {
  addErrorLog(err)
  // TODO:提示错误
  return Promise.reject(err)
})

export default request
