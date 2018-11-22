import axios from 'axios'
import config from '@/config'
import { Message } from 'iview'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

let request = axios.create({
  baseURL: baseUrl
})

request.interceptors.request.use((config) => {
  return config
}, err => {
  console.log(err)
  return Promise.reject(err)
})

request.interceptors.response.use((response) => {
  const { data } = response
  if (!data.status) {
    Message.error(data.msg)
    return Promise.reject(data.status)
  }
  return { data }
}, (err) => {
  return Promise.reject(err)
})

export default request
