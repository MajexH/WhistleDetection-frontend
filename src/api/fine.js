import axios from '@/libs/axios'

export const getFined = () => {
  return axios.request({
    url: '/fined',
    method: 'get'
  })
}

export const getNotFined = () => {
  return axios.request({
    url: '/notfined',
    method: 'get'
  })
}
