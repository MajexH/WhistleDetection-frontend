import axios from '@/libs/axios'

export const getWhistle = () => {
  return axios.request({
    url: '/whistle/',
    method: 'get'
  })
}
