import axios from '@/libs/axios'

export const getDevice = () => {
  return axios.request({
    url: '/device/',
    method: 'get'
  })
}
