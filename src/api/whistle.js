import axios from '@/libs/axios'

export const getWhistle = () => {
  return axios.request({
    url: '/whistle',
    method: 'get'
  })
}

export const getReview = () => {
  return axios.request({
    url: '/review',
    method: 'get'
  })
}
