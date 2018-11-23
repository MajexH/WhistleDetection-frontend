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

export const operateWhistle = ({ whistle, user, is_illegal, reason }) => {
  return axios.request({
    url: '/operate',
    method: 'post',
    data: {
      whistle,
      user,
      is_illegal,
      reason
    }
  })
}

export const operateReview = ({ whistle, user, is_illegal, reason }) => {
  return axios.request({
    url: '/reoperate',
    method: 'post',
    data: {
      whistle,
      user,
      is_illegal,
      reason
    }
  })
}
